<template>
  <div>
    <NavbarComp />
    <div class="content mt-8 mb-4">
      <div class="flex justify-center px-5  lg:mb-12 mt-25 mb-10">
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
          <img
              v-if="ticket && ticket.image_url"
              :src="ticket.image_url"
              alt="Image du ticket"
              class="w-full h-auto rounded-lg"
            />
        </div>
        <!-- Contenu principal -->
        <div class="lg:ml-51  ml-25 p-4 flex flex-col justify-between h-full">
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
                                    <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.quantite_disponible }}</p>

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
                          <div v-if="ouvrirModal"
                           class="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
                            <div class="bg-white p-6 rounded-lg w-full max-w-md relative">
                              <!-- Bouton de fermeture -->
                              <button @click="ouvrirModal = false" class="absolute top-2 right-2 text-gray-500 hover:text-black">
                                ✕
                              </button>
                              <h2 class="text-lg font-bold mb-4">Formulaire de paiement</h2>
                              <form @submit.prevent="envoyerPaiement" class="space-y-5">
                                  <div>
                                    <label class="text-gray-700 block mb-1">Nom</label>
                                    <input
                                      v-model="form.nom"
                                      type="text"
                                      placeholder="Votre nom"
                                      required
                                      class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label class="text-gray-700 block mb-1">Email</label>
                                    <input
                                      v-model="form.email"
                                      type="email"
                                      placeholder="Votre email"
                                      required
                                      class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label class="text-gray-700 block mb-1">Téléphone</label>
                                    <input
                                      v-model="form.telephone"
                                      type="tel"
                                      placeholder="Ex: +229 97 00 00 00"
                                      required
                                      class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                                    />
                                  </div>

                                  <button
                                    :disabled="chargement"
                                    type="submit"
                                    class="w-full bg-pink-500 text-white py-2 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50"
                                  >
                                    {{ chargement ? 'Paiement en cours...' : 'Valider le paiement' }}
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
                  <div  class="flex gap-3">
                    <img v-if="comment.utilisateur" :src="comment.utilisateur.avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
                    <div v-if="comment.utilisateur"  class="mr-6 mt-4 mb-6">{{ comment.utilisateur.nom }}</div>
                    <div v-if="comment.utilisateur"  class="mr-6 mt-4 mb-6">{{ comment.utilisateur.note }}</div>
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
            <div v-if="comments.length===0">Aucun commentaire pour le moment! Soyez la première personne à commenter!</div>
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
          v-model.number="note" required
          class="md:w-100  w-70 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
  </div>
  <div>
    <button
      type="submit"
      :disabled="loading"
      class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      <span v-if="loading">
        <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </span>
      {{ loading ? 'Envoi en cours...' : 'Envoyer' }}
    </button>
     <!-- Message de succès -->
     <p v-if="succes" class="text-green-500 mt-5 text-sm">{{ success }}</p>

      <!-- Message d'erreur -->
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
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
    <!-- Modal de succès centré -->
    <div
          v-if="paiementReussi"
          class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-60 z-50"
        >
          <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 class="text-2xl font-bold mb-4 text-green-600">🎉 Paiement réussi !</h2>
            <p class="text-gray-700 mb-6">Merci pour votre souscription.</p>
            <button
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              @click="fermerPopupSucces"
            >
              Fermer
            </button>
          </div>

</div>
<!-- Modal d’échec centré -->
<div
  v-if="paiementEchoue"
  class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-60 z-50"
>
  <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
    <h2 class="text-2xl font-bold mb-4 text-red-600">❌ Paiement échoué</h2>
    <p class="text-gray-700 mb-6">La transaction n’a pas été complétée ou a été refusée.</p>
    <button
      class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      @click="fermerPopupEchec"
    >
      Fermer
    </button>
  </div>
</div>
</div>
<!-- Modal succès pour commentaire -->
<div
  v-if="modalCommentSuccess"
  class="fixed px-5 inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-60 z-50"
>
  <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
    <h2 class="text-2xl font-bold mb-4 text-green-600">✅ Commentaire envoyé !</h2>
    <p class="text-gray-700 mb-6">Merci pour votre retour.</p>
    <button
      class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      @click="modalCommentSuccess = false"
    >
      Fermer
    </button>
  </div>
