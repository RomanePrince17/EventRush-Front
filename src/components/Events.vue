<template>
    <section class="py-10 px-4 md:px-8 bg-gray-50">
      <h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        Événements à venir
      </h2>
  
      <div v-if="loading" class="text-center text-gray-500">Chargement...</div>
  
      <div v-else-if="events.length === 0" class="text-center text-gray-500">
        Aucun événement trouvé.
      </div>
  
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="event in events"
          :key="event.id"
          class="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300"
        >
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ event.nom }}</h3>
          <p class="text-sm text-gray-500 mb-1">
            {{ formatDate(event.date) }} - {{ event.lieu }}
          </p>
          <p class="text-gray-600 text-sm">{{ event.description }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "EventsList",
    data() {
      return {
        events: [],
        loading: true,
      };
    },
    mounted() {
      this.fetchEvents();
    },
    methods: {
      async fetchEvents() {
        try {
          const response = await fetch("https://gestevent-main-ai7iif.laravel.cloud/api/events");
          const data = await response.json();
          this.events = data.data || data; // adapte si besoin selon le format exact
        } catch (error) {
          console.error("Erreur lors du chargement des événements :", error);
        } finally {
          this.loading = false;
        }
      },
      formatDate(dateStr) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('fr-FR', options);
      },
    },
  };
  </script>