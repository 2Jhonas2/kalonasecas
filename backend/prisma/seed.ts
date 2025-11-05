// prisma/seed.ts
/**
 * Siembra unificada (idempotente) para:
 * - Climas, Departamentos, Ciudades (desde CSV), Roles, Tipos de documento (con alias)
 * - Usuario por defecto (busca doc type por cualquier alias ES/EN)
 *
 * CSV esperado: prisma/data/municipios_co.csv
 * Soporta delimitadores: ',', ';', '\t', '|', comillas y BOM.
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

/** =========================
 *  Datos base fijos
 *  ========================= */
const CLIMATES = [
  { code: 'THEMATIC',  name: 'Lugares Temáticos', description: 'Parques y experiencias temáticas' },
  { code: 'TEMPERATE', name: 'Templado',          description: 'Clima templado' },
  { code: 'WARM',      name: 'Cálido',            description: 'Clima cálido' },
];

const DEPARTMENTS: { name: string; code: string }[] = [
  { name: "Amazonas", code: "AMA" },
  { name: "Antioquia", code: "ANT" },
  { name: "Arauca", code: "ARA" },
  { name: "Atlántico", code: "ATL" },
  { name: "Bogotá D.C.", code: "DC" },
  { name: "Bolívar", code: "BOL" },
  { name: "Boyacá", code: "BOY" },
  { name: "Caldas", code: "CAL" },
  { name: "Caquetá", code: "CAQ" },
  { name: "Casanare", code: "CAS" },
  { name: "Cauca", code: "CAU" },
  { name: "Cesar", code: "CES" },
  { name: "Chocó", code: "CHO" },
  { name: "Córdoba", code: "COR" },
  { name: "Cundinamarca", code: "CUN" },
  { name: "Guainía", code: "GUA" },
  { name: "Guaviare", code: "GUV" },
  { name: "Huila", code: "HUI" },
  { name: "La Guajira", code: "LAG" },
  { name: "Magdalena", code: "MAG" },
  { name: "Meta", code: "MET" },
  { name: "Nariño", code: "NAR" },
  { name: "Norte de Santander", code: "NSA" },
  { name: "Putumayo", code: "PUT" },
  { name: "Quindío", code: "QUI" },
  { name: "Risaralda", code: "RIS" },
  { name: "San Andrés y Providencia", code: "SAP" },
  { name: "Santander", code: "SAN" },
  { name: "Sucre", code: "SUC" },
  { name: "Tolima", code: "TOL" },
  { name: "Valle del Cauca", code: "VAC" },
  { name: "Vaupés", code: "VAU" },
  { name: "Vichada", code: "VID" },
];

const ROLE_DESCRIPTIONS = ["Traveler", "LogistAgents", "AdminPlace", "Admin"];

/**
 * Tipos de documento canónicos (ES) + alias (siglas e inglés).
 * Insertamos SOLO canónicos si no existe ninguno de sus alias.
 */
const DOC_TYPES_CANON = [
  { name: "Citizenship card", aliases: ["C.C", "CC", "Citizenship card", "Citizenship card"] },
  { name: "Foreign identity card", aliases: ["CE", "Foreign identity card", "Citizenship card"] },
  { name: "Passport",             aliases: ["Passport"] },
] as const;

/** =========================
 *  Utils de normalización
 *  ========================= */
function norm(s: string): string {
  return (s || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "") // quita puntuación (ej. puntos en "C.C")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

const DEPT_ALIASES: Record<string, string> = {
  "BOGOTA D C": "BOGOTÁ D.C.",
  "BOGOTA": "BOGOTÁ D.C.",
  "ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA": "SAN ANDRÉS Y PROVIDENCIA",
  "ARCHIPIELAGO DE SAN ANDRES, PROVIDENCIA Y SANTA CATALINA": "SAN ANDRÉS Y PROVIDENCIA",
};

/** =========================
 *  Helpers texto / CSV
 *  ========================= */
function stripBOM(s: string) {
  return s.replace(/^\uFEFF/, '');
}

function detectDelimiter(csv: string): ',' | ';' | '\t' | '|' {
  const firstLine = csv.split(/\r?\n/, 1)[0] ?? '';
  const candidates: Array<',' | ';' | '\t' | '|'> = [',', ';', '\t', '|'];
  const counts: Record<string, number> = { ',': 0, ';': 0, '\t': 0, '|': 0 };

  let inQuotes = false;
  for (let i = 0; i < firstLine.length; i++) {
    const c = firstLine[i];
    if (c === '"') {
      if (inQuotes && firstLine[i + 1] === '"') { i++; continue; }
      inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && candidates.includes(c as any)) counts[c]++;
  }

  return (Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0] ?? ',') as any;
}

