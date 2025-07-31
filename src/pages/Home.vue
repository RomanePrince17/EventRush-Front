<template>
  <div>
    <NavbarComp />

    <!-- Hero Section -->
    <section class="lg:mt-45 mt-30 px-4 md:px-20">
      <div class="flex flex-col md:flex-row items-center relative gap-8">
        <div class="mb-10 md:mb-12">
          <div class="w-full md:w-1/2 text-center md:text-left">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {{ topEvent?.titre  }}
            </h1>
         <!-- Squelettes si topEvent n’est pas encore chargé -->
              <div class="w-full md:w-[500px] mx-auto md:mx-0 space-y-5" v-if="!topEvent">
                <!-- Grand titre -->
                <div class="h-10 w-full bg-gray-300 animate-pulse rounded"></div>

                <!-- Sous-titre -->
                <div class="h-8 w-5/6 bg-gray-300 animate-pulse rounded"></div>

                <!-- Paragraphe : plusieurs lignes longues -->
                <div class="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                <div class="h-4 w-[90%] bg-gray-200 animate-pulse rounded"></div>
                <div class="h-4 w-[85%] bg-gray-200 animate-pulse rounded"></div>
                <div class="h-4 w-[70%] bg-gray-200 animate-pulse rounded mb-4"></div>

                <!-- Faux bouton bien large -->
                <div class="h-12 w-60 bg-gray-400 animate-pulse rounded-lg"></div>
              </div>
            <!-- Contenu réel -->
            <div v-else>
              
              <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                A ne surtout pas manquer!
              </h2>
              <p class="text-gray-500 mb-6">
                {{ topEvent.description }}<br />
              </p>
              <router-link to="/evenement">
                <button class="bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-700 transition">
                  Obtenir un billet
                </button>
              </router-link>
            </div>
          </div>
        </div>
  <!-- Squelette de l’image -->
  

        <!-- Image dynamique -->
        <div class="w-full md:w-1/2 flex justify-center md:justify-end">
            <div
              v-if="!topEvent || !topEvent.affiche_url"
              class="rounded-t-3xl w-full -mt-99 md:-mt-57 max-w-[500px] h-[722px] md:h-[750px] lg:h-[648px] absolute object-cover object-top shadow-2xl"
              >
            </div>
          <img
            v-if="topEvent && topEvent.affiche_url"
            :src="topEvent.affiche_url"
            alt="Image de l'événement le plus populaire"
            class="rounded-t-3xl w-full -mt-99 md:-mt-57 max-w-[500px] h-[722px] md:h-[750px] lg:h-[665px] absolute object-cover object-top shadow-2xl"
            />
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="w-full bg-[#3D3E4E] text-white px-4 md:px-20 min-h-[327px] md:min-h-[200px] py-14 md:py-10">
      <div class="max-w-7xl mx-auto ml-0">
        <h2 class="text-2xl font-semibold mb-6">Trouvez votre concert préféré</h2>
        <div class="flex items-center bg-[#65657A] h-16 rounded-xl px-6 max-w-xl mb-6 hidden md:flex">
          <svg class="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by Artist, Event or Venue"
            class="bg-transparent text-white placeholder-gray-300 w-full focus:outline-none"
          />
        </div>
        <div class="flex flex-wrap gap-3">
          <span class="bg-[#65657A] text-sm px-4 py-2 rounded-full hidden md:block text-gray-300">#Summer</span>
          <span class="bg-[#65657A] text-sm px-4 py-2 rounded-full hidden md:block text-gray-300">#Jazz</span>
          <span class="bg-[#65657A] text-sm px-4 py-2 rounded-full hidden md:block text-gray-300">#TaylorSwift</span>
          <span class="bg-[#65657A] text-sm px-4 py-2 rounded-full hidden md:block text-gray-300">#NewYork</span>
        </div>
      </div>
    </section>

    <!-- À venir -->
    <section class="px-4 md:px-20 py-10">
      <div class="flex justify-between items-center mb-6">
        <h2 class="lg:text-2xl text-xl">À Venir</h2>
        <router-link to="/evenement"><p class="lg:text-2xl text-xl">Voir plus</p></router-link>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <router-link
          v-for="event in events.slice(0, 4)"
          :key="event.id"
          :to="`/evenement/${event.id}${event.ticket_id ? `?ticket_id=${event.ticket_id}` : ''}`"
          class="shadow-lg rounded-2xl overflow-hidden bg-white transition transform hover:scale-105 duration-300 cursor-pointer hover:shadow-xl"
        >
        <img
            :src="event.affiche || '/default-image.png'"
            alt="Image de l'événement"
            class="w-full aspect-square object-cover rounded-t-2xl"
          />
          <div class="text-center m-5">
            <strong class="block text-lg text-[#2F32A6] truncate">{{ event.titre }}</strong>
            <p class="text-gray-600 text-sm">📅 {{ event.date_debut }}</p>
            <p class="text-gray-600 text-sm">📅 {{ event.date_fin }}</p>
            <p class="text-gray-400 text-xs italic">📍 {{ event.localisation }}</p>
          </div>
        </router-link>
        <SkeletonCard v-if="!events.length" v-for="n in 4" :key="'skeleton-upcoming-' + n" />
      </div>
    </section>

    <!-- Populaire -->
    <section class="px-4 md:px-20 py-10">
      <div class="flex justify-between items-center mb-6">
        <h2 class="lg:text-2xl text-xl">Populaire</h2>
        <router-link to="/evenement"><p class="lg:text-2xl text-xl">Voir plus</p></router-link>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <router-link
          v-for="event in popular.slice(0, 4)"
          :key="event.id"
          :to="`/evenement/${event.id}${event.ticket_id ? `?ticket_id=${event.ticket_id}` : ''}`"
          class="shadow-lg rounded-2xl overflow-hidden bg-white transition transform hover:scale-105 duration-300 cursor-pointer hover:shadow-xl"
        >
          <img
            :src=" event.affiche_url"
            alt="Image de l'événement"
            class="w-full aspect-square object-cover rounded-t-2xl"
          />
          <div class="text-center m-5">
            <strong class="block text-lg text-[#2F32A6] truncate">{{ event.titre }}</strong>
            <p class="text-gray-600 text-sm">📅 {{ event.date_debut }}</p>
            <p class="text-gray-600 text-sm">📅 {{ event.date_fin }}</p>
            <p class="text-gray-400 text-xs italic">📍 {{ event.localisation }}</p>
          </div>
        </router-link>
        <SkeletonCard v-if="!popular.length" v-for="n in 4" :key="'skeleton-popular-' + n" />
      </div>
    </section>

    <FooterComp />
  </div>
