/**
 * Definiciones de tipos para las variables de entorno de Vite.
 * Asegura que TypeScript reconozca las variables expuestas por `import.meta.env`.
 */

/// <reference types="vite/client" />

/** Estructura de las variables de entorno disponibles vía `import.meta.env`. */
interface ImportMetaEnv {
  /** URL base del backend/API (por ejemplo: https://api.midominio.com o /api). */
  readonly VITE_API_URL: string;
}

/** Extensión de la interfaz global `ImportMeta` para incluir `env`. */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
