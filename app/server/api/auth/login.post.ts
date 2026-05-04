import { buscarUsuario } from '~~/server/services/auth';
import { generateToken } from '~~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  const { email, clave } = await readBody(event);

  // Validación de datos
  if (!email || !clave) throw createError({ statusCode: 400, message: 'El email y la contraseña son requeridos' });
  
  // Buscamos el usuario en la base de datos
  const user = await buscarUsuario(email, clave);

  // Si no existe, devolvemos un error
  if (!user) throw createError({ statusCode: 401, message: 'El email o la contraseña son incorrectos' });

  // Si no está activo, devolvemos un error
  if (!user.activo) throw createError({ statusCode: 401, message: 'Este usuario no está activo, por favor contacta con Boxeo Impacto para activar su cuenta' });

  // Generamos el token
  const payload = {
    rol: user.administrador ? 'admin' : 'user',
    email: user.email,
    nombre: user.nombre,
    tipoUsuario: user.tipoUsuario,
  }

  const token = generateToken(payload);

  // Mandamos la cookie de sesión
  setCookie(event, 'session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    sameSite: 'strict',
    path: '/',
  });

  // Devolvemos el payload del usuario
  return payload;
})
