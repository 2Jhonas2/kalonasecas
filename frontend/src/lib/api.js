/**
 * Módulo de utilidades para interactuar con la API del backend.
 * Centraliza las llamadas HTTP para mantener el código más limpio y reutilizable.
 */

// No dependemos de VITE_API_URL; dejamos que el proxy de Vite haga el trabajo.
/**
 * Realiza una petición POST a la API con datos en formato JSON.
 * @param {string} path La ruta del endpoint de la API (ej. '/auth/login').
 * @param {object} data Los datos a enviar en el cuerpo de la petición, se serializarán a JSON.
 * @param {RequestInit} [init] Opciones adicionales para la petición `fetch`.
 * @returns {Promise<object>} La respuesta de la API en formato JSON.
 * @throws {Error} Si la respuesta HTTP no es exitosa (status `!res.ok`).
 */
export async function postJSON(path, data, init) {
  // Asegura que la ruta comience con "/" para que el proxy de Vite la maneje correctamente.
  const url = `${path.startsWith('/') ? '' : '/'}${path}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    body: JSON.stringify(data),
    ...init,
  })
  // Si la respuesta no es exitosa (ej. 4xx, 5xx), lanza un error con el estado y el texto de la respuesta.
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`HTTP ${res.status}: ${text}`)
  }
  // Parsea y retorna la respuesta como JSON.
  return res.json()
}