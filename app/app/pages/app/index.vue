<template>
  <div>
    <h1>Bienvenido {{ user?.nombre }}</h1>
    <p>Esta pagina es privada para usuarios registrados.</p>
  </div>
</template>

<script lang="ts" setup>

const { data: user } = await useFetch<any>('/api/me');

</script>