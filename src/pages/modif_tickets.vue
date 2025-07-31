<template>
    <DefaultLayoutOrganisateur>
      <div class="max-w-2xl mx-auto p-4">
        <h1 class="text-2xl font-bold mb-6 text-center">Modifier le ticket</h1>
  
        <form @submit.prevent="submitForm">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
          <!-- Type -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Type</label>
            <select required v-model="form.type" class="w-full px-4 py-2 border rounded-lg">
              <option disabled value="">Sélectionnez un type</option>
              <option value="standart">Standard</option>
              <option value="vip1">VIP 1</option>
              <option value="vip2">VIP 2</option>
            </select>
          </div>

          <!-- Prix -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Prix</label>
            <input v-model.number="form.prix" type="number" step="0.01" required class="w-full px-4 py-2 border rounded-lg" />
          </div>

          <!-- Image -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Image</label>
            <input type="file" ref="image" class="w-full px-4 py-2 border rounded-lg" />
          </div>

          <!-- Quantité -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Quantité disponible</label>
            <input v-model="form.quantite_disponible" requrired type="number"  class="w-full px-4 py-2 border rounded-lg" />
          </div>

          <!-- Date limite -->
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Date limite de vente</label>
            <input v-model="form.date_limite_vente" type="date" required class="w-full px-4 py-2 border rounded-lg" />
          </div>
          <!-- Sélection événement -->
          <div>
            <label v-if="events" class="block mb-2 text-sm font-medium text-gray-700">Évènement</label>
            <select  v-model="form.eventId" class="w-full px-4 py-2 border rounded-lg">
              <option disabled value="">Sélectionnez un évènement</option>
              <option v-for="event in events" :key="event.id" :value="event.id">
                {{ event.titre }}
              </option>
            </select>
          </div>
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
          eventId: '',
          type: '',
          prix: '',
          quantite_disponible: '',
          date_limite_vente: '',
      },
        ticketId:'',
        events:[],
      };
    },
    created() {
      this.fetchTicket();
      this.fetchEvent();
    },
    methods: {
      async fetchEvent() {
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
            console.log('Événements récupérés :', this.events);
          } catch (error) {
            console.error("Erreur lors du chargement des événements :", error);
          }
        } ,
        async fetchTicket() {
          const token = localStorage.getItem('access_token');
          const ticketId = this.$route.params.id;
          const options = {
            method: 'GET',
            url: `/events/ticket/${ticketId}`,
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            },
          };

          try {
            const { data } = await axios.request(options);
            console.log(data);
            console.log('Réponse API ticket ▶', data);
            const ticket = data.data;
            console.log('réponse',ticket)

            if (ticket) {
              this.form = {
                type: ticket.type || '',
                prix: ticket.prix || '',
                quantite_disponible: ticket.quantite_disponible || '',
                date_limite_vente: ticket.date_limite_vente || '',
                eventId: ticket.event_id || '',
              };
            }

            } catch (error) {
              console.error('Erreur lors du chargement du ticket :', error);
            }
    
        },
  
      async submitForm() {
        const token = localStorage.getItem('access_token');
        const ticketId = this.$route.params.id;
  
        const formData = new FormData();
        for (let key in this.form) {
          formData.append(key, this.form[key]);
        }
  
        try {
          const response = await axios.post(
            `/organisateur/events/ticket/${ticketId}`, 
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
            }
          );
          console.log('Ticket modifié :', response.data);
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
  