function parseCSVGeneric(csvRaw: string): string[][] {
  const csv = stripBOM(csvRaw);
  const delim = detectDelimiter(csv);
  const rows: string[][] = [];
  let i = 0, field = "", row: string[] = [], inQuotes = false;

  while (i < csv.length) {
    const c = csv[i];
    if (c === '"') {
      if (inQuotes && csv[i + 1] === '"') { field += '"'; i += 2; continue; }
      inQuotes = !inQuotes; i++; continue;
    }
    if (!inQuotes && (c === delim || c === "\n" || c === "\r")) {
      row.push(field); field = "";
      if (c === delim) { i++; continue; }
      if (c === "\r" && csv[i + 1] === "\n") i++;
      i++;
      if (row.length) rows.push(row);
      row = [];
      continue;
    }
    field += c; i++;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function buildDeptMap(records: { id_department: number; name: string }[]) {
  const m = new Map<string, number>();
  for (const r of records) {
    let key = norm(r.name);
    if (DEPT_ALIASES[key]) key = norm(DEPT_ALIASES[key]);
    m.set(key, r.id_department);
  }
  return m;
}

function extractPairs(csvText: string): Array<{ department: string; city: string }> {
  const table = parseCSVGeneric(csvText);
  if (!table.length) return [];

  const header = table[0].map(h => h.trim());
  const headerNorm = header.map(h => norm(h));
  const body = table.slice(1);

  const deptSyns = ["DEPARTMENT", "DEPARTAMENTO", "NOMBRE DEPARTAMENTO", "DPTO", "NOMBRE DEPTO"];
  const citySyns = ["CITY", "MUNICIPIO", "NOMBRE MUNICIPIO", "MPIO", "NOMBRE MPIO"];

  const findIndexBySyns = (syns: string[]) => {
    for (const s of syns) {
      const idx = headerNorm.findIndex(h => h === s);
      if (idx >= 0) return idx;
    }
    for (const s of syns) {
      const idx = headerNorm.findIndex(h => h.includes(s));
      if (idx >= 0) return idx;
    }
    return -1;
  };

  let idxDept = findIndexBySyns(["DEPARTMENT"]);
  let idxCity = findIndexBySyns(["CITY"]);
  if (idxDept < 0) idxDept = findIndexBySyns(deptSyns);
  if (idxCity < 0) idxCity = findIndexBySyns(citySyns);

  if (idxDept < 0 || idxCity < 0) {
    console.error("Headers detectados:", header);
    console.error("Headers normalizados:", headerNorm);
    throw new Error("No encontré columnas de departamento/municipio. Esperado: 'Nombre Departamento' y 'Nombre Municipio' (o 'department,city').");
  }

  return body
    .map(r => ({ department: (r[idxDept] || "").trim(), city: (r[idxCity] || "").trim() }))
    .filter(r => r.department && r.city);
}

/** =========================
 *  Seeds
 *  ========================= */
async function seedClimates() {
  for (const c of CLIMATES) {
    await prisma.climates.upsert({
      where: { code: c.code },
      update: { name: c.name, description: c.description, is_active: true },
      create: c,
    });
  }
  console.log("✅ climates OK");
}

async function seedDepartments(): Promise<Map<string, number>> {
  for (const d of DEPARTMENTS) {
    await prisma.departments.upsert({
      where: { name: d.name }, // name es @unique
      update: { code: d.code },
      create: { name: d.name, code: d.code },
    });
  }
  console.log("✅ departments OK");

  const all = await prisma.departments.findMany({ select: { id_department: true, name: true } });
  return buildDeptMap(all);
}

async function seedCities(deptMap: Map<string, number>) {
  const csvPath = path.resolve(__dirname, "data", "municipios_co.csv");
  if (!fs.existsSync(csvPath)) {
    console.warn(`⚠️  No se encontró ${csvPath}. Coloca ahí el CSV oficial de municipios o uno simple 'department,city'. Se omiten ciudades por ahora.`);
    return;
  }

  const text = fs.readFileSync(csvPath, "utf8");
  const pairs = extractPairs(text);

  const data: { name: string; id_department: number }[] = [];
  for (const { department, city } of pairs) {
    let depKey = norm(department);
    if (DEPT_ALIASES[depKey]) depKey = norm(DEPT_ALIASES[depKey]);
    const id_department = deptMap.get(depKey);
    if (!id_department) {
      console.warn(`⚠️  Departamento no reconocido en CSV: "${department}" (municipio: "${city}")`);
      continue;
    }
    data.push({ name: city, id_department });
  }

  if (!data.length) {
    console.warn("⚠️  No hay filas válidas para insertar en cities.");
    return;
  }

  const BATCH = 1000;
  for (let i = 0; i < data.length; i += BATCH) {
    const slice = data.slice(i, i + BATCH);
    await prisma.cities.createMany({ data: slice, skipDuplicates: true });
    process.stdout.write("·");
  }
  console.log("\n✅ cities OK");
}

async function seedRoles() {
  const existing = await prisma.roles_users.findMany({ select: { description: true } });
  const have = new Set(existing.map(r => r.description));
  const toCreate = ROLE_DESCRIPTIONS.filter(d => !have.has(d)).map(description => ({ description }));
  if (toCreate.length) await prisma.roles_users.createMany({ data: toCreate });
  console.log("✅ roles_users OK");
}

/**
 * Deduplicación por sinónimos: si existe cualquiera de los alias/canónico, NO reinsertamos.
 * Inserta SOLO nombres canónicos en español para estandarizar UI/datos.
 */
async function seedDocumentTypes() {
  const existing = await prisma.types_documents.findMany({ select: { document_name: true } });
  const existingSet = new Set(existing.map(d => norm(d.document_name)));

  const toCreate: { document_name: string }[] = [];
  for (const t of DOC_TYPES_CANON) {
    const canon = norm(t.name);
    const aliasNorms = t.aliases.map(a => norm(a));
    const alreadyHave = [canon, ...aliasNorms].some(k => existingSet.has(k));
    if (!alreadyHave) {
      toCreate.push({ document_name: t.name });
      existingSet.add(canon);
    }
  }

  if (toCreate.length) {
    await prisma.types_documents.createMany({ data: toCreate });
  }
  console.log("✅ types_documents OK");
}

/** =========================
 *  Helpers de dominio
 *  ========================= */
function allAliasesFor(nameOrAlias: string): string[] {
  const needle = norm(nameOrAlias);
  for (const t of DOC_TYPES_CANON) {
    const pack = [t.name, ...t.aliases];
    if (pack.map(norm).includes(needle)) return pack;
  }
  // Si no coincide con ningún pack conocido, igual devolvemos el propio
  return [nameOrAlias];
}

async function findDocTypeIdByAny(names: string[]): Promise<number | null> {
  const rows = await prisma.types_documents.findMany({
    select: { id_type_document: true, document_name: true },
  });
  const want = new Set(names.map(norm));
  for (const r of rows) {
    if (want.has(norm(r.document_name))) return r.id_type_document;
  }
  return null;
}

/** Usuario demo (opcional) */
async function seedDefaultUser() {
  // Queremos "Cédula de Ciudadanía" o cualquiera de sus alias (incluye "Citizenship card")
  const aliases = allAliasesFor("Citizenship card");
  const docTypeId = await findDocTypeIdByAny(aliases);

  const travelerRole = await prisma.roles_users.findFirst({ where: { description: 'Traveler' } });

  if (!docTypeId || !travelerRole) {
    console.warn('⚠️ No se creó usuario por defecto. Falta Role "Traveler" o tipo de documento equivalente a "Cédula de Ciudadanía".');
    return;
  }

  await prisma.users.upsert({
    where: { email_user: 'testuser@example.com' },
    update: {},
    create: {
      name_user: 'Test',
      lastname_user: 'User',
      number_document: 123456789,
      id_type_document: docTypeId,
      date_birth: new Date('1990-01-01'),
      direction_user: '123 Main St',
      email_user: 'testuser@example.com',
      password: 'password', // ⚠️ Producción: usar hash (bcrypt/argon2)
      id_role_user: travelerRole.id_role_user,
      isVerified: true,
      photo_user: null,
    },
  });
  console.log('✅ default user OK');
}

/** Orquestador */
async function main() {
  await seedClimates();
  const deptMap = await seedDepartments();
  await seedCities(deptMap);
  await seedRoles();
  await seedDocumentTypes();
  await seedDefaultUser(); // opcional, pero útil para probar login rápido
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
