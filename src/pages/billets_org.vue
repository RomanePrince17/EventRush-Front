<template>
    <DefaultLayoutOrganisateur>
      <div class="w-full max-w-5xl mx-auto px-4">
        <h3 class="text-2xl text-center font-bold mb-8 text-gray-800">🎟 Tickets achetés</h3>

        <!-- Bouton de rafraîchissement -->
        <div class="text-right mb-4">
          <button
            @click="fetchTicketsAchetes"
            class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
          >
            🔄 Rafraîchir
          </button>
        </div>

        <!-- Affichage des tickets -->
        <div v-if="ticketsAchetes.length > 0" class="space-y-6">
          <div
            v-for="ticketData in ticketsAchetes"
            :key="ticketData.id"
            class="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md overflow-hidden p-4"
          >
            <!-- 📸 Image à gauche -->
            <div class="w-full md:w-1/4 h-40 flex items-center justify-center">
              <img
                :src="ticketData.event.affiche"
                :alt="ticketData.event.titre"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>

            <!-- 📄 Détails au centre -->
            <div class="w-full md:w-2/4 px-4 mt-4 md:mt-0">
              <h2 class="text-lg font-semibold mb-2">{{ ticketData.event.titre }}</h2>
              <p class="text-sm text-gray-600 mb-1">🎫 Type : {{ ticketData.type_ticket }}</p>
              <p class="text-sm text-gray-600 mb-1">💰 Montant : {{ ticketData.montant }} XOF</p>
              <p class="text-sm text-gray-600 mb-1">📍 Lieu : {{ ticketData.event.lieu }}</p>
              <p class="text-sm text-gray-600 mb-1">
                📅 Du {{ formatDate(ticketData.event.date_debut) }} au {{ formatDate(ticketData.event.date_fin) }}
              </p>
              <p class="text-sm text-gray-600 mb-1">📄 Référence : {{ ticketData.reference }}</p>
              <p
                class="text-sm font-semibold"
                :class="ticketData.status === 'paye' ? 'text-green-600' : 'text-red-600'"
              >
                ✅ Statut : {{ ticketData.status }}
              </p>
            </div>

            <!-- 🔳 QR code à droite -->
            <div class="w-full md:w-1/4 mt-4 md:mt-0 flex justify-center items-center">
              <img
                :src="`https://api.qrserver.com/v1/create-qr-code/?data=${ticketData.qr_code}&size=100x100`"
                alt="QR Code"
                class="w-24 h-24"
              />
            </div>
          </div>
        </div>

        <!-- Aucun ticket -->
        <div v-else class="text-center text-gray-500">Aucun ticket acheté pour le moment.</div>
      </div>
    </DefaultLayoutOrganisateur>
</template>


<script>
import axios from 'axios';
import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue';

export default {
  name: 'AfficherTicketsAchetes',
  components: {
    DefaultLayoutOrganisateur
  },
  data() {
    return {
      ticketsAchetes: []
    };
  },
  mounted() {
    this.fetchTicketsAchetes();
  },
  methods: {
    async fetchTicketsAchetes() {
      try {
        const response = await axios.get('https://digitstage.online/api/billet/userIndex', {
          params: { page: 1 },
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        this.ticketsAchetes = response.data?.passee?.data || [];
      } catch (error) {
        if (error.response) {
          console.error('Erreur API :', error.response.data);
        } else if (error.request) {
          console.error('Pas de réponse du serveur :', error.request);
        } else {
          console.error('Erreur inconnue :', error.message);
        }
      }
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('fr-FR', options);
    }
  }
};
</script>

<style scoped>
/* Tu peux ajouter ici tes styles personnalisés si besoin */
</style>
