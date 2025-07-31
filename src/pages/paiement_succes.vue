<template>
  <div>
    <NavbarComp />
    <div class="content mt-8 mb-4">
      <div class="flex justify-center  lg:mb-12 mt-25 mb-10">
      <img src="../assets/images/bann_achat_ticket.png" alt="" class="lg:w-346 w-90 rounded-xl lg:h-full h-48  md:w-auto">
   </div>

      <div class="flex gap-10 flex-col md:flex-row w-full group relative overflow-hidden px-4 md:pt-8 md:px-20 md:mb-20">
    
    <!-- Colonne des détails de l'événement -->
    <div class="md:w-1/2 w-full bg-white rounded-3xl shadow-lg p-6 ">
      <div v-if="event">
        <h2 class="text-3xl md:mb-28 text-center mb-8 font-bold text-gray-800">{{ event.titre }}</h2>
        <ul class="text-lg text-gray-700 space-y-2">
          <li class="mb-4 md:mb-20 flex gap-2"><strong>Date:</strong> {{ formatDate(event.date_debut) }} au {{ formatDate(event.date_fin) }}</li>
          <li class="mb-4 md:mb-20 flex gap-2"><strong>Lieu :</strong> {{ event.lieu }}</li>
        </ul>
        <p class="mb-6 text-gray-600"><strong>Description :</strong> {{ event.description }}</p>
        
      </div>
    </div>

    <!-- Colonne des tickets associés -->
    <div class="md:w-1/2 w-full grid grid-cols-1 gap-6">
      <h3 class="text-2xl text-center font-bold mb-4 text-gray-800">Tickets disponibles :</h3>
      
      <div v-if="tickets.length > 0" class="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div 
          v-for="(ticket, index) in tickets" 
          :key="index" 
          class="relative bg-white shadow-lg rounded-2xl overflow-hidden w-full lg:h-42 h-40"
          >
        
        <!-- Date (fond bleu en absolute) -->
        <div class="absolute rounded-2xl top-0 left-0 h-full lg:w-51 w-25 bg-[rgba(47,50,166,1)] flex items-center justify-center">
                                        <span class="text-white text-sm font-semibold transform ">
                                            {{ ticket.date_limite }}
                                        </span>
        </div>
        <!-- Contenu principal -->
        <div class="lg:ml-51  ml-25 p-4 flex flex-col justify-between h-full">
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
                                <!-- <div v-if="event" class="flex gap-1 ">
                                    <img src="../assets/icones/vector.png" alt="">
                                    <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.date_limite }}</p>
                                </div> -->
                          
                                <div class="text-right">
                              
                                      <button @click="payerTicket(ticket)" class="bg-pink-500 text-white text-sm px-4 py-1 rounded-2xl hover:bg-pink-600 transition">
                                        Payer
                                      </button>
                                </div>
                            </div>
                                                  <!-- Modal -->
                          <div v-if="ouvrirModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div class="bg-white p-6 rounded-lg w-full max-w-md relative">
                              <!-- Bouton de fermeture -->
                              <button @click="ouvrirModal = false" class="absolute top-2 right-2 text-gray-500 hover:text-black">
                                ✕
                              </button>

                              <h2 class="text-lg font-bold mb-4">Formulaire de paiement</h2>
                              <form @submit.prevent="envoyerPaiement()" class="flex flex-col gap-4">
                              <input v-model="form.nom" type="text" placeholder="Nom" required />
                              <input v-model="form.prenom" type="text" placeholder="Prénom" required />
                              <input v-model="form.telephone" type="text" placeholder="Téléphone" required />

                              <button :disabled="chargement" type="submit" class="bg-green-600 text-white py-2 rounded">
                                {{ chargement ? 'Paiement...' : 'Valider le paiement' }}
                              </button>
                            </form>
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
</div>
<div class="flex lg:text-lg text-[13px] ml-2 lg:ml-16 gap-2">
            <img src="../assets/icones/vector.png" alt="">
            <p>Address: 1 MetLife Stadium Dr, East Rutherford, NJ 07073, USA</p>
        </div>
        <br>
        <iframe class=" ml-4 rounded-2xl lg:ml-16 lg:w-345 w-85 lg:h-100 h-70" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.0315719364103!2d2.4541067747520544!3d6.389927693600545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023550004fade15%3A0x5345c8c7d00006d9!2sAkpakpa!5e0!3m2!1sfr!2sbj!4v1745449711283!5m2!1sfr!2sbj" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <p class="text-blue-500  ml-4 lg:ml-18 mt-10 mb-2">Top reviews on this concert</p>
        <p class="text-blue-500 ml-4 lg:ml-18 mb-2">Overage rates </p>
        <div class="space-y-6 ml-4 lg:w-342 w-85 lg:ml-16">
            <h2 class="text-xl font-bold ">Commentaires</h2>  
            <div
                v-for="(comment, i) in comments"
                :key="i"
                class="bg-white rounded-2xl shadow p-4 flex flex-col gap-2"
            >
                <!-- Profil + étoiles -->
                <div class=" gap-3">
                  <div class="flex gap-3">
                    <img :src="comment.utilisateur.avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
                    <div class="mr-6 mt-4 mb-6">{{ comment.utilisateur.nom }}</div>
                  </div>
                <div>
                    <p class="font-semibold"></p>
                    <div class="flex gap-0.5">
                    <template v-for="n in comment.note " :key="n">
                        <svg
                        class="w-4 h-4"
                        :class="n <= comment.stars ? 'text-pink-400' : 'text-yellow-300'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.05 3.23h3.397c.969 0 1.371 1.24.588 1.81l-2.749 1.998.999 3.243c.29.944-.755 1.725-1.54 1.151L10 12.347l-2.696 1.942c-.785.574-1.83-.207-1.54-1.151l.999-3.243-2.749-1.998c-.783-.57-.38-1.81.588-1.81h3.397l1.05-3.23z"
                        />
                        </svg>
                    </template>
                    </div>
                </div>
                </div>
        
                <!-- Texte -->
                <p class="text-gray-700 text-sm">{{ comment.contenu }}</p>
               
            </div>
  
      <!-- Votre commentaire -->
      <h2 class="text-xl mb-4">Ajouter un commentaire</h2>

