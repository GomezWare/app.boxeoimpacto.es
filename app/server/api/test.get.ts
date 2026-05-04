import { findUser } from '../services/strapi';

export default defineEventHandler(async (event) => {

  const user = await findUser('webdavar@gmail.com', '123456');

  return user;
})
