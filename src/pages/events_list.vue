<template>
  <DefaultLayoutOrganisateur>
    <p class="text-[#282831] mb-6 text-base sm:text-lg">
      Ici vous pouvez ajouter tous vos évènements
    </p>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      <h2 class="text-[#2F32A6] text-lg sm:text-2xl mb-2 sm:mb-0">Liste des événements</h2>
      <router-link to="/add_events">
        <button class="bg-pink-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Ajouter</span>
        </button>
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-10 text-[#2F32A6]">
      Chargement des événements...
    </div>

    <div v-else-if="data.length === 0" class="text-center py-10">
      <p class="text-[#2F32A6]">Aucun évènement pour le moment. Patientez...</p>
    </div>

    <!-- Affichage sous forme de cartes -->
    <div v-else class="grid gap-6 px-4 md:px-20 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="event in data"
        :key="event.id"
        class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
      >
        <img
          :src="event.affiche_url || 'https://via.placeholder.com/400x200?text=Pas+d%27affiche'"
          :alt="event.titre"
          class="w-full h-48 object-cover"
        />
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h2 class="text-lg font-semibold mb-2 text-[#2F32A6]">{{ event.titre }}</h2>
            <p class="text-sm text-gray-600 mb-2 line-clamp-3">{{ event.description }}</p>
            <p class="text-sm text-gray-700">📍 {{ event.lieu }}</p>
            <p class="text-sm text-gray-700">📅 Du {{ event.date_debut }} au {{ event.date_fin }}</p>
            <p class="text-sm text-gray-700 mt-1">📌 <strong>Statut :</strong> {{ event.statut }}</p>
          </div>

          <div class="flex flex-wrap items-center gap-3 mt-4">
            <router-link
              :to="`/event_show/${event.id}${event.ticket_id ? `?ticket_id=${event.ticket_id}` : ''}`"
              class="text-blue-600 hover:underline text-sm"
            >
              Voir
            </router-link>

            <router-link
              :to="`event_modif/${event.id}${event.ticket_id ? `?ticket_id=${event.ticket_id}` : ''}`"
              class="text-yellow-600 hover:underline text-sm"
            >
              Modifier
            </router-link>

            <button @click="confirmDelete(event.id)" class="text-red-600 hover:underline text-sm">Supprimer</button>

            <button @click="ouvrirModal(event.id)"
              class="text-white bg-pink-500 hover:bg-pink-600 text-sm px-3 py-1 rounded"
            >
              Générer scanneur(s)
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals supprimés pour la simplicité (assume qu'ils existent dans ton code complet) -->

  </DefaultLayoutOrganisateur>
</template>

<script>
import axios from 'axios';
import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue';

export default {
  name: 'EventShow',
  components: { DefaultLayoutOrganisateur },
  data() {
    return {
      data: [],
      loading: true,
      eventId: '',
      nombre: 1,
      showModal: false,
      successModal: false,
      errorModal: false,
      deleteSuccessModal: false,
      deleteErrorModal: false,
      showDeleteConfirmModal: false,
      deleting: false,
      eventIdToDelete: null
    };
  },
  methods: {
    confirmDelete(eventId) {
      this.eventIdToDelete = eventId;
      this.showDeleteConfirmModal = true;
    },
    async fetchEvents() {
      this.loading = true;
      const token = localStorage.getItem('access_token');
      if (!token) {
        this.loading = false;
        console.error("Token manquant");
        return;
      }
      try {
        const response = await axios.get('/organisateur/events', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
    
        console.log("Events list response",response)
        this.data = Array.isArray(response.data.data) ? response.data.data : [];
      } catch (error) {
        console.error('Erreur de récupération des événements :', error);
        //alert("Une erreur s'est produite lors du chargement des événements.");
      } finally {
        this.loading = false;
      }
    },
    async deleteEvent() {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      this.deleting = true;
      try {
        await axios.delete(`/organisateur/events/${this.eventIdToDelete}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        await this.fetchEvents();
        this.showDeleteConfirmModal = false;
        this.deleting = false;
        this.deleteSuccessModal = true;
        setTimeout(() => this.deleteSuccessModal = false, 3000);
      } catch (error) {
        console.error(error);
        this.showDeleteConfirmModal = false;
        this.deleting = false;
        this.deleteErrorModal = true;
        setTimeout(() => this.deleteErrorModal = false, 3000);
      }
    },
    ouvrirModal(eventId) {
      this.eventId = eventId;
      this.nombre = 1;
      this.showModal = true;
    },
    fermerModal() {
      this.showModal = false;
    },
    fermerPopupSucces() {
      this.successModal = false;
    },
    fermerPopupEchec() {
      this.errorModal = false;
    },
    async generateScanneur() {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      try {
        await axios.post(
          `/organisateur/scanneurs/${this.eventId}`,
          { nombre: this.nombre },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.fermerModal();
        this.successModal = true;
        setTimeout(() => this.successModal = false, 3000);
      } catch (error) {
        console.error('Erreur :', error);
        this.fermerModal();
        this.errorModal = true;
        setTimeout(() => this.errorModal = false, 3000);
      }
    },
  },
  async mounted() {
   /*  const checkTokenAndFetch = () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        this.fetchEvents();
      } else {
        console.warn('Token manquant, on réessaye dans 200ms...');
        setTimeout(checkTokenAndFetch, 200);
      }
    };
    checkTokenAndFetch(); */
    await this.fetchEvents();

  }
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
