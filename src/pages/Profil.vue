<template>
  <div>
    <DefaultLayout>
      <h2 class="text-[#2F32A6] text-center text-3xl mb-6">Mon Profil</h2>

      <div class="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <!-- Avatar avec loader -->
        <div class="flex justify-center mb-6 h-24 w-24 mx-auto relative">
          <div v-if="!avatarLoaded" class="absolute inset-0 flex items-center justify-center">
            <svg class="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
          <img
            v-if="profil.avatar"
            :src="profil.avatar"
            @load="avatarLoaded = true"
            alt="Avatar"
            class="w-24 h-24 rounded-full object-cover border border-gray-300"
          />
        </div>

        <!-- Nom -->
        <div class="mb-4">
          <h3 class="text-gray-700 font-semibold">Nom : {{ profil.nom }}</h3>
        </div>

        <!-- Email -->
        <div class="mb-4">
          <h3 class="text-gray-700 font-semibold">Email : {{ profil.email }}</h3>
        </div>

        <!-- Bouton Modifier -->
        <div class="flex justify-end mt-6">
          <button
            @click="ouvrirModal"
            class="bg-[#2F32A6] text-white px-4 py-2 rounded hover:bg-[#1e2090] transition"
          >
            Modifier
          </button>
        </div>
      </div>

      <!-- Modal de modification -->
      <div
        v-if="modalOuvert"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
          <!-- Bouton Fermer -->
          <button
            @click="fermerModal"
            class="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
          >
            &times;
          </button>

          <h3 class="text-xl font-semibold text-center mb-4 text-[#2F32A6]">Modifier le Profil</h3>

          <form @submit.prevent="enregistrerProfil">
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-1">Nom</label>
              <input
                v-model="form.nom"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-1">Avatar (image)</label>
              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                class="w-full border border-gray-300 rounded px-3 py-2"
                @change="onFileChange"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-1">Nouveau mot de passe</label>
              <input
                v-model="form.password"
                type="password"
                class="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Laisser vide pour ne pas changer"
              />
            </div>

            <div class="text-right">
              <button
                type="submit"
                class="bg-[#2F32A6] text-white px-4 py-2 rounded hover:bg-[#1e2090] transition"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  </div>
</template>

<script>
import DefaultLayout from './DefaultLayout.vue'
import axios from 'axios'

export default {
  name: 'AfficherProfil',
  components: {
    DefaultLayout
  },
  data() {
    return {
      profil: {
        nom: '',
        email: '',
        avatar: null,
      },
      avatarLoaded: false,
      modalOuvert: false,
      form: {
        nom: '',
        email: '',
        password: '',
        avatarFile: null
      }
    }
  },
  mounted() {
    this.fetchProfil()
  },
  methods: {
    onFileChange(e) {
      this.form.avatarFile = e.target.files[0]
    },

    async fetchProfil() {
      try {
        const response = await axios.get('/me', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        })

        const data = response.data
        this.profil.nom = data.nom
        this.profil.email = data.email
        this.profil.avatar = data.avatar 
        this.avatarLoaded = false // Réinitialiser le loader

        console.log('Avatar reçu :', this.profil.avatar)
        
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error.response?.data || error.message)
      }
    },

    ouvrirModal() {
      this.form.nom = this.profil.nom
      this.form.email = this.profil.email
      this.form.password = ''
      this.modalOuvert = true
    },

    fermerModal() {
      this.modalOuvert = false
    },

    async enregistrerProfil() {
      const formData = new FormData()
      formData.append('nom', this.form.nom)
      formData.append('email', this.form.email)

      if (this.form.avatarFile) {
        formData.append('avatar', this.form.avatarFile)
      }

      if (this.form.password.trim() !== '') {
        formData.append('password', this.form.password)
      }

      try {
        const response = await axios.post('/me/update', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }
        })
        console.log('Profil mis à jour :', response.data)
        this.fetchProfil()
        this.fermerModal()
      } catch (error) {
        console.error('Erreur lors de la mise à jour :', error.response?.data || error.message)
      }
    }
  }
}
</script>

<style scoped>
/* Tu peux ajouter une animation douce si tu veux ici */
</style>
