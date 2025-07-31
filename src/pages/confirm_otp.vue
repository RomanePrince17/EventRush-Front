<template>
  <div class="relative min-h-screen w-full lg:flex">
    <!-- Left image section -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat lg:static lg:w-1/2"
      style="background-image: url('../assets/images/connexion/login.png')"
    >
      <div class="absolute inset-0 bg-black opacity-40 lg:hidden"></div>
    </div>

    <!-- Right form section -->
    <div class="  relative z-10 flex items-center justify-center h-full w-full p-6 lg:static lg:w-1/2 lg:p-20 lg:justify-start">
      <div class=" mt-30 bg-white rounded-3xl shadow-xl w-full max-w-md p-9 md:ml-20 lg:shadow-none lg:bg-transparent lg:p-0">
        <h1 class="text-2xl text-center font-bold mb-6">Confirmer votre enregistrement</h1>
        <form @submit.prevent="handleConfirm" class="space-y-4">
          <label class="block text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />

          <label class="block text-sm text-gray-600">Code OTP</label>
          <input
            v-model="otp"
            type="password"
            placeholder="OTP"
            class="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />

          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

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
            {{ loading ? 'Vérification en cours...' : 'Confirmer' }}
          </button>
        </form>
      </div>
    </div>

    <!-- MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 class="text-xl font-bold text-green-600 mb-4">Succès !</h2>
        <p class="text-gray-700">{{ success }}</p>
        <button
          @click="showModal = false"
          class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ConfirmOtp',
  data() {
    return {
      email: '',
      otp: '',
      error: '',
      success: '',
      loading: false,
      showModal: false,
    }
  },
  methods: {
    async handleConfirm() {
      this.error = ''
      this.success = ''
      this.loading = true

      const options = {
        method: 'POST',
        url: 'https://gestevent-main-ai7iif.laravel.cloud/api/auth/verifyotp',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer 123',
        },
        data: { email: this.email, otp: this.otp },
      }

      try {
        const { data } = await axios.request(options)
        this.success = 'Compte créé avec succès. Vous pouvez désormais vous connecter.'
        this.showModal = true
      } catch (error) {
        console.error(error)
        this.error = 'Le code OTP est incorrect ou a expiré.'
      } finally {
        this.loading = false
        setTimeout(() => {
          if (this.success) {
            this.$router.push('/login')
          }
        }, 3000)
      }
    },
  },
}
</script>
