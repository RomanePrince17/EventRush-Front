<template>
    <DefaultLayoutAdministrateur>
      <h2 v-if="connecte" class="text-[#282831] mb-2 text-xl sm:text-2xl">
        Salut ! {{ connecte.nom }},
      </h2>
      <p class="text-[#282831] mb-6 text-base sm:text-lg">
        Ici vous pouvez voir la liste de tous les utilisateurs
      </p>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
        <h2 class="text-[#2F32A6] text-lg sm:text-2xl">Liste des utilisateurs</h2>
        <router-link to="/add_tickets">
          <button class="bg-pink-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 w-full sm:w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Ajouter</span>
          </button>
        </router-link>
      </div>
      <!-- Clients -->
      <div v-if="client">
        <h3 class="text-xl mt-6 mb-2">Clients</h3>
        <div class="overflow-x-auto rounded-lg border border-gray-200">
          <table class="min-w-full text-sm text-left whitespace-nowrap">
            <thead class="bg-gray-100 text-gray-700">
              <tr>
                <th class="px-4 py-2">Nom</th>
                <th class="px-4 py-2">Email</th>
                <th class="px-4 py-2">Créé le</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in client" :key="user.id" class="border-t">
                <td class="px-4 py-2">{{ user.nom }}</td>
                <td class="px-4 py-2">{{ user.email }}</td>
                <td class="px-4 py-2">{{ user.created_at }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Organisateurs -->
      <div v-if="organisateurs">
        <h3 class="text-xl mt-6 mb-2">Organisateurs</h3>
        <div class="overflow-x-auto rounded-lg border border-gray-200 mb-6">
          <table class="min-w-full text-sm text-left whitespace-nowrap">
            <thead class="bg-gray-100 text-gray-700">
              <tr>
                <th class="px-4 py-2">Nom</th>
                <th class="px-4 py-2">Email</th>
                <th class="px-4 py-2">Créé le</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in organisateurs" :key="user.id" class="border-t">
                <td class="px-4 py-2">{{ user.nom }}</td>
                <td class="px-4 py-2">{{ user.email }}</td>
                <td class="px-4 py-2">{{ user.password }}</td>
                <td class="px-4 py-2">{{ user.created_at }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayoutAdministrateur>
</template>

  
  <script>
import axios from 'axios';
import DefaultLayoutAdministrateur from './DefaultLayoutAdministrateur.vue';
  
  export default {
    name: 'UsersList',
    components: {
      DefaultLayoutAdministrateur
    },
    data() {
      return {
        data: [],
        client:[],
        organisateur:[],
        Utilisateurs:[],
        connecte: null,
      };
    },
    methods: {
      async fetchConnnected(){
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('Token non trouvé. Veuillez vous reconnecter.');
          return;
        }
        const options = {
            method: 'GET',
            url: '/auth/me',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            }
          };

          try {
            const { data } = await axios.request(options);
            console.log(data);
            this.connecte = data.data;
            console.log('utilisateur connecté:', this.connecte)
          } catch (error) {
            console.error(error);
          }      
      },
     async fetchUser(){
      const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('Token non trouvé. Veuillez vous reconnecter.');
          return;
        }
      const options = {
          method: 'GET',
          url: '/admin/user/index',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        };

        try {
          const { data } = await axios.request(options);
          console.log(data);
          const allUsers = data.utilisateurs || [];
          this.organisateurs = allUsers.filter(user => user.role === 'organisateur');
          console.log("Organisateurs :", this.organisateurs);

          this.client = allUsers.filter(user => user.role === 'client');
          console.log("Clients :", this.client);

        } catch (error) {
          console.error(error);
        }
  

     },
       
      async deleteEvent(id) {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('Token non trouvé. Veuillez vous reconnecter.');
          return;
        }
  
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
          try {
            await axios.delete(`https://gestevent-main-ai7iif.laravel.cloud/api/events/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            this.data = this.data.filter(event => event.id !== id);
          } catch (error) {
            console.error('Erreur lors de la suppression de l\'événement :', error);
          }
        }
      }
    },
    mounted() {
      this.fetchUser();
      this.fetchConnnected();
    }
  };
  </script>
  