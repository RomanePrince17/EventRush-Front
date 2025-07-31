<template>
    <div>
      <NavbarComp />
      <DefaultLayoutOrganisateur>
        <h2 class="text-[#282831] mb-2  ">Salut! Sylvie,</h2>
        <p v-if="event" class="text-[#282831] mb-10">Vous trouverez ici toutes les détails concernant votre évènement: {{event.titre }} </p>
        <h2 class="text-[#2F32A6] mb-6 ">Détails de l'évènement</h2>
        <div class="  items-center  grid grid-cols-1 md:gap-6">
                    <img src="../assets/images/bann_achat_ticket.png" alt="" class="lg:w-346 w-90 rounded-xl lg:h-full h-48  md:w-auto">
        </div>
                
            <div class="md:w-full content  md:flex md:gap-20 mb-4">   
                
                <!-- Colonne des détails de l'événement -->
                <div class="  md:w-1/2  bg-white rounded-3xl shadow-lg md:p-6">
                    <div v-if="event">
                        <h2 class="text-3xl md:mb-28 mt-20 text-center mb-8 font-bold text-gray-800">{{ event.titre }}</h2>
                        <ul class="text-lg text-gray-700 space-y-2">
                            <li class="mb-4 md:mb-20 flex gap-2"><strong>Date:</strong> {{ formatDate(event.date_debut) }} au {{ formatDate(event.date_fin) }}</li>
                            <li class="mb-4 md:mb-20 flex gap-2"><strong>Lieu :</strong> {{ event.lieu }}</li>
                        </ul>
                        <h3 class="mb-4 md:mb-20 gap-2"><strong>Description: </strong> 
                            <br><br>
                            <p>{{ event.description }}</p>
                        </h3>
                        <p class="mb-4 md:mb-20 flex gap-2"><strong>Statut :</strong> {{ event.statut }}</p>

                    </div> 
                   
                </div>  
                <div class="md:w-full grid grid-cols-1 gap-6">
                            <h3 class="text-2xl mt-20 text-center mt-8 font-bold mb-4 text-gray-800">Tickets disponibles :</h3>
                            
                            <div v-if=" tickets.length > 0" class="grid grid-cols-1 md:grid-cols-1 gap-6">
                                <div 
                                v-for="(ticket, index) in tickets" 
                                :key="index" 
                                class="relative bg-white shadow-lg rounded-2xl overflow-hidden w-full lg:h-42 h-40"
                                >
                                
                                <!-- Date (fond bleu en absolute) -->
                                <div class="absolute px-1 rounded-2xl top-0 left-0 h-full lg:w-51 w-25 bg-[rgba(47,50,166,1)] flex items-center justify-center">
                                                                <span v-if="ticket" class="text-white text-sm font-semibold transform ">
                                                                {{ticket.date_limite_vente }}
                                                                </span>
                                </div>
                                <!-- Contenu principal -->
                                <div class="lg:ml-51  ml-25 p-4 flex flex-col w-full h-full">
                                  <div>
                                                        
                                                        <div v-if="ticket" class="flex gap-2 mb-1">
                                                            <img src="../assets/icones/ticket.png" alt="">
                                                            <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.type }}</p>

                                                        </div>
                                                        <div v-if="ticket" class="flex gap-2 mb-1">
                                                            <img src="../assets/icones/dollar.png" alt="">
                                                            <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.prix }} XOF</p>

                                                        </div>
                                                        <div v-if="ticket" class="flex gap-2 mb-1">
                                                            <img src="../assets/icones/calendar.png" alt="">
                                                            <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.quantité_disponible }}</p>

                                                        </div>
                        
                                                    </div>
                                                    
                                                </div>
                                <img :src="ticket.image" alt="Ticket Image" class="w-full h-40 object-cover">
                                </div>
                            </div>
                            <div v-else>
                                <p class=" text-center text-gray-500">Chargement...</p>
                                <p v-if=" tickets.length===0" class=" text-center text-gray-500">Aucun ticket disponible.</p>

                            </div>     
                    </div>      
            </div>   
    </DefaultLayoutOrganisateur>

</div>
  </template>
  <script>
  import axios from 'axios';
  import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue';
  
  export default {
    name: 'TicketShow',
    components: {
        DefaultLayoutOrganisateur,
    },
    data() {
      return {
        event: null,
        eventId:null,
        contenu: [],
        succes:'',
        form: {
        eventId: '',
        type: '',
        prix: '',
        quantite_disponible: '',
        date_limite_vente: ''
      },
      tickets:[],
  
      }},

      async mounted() {
          await this.fetchTicket(); // Attendez de récupérer le ticket pour en extraire event_id
        },

    methods: {
     
      async fetchTicket() {
        const token = localStorage.getItem('access_token');
        const ticketId = this.$route.params.id;

        const options = {
          method: 'GET',
          url: `/events/ticket/${ticketId}`,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        };

        try {
          const { data } = await axios.request(options);
          console.log("Réponse brute du serveur :", data);

          // Stocker les tickets valides
          this.tickets = Array.isArray(data) ? data.filter(ticket => ticket && ticket.id) : [data];

          // Trouver un eventId valide
          const ticketValide = Array.isArray(data) ? data.find(t => t && t.event_id) : data;
          const eventId = ticketValide?.event_id;
          console.log("Event ID trouvé :", eventId);

          if (eventId) {
            await this.fetchEvent(eventId);
          } else {
            console.warn("eventId non trouvé dans les tickets");
          }
        } catch (error) {
          console.error("Erreur dans fetchTicket :", error);
        }
      },

      async fetchEvent(eventId) {
        const token = localStorage.getItem('access_token');
        console.log("ID de l'évènement récupéré:", eventId);
        const options = {
          method: 'GET',
          url: `/events/${eventId}`,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        };

        try {
          const { data } = await axios.request(options);
          console.log("Event récupéré :", data);
          this.event = data.data;
          console.log("Événement chargé :", this.event);
        } catch (error) {
          console.error("Erreur lors du fetchEvent :", error);
        }
      },
        formatDate(dateStr) {
              const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(dateStr).toLocaleDateString('fr-FR', options);
        },
              
    },
   
   
    
}
  </script>