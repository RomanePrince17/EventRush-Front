<template>
      <NavbarSearch  />

    
    <div class="flex flex-col min-h-screen ">
    <!-- Navbar -->
    


    <!-- Mobile Sidebar Menu -->
  

    <div class="flex flex-1 pt-20 bg-[rgba(240,240,242,1)]">
      <!-- SIDEBAR DESKTOP -->
      <aside class="hidden md:block p-4 fixed top-20 left-0 w-1/6 pl-4">
        <ul class="bg-white min-h-[calc(100vh-5rem)] rounded-3xl py-6 px-4">
          <li class="hover:text-pink-600 mb-6 text-[#3D3D49]">
            <router-link to="" class="flex gap-4 items-center" >
              <img src="../assets/icones/user.png" alt="" />
              <p>Sylvie Van Beek</p>
            </router-link>
          </li>
          <li class="hover:text-pink-600 mb-5 text-[#3D3D49]">
            <router-link to="/Profil"  active-class="text-pink-600 font-semibold"
            class="flex gap-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>

              <p>Mon Profil</p>
            </router-link>
          </li>
          <li class="hover:text-pink-600 mb-5 text-[#848495]">
            <router-link   active-class="text-pink-600 font-semibold"
            to="/MyTickets" class="flex gap-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" /></svg>
              <p>Mes Billets</p>
            </router-link>
          </li>
          <li class="hover:text-pink-600 mb-5 text-[#848495]">
            <router-link    active-class="text-pink-600 font-semibold"
            to="/Recompense" class="flex gap-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>
              <p>Carte-cadeau</p>
            </router-link>
          </li>
          <li class="hover:text-pink-600 mb-5 text-[#848495]">
            <router-link   active-class="text-pink-600 font-semibold"
            to="/Setting" class="flex gap-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
              <p>Paramètres</p>
            </router-link>
          </li>
          <li class="hover:text-pink-600 mb-6 text-[#848495]">
            <router-link   active-class="text-pink-600 font-semibold"
            to="/AidePage" class="flex gap-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
              <p>Aide</p>
            </router-link>
          </li>
          <li class="hover:text-pink-600 text-[#848495]">
            <router-link   active-class="text-pink-600 font-semibold"
            to="/login" class="flex gap-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" /></svg>
              <p>Déconnexion</p>
            </router-link>
          </li>
        </ul>
      </aside>
      
      <!-- MAIN CONTENT -->
      <main class=" w-full md:ml-[16.6667%] p-4 pt-6 h-[calc(100vh-5rem)] overflow-y-auto">
        <div class="bg-white p-6 rounded-3xl shadow-md min-h-full">
          <p class="mb-10 text-lg text-center">Mes billets</p>
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import NavbarSearch from '../components/Navbarsearch.vue';
export default {
  components: { NavbarSearch },
  name: 'DefaultLayout',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
