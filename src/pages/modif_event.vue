<template>
  <DefaultLayoutOrganisateur>
    <div class="max-w-2xl mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6 text-center">Modifier l'Evènement</h1>

      <form @submit.prevent="submitForm">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="titre" class="block mb-2 text-sm font-medium text-gray-700">Titre</label>
            <input v-model="form.titre"  type="text" id="titre" required
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
            <label for="lieu" class="block mb-2 text-sm font-medium text-gray-700">Lieu</label>
            <input v-model="form.lieu" type="text" id="lieu" required
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
          <button type="submit" class="text-white bg-pink-600 hover:bg-pink-700 font-medium rounded-lg px-5 py-2.5">
            Enregistrer
          </button>
      </form>
    </div>
  </DefaultLayoutOrganisateur>
</template>

<script>
import axios from 'axios';
import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue';

export default {
  name: 'EditTicket',
  components: {
    DefaultLayoutOrganisateur,
  },
  data() {
    return {
      form: {
        titre: '',
        description: '',
        date_debut: '',
        date_fin: '',
        lieu: '',
        statut: '',
      },
      ticketId:'',
    };
  },
  created() {
    this.fetchEvent();
  },
  methods: {
    async fetchEvent() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    alert("Vous devez vous reconnecter.");
    return;
  }

  const ticketId = this.$route.params.id;

  try {
    const { data } = await axios.get(`/organisateur/events/${ticketId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Réponse de l'API :", data);

    const event = data.data; 

    if (event) {
      this.form.titre = event.titre || '';
      this.form.description = event.description || '';
      this.form.date_debut = event.date_debut || '';
      this.form.date_fin = event.date_fin || '';
      this.form.lieu = event.lieu || '';
      this.form.statut = event.statut || '';
    } else {
      console.warn("Aucune donnée trouvée pour l'événement.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'événement :", error);
  }
},
   

    async submitForm() {
        const token = localStorage.getItem('access_token');
        const eventId = this.$route.params.id;
        const formData = new FormData();
        for (let key in this.form) {
          formData.append(key, this.form[key]);
        }
        if (this.$refs.affiche?.files[0]) {
          formData.append('affiche', this.$refs.affiche.files[0]);
        }
        if (this.$refs.photos?.files) {
          for (const file of this.$refs.photos.files) {
            formData.append('photos[]', file);
          }
        }

        try {
          const response = await axios.post(
            `/organisateur/events/${eventId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
            }
            );
              console.log('Évènement modifié :', response.data);
            } catch (error) {
              console.error('Erreur de modification :', error);
              console.log('Détails serveur :', error.response);
            }
          },
            formatDate(dateStr) {
              const options = { year: 'numeric', month: 'long', day: 'numeric' };
                  return new Date(dateStr).toLocaleDateString('fr-FR', options);
                    },
          }
  
}
</script>
