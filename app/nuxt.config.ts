import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv';
dotenv.config({ quiet: true });


// COnfiguración anti CSRF para que solo se puedan hacer peticiones desde los hosts permitidos
const ALLOWED_HOSTS = process.env.ALLOWED_HOSTS ?? '';
if (!ALLOWED_HOSTS) throw new Error('ALLOWED_HOSTS is not set');
const ALLOWED_HOSTS_ARRAY = ALLOWED_HOSTS.split(',');

export default defineNuxtConfig({

  compatibilityDate: '2025-07-15',
  
  devtools: { enabled: true },
  
  modules: ['@pinia/nuxt', '@nuxt/icon'],
  
  css: ['~/assets/css/global.css'],

  ssr: false,


  vite: {
    server: {
      allowedHosts: ALLOWED_HOSTS_ARRAY,
    },
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
})