<form @submit.prevent="submitComment" :aria-busy="loading" class="space-y-4">
  <div>
    <label for="contenu" class="block text-sm text-gray-700 mb-1">Commentaire</label>
    <textarea
      id="contenu"
      v-model="contenu"
      required
      class="md:w-100 w-70 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
      rows="4"
    ></textarea>
    <div>
        <label for="note" class="block text-sm  text-gray-700 mb-1">
          Note
        </label>
        <select
          id="note"
          v-model.number="note"
          class="md:w-100  w-70 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
  </div>
  <div>
    <button
      type="submit"
      class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50"
    >
      Envoyer
    </button>
     <!-- Message de succès -->
     <p v-if="success" class="text-green-500 text-sm">{{ success }}</p>

      <!-- Message d'erreur -->
      <p v-if="error" class="text-green-500 text-sm">{{ error }}</p>
    </div>

</form>

          <!-- Concert Cards - suggestions-->
    <section class="px-4  py-10">
      <div class="flex justify-between items-center mb-6">
        <h2 class="lg:text-2xl text-xl font-semibold">Suggestion pour vous</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6">
        <div v-for="(concert, index) in popularConcerts" :key="index" class="shadow-lg rounded-2xl overflow-hidden">
          <router-link to="/ticket">
            <img :src="concert.image" alt="" class="w-full aspect-square object-cover rounded-t-2xl"/>
            <div class="text-center m-5">
              <strong>{{ concert.artist }}</strong>
              <p>{{ concert.city }}</p>
              <p>{{ concert.date }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
</div>
<FooterComp />

  </div>
</template>
<script>
import axios from 'axios';
import NavbarComp from '../components/Navbar.vue';
import FooterComp from '../components/Footer.vue';

export default {
  name: 'PaiementSucces',
  components: {
    NavbarComp,
    FooterComp,
  },
  data() {
    return {
      event: null,
      contenu: [],
      ouvrirModal: false,
      note: [],
      tickets: [],
      error: '',
      form: {
      nom: '',
      prenom: '',
      telephone: null,
      ticket_id: null, // à ajouter si nécessaire
    },
      
      succes:'',
      newComment: '',
        comments: [],
        popularConcerts: [
        { image: '../assets/images/first_img.png', artist: 'Sila Gencoglu', city: 'Boston', date: 'Dec 18, 22:00' },
        { image: '../assets/images/two_img.png', artist: 'Justin Bieber', city: 'San Francisco', date: 'Dec 16, 20:00' },
        { image: '../assets/images/three_img.png', artist: 'Celine Dion', city: 'New York City', date: 'Dec 13, 21:00' },
        { image: '../assets/images/four_img.png', artist: 'Taylor Swift', city: 'San Diego', date: 'Dec 14, 21:00' },
      ],



    };
  },
  // async mounted() {
  //   const eventId = this.$route.params.id;

  //   const options = {
  //     method: 'GET',
  //     url: 'https://gestevent-main-ai7iif.laravel.cloud/api/events/${eventId}',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: 'Bearer 71|MIYvvQgwOyrf4hlx7aowQVVUrEspVdGggunCEVSm7d2ab854',
  //     },
  //   };

  //   try {
  //     const response = await axios.request(options);
  //     this.event = response.data.data;

  //     const ticketsResponse = await axios.get('https://gestevent-main-ai7iif.laravel.cloud/api/events/${eventId}/ticket', options);
  //     this.tickets = ticketsResponse.data.tickets;

  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des informations :", error);
  //   }
  // },
  async mounted() {
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

    // Récupération des tickets
    try {
      const ticketResponse = await axios.get(`/events/${eventId}/ticket \

`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      this.tickets = ticketResponse.data.tickets;
    } catch (error) {
      console.error("Erreur lors de la récupération des tickets :", error);
    }
     // Récupération des commentaires

     try {
      const commentResponse  = await axios.get(`/evenements/${eventId}/commentaires \
`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        this.comments = commentResponse.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des commentaires :", error);
        }
       
  },
  
    methods: {
      
      payerTicket(ticket) {
      // Affiche le formulaire de paiement pour le ticket sélectionné
      this.ticketId = ticket.id;
      this.ouvrirModal = true;
    },

    async envoyerPaiement() {
      const token = localStorage.getItem('access_token');
        console.log("Token envoyé :", token);

      this.chargement = true;

      try {
        const payload = {
          ticket_id: this.ticketId,
          nom: this.form.nom,
          prenom: this.form.prenom,
          telephone: this.form.telephone,
        };

        // Appel à votre API de paiement
        const response = {
            method: 'POST',
            url: '/billet/payer',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            },
            data: {ticket_id: 5}
          };
          try {
            const { data } = await axios.request(response);
            console.log(data);
            const urlPaiement = data.payment_url
            if (urlPaiement) {
              window.location.href = urlPaiement // Redirection vers le lien de paiement
            } else {
              alert("Une erreur est survenue. L'URL de paiement est introuvable.")
            }
          } catch (error) {
            console.error(error);
          }               
          } finally {
          }
      //     const params = new URLSearchParams(window.location.search);
      //     const reference = params.get('reference');
      //     const status = params.get('status');
      //     const id = params.get('id');

      //     try {
      //       const res = await axios.get('/api/billet/webhook', {
      //         params: { reference, status, id }
      //       });

      //       if (res.status === 200) {
      //         // Redirection interne Vue
      //         this.$router.push('/success-page'); // ou vers le nom de route
      //       } else {
      //         console.error('Erreur serveur:', res);
      //       }
      //     } catch (err) {
      //       console.error('Erreur de webhook:', err);
      //     }
      // }
    },
    fermerModalEtNotifier() {
      this.ouvrirModal = false;
      this.ticketId = null;
      this.form = {
        nom: this.nom,
        prenom: this.prenom,
        telephone: this.telephone
      };
    },
      async submitComment() {
        this.error = ''
        this.succes=''
        let eventId = this.$route.params.id;
        // Convertir l'ID en entier pour éviter l'erreur SQL
          eventId = parseInt(eventId, 10);
        const token = localStorage.getItem('access_token');
      try {
        const response = await axios.request({
          method: 'POST',
          url: `https://gestevent-main-ai7iif.laravel.cloud/api/evenements/${eventId}/commentaires`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          },
          data: {
            contenu: this.contenu,
            note: this.note,
            
          },
          
        })
        

        // Ajout immédiat dans la liste des commentaires
        this.comments.unshift(response.data)
        // Réinitialiser les champs
        this.success ='Commentaire envoyé avec succès ! 🎉 ';
        console.log('Commentaire envoyé avec succès ! 🎉');
        this.contenu = ''; // réinitialise
        this.note = '';
      } catch {
        this.error= 'Une erreur est survenue lors de l’envoi.';
      } 

    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('fr-FR', options);
    },
    
       
  },
};
</script>