<template>
    <DefaultLayout>
      <h2 v-if="utilisateur" class="text-[#282831] mb-2 text-xl sm:text-2xl">Salut ! {{ utilisateur }},</h2>
      <p class="text-[#282831] mb-6 text-base sm:text-lg">
        Ici vous pouvez Voir tout vos billets
      </p>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 class="text-[#2F32A6] text-lg sm:text-2xl mb-2 sm:mb-0">Mes billets Passés</h2>
        <!-- <router-link to="/add_tickets">
          <button class="bg-pink-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Ajouter</span>
          </button>
        </router-link> -->
      </div>

      <div v-if="data && data.length === 0" class="text-center py-10">
        Billets en cours de chargement...
        <p class="text-[#2F32A6]">Patientez...</p>
      </div>

      <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full text-sm text-left ">
          <thead class="bg-gray-100 text-gray-700 whitespace-nowrap">
            <tr>
              <th class="px-4 py-2">Type</th>
              <th class="px-4 py-2">Montant</th>
              <th class="px-4 py-2">Qr_code</th>
              <th class="px-4 py-2">Date de début</th>
              <th class="px-4 py-2">Date de fin</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Mes Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="billet in billets" :key="billet.id" class="border-t">
              <td class="px-4 py-2">{{ billet.montant }}</td>
              <td class="px-4 py-2">{{ billet.montant }}</td>
              <td class="px-4 py-2">{{ billet.qr_code }}</td>
              <td class="px-4 py-2">{{ billet.event.date_debut }}</td>
              <td class="px-4 py-2">{{ billet.event.date_fin }}</td>
              <td class="px-4 py-2">{{ billet.status_scan }}</td>

              <td class="px-4 py-2 flex items-center space-x-2">
                <!-- Voir -->
                <!-- <router-link :to="`/event_show/${event.id}${event.ticket_id ? `?ticket_id=${event.ticket_id}` : ''}`">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </router-link> -->

                <!-- Supprimer -->
                <!-- <button @click="deleteEvent(event.id)" class="text-red-500 hover:text-red-700" title="Supprimer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <h2 class="text-[#2F32A6] text-lg sm:text-2xl mb-6 sm:mb-0">Mes billets en cours</h2>
      <div v-if="passee === 0" class="text-center py-10">
        Billets en cours de chargement...
        <p class="text-[#2F32A6]">Patientez...</p>
      </div>
      <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-100 text-gray-700 whitespace-nowrap">
            <tr>
              <th class="px-4 py-2">Type</th>
              <th class="px-4 py-2">Montant</th>
              <th class="px-4 py-2">Qr_code</th>
              <th class="px-4 py-2">Date de début</th>
              <th class="px-4 py-2">Date de fin</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Mes Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="billet in billets" :key="billet.id" class="border-t">
              <td class="px-4 py-2">{{ billet.montant }}</td>
              <td class="px-4 py-2">{{ billet.montant }}</td>
              <td class="px-4 py-2">{{ billet.qr_code }}</td>
              <td class="px-4 py-2">{{ billet.event.date_debut }}</td>
              <td class="px-4 py-2">{{ billet.event.date_fin }}</td>
              <td class="px-4 py-2">{{ billet.status_scan }}</td>

              <td class="px-4 py-2 flex items-center space-x-2">
                <!-- Voir -->
                <!-- <router-link :to="`/event_show/${event.id}${event.ticket_id ? `?ticket_id=${event.ticket_id}` : ''}`">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </router-link> -->

                <!-- Supprimer -->
                <!-- <button @click="deleteEvent(event.id)" class="text-red-500 hover:text-red-700" title="Supprimer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  </template>
  
  <script>
  import axios from 'axios'
  import DefaultLayout from '../pages/DefaultLayout.vue'
  
  export default {
    name: 'MyTickets',
    components: {
      DefaultLayout
    },
    data() {
      return {
        billets: null,
        loading: true,
        utilisateur:null,
      }
    },
    methods:{
      async fetchbillets(){
        const options = {
        method: 'GET',
        url: '/billet/userIndex',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      };
      try {
        const { data } = await axios.request(options);
        console.log(data);
        this.billets = data.a_venir.data;
        console.log(this.billets);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchuserconnecte(){
      const options = {
            method: 'GET',
            url: '/auth/me',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          };
          try {
            const { data } = await axios.request(options);
            console.log(data);
            this.utilisateur = data.user.nom;
            console.log(this.utilisateur)
          } catch (error) {
            console.error(error);
          }
    },
    },
    mounted(){
      this.fetchbillets(),
      this.fetchuserconnecte()
    },
      

      }

  </script>
  