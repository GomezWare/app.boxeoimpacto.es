<template>
  <main class="text-white">
    <slot />
  </main>

  <ErrorModal />
</template>

<script setup lang="ts">
import ErrorModal from '~/components/partials/ErrorModal.vue'
</script>

<style lang="css">

html {
  background-color: var(--color-secondary);
}
</style>

<script lang="ts" setup>
</script>