<template>
    <div>
      <NavbarComp />
      <DefaultLayoutOrganisateur>
        <p v-if="event" class="text-[#282831] mb-10">Vous trouverez ici toutes les détails concernant votre évènement: {{event.titre }} </p>
        <h2 class="text-[#2F32A6] mb-6 ">Détails de l'évènement</h2>
        <div class="  items-center  grid grid-cols-1 md:gap-6">
                    <img src="../assets/images/bann_achat_ticket.png" alt="" class="lg:w-346 w-90 rounded-xl lg:h-full h-48  md:w-auto">
        </div>
                
            <div class="md:w-full content  md:flex md:gap-20 mb-4">   
                
                <!-- Colonne des détails de l'événement -->
                <div class="  md:w-1/2  bg-white rounded-3xl shadow-lg md:p-6">
                    <div v-if="event">
                        <h2 class="text-3xl md:mb-28 text-center mb-8 font-bold text-gray-800">{{ event.titre }}</h2>
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
                            <h3 class="text-2xl text-center mt-8 font-bold mb-4 text-gray-800">Tickets disponibles :</h3>
                            
                            <div v-if=" tickets.length > 0" class="grid grid-cols-1 md:grid-cols-1 gap-6">
                                <div 
                                v-for="(ticket, index) in tickets" 
                                :key="index" 
                                class="relative bg-white shadow-lg rounded-2xl overflow-hidden w-full lg:h-42 h-40"
                                >
                                
                                <!-- Date (fond bleu en absolute) -->
                                <div class="absolute px-1 rounded-2xl top-0 left-0 h-full lg:w-51 w-25 bg-[rgba(47,50,166,1)] flex items-center justify-center">
                                                                <span v-if="event" class="text-white text-sm font-semibold transform ">
                                                                {{ticket.date_limite_vente }}
                                                                </span>
                                </div>
                                <!-- Contenu principal -->
                                <div class="lg:ml-51  ml-25 p-4 flex flex-col w-full h-full">
                                  <div>
                                                        
                                                        <div v-if="event" class="flex gap-2 mb-1">
                                                            <img src="../assets/icones/ticket.png" alt="">
                                                            <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.type }}</p>

                                                        </div>
                                                        <div v-if="event" class="flex gap-2 mb-1">
                                                            <img src="../assets/icones/dollar.png" alt="">
                                                            <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.prix }} XOF</p>

                                                        </div>
                                                        <div v-if="event" class="flex gap-2 mb-1">
                                                            <img src="../assets/icones/calendar.png" alt="">
                                                            <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.quantité_disponible }}</p>

                                                        </div>
                        
                                                    </div>
                                                    
                                                </div>
                                <img :src="ticket.image" alt="Ticket Image" class="w-full h-40 object-cover">
                                </div>
                            </div>
                            <div v-else>
                                <p class=" text-center text-gray-500">Aucun ticket disponible pour cet événement.</p>
                            </div>
                            
                    </div>
                    
                    
            </div>
            <!-- 🧾 Tableau des scanneurs -->
<div  class="mt-16 px-4 md:px-10">
  <h2 class="text-2xl font-bold text-center text-[#2F32A6] mb-6">Liste des scanneurs</h2>

  <table  class="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
    <thead class="bg-gray-200 text-gray-700">
      <tr>
        <th class="text-left py-3 px-4">Nom</th>
        <th class="text-left py-3 px-4">Email</th>
        <th class="text-left py-3 px-4">Téléphone</th>
      </tr>
    </thead>
    <tbody 
    >
      <tr
        v-for="(scanneur, index) in scanneurs"
        :key="index"
        class="border-t hover:bg-gray-50"
      >
        <td class="py-3 px-4">{{ scanneur.nom }}</td>
        <td class="py-3 px-4">{{ scanneur.email }}</td>
        <td class="py-3 px-4">{{ scanneur.telephone }}</td>
      </tr>
      <tr v-if="scanneurs.length === 0">
        <td colspan="3" class="text-center py-6 text-gray-500">
          Aucun scanneur affecté à cet événement.
        </td>
      </tr>
    </tbody>
  </table>
</div>
            

    </DefaultLayoutOrganisateur>

</div>
  </template>
  <script>
  import axios from 'axios';
  import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue';
  
  export default {
    name: 'EventShow',
    components: {
        DefaultLayoutOrganisateur,
    },
    data() {
      return {
        event: null,
        contenu: [],
        succes:'',
        tickets: [],
        comments:[],
        scanneurs: [],

      }},
     
    methods: {
      async fetchEvents(){
        const token = localStorage.getItem('access_token');
        console.log("Token envoyé :", token);
        let eventId = this.$route.params.id;

        // Convertir l'ID en entier pour éviter l'erreur SQL
        eventId = parseInt(eventId, 10);

        if (isNaN(eventId)) {
          console.error("ID de l'événement invalide :", eventId);
          return;
        }
        const options = {
          method: 'GET', 
          url: `/events/${eventId} \
    `,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`

          }
        };

        try {
          const response = await axios.request(options);
          this.event = response.data.data;
        } catch (error) {
          console.error("Erreur lors de la récupération de l'événement :", error);
        }

      },
        
        async recup(){
          const token = localStorage.getItem('access_token');
          console.log("Token envoyé :", token);
          let eventId = this.$route.params.id;

          // Convertir l'ID en entier pour éviter l'erreur SQL
          eventId = parseInt(eventId, 10);

          if (isNaN(eventId)) {
            console.error("ID de l'événement invalide :", eventId);
            return;
          }
         // Récupération des tickets
              try {
                const ticketResponse = await axios.get(`/events/${eventId}/ticket \ `, {
                  headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                  }
                });
                this.tickets = ticketResponse.data.tickets;
              } catch (error) {
                console.error("Erreur lors de la récupération des tickets :", error);
              }
              
              },
              async fecthScanner() {
  const token = localStorage.getItem('access_token');
  let eventId = this.$route.params.id;

  eventId = parseInt(eventId, 10);
  if (isNaN(eventId)) {
    console.error("ID de l'événement invalide :", eventId);
    return;
  }

  const options = {
    method: 'GET',
    url: `/organisateur/scanneurs/${eventId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const { data } = await axios.request(options);
    console.log("Scanneurs récupérés :", data);

    // Assure-toi que tu reçois un tableau
    this.scanneurs = Array.isArray(data.scanneurs) ? data.scanneurs : data;
  } catch (error) {
    console.error("Erreur lors de la récupération des scanneurs :", error);
  }
},
             
              formatDate(dateStr) {
                      const options = { year: 'numeric', month: 'long', day: 'numeric' };
                      return new Date(dateStr).toLocaleDateString('fr-FR', options);
                  },
              
    },
    async mounted(){
      this.fetchEvents();
      this.recup();
      this.fecthScanner();

    }, 
    
}
  </script>