export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  if (url.pathname.endsWith('/') && url.pathname !== '/') {
    return sendRedirect(event, url.pathname.slice(0, -1));
  }
});