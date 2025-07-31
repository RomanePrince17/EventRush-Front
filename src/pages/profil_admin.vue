<template>
    <div>
      <DefaultLayoutAdministrateur>
        <h2 class="text-[#2F32A6] text-center text-3xl mb-6">Mon Profil</h2>
  
        <div class="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          <!-- Avatar -->
          <div class="flex justify-center mb-6">
            <img
              :src="profil.avatarUrl"
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
            <h3 class="text-gray-700  font-semibold">Email : {{ profil.email }}</h3>
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
  
        <!-- Modal -->
        <div
          v-if="modalOuvert"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <!-- Bouton Fermer -->
            <button
              @click="fermerModal"
              class="absolute top-2 right-3 text-white hover:text-red-600 text-2xl fon"
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
                <label class="block text-gray-700 font-semibold mb-1">Avatar (URL)</label>
                <input
                  v-model="form.avatar"
                  type="text"
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
      </DefaultLayoutAdministrateur>
    </div>
  </template>
  
  <script>
  import DefaultLayoutAdministrateur from './DefaultLayoutAdministrateur.vue'
  import axios from 'axios'
  
  export default {
    name: 'ProfilAdministrateur',
    components: {
      DefaultLayoutAdministrateur,
    },
    data() {
      return {
        profil: {
          nom: '',
          email: '',
          avatarUrl: ''
        },
        modalOuvert: false,
        form: {
          nom: '',
          email: '',
          avatar: '',
          password: ''
        }
      }
    },
    mounted() {
      this.fetchProfil()
    },
    methods: {
      async fetchProfil() {
          try {
            const response = await axios.get('/me', {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
            });

            console.log('Données utilisateur :', response.data);

            this.profil.nom = response.data.nom;
            this.profil.email = response.data.email;
            this.profil.avatarUrl = response.data.avatar_url;

          } catch (error) {
            if (error.response) {
              console.error("Erreur API", error.response.status, error.response.data);
            } else {
              console.error("Erreur réseau", error.message);
            }
          }
        },
      ouvrirModal() {
        this.form.nom = this.profil.nom
        this.form.email = this.profil.email
        this.form.avatar = this.profil.avatarUrl
        this.form.password = ''
        this.modalOuvert = true
      },
      fermerModal() {
        this.modalOuvert = false
      },
      async enregistrerProfil() {
        const form = new FormData();
        form.append('nom', this.form.nom);
        form.append('email', this.form.email);
        form.append('avatar', this.form.avatar);

        // Ajout du mot de passe seulement s’il est fourni
        if (this.form.password.trim() !== '') {
          form.append('password', this.form.password);
        }

        try {
          const response = await axios.post('/me/update', form, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          });

          console.log('Profil mis à jour :', response.data);

          // Actualiser l'affichage
          this.fetchProfil();
          this.fermerModal();
        } catch (error) {
          if (error.response) {
            console.error("Erreur API :", error.response.status, error.response.data);
          } else {
            console.error("Erreur réseau :", error.message);
          }
        }
         }
        }}
        
            
          
  </script>
  
  <style scoped>
  </style>
  