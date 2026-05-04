// AUTH
import { hashClave } from '~~/server/utils/hash';
import { fetchStrapi } from '~~/server/services/strapi';

  export const buscarUsuario = async (email: string, clave: string) => {
    const hashedClave = hashClave(clave);
  
    const query = new URLSearchParams({
      'filters[email][$eq]': email,
      'filters[clave][$eq]': hashedClave,
    });
  
    const user = await fetchStrapi(`/api/clientes?${query.toString()}`);
  
    // Si no existe, devolvemos null
    if (user.data.length === 0) return null;
  
    // Si existe, devolvemos el usuario
    return user.data[0];
  }