</div>

<!-- Modal échec pour commentaire -->
<div
  v-if="modalCommentFail"
  class="fixed inset-0  px-5 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-60 z-50"
>
  <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
    <h2 class="text-2xl font-bold mb-4 text-red-600">❌ Échec de l’envoi</h2>
    <p class="text-gray-700 mb-6">Une erreur est survenue. Veuillez réessayer.</p>
    <button
      class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      @click="modalCommentFail = false"
    >
      Fermer
    </button>
  </div>
</div>
<FooterComp />

  </div>
</template>
<script>
import axios from 'axios';
import NavbarComp from '../components/Navbar.vue';
import FooterComp from '../components/Footer.vue';

export default {
  name: 'EventDetails',
  components: {
    NavbarComp,
    FooterComp,
  },
  data() {
    return {
      event: null,
      utilisateur:[],
      contenu: [],
      ouvrirModal: false,
      paiementEchoue: false,
      paiementReussi: false,
      note: 1 , // ou note: 1 pour une valeur par défaut
      tickets: [],
      ticketSelectionne: null, // 🆕 Ticket actuellement sélectionné
      ticketId: null,
      ticketType: '',
      error: '',
      form: {
        nom: '',
        email: '',
        telephone: null,
        montant: 2000, // Montant par défaut

        // ticket_id: null, 
    },
    loading: false,
    modalCommentSuccess: false,
    modalCommentFail: false,

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
  
  methods: {
    async fetchUser(){
    const options = {
      method: 'GET',
      url: '/auth/me',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      this.utilisateur = data.user
    } catch (error) {
      console.error(error);
    }
    },
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
                const ticketResponse = await axios.get(`/organisateur/ticket `, {
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
              async fetchComments(){
                const token = localStorage.getItem('access_token');
                console.log("Token envoyé :", token);
                let eventId = this.$route.params.id;

                // Convertir l'ID en entier pour éviter l'erreur SQL
                eventId = parseInt(eventId, 10);

                if (isNaN(eventId)) {
                  console.error("ID de l'événement invalide :", eventId);
                  return;
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
              afficherPopupEchec() {
                this.paiementEchoue = true;
                setTimeout(() => {
                  this.paiementEchoue = false;
                }, 3000); // 10 secondes
              },
              fermerPopupEchec() {
                this.paiementEchoue = false;
              },
                  afficherPopupSucces() {
                this.paiementReussi = true;
                setTimeout(() => {
                  this.paiementReussi = false;
                }, 3000); // 10 secondes
              },
              fermerPopupSucces() {
                this.paiementReussi = false;
              },
                payerTicket(ticket) {
                  // Affiche le formulaire de paiement pour le ticket sélectionné
                  this.ticketId = ticket.id;
                  this.ticketType = ticket.type;
                  this.form.montant = ticket.prix; // optionnel : tu adaptes le montant automatiquement
                  this.ouvrirModal = true;
                },

                 envoyerPaiement() {
                  // Exemple de génération de données personnalisées
                  // this.utilisateurid = `Bearer ${localStorage.getItem('access_token')}`; // ou localStorage.getItem('user_id'), etc.
                  // this.ticketId = this.ticketId,// ID du plan sélectionné
                  this.type = this.ticketType
                  this.reference = 'REF-' + Date.now(); // Générer une référence unique
                  console.log('Formulaire soumis :', this.form);
                if (!window.FedaPay) {
                  alert("FedaPay n'est pas chargé !");
                  return;
                }
                  window.FedaPay.init({
                          public_key: "pk_sandbox_zRwf7maxW0LdhJ_gnJ7jNVEB",
                          transaction: {
                            amount: parseInt(this.form.montant, 10),
                            currency: { iso: "XOF" },
                            description: "Achat de billet pour l'évènement "   + " type : " + this.ticketType + " par " + this.form.nom,
                            custom_metadata :{
                              type :'Billet',
                              user_id : this.utilisateur.id,
                              ticket_id: this.ticketId,
                              reference : this.reference
                            }        
                          },
                          customer: {
                            lastname: this.form.nom,
                            email: this.form.email,
                            phone_number: {
                              number: this.form.telephone,
                              country: "BJ"
                            },
                          },
                          onComplete: (response) => {
                          console.log("Réponse complète :", response);
                          const status = response?.transaction?.status;

                          if (status === "approved") {
                            this.afficherPopupSucces();
                          } else {
                            this.afficherPopupEchec(); // 👉 afficher popup échec si non approuvé
                          }

                          this.showModal = false;
                        },
                        onError: (error) => {
                          console.error("Erreur de paiement : ", error);
                          this.afficherPopupEchec(); // 👉 afficher popup échec en cas d’erreur
                        },
                        onClose: () => {
                          console.log("Paiement annulé ou fermé.");
                          this.afficherPopupEchec(); // 👉 considérer comme échec si l’utilisateur ferme
                        },
                          onError: (error) => {
                            console.error("Erreur de paiement : ", error);
                            alert("Une erreur est survenue pendant le paiement.");
                          },
                          onClose: () => {
                            console.log("Paiement annulé ou fermé.");
                          }
                        }).open(); // ✅ la bonne façon
                          // Facultatif : tu peux masquer le modal après ouverture si tu veux
                          // this.showModal = false;
                  
                },
                // fermerModalEtNotifier() {
                //   this.ouvrirModal = false;
                //   this.ticketId = null;
                //   this.form = {
                //     nom: this.nom,
                //     prenom: this.prenom,
                //     telephone: this.telephone
                //   };
                // },
                async getPositionEtEnvoyer() {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(async (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        console.log("Position détectée :", latitude, longitude);

                        // Envoi au backend
                        const token = localStorage.getItem('access_token');

                        try {
                          const response = await axios.post(
                            '/evenements/proches',
                            { latitude, longitude },
                            {
                              headers: {
                                Accept: 'application/json',
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );

                          this.popularConcerts = response.data.evenements; // si ton backend renvoie ça
                        } catch (error) {
                          console.error("Erreur lors de l’envoi des coordonnées :", error);
                        }
                      },
                      (error) => {
                        console.error("Erreur de géolocalisation :", error.message);
                      });
                    } else {
                      console.error("La géolocalisation n’est pas supportée par ce navigateur.");
                    }
                  },
                  async submitComment() {
                    this.loading = true;
                    this.error = '';
                    this.succes = '';
                    this.modalCommentSuccess = false;
                    this.modalCommentFail = false;

                    let eventId = parseInt(this.$route.params.id, 10);
                    const token = localStorage.getItem('access_token');

                    try {
                      const response = await axios.post(
                        `/evenements/${eventId}/commentaires`,
                        {
                          contenu: this.contenu,
                          note: this.note,
                        },
                        {
                          headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      this.comments.unshift(response.data);
                      this.contenu = '';
                      this.note = '';
                      console.log('Note envoyée :', this.note);
                      this.modalCommentSuccess = true;
                    } catch (e) {
                      console.error(e);
                      this.modalCommentFail = true;
                    } finally {
                      this.loading = false;
                    }
                  },

              // async MessagebilletAcheté(){
              //         const options = {
              //           method: 'GET',
              //           url: '/billet/webhook',
              //           headers: {
              //             Accept: 'application/json',
              //             Authorization: `Bearer ${token} `  
              //           }
              //         };

              //         try {
              //           const { data } = await axios.request(options);
              //           console.log(data);
              //           const message = data.message
              //           const billet = data.billet
              //           const qr_code = data.qr_code
              //           if (data) {
              //             console.log(data.message);
              //             console.log(data.billet);
              //             console.log(data.qr_code);
                          
              //           } else {
              //             alert("Une erreur est survenue. L'URL de paiement est introuvable.")
              //           }
              //         } catch (error) {
              //           console.error(error);
              //         }               

              // },
              
                      

              formatDate(dateStr) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    return new Date(dateStr).toLocaleDateString('fr-FR', options);
               },
                          
              },
               async mounted(){
                this.fetchEvents();
                this.recup();
                this.fetchComments();
                this.fetchUser();
                this.getPositionEtEnvoyer(); // <- appel ici

                // this.envoyerPaiement();

               }, 
};
</script>
