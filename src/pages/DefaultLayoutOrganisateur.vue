<template>
  <div class="flex flex-col  h-full">
    <!-- Navbar fixée en haut -->
    <NavbarSearch class="bg-white h-20 fixed top-0 left-0 right-0 z-50" />

    <div class="bg-[rgba(240,240,242,1)] mt-5">
      <!-- Sidebar -->
      <div class="w-1/6 ml-4 pl-7 hidden md:block fixed mb-100">
        <ul class="bg-white min-h-149 mt-24 pl-7 rounded-3xl mb-12 -mt-6 pt-4">
          <li class="mb-20 text-[#3D3D49]">
            <router-link to="" class="hover:no-underline gap-4 items-center">
              <!-- Bloc Avatar avec Spinner -->
              <div class="relative inline-block w-24 h-24">
                <!-- Spinner rose dans le coin -->
                <div
                  v-if="isLoadingAvatar"
                  class="absolute top-0 right-0 z-10 bg-white rounded-full p-1 shadow"
                >
                  <svg
                    class="animate-spin h-5 w-5 text-pink-600"
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
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                </div>

                <!-- Avatar -->
                <img
                  v-if="utilisateur && utilisateur.avatar"
                  :src="utilisateur.avatar + '?t=' + Date.now()"
                  alt="Avatar"
                  class="w-24 h-24 rounded-full object-cover border border-gray-300"
                  @load="isLoadingAvatar = false"
                  @error="isLoadingAvatar = false"
                  :class="{ 'opacity-50': isLoadingAvatar }"
                />

               
         <!-- Point vert -->
         <span
                v-if="utilisateur && utilisateur.est_en_ligne"
                class="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
              >
                <div class="flex items-center gap-1 ml-6">
                  <span class="flex gap-1">
                    <div>En</div>
                    <div>ligne</div>
                  </span>
                </div>
              </span>
            </div>
              

              <!-- Nom + Statut -->
              <div v-if="utilisateur" class="mt-2 text-xl text-[#3D3D49]">
                <p>{{ utilisateur.nom }}</p>
                
              </div>
            </router-link></li>
            <li class="hover:text-pink-600 mb-5 text-[#848495]"><router-link   active-class="text-pink-600 font-semibold"
                  to="/tableau_org" class="hover:no-underline flex gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg><p>Tableau de bord</p></router-link></li>
                    <li class="hover:text-pink-600 mb-5 text-[#848495]"><router-link   active-class="text-pink-600 font-semibold"
                  to="/scanneur" class="hover:no-underline flex gap-4 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                  <p>Mes Scanneurs</p></router-link></li>
            <li class=" text-[#3D3D49]  justify-center w-43 rounded-md  px-2 py-2 text-[#848495]">
                    <button class="flex mb-2 gap-3 mb-4 " @click="toggleEvents">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                            <p class="hover:text-pink-600">Évènements</p>
                            <svg class="-mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        <div v-if="openEvents" class="dropdown">
                          <router-link   active-class="text-pink-600 font-semibold"
                          to="add_events">
                                <div class="flex gap-2 mb-5">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                  <p  class="hover:text-pink-600">Ajouter</p>
                               </div>    

                          </router-link>
                          
                          <div class="flex gap-2">
                            <router-link    active-class="text-pink-600 font-semibold"
                            to="/list_events" class=" flex gap-3">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                                <p class="hover:text-pink-600">Liste</p>
                            </router-link>

                          </div>                  

                        </div>
                        
            </li>
            <li class="mb-1 text-[#3D3D49]  justify-center w-43 rounded-md  px-2 py-2 text-[#848495]">
                    <button  
                    class="  flex gap-3 justify-between  mb-4" @click="toggleTickets">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" /></svg>

                        <router-link ><p class="hover:text-pink-600">Billeterie</p></router-link>
                        <svg class="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div v-if="openTickets" class="dropdown">
                      <router-link   active-class="text-pink-600 font-semibold"
                      to="/add_tickets" class="mb-4 ">
                                <div class="flex gap-2 mb-5">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                                  <p class="hover:text-pink-600">Créer un ticket</p>
                               </div>    

                          </router-link>
                          
                          <div class="flex gap-2">
                            <router-link    active-class="text-pink-600 font-semibold"
                            to="/list_tickets" class="flex gap-3 ">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                                <p class="hover:text-pink-600">Liste de tous les tickets</p>
                            </router-link>
                          </div>
                    </div>
                </li>  
                <li class="hover:text-pink-600 mb-5 text-[#848495]"><router-link   active-class="text-pink-600 font-semibold"
                  to="/billets_org" class="hover:no-underline flex gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg><p>Mes Billets</p></router-link></li>
                    <li class="hover:text-pink-600 mb-5 text-[#848495]"><router-link   active-class="text-pink-600 font-semibold"
                  to="/Profil_organisateur" class="hover:no-underline flex gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg><p>Mon Profil</p></router-link></li>
            
             <!-- Lien Notifications avec badge -->
          <li class="mb-5 text-[#848495] relative">
            <router-link
              to="/notification"
              class="hover:no-underline flex gap-4 items-center relative"
              @click.native="markNotificationsAsRead"
              active-class="text-pink-600 font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke-width="1.5"
                   stroke="currentColor"
                   class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
              </svg>
              <p class="hover:text-pink-600">Notifications</p>

              <!-- Badge rose -->
              <span v-if="unreadCount > 0"
                    class="absolute -top-1 left-5 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {{ unreadCount }}
              </span>
            </router-link>
          </li>


           <!-- Historique avec badge -->
          <li class="mb-5 text-[#848495] relative">
            <router-link
              to="/historique"
              class="hover:no-underline flex gap-4 items-center relative"
              @click.native="markHistoriqueAsRead"
              active-class="text-pink-600 font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              <p class="hover:text-pink-600">Historique</p>
              <span v-if="historiqueCount > 0" class="absolute -top-1 left-5 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {{ historiqueCount }}
              </span>
            </router-link>
          </li>

            <li class="hover:text-pink-600 text-[#848495]"><router-link   active-class="text-pink-600 font-semibold"
              to="/login" class="hover:no-underline flex gap-4 items-center"><img src="../assets/icones/logout.png" alt=""><p>Déconnexion</p></router-link></li>
        </ul>
      </div>

      <!-- Contenu principal -->
      <div class="md:ml-[16.6667%] w-full md:w-5/6 bg-[rgba(240,240,242,1)] min-h-screen md:p-12 p-3 pt-20 md:pt-24">
        <div class="bg-white p-6 rounded-3xl shadow-md min-h-[calc(100vh-6rem)]">
          <br /><br />
          <h2 v-if="utilisateur" class="text-[#282831] mb-2 text-xl sm:text-2xl">
            Salut ! {{ utilisateur.nom }},
          </h2>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarSearch from '../components/Navbarsearch.vue'
