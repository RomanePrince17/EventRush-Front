<template>
  <Navbar />
  <div class="lg:mt-38 mt-28">
    <!-- Section Filtres -->
    <div class="ml-7 md:mb-10 px-5 flex flex-wrap md:gap-30 gap-6 md:ml-16">
      
      <!-- Recherche par titre -->
      <input
        v-model="searchTitle"
        @input="searchByTitle"
        type="text"
        placeholder="Rechercher un événement"
        class="block w-64 h-12 rounded-xl px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />

      <!-- Recherche par date -->
      <input
        v-model="searchDate"
        @input="searchByDate"
        type="date"
        placeholder="Rechercher une Date"
        class="block w-64 h-12 rounded-xl px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />

      <!-- Recherche par lieu -->
      <input
        v-model="searchLocation"
        @input="searchByLocation"
        type="text"
        placeholder="Rechercher un lieu"
        class="block w-64 h-12 rounded-xl px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <!-- Section Cartes -->
    <section>
      <div class="container">
        <div v-if="events.length" class="grid grid-cols-1 px-19 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <router-link
            :to="`/evenement/${event.id}${event.ticket_id ? `?ticket_id=${event.ticket_id}` : ''}`"
            v-for="event in events"
            :key="event.id"
            class="bg-white md:w-75 w-70 rounded-lg shadow-lg h-full hover:bg-gray-100 transform hover:scale-105 transition duration-300 ease-in-out flex flex-col justify-between h-[430px]"
          >
            <!-- Image -->
            <div class="relative h-56 w-full overflow-hidden">
              <img
                v-if="event.affiche_url"
                :src="event.affiche_url"
                alt="Image de l'événement"
                class="w-full h-full object-cover transition duration-300 hover:scale-110"
              />
              <!-- Badge catégorie -->
              
            </div>

            <!-- Contenu -->
            <div class="p-4 flex-1 flex flex-col justify-between">
              <h3 v-if="event.titre" class="text-lg font-bold text-gray-800 mb-2 truncate text-center">
                {{ event.titre }}
              </h3>
              <p v-if="event.date_debut" class="text-center text-sm text-gray-500">
                📅 {{ event.date_debut }}
              </p>
              <p v-if="event.lieu" class="text-center text-sm text-gray-400 mt-1">
                📍 {{ event.lieu }}
              </p>
            </div>
          </router-link>
          
        </div>
<!-- Skeleton Cards -->
<div v-else class="grid grid-cols-1 px-12 sm:grid-cols-2 md:grid-cols-4 gap-12">
  <SkeletonCard v-for="n in 4" :key="'skeleton-upcoming-' + n" />
        </div>
        
      </div>
    </section>
  </div>
  <FooterComp />
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import Navbar from '../components/Navbar.vue';
import FooterComp from '../components/Footer.vue';
import SkeletonCard from '../components/SkeletonCard.vue';

export default {
  name: 'ListEvents',
  components: {
    Navbar,
    FooterComp,
    SkeletonCard
  },
  data() {
    return {
      searchTitle: '',
      searchDate: '',
      searchLocation: '',
      events: []
    }
  },
  async mounted() {
    await this.fetchAllEvents();
  },
  methods: {
    async fetchAllEvents() {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('/events', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        this.events = response.data.data;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);
      }
    },

    async searchByTitle() {
      const query = this.searchTitle.trim();
      if (!query) return this.fetchAllEvents();
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`/home/search/tire?query=${query}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        this.events = response.data.data || [];
      } catch (error) {
        console.error('Erreur recherche par titre :', error.response?.data || error);
      }
    },

    async searchByDate() {
      const query = this.searchDate.trim();
      if (!query) return this.fetchAllEvents();

      const formattedDate = dayjs(query).format('YYYY-MM-DD');
      console.log("Date formatée envoyée :", formattedDate);

      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`/home/search/date?query=${formattedDate}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        this.events = response.data.data || [];
      } catch (error) {
        console.error('Erreur recherche par date :', error.response?.data || error);
      }
    },

    async searchByLocation() {
      const query = this.searchLocation.trim();
      if (!query) return this.fetchAllEvents();

      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`/home/search/lieu?query=${query}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        this.events = response.data.data || [];
      } catch (error) {
        console.error('Erreur recherche par lieu :', error.response?.data || error);
      }
    }
  }
}
</script>