</template>

<script>
import axios from 'axios';
import FooterComp from '../components/Footer.vue';
import NavbarComp from '../components/Navbar.vue';
import SkeletonCard from '../components/SkeletonCard.vue';

export default {
  name: 'HomePage',
  components: {
    FooterComp,
    NavbarComp,
    SkeletonCard
  },
  data() {
    return {
      events: [],
      popular: [],
      topEvent: null,
          imageLoaded: false // 👈 ici

    };
  },
  created() {
    this.fetchPopular();
  },
  mounted() {
    axios
      .get('/home/upcoming')
      .then(res => {
        let events = [];
        if (Array.isArray(res.data)) {
          events = res.data;
        } else if (res.data && Array.isArray(res.data.data)) {
          events = res.data.data;
        }
        const today = new Date();
        this.events = events.filter(event => {
          if (!event.date_fin) return true;
          return new Date(event.date_fin) >= today;
        });
      })
      .catch(err => {
        console.error('Erreur :', err);
      });
      console.log(this.events); // 👈 vérifie les données

  },
  methods: {
    async fetchPopular() {
      try {
        const { data } = await axios.get('/home/popular', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        const today = new Date();
        this.popular = (data.data || []).filter(event => {
          if (!event.date_fin) return true;
          return new Date(event.date_fin) >= today;
        });
        console.log(this.events); // 👈 vérifie les données

        // Sélectionner l'événement avec le plus de points
        if (this.popular.length) {
          this.topEvent = [...this.popular].sort((a, b) => b.point - a.point)[0];
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
/* Ajoutez vos styles personnalisés ici si besoin */
</style>
