<template>
  <DefaultLayoutOrganisateur>
    <p class="text-gray-900 mb-6">
      Ici vous pouvez ajouter vos tickets 
    </p>
    <h2 class="text-[#2F32A6] mb-6 text-lg font-bold">
      Ajouter un Ticket
    </h2>

    <form @submit.prevent="submitForm">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <!-- Type -->
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Type</label>
          <input v-model="form.type" type="text" placeholder="standard, vpi1"  required class="w-full px-4 py-2 border rounded-lg" />
        </div>
        <!-- Prix -->
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Prix</label>
          <input v-model="form.prix" type="number" min="0" required class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <!-- Image -->
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Image</label>
          <input type="file" ref="image" class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <!-- Quantité -->
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Quantité disponible</label>
          <input v-model="form.quantite_disponible" required type="number" min="0" class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <!-- Date limite -->
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Date limite de vente</label>
          <input v-model="form.date_limite_vente" type="date" required class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <!-- Évènement -->
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Évènement</label>
          <select required v-model="form.eventId" class="w-full px-4 py-2 border rounded-lg">
            <option disabled value="">Sélectionnez un évènement</option>
            <option v-for="event in events" :key="event.id" :value="event.id">
              {{ event.titre }}
            </option>
          </select>
        </div>
      </div>

      <button type="submit" class="text-white bg-pink-600 hover:bg-pink-700 font-medium rounded-lg px-5 py-2.5">
        Ajouter
      </button>
    </form>

    <!-- ✅ Modal Succès -->
    <div v-if="successModal" class="modal-overlay px-5 fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 class="text-2xl font-bold mb-4 text-green-600">🎉 Ticket ajouté !</h2>
        <p class="text-gray-700 mb-6">Le ticket a été créé avec succès.</p>
        <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" @click="successModal = false">
          Fermer
        </button>
      </div>
    </div>

    <!-- ❌ Modal Échec -->
    <div v-if="errorModal" class="modal-overlay fixed px-5 inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 class="text-2xl font-bold mb-4 text-red-600">❌ Échec</h2>
        <p class="text-gray-700 mb-6">Une erreur est survenue. Veuillez réessayer.</p>
        <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" @click="errorModal = false">
          Fermer
        </button>
      </div>
    </div>
  </DefaultLayoutOrganisateur>
</template>

<script>
import axios from 'axios';
import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue';

export default {
  name: 'AddTicket',
  components: { DefaultLayoutOrganisateur },
  data() {
    return {
      events: [],
      form: {
        eventId: '',
        type: '',
        prix: '',
        quantite_disponible: '',
        date_limite_vente: ''
      },
      successModal: false,
      errorModal: false
    };
  },
  async mounted() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert("Vous devez vous reconnecter.");
      return;
    }

    try {
      const response = await axios.get(`/organisateur/events`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      this.events = response.data.data;
    } catch (error) {
      console.error("Erreur lors du chargement des événements :", error);
    }
  },
  methods: {
    async submitForm() {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert("Vous devez vous reconnecter.");
        return;
      }

      const formData = new FormData();
      formData.append('type', this.form.type);
      formData.append('prix', this.form.prix);
      formData.append('quantite', this.form.quantite_disponible);
      formData.append('date_limite_vente', this.form.date_limite_vente);

      const imageFile = this.$refs.image?.files[0];
      if (imageFile) {
        formData.append('image', imageFile);
      }

      try {
        await axios.post(`/organisateur/events/${this.form.eventId}/ticket`, formData, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        this.successModal = true;
        setTimeout(() => {
          this.successModal = false;
        }, 3000);

        this.form = {
          eventId: '',
          type: '',
          prix: '',
          quantite_disponible: '',
          date_limite_vente: ''
        };
        if (this.$refs.image) this.$refs.image.value = null;

      } catch (error) {
        console.error('Erreur lors de la soumission :', error.response?.data || error);
        this.errorModal = true;
        setTimeout(() => {
          this.errorModal = false;
        }, 3000);
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  z-index: 9999 !important;
}
</style>
