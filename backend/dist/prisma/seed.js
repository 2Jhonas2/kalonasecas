"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const prisma = new client_1.PrismaClient();
const CLIMATES = [
    { code: 'THEMATIC', name: 'Lugares Temáticos', description: 'Parques y experiencias temáticas' },
    { code: 'TEMPERATE', name: 'Templado', description: 'Clima templado' },
    { code: 'WARM', name: 'Cálido', description: 'Clima cálido' },
];
const DEPARTMENTS = [
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
const DOC_TYPES_CANON = [
    { name: "Citizenship card", aliases: ["C.C", "CC", "Citizenship card", "Citizenship card"] },
    { name: "Foreign identity card", aliases: ["CE", "Foreign identity card", "Citizenship card"] },
    { name: "Passport", aliases: ["Passport"] },
];
function norm(s) {
    return (s || "")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^\p{L}\p{N}\s]/gu, "")
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase();
}
const DEPT_ALIASES = {
    "BOGOTA D C": "BOGOTÁ D.C.",
    "BOGOTA": "BOGOTÁ D.C.",
    "ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA": "SAN ANDRÉS Y PROVIDENCIA",
    "ARCHIPIELAGO DE SAN ANDRES, PROVIDENCIA Y SANTA CATALINA": "SAN ANDRÉS Y PROVIDENCIA",
};
function stripBOM(s) {
    return s.replace(/^\uFEFF/, '');
}
function detectDelimiter(csv) {
    const firstLine = csv.split(/\r?\n/, 1)[0] ?? '';
    const candidates = [',', ';', '\t', '|'];
    const counts = { ',': 0, ';': 0, '\t': 0, '|': 0 };
    let inQuotes = false;
    for (let i = 0; i < firstLine.length; i++) {
        const c = firstLine[i];
        if (c === '"') {
            if (inQuotes && firstLine[i + 1] === '"') {
                i++;
                continue;
            }
            inQuotes = !inQuotes;
            continue;
        }
        if (!inQuotes && candidates.includes(c))
            counts[c]++;
    }
    return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? ',');
}
function parseCSVGeneric(csvRaw) {
    const csv = stripBOM(csvRaw);
    const delim = detectDelimiter(csv);
    const rows = [];
    let i = 0, field = "", row = [], inQuotes = false;
    while (i < csv.length) {
        const c = csv[i];
        if (c === '"') {
            if (inQuotes && csv[i + 1] === '"') {
                field += '"';
                i += 2;
                continue;
            }
            inQuotes = !inQuotes;
            i++;
            continue;
        }
        if (!inQuotes && (c === delim || c === "\n" || c === "\r")) {
            row.push(field);
            field = "";
            if (c === delim) {
                i++;
                continue;
            }
            if (c === "\r" && csv[i + 1] === "\n")
                i++;
            i++;
            if (row.length)
                rows.push(row);
            row = [];
            continue;
        }
        field += c;
        i++;
    }
    if (field.length || row.length) {
        row.push(field);
        rows.push(row);
    }
    return rows;
}
function buildDeptMap(records) {
    const m = new Map();
    for (const r of records) {
        let key = norm(r.name);
        if (DEPT_ALIASES[key])
            key = norm(DEPT_ALIASES[key]);
        m.set(key, r.id_department);
    }
    return m;
}
function extractPairs(csvText) {
    const table = parseCSVGeneric(csvText);
    if (!table.length)
        return [];
    const header = table[0].map(h => h.trim());
    const headerNorm = header.map(h => norm(h));
    const body = table.slice(1);
    const deptSyns = ["DEPARTMENT", "DEPARTAMENTO", "NOMBRE DEPARTAMENTO", "DPTO", "NOMBRE DEPTO"];
    const citySyns = ["CITY", "MUNICIPIO", "NOMBRE MUNICIPIO", "MPIO", "NOMBRE MPIO"];
    const findIndexBySyns = (syns) => {
        for (const s of syns) {
            const idx = headerNorm.findIndex(h => h === s);
            if (idx >= 0)
                return idx;
        }
        for (const s of syns) {
            const idx = headerNorm.findIndex(h => h.includes(s));
            if (idx >= 0)
                return idx;
        }
        return -1;
    };
    let idxDept = findIndexBySyns(["DEPARTMENT"]);
    let idxCity = findIndexBySyns(["CITY"]);
    if (idxDept < 0)
        idxDept = findIndexBySyns(deptSyns);
    if (idxCity < 0)
        idxCity = findIndexBySyns(citySyns);
    if (idxDept < 0 || idxCity < 0) {
        console.error("Headers detectados:", header);
        console.error("Headers normalizados:", headerNorm);
        throw new Error("No encontré columnas de departamento/municipio. Esperado: 'Nombre Departamento' y 'Nombre Municipio' (o 'department,city').");
    }
    return body
        .map(r => ({ department: (r[idxDept] || "").trim(), city: (r[idxCity] || "").trim() }))
        .filter(r => r.department && r.city);
}
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
async function seedDepartments() {
    for (const d of DEPARTMENTS) {
        await prisma.departments.upsert({
            where: { name: d.name },
            update: { code: d.code },
            create: { name: d.name, code: d.code },
        });
    }
    console.log("✅ departments OK");
    const all = await prisma.departments.findMany({ select: { id_department: true, name: true } });
    return buildDeptMap(all);
}
async function seedCities(deptMap) {
    const csvPath = path.resolve(__dirname, "data", "municipios_co.csv");
    if (!fs.existsSync(csvPath)) {
        console.warn(`⚠️  No se encontró ${csvPath}. Coloca ahí el CSV oficial de municipios o uno simple 'department,city'. Se omiten ciudades por ahora.`);
        return;
    }
    const text = fs.readFileSync(csvPath, "utf8");
    const pairs = extractPairs(text);
    const data = [];
    for (const { department, city } of pairs) {
        let depKey = norm(department);
        if (DEPT_ALIASES[depKey])
            depKey = norm(DEPT_ALIASES[depKey]);
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
    if (toCreate.length)
        await prisma.roles_users.createMany({ data: toCreate });
    console.log("✅ roles_users OK");
}
async function seedDocumentTypes() {
    const existing = await prisma.types_documents.findMany({ select: { document_name: true } });
    const existingSet = new Set(existing.map(d => norm(d.document_name)));
    const toCreate = [];
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
function allAliasesFor(nameOrAlias) {
    const needle = norm(nameOrAlias);
    for (const t of DOC_TYPES_CANON) {
        const pack = [t.name, ...t.aliases];
        if (pack.map(norm).includes(needle))
            return pack;
    }
    return [nameOrAlias];
}
async function findDocTypeIdByAny(names) {
    const rows = await prisma.types_documents.findMany({
        select: { id_type_document: true, document_name: true },
    });
    const want = new Set(names.map(norm));
    for (const r of rows) {
        if (want.has(norm(r.document_name)))
            return r.id_type_document;
    }
    return null;
}
async function seedDefaultUser() {
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
            password: 'password',
            id_role_user: travelerRole.id_role_user,
            isVerified: true,
            photo_user: null,
        },
    });
    console.log('✅ default user OK');
}
async function main() {
    await seedClimates();
    const deptMap = await seedDepartments();
    await seedCities(deptMap);
    await seedRoles();
    await seedDocumentTypes();
    await seedDefaultUser();
}
main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
//# sourceMappingURL=seed.js.map