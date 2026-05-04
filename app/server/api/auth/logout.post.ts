export default defineEventHandler(async (event) => {

  // Eliminamos la cookie de sesión
  deleteCookie(event, 'session', { path: '/' });

  // Devolvemos true
  return true;
})
