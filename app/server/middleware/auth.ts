import micromatch from 'micromatch';
import declaredRoutes from '~~/server/utils/routes';
import { verifyToken } from '~~/server/utils/jwt';

type JwtSessionPayload = {
  rol?: string;
};

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const route = declaredRoutes.find((r) => micromatch.isMatch(url.pathname, r.path));
  if (!route) return;
  if (route.isPublic) return;

  const token = getCookie(event, 'session');
  if (!token) return sendRedirect(event, '/login');

  let decoded: JwtSessionPayload;
  try {
    decoded = verifyToken(token) as JwtSessionPayload;
  } catch {
    deleteCookie(event, 'session', { path: '/' });
    return sendRedirect(event, '/login');
  }

  const allowedRoles = route.rol;
  if (
    Array.isArray(allowedRoles)
    && allowedRoles.length > 0
    && (!decoded.rol || !allowedRoles.includes(decoded.rol))
  ) {
    return sendRedirect(event, '/app');
  }
});
