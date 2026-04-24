<template>
    <div
        v-if="errorStore.isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-secondary/70 px-4"
    >
        <div class="w-full max-w-lg overflow-hidden rounded-xl bg-secondary shadow-2xl">
            <div class="flex items-center gap-3 bg-primary px-5 py-4 text-white">
                <Icon name="mdi:alert-circle" class="text-2xl text-white" />
                <h2 class="text-xl font-bold">Ha ocurrido un error</h2>
            </div>

            <div class="space-y-6 p-6">
                <p class="text-base leading-relaxed text-center text-white font-bold">
                    {{ errorStore.message }}
                </p>

                <div class="flex justify-center"> 
                    <button
                        class="rounded-md w-full bg-primary px-5 py-2 font-semibold text-white transition-colors hover:bg-primary-darker"
                        @click="errorStore.close"
                    >
                        CERRAR
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const errorStore = useErrorStore();
</script>