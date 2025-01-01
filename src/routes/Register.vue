<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const name = ref('')

const isLoading = ref(false)
const errorMessage = ref('')

const handleRegister = async (e: Event) => {
  e.preventDefault()
  isLoading.value = true
  errorMessage.value = ''

  try {
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (!email.value || !password.value || !name.value) {
      throw new Error('Veuillez remplir tous les champs')
    }

    console.log('Tentative de connexion avec:', { email: email.value, password: password.value , name: name.value})

  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Une erreur est survenue'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-black text-gray-100 flex items-center justify-center p-6">


    <div class="w-full max-w-md bg-black/75 rounded-lg p-8 backdrop-blur-sm">
      <h1 class="text-3xl font-bold mb-8">S'inscrire</h1>

      <form @submit="handleRegister" class="space-y-6">

        <div v-if="errorMessage"
             class="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
          {{ errorMessage }}
        </div>


        <div class="space-y-2">
          <div class="relative">
            <input type="email"
                   id="email"
                   v-model="email"
                   required
                   class="w-full px-4 pt-6 pb-2 text-lg bg-zinc-800 rounded-lg focus:bg-zinc-700
                          border-2 border-transparent focus:border-gray-500 transition-all duration-200
                          peer outline-none"
                   placeholder=" ">
            <label for="email"
                   class="absolute text-sm text-gray-400 duration-200 transform -translate-y-3
                          scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100
                          peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                          peer-focus:-translate-y-3">
              Email
            </label>
          </div>
        </div>
        <div class="space-y-2">
          <div class="relative">
            <input type="text"
                   id="name"
                   v-model="name"
                   required
                   class="w-full px-4 pt-6 pb-2 text-lg bg-zinc-800 rounded-lg focus:bg-zinc-700
                          border-2 border-transparent focus:border-gray-500 transition-all duration-200
                          peer outline-none"
                   placeholder=" ">
            <label for="name"
                   class="absolute text-sm text-gray-400 duration-200 transform -translate-y-3
                          scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100
                          peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                          peer-focus:-translate-y-3">
              Nom
            </label>
          </div>
        </div>

        <div class="space-y-2">
          <div class="relative">
            <input type="password"
                   id="password"
                   v-model="password"
                   required
                   class="w-full px-4 pt-6 pb-2 text-lg bg-zinc-800 rounded-lg focus:bg-zinc-700
                          border-2 border-transparent focus:border-gray-500 transition-all duration-200
                          peer outline-none"
                   placeholder=" ">
            <label for="password"
                   class="absolute text-sm text-gray-400 duration-200 transform -translate-y-3
                          scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100
                          peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                          peer-focus:-translate-y-3">
              Mot de passe
            </label>
          </div>
        </div>

        <button type="submit"
                :disabled="isLoading"
                class="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-800
                       disabled:cursor-not-allowed rounded-lg font-semibold text-lg
                       transition-colors duration-200 relative">
          <span :class="{ 'opacity-0': isLoading }">S'inscrire</span>
          <div v-if="isLoading"
               class="absolute inset-0 flex items-center justify-center">
            <div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </button>

        <div class="flex items-center justify-between text-sm text-gray-400">
          <a href="#" class="hover:underline">Besoin d'aide ?</a>
        </div>
      </form>

      <div class="mt-16 text-gray-400">
        <p class="text-base">
          Vous avez déjà un compte ?
          <a href="/login" class="text-white hover:underline">Se connecter</a>
        </p>

      </div>
    </div>
  </div>
</template>