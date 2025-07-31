je veux que le sidebar soit en toogle menu sur mobile  et comme dans le code qui suit sur web: <template>

    <div class="flex flex-col min-h-screen">
      <!-- Navbar -->
      <NavbarSearch class="bg-white h-20 fixed top-0 left-0 right-0 z-50" />
  
  ```
  <div class="flex flex-1 pt-20  bg-[rgba(240,240,242,1)]">
    <!-- SIDEBAR DESKTOP -->
    <aside class="hidden md:block p-4 fixed top-20 left-0 w-1/6 pl-4">
      <ul class="bg-white min-h-[calc(100vh-5rem)] rounded-3xl py-6 px-4">
        <!-- liens -->
        <li class="hover:text-pink-600 mb-6 text-[#3D3D49]">
          <router-link to="" class="hover:no-underline flex gap-4 items-center">
            <img src="../assets/icones/user.png" alt="" />
            <p>Sylvie Van Beek</p>
          </router-link>
        </li>
        <li class="hover:text-pink-600 mb-5 text-[#3D3D49]">
          <router-link to="/Profil" class="hover:no-underline flex gap-4 items-center">
            <img src="../assets/icones/user_icon.png" alt="" />
            <p>Mon Profil</p>
          </router-link>
        </li>
        <li class="hover:text-pink-600 mb-5 text-[#848495]">
          <router-link to="/MyTickets" class="hover:no-underline flex gap-4 items-center">
            <img src="../assets/icones/ticket.png" alt="" />
            <p>Mes Tickets</p>
          </router-link>
        </li>
        <li class="hover:text-pink-600 mb-5 text-[#848495]">
          <router-link to="/Recompense" class="hover:no-underline flex gap-4 items-center">
            <img src="../assets/icones/gift.png" alt="" />
            <p>Carte-cadeau</p>
          </router-link>
        </li>
        <li class="hover:text-pink-600 mb-5 text-[#848495]">
          <router-link to="/Setting" class="hover:no-underline flex gap-4 items-center">
            <img src="../assets/icones/setting.png" alt="" />
            <p>Paramètres</p>
          </router-link>
        </li>
        <li class="hover:text-pink-600 mb-6 text-[#848495]">
          <router-link to="/AidePage" class="hover:no-underline flex gap-4 items-center">
            <img src="../assets/icones/info.png" alt="" />
            <p>Aide</p>
          </router-link>
        </li>
        <li class="hover:text-pink-600 text-[#848495]">
          <router-link to="/login" class="hover:no-underline flex gap-4 items-center">
            <img src="../assets/icones/logout.png" alt="" />
            <p>Déconnexion</p>
          </router-link>
        </li>
      </ul>
    </aside>
  
    <!-- MAIN CONTENT -->
    <main class="w-full md:ml-[16.6667%] p-4 pt-6 h-[calc(100vh-5rem)] mr- overflow-y-auto">
      <div class="bg-white p-6 rounded-3xl shadow-md min-h-full">
        <p class="text-green-500 mb-10 text-center">Bienvenue dans votre espace Utilisateur</p>
        <slot />
      </div>
    </main>
  </div>
  ```
  
    </div>
  </template>
  
  <script>
  import NavbarSearch from '../components/Navbarsearch.vue'
  
  export default {
    name: 'DefaultLayout',
    components: {
      NavbarSearch,
    }
  }
  </script>
  