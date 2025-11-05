import axios from "axios";

/**
 * Instancia de Axios configurada para realizar peticiones HTTP al backend.
 * Centraliza la configuración base y los interceptores para todas las llamadas API.
 */
export const http = axios.create({
  // `baseURL` se configura como '/api'. Vite proxy se encargará de redirigir
  // estas peticiones al backend real (ej. http://localhost:3000).
  baseURL: '/api', 
  // `withCredentials` indica si se deben enviar cookies de origen cruzado.
  // Se establece en `false` por defecto, pero podría ser `true` si se usan cookies de sesión.
  withCredentials: false, 
});

/**
 * Interceptor de peticiones de Axios.
 * Se ejecuta antes de que cada petición sea enviada.
 * Su propósito es adjuntar el token de autenticación (JWT) del usuario
 * en el encabezado `Authorization` de cada petición, si el token existe en `localStorage`.
 * Esto asegura que las rutas protegidas del backend puedan autenticar al usuario.
 */
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});