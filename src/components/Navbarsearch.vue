<template>
  <div>
    <nav class="p-4 pt-8 bg-white lg:hidden h-20 fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
      <!-- Hamburger icon (toggle menu gauche) -->
      <div @click="toggleMenu" class="cursor-pointer">
        <svg class="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>

      <!-- Logo -->
      <div class="text-pink-600 text-2xl font-extrabold tracking-tight">
        EventRush
      </div>

      <!-- Nouveau toggle menu droit -->
      <div @click="toggleRightMenu" class="cursor-pointer">
        <svg class="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <!-- Exemple d'icône différente, ici une icône "user" -->
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    </nav>

    <!-- Desktop nav -->
    <nav class="hidden lg:flex  justify-between items-center bg-white p-4 fixed top-0 left-0 right-0 z-50 h-20 shadow-sm">
      <!-- Ton contenu desktop ici, inchangé -->
      <div class="flex gap-28 justify-between items-center">
        <!-- Logo -->
        <div class="text-pink-600 text-2xl font-extrabold tracking-tight  lg:ml-16">
          EventRush
        </div>
        <div class=" items-center hidden gap-x-2 lg:flex pb-1 ">
              <div class="  w-full max-w-sm min-w-[200px]">
                  <div class="relative">              
                                           
                      <input type="text" class="w-full pl-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." />
                          <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                          </svg>
                  </div>
                          
              </div>
        </div>
        

                  
        <!-- Hamburger icon -->
        <div class="lg:hidden " @click="toggleMenu">
          <svg class="w-8 h-8 text-gray-800 cursor-pointer" fill="none" stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </div>
        <!-- Desktop nav -->
        <ul class="hidden lg:flex space-x-6 items-center">   
          <li><router-link active-class="text-pink-600 font-semibold" to="/" class=" flex gap-2 hover:text-pink-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
            Accueil</router-link></li>
          <li><router-link active-class="text-pink-600 font-semibold" to="/ListEvents" class=" flex gap-2 hover:text-pink-600 transition">
            <svg class="w-6 h-6  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/></svg>
            Evènements</router-link></li>
          <li><router-link active-class="text-pink-600 font-semibold" to="/organisateurs" class=" flex gap-2 hover:text-pink-600 transition">
            <svg class="w-6 h-6 0 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
            Organisateur</router-link></li>
          <li><router-link  active-class="text-pink-600 font-semibold" to="/contact" class=" flex gap-2  hover:text-pink-600 transition">
              <svg class="w-6 h-6  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"/></svg>
            Contact</router-link></li>
            <li><router-link  active-class="text-pink-600 font-semibold" to="/ma_souscription" class=" flex gap-2  hover:text-pink-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>

           souscription</router-link></li>
          <li>
            <router-link active-class="text-pink-600 font-semibold" to="/">
              <button class=" flex gap-2 bg-pink-600 text-white px-4 mr-16 py-2 rounded-xl ">
                    <svg class="w-6 h-6  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
                Déconnexion
              </button>
            </router-link>
          </li>
        </ul>
        </div>
        
      <!-- ... -->
    </nav>

    <!-- Menu mobile gauche (déjà existant) -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-lg rounded-b-xl p-6 z-40">
        <ul class="flex flex-col space-y-4 text-lg font-medium">
              <li><router-link active-class="text-pink-600 font-semibold"to="/" class="flex gap-2" @click="closeMenu">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/></svg>
                Accueil</router-link></li>
              <li><router-link active-class="text-pink-600 font-semibold" class="flex gap-2" to="/ListEvents" @click="closeMenu">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 12A2.5 2.5 0 0 1 21 9.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 1 0 5V17a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2.5a2.5 2.5 0 0 1-2.5-2.5Z"/></svg>
                Evènements</router-link></li>
              <li><router-link active-class="text-pink-600 font-semibold" class="flex gap-2" to="/organisateurs" @click="closeMenu">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
                Organisateur</router-link></li>
              <li><router-link active-class="text-pink-600 font-semibold" class="flex gap-2" to="/contact" @click="closeMenu">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"/></svg>
                Contact</router-link></li>
                <li><router-link active-class="text-pink-600 font-semibold" class="flex gap-2" to="/ma_souscription" @click="closeMenu">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>

                Souscriptions</router-link></li>
              <li>
                <router-link active-class="text-pink-600 font-semibold" to="/login" @click="closeMenu">
                  <button class="w-full  bg-pink-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                    Profile
                  </button>
                </router-link>
              </li>
            </ul>
      </div>
    </transition>

    <!-- Nouveau menu mobile droite (overlay à droite) -->
    <transition name="slide-right">
      <div v-if="isRightMenuOpen" class="fixed top-20 right-0 h-[calc(100vh-5rem)] w-64 bg-white shadow-lg z-50 p-6 flex flex-col">
        <button @click="closeRightMenu" class="self-end mb-4 text-gray-600 hover:text-pink-600">
          ✕
        </button>
        <ul class="bg-white min-h-149   rounded-3xl">
          
            <li class=" text-[#3D3D49]"><router-link to="" class="hover:no-underline gap-2 items-center">
              <div class="relative flex inline-block w-24 h-24">
                  <!-- Spinner pendant le chargement -->
                  <div v-if="isLoadingAvatar" class="absolute inset-0 flex items-center justify-center">
                    <svg class="animate-spin h-8 w-8 text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                              stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  </div>

                  <!-- Image de l'utilisateur -->
                  <img
                    v-if="utilisateur"
                    :src="utilisateur.avatar ? utilisateur.avatar + '?t=' + Date.now() : ''"
                    alt="Avatar"
                    class="w-24 h-24 rounded-full object-cover border border-gray-300"
                    @load="isLoadingAvatar = false"
                    @error="isLoadingAvatar = false"
                    :class="{ 'invisible': isLoadingAvatar }"
                  />
                </div>
              <!-- Nom + Statut -->
              <div v-if="utilisateur" class="mt-2 text-xl text-[#3D3D49]">
                <p>{{ utilisateur.nom }}</p>
                
              </div></router-link></li>
              <li class="hover:text-pink-600 mb-5 text-[#848495]"><router-link   active-class="text-pink-600 font-semibold"
                  to="/tableau_org" class="hover:no-underline flex gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg><p>Tableau de bord</p></router-link></li>
            <li class=" text-[#3D3D49]  justify-center w-43 rounded-md  px-2 py-2 text-[#848495]">
                    <button class="flex mb-2 gap-3 mb-4  " @click="toggleEvents">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>

                            <p class="hover:text-pink-600 ">Évènements</p>
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
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NavbarSearch',
  data() {
    return {
      isMenuOpen: false,
      isRightMenuOpen: false,
      openEvents: false,
      openTickets: false,
      utilisateur:null,
      isLoadingAvatar: true, // <-- nouveau

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
    },
    toggleMenu() {
      // Si on ouvre gauche, on ferme droite
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) this.isRightMenuOpen = false;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    toggleRightMenu() {
      // Si on ouvre droite, on ferme gauche
      this.isRightMenuOpen = !this.isRightMenuOpen;
      if (this.isRightMenuOpen) this.isMenuOpen = false;
    },
    closeRightMenu() {
      this.isRightMenuOpen = false;
    },
    async fetchProfil(){
      const token = localStorage.getItem('access_token');
      const options = {
        method: 'GET',
        url: '/me',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      try {
        const { data } = await axios.request(options);
        console.log(token)
        console.log(data);
        this.utilisateur = data
        console.log(this.utilisateur)
        this.utilisateur = {
  ...data,
  est_en_ligne: true // À remplacer par la vraie donnée dès que possible
};
      } catch (error) {
        console.error(error);
      }

    },
    
  
  },
  mounted(){
    this. fetchProfil();
   }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Animation slide pour menu droit */
.slide-right-enter-active {
  transition: transform 0.3s ease;
}
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>