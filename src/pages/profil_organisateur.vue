<template>
  <div>
    <DefaultLayoutOrganisateur>
      <h2 class="text-[#2F32A6] text-center text-3xl mb-6">Mon Profil</h2>

      <div class="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <!-- Avatar -->
        <div class="flex justify-center mb-6">
          <img 
            :src="profil.avatar ? profil.avatar + '?t=' + Date.now() : ''"
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

      <!-- ✅ Modal Modifier Profil -->
      <div
        v-if="modalOuvert"
        class="fixed inset-0 flex px-5 items-center justify-center bg-transparent backdrop-blur-md z-50"
      >
        <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
          <button
            @click="fermerModal"
            class="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-2xl font-bold"
          >
            &times;
          </button>

          <h3 class="text-xl font-semibold text-center mb-4 text-[#2F32A6]">Modifier le Profil</h3>

          <form @submit.prevent="enregistrerProfil">
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-1">Nom</label>
              <input v-model="form.nom" type="text" class="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-1">Email</label>
              <input v-model="form.email" type="email" class="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-1">Avatar (image)</label>
              <input ref="avatarInput" type="file" accept="image/*" class="w-full border border-gray-300 rounded px-3 py-2" @change="onFileChange" />
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
              <button type="submit" class="bg-[#2F32A6] text-white px-4 py-2 rounded hover:bg-[#1e2090] transition">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- ✅ Modal Succès -->
      <div
        v-if="successModal"
        class="fixed inset-0 flex px-5 items-center justify-center bg-transparent backdrop-blur-md z-50"
      >
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
          <h2 class="text-2xl font-bold mb-4 text-green-600">✅ Profil mis à jour !</h2>
          <p class="text-gray-700 mb-6">Les informations ont été enregistrées avec succès.</p>
          <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" @click="successModal = false">
            Fermer
          </button>
        </div>
      </div>

      <!-- ❌ Modal Échec -->
      <div
        v-if="errorModal"
        class="fixed inset-0   px-5 flex items-center justify-center bg-transparent backdrop-blur-md z-50"
      >
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
          <h2 class="text-2xl font-bold mb-4 text-red-600">❌ Échec</h2>
          <p class="text-gray-700 mb-6">Une erreur est survenue. Veuillez réessayer.</p>
          <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" @click="errorModal = false">
            Fermer
          </button>
        </div>
      </div>
    </DefaultLayoutOrganisateur>
  </div>
</template>

<script>
import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue'
import axios from 'axios'

export default {
  name: 'AfficherProfilOrganisateur',
  components: { DefaultLayoutOrganisateur },
  data() {
    return {
      profil: {
        nom: '',
        email: '',
        avatar: null,
      },
      modalOuvert: false,
      successModal: false,
      errorModal: false,
      form: {
        nom: '',
        email: '',
        avatar: '',
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
      this.form.avatarFile = e.target.files[0];
    },
    async fetchProfil() {
      try {
        const response = await axios.get('/me', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        this.profil.nom = response.data.nom;
        this.profil.email = response.data.email;
        this.profil.avatar = response.data.avatar ? `${response.data.avatar}` : null;

      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    },
    ouvrirModal() {
      this.form.nom = this.profil.nom;
      this.form.email = this.profil.email;
      this.form.avatar = this.profil.avatar;
      this.form.password = '';
      this.modalOuvert = true;
    },
    fermerModal() {
      this.modalOuvert = false;
    },
    async enregistrerProfil() {
      const formData = new FormData();
      formData.append('nom', this.form.nom);
      formData.append('email', this.form.email);
      if (this.form.avatarFile) {
        formData.append('avatar', this.form.avatarFile); 
      }
      if (this.form.password.trim() !== '') {
        formData.append('password', this.form.password);
      }

      try {
        await axios.post('/me/update', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        this.modalOuvert = false;
        this.successModal = true;
        this.fetchProfil();
        setTimeout(() => {
          this.successModal = false;
        }, 4000);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil :", error);
        this.errorModal = true;
        setTimeout(() => {
          this.errorModal = false;
        }, 4000);
      }
    }
  }
}
</script>

<style scoped>
</style>
