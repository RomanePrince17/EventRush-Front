<template>
    <div class="flex flex-col min-h-screen">
      <!-- Navbar fixée en haut -->
        <NavbarSearch class=" bg-white  h-20  fixed top-0 left-0 right-0 z-50" />
        <div class="bg-[rgba(240,240,242,1)] mt-5  ">
          <!-- Sidebar fixée à gauche sans fond blanc -->
          <div class="w-1/6 ml-4 pl-7 hidden md:block fixed mb-100">
            <ul class="bg-white min-h-149  mt-24 pl-7 rounded-3xl mb-12 -mt-6 pt-4">
              <li class="mb-20 text-[#3D3D49]"><router-link to="" class="hover:no-underline gap-4 items-center"><img src="../assets/icones/user.png" alt=""><p>Sylvie Van Beek</p></router-link></li>
              <li class="  mb-5 text-[#848495]"><router-link   active-class="text-pink-600 font-semibold"
                to="/dashboard" class="hover:no-underline flex gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
              <p class="hover:text-pink-600">Tableau de bord</p></router-link></li>
              <li class="  mb-5 text-[#848495]"><router-link  active-class="text-pink-600 font-semibold"
                to="/users" class="hover:no-underline flex gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
              <p class="hover:text-pink-600">Utilisateurs</p></router-link></li>
              <li class="mb-1 text-[#3D3D49]  w-43 rounded-md  py-2 text-[#848495]">
                      <button  
                      class="flex gap-3 justify-between  mb-4" @click="toggleTickets">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" -mr-1 size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
                          <router-link ><p class="hover:text-pink-600">Souscriptions</p></router-link>
                          <svg class=" h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                      </button>
                      <div v-if="openTickets" class="dropdown">
                        <router-link   active-class="text-pink-600 font-semibold"
                        to="/souscriptions" class="mb-4 ">
                                  <div class="flex gap-2 mb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                                    <p class="hover:text-pink-600">Liste de tout les souscriptions</p>
                                 </div>    
  
                            </router-link>
                            
                            <div class="flex gap-2">
                              <router-link    active-class="text-pink-600 font-semibold"
                              to="/souscrits" class="flex gap-3 ">
  
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                                  <p class="hover:text-pink-600">Liste de tout les souscrits actifs</p>
                              </router-link>
                            </div>
                      </div>
                  </li>  
                  <li class="hover:text-pink-600 mb-5 text-[#848495]"><router-link   active-class="text-pink-600 font-semibold"
                    to="/Profil_admin" class="hover:no-underline flex gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg><p>Mon Profil</p></router-link></li>
              <li class="hover:text-pink-600 text-[#848495]"><router-link   active-class="text-pink-600 font-semibold"
                to="/login" class="hover:no-underline flex gap-4 items-center"><img src="../assets/icones/logout.png" alt=""><p>Déconnexion</p></router-link></li>
            </ul>
            <div v-if="!open" class="px-6 pb-4 text-gray-700 mb-4">
              {{ open }}
           </div>
          </div>
          
    
          <!-- Contenu principal -->
          <div class="md:ml-[16.6667%]  w-full md:w-5/6 bg-[rgba(240,240,242,1)] min-h-screen md:p-12 p-3  pt-20 md:pt-24">
            <div class="bg-white p-6 rounded-3xl shadow-md min-h-[calc(100vh-6rem)]">
              <br><br>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <script>
    import NavbarSearch from '../components/Navbarsearch.vue'
    
    export default {
      name: 'DefaultLayoutAdministrateur',
      components: {
        NavbarSearch,
      },
      data() {
          return {
          openEvents: false,
          openTickets: false
        };
        
      },
      methods: {
        toggleEvents() {
          this.openEvents = !this.openEvents;
          if (this.openEvents) this.openTickets = false;
        },
        toggleTickets() {
          this.openTickets = !this.openTickets;
          if (this.openTickets) this.openEvents = false;
        }
      
      
    }
   }
    </script>
   