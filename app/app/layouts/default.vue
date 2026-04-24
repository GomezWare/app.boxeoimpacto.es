<template>
  <main>
    <slot />
  </main>

  <ErrorModal />
</template>

<script setup lang="ts">
import ErrorModal from '~/components/partials/ErrorModal.vue'
</script>
