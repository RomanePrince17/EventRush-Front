<template>
      <DefaultLayoutAdministrateur>
        <h2 class="text-[#282831] mb-2 text-xl sm:text-2xl">Salut ! Sylvie,</h2>
        <p class="text-[#282831] mb-6 text-base sm:text-lg">
          Ici vous pouvez voir la  liste de tout les utilisateurs
        </p>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 class="text-[#2F32A6] text-lg sm:text-2xl mb-2 sm:mb-0">Liste des utilisateurs</h2>
          <router-link to="/add_tickets">
            <button class="bg-pink-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Ajouter</span>
            </button>
          </router-link>
        </div>
        <div v-if="data && data.length === 0" class="text-center py-10">
          Evènements en cours de chargement...
          <p class="text-[#2F32A6]">Patientez...</p>
        </div>
        <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
          <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-100 text-gray-700 whitespace-nowrap">
              <tr>
                <th class="px-4 py-2">Titre</th>
                <th class="px-4 py-2">Description</th>
                <th class="px-4 py-2">Date de début</th>
                <th class="px-4 py-2">Date de fin</th>
                <th class="px-4 py-2">Lieu</th>
                <th class="px-4 py-2">Statut</th>
                <th class="px-4 py-2">Mes Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in data" :key="event.id" class="border-t">
                <td class="px-4 py-2">{{ event.titre }}</td>
                <td class="px-4 py-2">{{ event.description }}</td>
                <td class="px-4 py-2">{{ event.date_debut }}</td>
                <td class="px-4 py-2">{{ event.date_fin }}</td>
                <td class="px-4 py-2">{{ event.lieu }}</td>
                <td class="px-4 py-2">{{ event.statut }}</td>
                <td class="px-4 py-2 flex items-center space-x-2">
                  <!-- Voir -->
                  <router-link to="/profil" class="text-blue-500 hover:text-blue-700" title="Voir">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </router-link>
  
                  <!-- Modifier -->
                  <router-link to="/profil" class="text-yellow-500 hover:text-yellow-600" title="Modifier">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487a2.1 2.1 0 113.001 2.94L7.5 19.793l-4.5 1.5 1.5-4.5 12.362-12.306z" />
                    </svg>
                  </router-link>
  
                  <!-- Supprimer -->
                  <button @click="deleteEvent(event.id)" class="text-red-500 hover:text-red-700" title="Supprimer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DefaultLayoutAdministrateur>
  </template>
  
  <script>
import axios from 'axios';
import DefaultLayoutAdministrateur from './DefaultLayoutAdministrateur.vue';
  
  export default {
    name: 'SouscriptionsList',
    components: {
      DefaultLayoutAdministrateur
    },
    data() {
      return {
        data: []
      };
    },
    methods: {
      async fetchEvents() {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('Token non trouvé. Veuillez vous reconnecter.');
          return;
        }
        try {
          const response = await axios.get(
            '/organisateur/events',
            {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          );
          this.data = response.data.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des événements :', error);
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
      this.fetchEvents();
    }
  };
  </script>
  