import axios from 'axios'

export default {
  name: 'DefaultLayoutOrganisateur',
  components: { NavbarSearch },
  data() {
    return {
      openEvents: false,
      openTickets: false,
      notifications: [],
      historique: [],
      utilisateur: null,
      isLoadingAvatar: true, // pour gérer le spinner
    };
  },
  computed: {
    unreadCount() {
      return this.notifications.filter(n => !n.read_at).length;
    },
    historiqueCount() {
      return this.historique.filter(item => !item.consulté).length;
    }
  },
  methods: {
    toggleEvents() {
      this.openEvents = !this.openEvents;
      if (this.openEvents) this.openTickets = false;
    },
    toggleTickets() {
      this.openTickets = !this.openTickets;
      if (this.openTickets) this.openEvents = false;
    },
    async notif() {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('/notifications', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        this.notifications = response.data.notifications;
      } catch (error) {
        console.error('Erreur notifications :', error.response?.data || error);
      }
    },
    markNotificationsAsRead() {
      this.notifications = this.notifications.map(n => ({
        ...n,
        read_at: new Date()
      }));
    },
    async loadHistorique() {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('/souscriptions/history', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        this.historique = response.data;
      } catch (error) {
        console.error('Erreur historique :', error.response?.data || error);
      }
    },
    async fetchProfil() {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('/me', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        this.utilisateur = {
          ...response.data,
          est_en_ligne: true
        };
      } catch (error) {
        console.error('Erreur profil :', error);
      }
    },
    markHistoriqueAsRead() {
      this.historique = this.historique.map(h => ({
        ...h,
        consulté: true
      }));
    }
  },
  mounted() {
    this.notif();
    this.loadHistorique();
    this.fetchProfil();
  }
}
</script>
