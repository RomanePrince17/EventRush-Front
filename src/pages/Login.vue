<template> 
  <div class="relative min-h-screen w-full lg:flex">
    <!-- Image à gauche -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat lg:static lg:w-1/2"
      style="background-image: url('../assets/images/connexion/login.png')"
    >
      <div class="absolute inset-0 bg-black opacity-40 lg:hidden"></div>
    </div>
    <!-- Formulaire -->
    <div
      class="relative z-10 flex items-center justify-center h-full w-full p-6 lg:static lg:w-1/2 lg:p-20 lg:justify-start"
    >
      <div
        class="mt-28 bg-white rounded-3xl shadow-xl w-full max-w-md p-9 md:ml-20 lg:shadow-none lg:bg-transparent lg:p-0"
      >
        <h1 class="text-2xl text-center font-bold mb-6">Connexion</h1>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              class="w-full h-12 px-4 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600">Mot de passe</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Mot de passe"
                class="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>
          <!-- Message d'erreur -->
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

          <a class="block text-sm text-red-600 cursor-pointer">Mot de passe oublié ?</a>

          <!-- Bouton avec loading intégré -->
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
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
          <!-- Bouton Google -->
            <!-- <div class="mt-4">
              <button
                @click="loginWithGoogle"
                type="button"
                class="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
              >
              <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Logo"
                  class="h-5 w-5"
                />
                <span>Se connecter avec Google</span>
              </button>
            </div> -->
        </form>
        <p class="text-sm text-center mt-4">
          Pas de compte ?
          <router-link to="/register" class="text-blue-600 underline mb-4">Créer un compte</router-link>
          <p v-if="success" class="text-green-500 text-sm">{{ success }}</p>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      succes:'',
      loading: false,
      showPassword: false, // 👁️ État pour afficher/masquer
    }
  },
  methods: {
    togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  },
    async login() {
      this.loading = true
      this.error = ''
      this.succes=''
      const options = {
        method: 'POST',
        url:'/auth/login \
        ',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: {
          email: this.email,
          password: this.password,
        },
      }
      try {
        const { data } = await axios.request(options)
        this.succes = 'Connexion réussie'
        if (data && data.role) {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('user', JSON.stringify(data.role))
          // ✅ Redirection selon le rôle
          const role = data.role
          if (role === 'admin') {
            this.$router.push('/dashboard')
          } else if (role === 'organisateur') {
            this.$router.push('/profil_organisateur')
          } else if (role === 'client') {
            this.$router.push('/profil')
          } else {
            this.$router.push('/') // par défaut
          }
        }
      } catch (error) {
        this.error = "Email ou mot de passe incorrect"
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    loginWithGoogle() {
    // Redirection vers l'URL d'authentification Google
    window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=929575010865-2emkk4u5b7gg77nht5jf9dl39ccnlbhd.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fdigitstage.online%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=openid+profile+email&response_type=code';
    this.$router.push('/') // par défaut
  }
    },
  
}
</script>