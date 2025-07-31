<template>
  <Navbarsearch />

  <!-- Contenu principal avec marge pour éviter que ce soit caché -->
  <div class="mt-28">

    <!-- Section Filtres -->
    <div class="mb-10 px-5 flex flex-wrap gap-5 justify-center">
      <select
        id="eventCategory"
        v-model="selectedCategory"
        class="block w-64 h-12 rounded-3xl px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="" disabled selected>Catégorie</option>
        <option v-for="category in categories" :key="category.id" :value="category.name">
          {{ category.name }}
        </option>
      </select>

      <select
        id="eventDate"
        v-model="selectedDate"
        class="block w-64 h-12 rounded-3xl px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="" disabled selected>Date</option>
        <option v-for="date in dates" :key="date.id" :value="date.name">
          {{ date.name }}
        </option>
      </select>

      <select
        id="eventLocalisation"
        v-model="selectedLocalisation"
        class="block w-64 h-12 rounded-3xl px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="" disabled selected>Localisation</option>
        <option v-for="localisation in localisations" :key="localisation.id" :value="localisation.name">
          {{ localisation.name }}
        </option>
      </select>
    </div>

    <!-- Section Cartes Événements -->
    <div class="card shadow-lg rounded-2xl ml-18 w-[260px] md:w-[260px]">
      <div
        v-for="(event, index) in events"
        :key="index"
        class="card shadow-lg rounded-2xl overflow-hidden"
      >
        <router-link to="/ticket">
          <img :src="event.image" class="w-full h-48 object-cover" alt="" />
          <div class="content text-center p-4">
            <strong>{{ event.artist }}</strong>
            <p>{{ event.city }}</p>
            <p>{{ event.date }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Section Populaire -->
    <div class="card shadow-lg rounded-2xl ml-18 w-[260px] md:w-[260px]">
      <p class="text-2xl font-bold">Populaire</p>
      <router-link to="#"><p class="text-2xl text-indigo-600">Voir plus</p></router-link>
    </div>

    <!-- Cartes Populaires -->
    <div class="px-5 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="(event, index) in popularEvents"
        :key="index"
        class="card shadow-lg rounded-2xl overflow-hidden"
      >
        <router-link to="/ticket">
          <img :src="event.image" class="w-full h-48 object-cover" alt="" />
          <div class="content text-center p-4">
            <strong>{{ event.artist }}</strong>
            <p>{{ event.city }}</p>
            <p>{{ event.date }}</p>
          </div>
        </router-link>
      </div>
    </div>

  </div>

  <FooterComp />
</template>


<script>
import Navbarsearch from '../components/Navbarsearch.vue'
import FooterComp from '../components/Footer.vue'

export default {
  components: {
    Navbarsearch,
    FooterComp
  },
  data() {
    return {
      selectedCategory: '',
      selectedDate: '',
      selectedLocalisation: '',
      categories: [
        { id: 1, name: 'Concert' },
        { id: 2, name: 'Festival' }
      ],
      dates: [
        { id: 1, name: 'Dec 13' },
        { id: 2, name: 'Dec 14' }
      ],
      localisations: [
        { id: 1, name: 'Boston' },
        { id: 2, name: 'New York' }
      ],
      events: [
        {
          artist: 'Sila Gencoglu',
          city: 'Boston',
          date: 'Dec 18, 22:00',
          image: '../assets/images/one_frame.png'
        },
        {
          artist: 'Justin Bieber',
          city: 'San Francisco',
          date: 'Dec 16, 20:00',
          image: '../assets/images/two_frame.png'
        },
        {
          artist: 'Celine Dion',
          city: 'New York City',
          date: 'Dec 13, 21:00',
          image: '../assets/images/three_frame.png'
        },
        {
          artist: 'Taylor Swift',
          city: 'San Diego',
          date: 'Dec 14, 21:00',
          image: '../assets/images/four_frame.png'
        }
      ],
      popularEvents: [
        {
          artist: 'Sila Gencoglu',
          city: 'Boston',
          date: 'Dec 18, 22:00',
          image: '../assets/images/first_img.png'
        },
        {
          artist: 'Justin Bieber',
          city: 'San Francisco',
          date: 'Dec 16, 20:00',
          image: '../assets/images/two_img.png'
        },
        {
          artist: 'Celine Dion',
          city: 'New York City',
          date: 'Dec 13, 21:00',
          image: '../assets/images/three_img.png'
        },
        {
          artist: 'Taylor Swift',
          city: 'San Diego',
          date: 'Dec 14, 21:00',
          image: '../assets/images/four_img.png'
        }
      ]
    }
  }
}
</script>

    
    

 