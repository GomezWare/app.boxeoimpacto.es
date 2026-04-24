<template>
    <section class="container mx-auto">
        <h1>TEST</h1>
        <button @click="test()" class="cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Click me</button>
    </section>
</template>

<script lang="ts" setup>
    const errorStore = useErrorStore();

    const test = () => {
        errorStore.open('Error de prueba');
    }

</script>