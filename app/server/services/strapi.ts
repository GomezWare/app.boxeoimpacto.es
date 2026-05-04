import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

/*
 * PETICIONES A LA API DE STRAPI
 */

const fetchStrapi = async (
  endpoint: string,
  body?: unknown,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
) => {
  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    };

    const init: RequestInit = { method, headers };

    if (method !== 'GET' && method !== 'DELETE' && body !== undefined) {
      headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(body);
    }

    const response = await fetch(`${STRAPI_URL}${endpoint}`, init);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error?.message ?? `Error Strapi (${response.status})`);
    }

    return data;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

type StrapiClienteRow = {
  id: number;
  documentId: string;
  attributes: Record<string, unknown> & { clave?: string };
};

async function passwordMatches(stored: string, plain: string): Promise<boolean> {
  const trimmed = stored.trim();
  if (trimmed.startsWith('$2a$') || trimmed.startsWith('$2b$') || trimmed.startsWith('$2y$')) {
    return bcrypt.compare(plain, trimmed);
  }
  return trimmed === plain;
}

// AUTH: un solo GET por email; la clave no se filtra en Strapi (bcrypt aquí)

export const findUser = async (email: string, password: string) => {
  const query = new URLSearchParams({
    'filters[email][$eq]': email,
    'pagination[limit]': '1',
  });

  const res = await fetchStrapi(`/api/clientes?${query.toString()}`);

  if (!res?.data || !Array.isArray(res.data) || res.data.length === 0) {
    return null;
  }

  const row = res.data[0] as StrapiClienteRow;
  const stored = row.attributes?.clave;

  if (typeof stored !== 'string' || !stored.length) {
    return null;
  }

  if (!(await passwordMatches(stored, password))) {
    return null;
  }

  const { clave: _clave, ...attrs } = row.attributes;
  return {
    id: row.id,
    documentId: row.documentId,
    ...attrs,
  };
};
