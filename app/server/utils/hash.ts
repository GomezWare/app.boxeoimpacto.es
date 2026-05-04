import { createHash } from "crypto";

export const hashClave = (clave: string) => {
  return createHash('sha256').update(clave, 'utf8').digest('hex');
}
