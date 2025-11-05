import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PrivateRoute (fusionado y extendido)
 * - Protege rutas que requieren autenticación.
 * - Opcionalmente restringe por rol con `requireRoles` (array de IDs o string).
 * - Conserva la ruta de origen en `state.from` para facilitar redirección post-login.
 *
 * Uso básico:
 *   <PrivateRoute><Dashboard /></PrivateRoute>
 *
 * Con roles:
 *   <PrivateRoute requireRoles={[4]}><AdminPage /></PrivateRoute>
 *   // donde 4 podría ser ROLE_ADMIN según tu app
 */
export default function PrivateRoute({ children, requireRoles }) {
  const location = useLocation();

  // Soporta contextos que expongan { user } o { user, loading/isLoading }
  const auth = useAuth?.();
  const user = auth?.user ?? null;
  const isLoading = Boolean(auth?.loading ?? auth?.isLoading);

  // Mientras inicializa auth (evita "flicker")
  if (isLoading) return null; // o un spinner si ya tienes uno

  // No autenticado → redirige a Home (conserva origen)
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Si se requieren roles y el usuario no cumple → redirige
  if (requireRoles) {
    const roles = Array.isArray(requireRoles) ? requireRoles : [requireRoles];
    const userRoleId = user?.id_role_user;
    if (!roles.includes(userRoleId)) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  }

  // Autorizado
  return children;
}
