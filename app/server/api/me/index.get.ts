import { verifyToken } from '~~/server/utils/jwt';

export default defineEventHandler((event) => {
  const token = getCookie(event, 'session');

  if (!token) throw createError({ statusCode: 401, message: 'No autenticado' });

  let decoded: any;

  // Verificamos el token
  try {
    decoded = verifyToken(token);
  } catch {
    throw createError({ statusCode: 401, message: 'No autenticado' });
  }

  const { email, nombre, tipoUsuario } = decoded;

  return { email, nombre, tipoUsuario };
});
