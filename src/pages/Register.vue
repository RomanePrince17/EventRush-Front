<template>
  <div class="relative min-h-screen w-full lg:flex">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat lg:static lg:w-1/2"
      style="background-image: url('../assets/images/connexion/login.png')"
    >
      <div class="absolute inset-0 bg-black opacity-40 lg:hidden"></div>
    </div>

    <div class="relative z-10 flex items-center justify-center h-full w-full p-6 lg:static lg:w-1/2 lg:p-20 lg:justify-start">
      <div
        class=" bg-white rounded-3xl shadow-xl w-full max-w-md p-9 md:ml-20 lg:shadow-none lg:bg-transparent lg:p-0"
      >
        <h1 class="text-2xl text-center font-bold mb-6">Créer un Compte</h1>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <label class="block text-sm text-gray-600">Nom</label>
          <input
            v-model="nom"
            type="text"
            placeholder="Nom"
            class="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />
          <label class="block text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />
          <label class="block text-sm text-gray-600">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            class="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />
          <label class="block text-sm text-gray-600">Confirmer mot de passe</label>
          <input
            v-model="confirmpassword"
            type="password"
            placeholder="Mot de passe"
            class="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />

          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

          <!-- Bouton avec loading -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 bg-pink-600 text-white rounded-lg py-2 hover:bg-pink-700 transition disabled:opacity-50"
          >
            <svg
              v-if="loading"
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
            {{ loading ? 'Création...' : 'Créer un compte' }}
          </button>
        </form>

        <p class="text-sm text-center mt-4">
          Déjà un compte ?
          <router-link to="/login" class="text-blue-600 underline mb-5">Se connecter</router-link>
        </p>
        <p v-if="success" class="text-green-600 text-sm">{{ success }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      nom: '',
      email: '',
      password: '',
      confirmpassword: '',
      error: '',
      success: '',
      loading: false,
    }
  },

  methods: {
    async handleRegister() {
      this.error = '',
      this.success=''
      if (this.password !== this.confirmpassword) {
        this.error = "Les mots de passe ne correspondent pas."
        return
      }
      this.loading = true,
      this.success = "Informations en cours de traitement!... Vérifiez votre email pour confirmer la création de votre compte."


      const options = {
        method: 'POST',
        url: 'https://gestevent-main-ai7iif.laravel.cloud/api/auth/register',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: {
          nom: this.nom,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmpassword,
        },
      }

      try {
        const { data } = await axios.request(options)
        console.log(data)
        this.$router.push('/confirm_otp')
      } catch (err) {
        if (err.response?.data?.message) {
          this.error = err.response.data.message
        } else {
          this.error = "Une erreur est survenue. Veuillez réessayer."
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
