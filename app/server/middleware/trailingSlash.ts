export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  if (url.pathname.endsWith('/')) {
    return sendRedirect(event, url.pathname.slice(0, -1));
  }
});