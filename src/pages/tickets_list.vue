<template>
  <DefaultLayoutOrganisateur>
    <p class="text-[#282831] mb-6 text-base sm:text-lg">Voici la liste de vos tickets</p>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      <h2 class="text-[#2F32A6] text-lg sm:text-2xl mb-2 sm:mb-0">Liste des tickets</h2>
      <router-link to='/add_tickets'>
        <button class="bg-pink-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Ajouter</span>
        </button>
      </router-link>
    </div>

    <div v-if="tickets.length === 0" class="text-center py-10">
      Aucun ticket trouvé... <p class="text-[#2F32A6]">Chargement...</p>
    </div>

    <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 whitespace-nowrap">
          <tr>
            <th class="px-4 py-2">Image</th>
            <th class="px-4 py-2">Type</th>
            <th class="px-4 py-2">Prix</th>
            <th class="px-4 py-2">Quantité dispo</th>
            <th class="px-4 py-2">Quantité restante</th>
            <th class="px-4 py-2">Date limite</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets" :key="ticket.id" class="border-t">
            <td class="px-4 py-2">{{ ticket.image }}</td>
            <td class="px-4 py-2">{{ ticket.type }}</td>
            <td class="px-4 py-2">{{ ticket.prix }} €</td>
            <td class="px-4 py-2">{{ ticket.quantité_disponible }}</td>
            <td class="px-4 py-2">{{ ticket.quantite_restante }}</td>
            <td class="px-4 py-2">{{ ticket.date_limite_vente ? formatDate(ticket.date_limite_vente) : 'Aucune' }}</td>
            <td class="px-4 py-2 flex items-center space-x-2">
              <router-link :to="`/ticket_show/${ticket.id}`">
                <svg class="w-5 h-5 text-blue-500 hover:text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </router-link>
              <router-link :to="`/ticket_modif/${ticket.id}`">
                <svg class="w-5 h-5 text-green-600 hover:text-green-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487a2.1 2.1 0 113.001 2.94L7.5 19.793l-4.5 1.5 1.5-4.5 12.362-12.306z" />
                </svg>
              </router-link>
              <button @click="confirmDelete(ticket.id)" title="Supprimer">
                <svg class="w-5 h-5 text-red-500 hover:text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de suppression -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-md w-full max-w-sm text-center relative">
        <button @click="showDeleteConfirm = false" class="absolute top-2 right-3 text-red-600 text-xl">&times;</button>
        <h3 class="text-lg font-semibold text-[#2F32A6] mb-4">Confirmer la suppression</h3>
        <p class="text-gray-600 mb-4">Voulez-vous vraiment supprimer ce ticket ?</p>
        <div class="flex justify-center gap-4">
          <button @click="showDeleteConfirm = false" class="bg-gray-400 text-white px-4 py-2 rounded">Annuler</button>
          <button @click="deleteTicket" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Supprimer</button>
        </div>
      </div>
    </div>

    <!-- Modal succès -->
    <div v-if="deleteSuccess" class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div class="bg-white p-6 rounded shadow-lg max-w-sm text-center">
        <h3 class="text-green-600 font-bold text-xl mb-3">✅ Ticket supprimé</h3>
        <button @click="deleteSuccess = false" class="bg-green-600 text-white px-4 py-2 rounded">Fermer</button>
      </div>
    </div>

    <!-- Modal échec -->
    <div v-if="deleteError" class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div class="bg-white p-6 rounded shadow-lg max-w-sm text-center">
        <h3 class="text-red-600 font-bold text-xl mb-3">❌ Échec de suppression</h3>
        <button @click="deleteError = false" class="bg-red-600 text-white px-4 py-2 rounded">Fermer</button>
      </div>
    </div>
  </DefaultLayoutOrganisateur>
</template>

<script>
import axios from 'axios';
import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue';

export default {
  name: 'TicketsList',
  components: { DefaultLayoutOrganisateur },
  data() {
    return {
      tickets: [],
      eventId: null,
      showDeleteConfirm: false,
      deleteSuccess: false,
      deleteError: false,
      ticketIdToDelete: null,
    };
  },
  methods: {
    async fetchTickets() {
      const token = localStorage.getItem('access_token');
      this.eventId = this.$route.params.eventId;

      if (!token || !this.eventId) return;

      try {
        const response = await axios.get(
          '/organisateur/ticket',
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.tickets = response.data.tickets;
        console.log("eventId récupéré :", this.eventId);
      } catch (error) {
        console.error('Erreur lors de la récupération des tickets :', error);
      }
    },
    confirmDelete(ticketId) {
      this.ticketIdToDelete = ticketId;
      this.showDeleteConfirm = true;
    },
    async deleteTicket() {
      const token = localStorage.getItem('access_token');
      try {
        await axios.delete(`/organisateur/events/ticket/${this.ticketIdToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.tickets = this.tickets.filter(ticket => ticket.id !== this.ticketIdToDelete);
        this.showDeleteConfirm = false;
        this.deleteSuccess = true;
        setTimeout(() => (this.deleteSuccess = false), 3000);
      } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        this.showDeleteConfirm = false;
        this.deleteError = true;
        setTimeout(() => (this.deleteError = false), 3000);
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  },
  mounted() {
    this.fetchTickets();
  }
};
</script>
