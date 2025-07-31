<template>
  <DefaultLayoutOrganisateur>
    <p class="text-gray-900 mb-6">Ici vous pouvez ajouter tous vos évènements</p>
    <h2 class="text-indigo-700 mb-6 text-lg font-bold">Ajouter un Évènement</h2>

    <form @submit.prevent="submitForm">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="titre" class="block mb-2 text-sm font-medium text-gray-700">Titre</label>
          <input v-model="form.titre" type="text" id="titre" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200" />
        </div>

        <div>
          <label for="description" class="block mb-2 text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="form.description" id="description" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"></textarea>
        </div>

        <div>
          <label for="date_debut" class="block mb-2 text-sm font-medium text-gray-700">Date de Début</label>
          <input v-model="form.date_debut" type="date" id="date_debut" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200" />
        </div>

        <div>
          <label for="date_fin" class="block mb-2 text-sm font-medium text-gray-700">Date de Fin</label>
          <input v-model="form.date_fin" type="date" id="date_fin" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200" />
        </div>

        <div>
          <label for="statut" class="block mb-2 text-sm font-medium text-gray-700">Statut</label>
          <select v-model="form.statut"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200">
            <option disabled value="">Sélectionnez un statut</option>
            <option value="brouillon">Brouillon</option>
            <option value="publié">Publié</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Image Principale</label>
          <input type="file" ref="affiche"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200" />
        </div>
      </div>

      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-700">Images Additionnelles</label>
        <input type="file" ref="photos" multiple
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200" />
      </div>
      <div>
          <label for="titre" class="block mb-2 text-sm font-medium text-gray-700">Lieu</label>
          <input v-model="form.lieu" type="text" id="lieu" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200" />
        </div>

      <!-- Carte interactive pour choisir la localisation -->
      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-700">Localisation de l’évènement</label>
        <div id="map" class="w-full h-64 rounded-lg border border-gray-300"></div>
        <p class="text-sm text-gray-500 mt-2">
          Latitude : {{ form.latitude }} | Longitude : {{ form.longitude }}
        </p>
        <p class="text-sm text-gray-500">
          Adresse : {{ form.lieu }}
        </p>
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="text-white bg-pink-600 hover:bg-pink-700 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center gap-2"
      >
        <span v-if="isLoading" class="loader ease-linear rounded-full border-4 border-t-4 border-white h-5 w-5"></span>
        <span>{{ isLoading ? 'Ajout en cours...' : 'Ajouter' }}</span>
      </button>
    </form>

    <!-- ✅ Modal Succès -->
    <div
      v-if="successModal"
      class="modal-overlay px-5 fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md"
    >
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 class="text-2xl font-bold mb-4 text-green-600">🎉 Évènement ajouté !</h2>
        <p class="text-gray-700 mb-6">L’évènement a été créé avec succès.</p>
        <button
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          @click="successModal = false"
        >
          Fermer
        </button>
      </div>
    </div>

    <!-- ❌ Modal Échec -->
    <div
      v-if="errorModal"
      class="modal-overlay px-5 fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md"
    >
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 class="text-2xl font-bold mb-4 text-red-600">❌ Échec</h2>
        <p class="text-gray-700 mb-6">Une erreur est survenue. Veuillez réessayer.</p>
        <button
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          @click="errorModal = false"
        >
          Fermer
        </button>
      </div>
    </div>
  </DefaultLayoutOrganisateur>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue';

export default {
  name: 'add_events',
  components: { DefaultLayoutOrganisateur },
  data() {
    return {
      form: {
        titre: '',
        description: '',
        date_debut: '',
        date_fin: '',
        statut: '',
        latitude: '',
        longitude: '',
        lieu: ''
      },
      isLoading: false, // 👈 nouveau
      successModal: false,
      errorModal: false,
      organisateur: {
        nom_entreprise: '',
      }
    };
  },
  mounted() {
    const map = L.map('map').setView([6.497, 2.602], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let marker;

    map.on('click', async (e) => {
      const { lat, lng } = e.latlng;
      this.form.latitude = lat.toFixed(6);
      this.form.longitude = lng.toFixed(6);

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }

      await this.reverseGeocode(lat, lng);
    });
  },
  methods: {
    async reverseGeocode(lat, lng) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        this.form.lieu = data.display_name || `Lat: ${lat}, Lng: ${lng}`;
      } catch (error) {
        console.error('Erreur reverse geocoding:', error);
        this.form.lieu = `Lat: ${lat}, Lng: ${lng}`;
      }
    },
    async submitForm() {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        if (!this.form.lieu || this.form.lieu.trim() === '') {
  alert("Veuillez renseigner le lieu de l’évènement (manuellement ou via la carte).");
  return;
}

        this.isLoading = true; // ⬅️ Start loading

        const formData = new FormData();
        for (const key in this.form) {
          formData.append(key, this.form[key]);
        }

        const affiche = this.$refs.affiche?.files[0];
        if (affiche) formData.append('affiche', affiche);

        const photos = this.$refs.photos?.files;
        for (let i = 0; i < photos.length; i++) {
          formData.append('photos[]', photos[i]);
        }

        try {
          await axios.post('/organisateur/events', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          this.successModal = true;
          setTimeout(() => (this.successModal = false), 5000);
        } catch (error) {
          console.error("Erreur:", error);
          this.errorModal = true;
          setTimeout(() => (this.errorModal = false), 5000);
        } finally {
          this.isLoading = false; // ⬅️ End loading
        }
      },
    
  }
};
</script>

<style scoped>
#map {
  height: 300px;
  z-index: 0;
  position: relative;
}

/* Correction z-index Leaflet */
.leaflet-container {
  z-index: 0 !important;
}

/* Modals toujours au-dessus */
.modal-overlay {
  z-index: 9999 !important;
  
}
.loader {
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
