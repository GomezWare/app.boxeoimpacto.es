<template>
  <section class="container mx-auto">
    <form @submit.prevent="handleLogin()">
        <div class="flex flex-col gap-2">
            <label for="email">Email</label>
            <input type="email" v-model="email" placeholder="Email" class="bg-secondary-light text-white p-2 rounded-md" />
        </div>
        <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <input type="password" v-model="password" placeholder="Password" class="bg-secondary-light text-white p-2 rounded-md" />
        </div>
        <button type="submit" class="bg-primary w-full text-center mt-4 text-white p-2 rounded-md hover:bg-primary-darker">Login</button>
    </form>
  </section>
</template>

<script lang="ts" setup>
    const errorStore = useErrorStore();


    const email = ref('');
    const password = ref('');
    
    const handleLogin = async () => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, clave: password.value }),
        });

        const data = await response.json();
        
        if (response.ok) {
            if (data.rol === 'admin') {
                navigateTo('/admin');
            } else {
                navigateTo('/app');
            }
        } else {
            errorStore.open(data.message);
        }
    }
</script>
