import { createHash } from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });


const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;


/* 
* PETICIONES A LA API DE STRAPI
*/

export const fetchStrapi = async (endpoint: string, body?: any,  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET') => {
  try {

    // Petición a la API de Strapi
    const response = await fetch(`${STRAPI_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify(body),
    method,
  });

  // Obtener la respuesta de la API de Strapi
  const data = await response.json();

  // Si hay un error, lanzar un error
  if (data.error) throw new Error(data.error.message ?? 'Error al conectar con la API de Strapi');

  // Si no hay error, devolver los datos
  return data;

  // Captura de errores
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
}