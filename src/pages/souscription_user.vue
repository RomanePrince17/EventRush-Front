<template>
    <div>
      <NavbarComp />
  
      <!-- Section Plans -->
      <section class="px-4 md:px-20 mb-30 py-10">
        <div class="flex justify-between items-center mb-6">
          <h2 class="lg:text-2xl text-xl font-semibold">Plans d’abonnement</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="p in plan"
            :key="p.id"
            class="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div>
              <h3 class="text-xl mb-17 font-bold text-center mb-2 text-gray-800">{{ p.nom }}</h3>
              <p class=" mb-17 text-sm text-center text-gray-500 mb-4" v-if="p.description">{{ p.description }}</p>
  
              <ul class="text-sm text-gray-700 space-y-1 mb-4">
                <li class="mb-17"><strong>Prix :</strong> {{ p.prix }} FCFA</li>
                <li class="mb-17"><strong>Durée :</strong> {{ p.duree_jours }} jours</li>
              </ul>
            </div>
  
            <button
              class="w-full mb-12 mt-auto py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
              @click="ouvrirModal(p)"
            >
              Souscrire
            </button>
          </div>
        </div>
  
        <div v-if="!plan || plan.length === 0" class="text-center text-gray-500 mt-10">
          <div  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            <SkeletonCard v-for="n in 4" :key="'skeleton-upcoming-' + n" />
          </div>        
        </div>
      </section>
  
      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 px-3 md:px-6 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-60 z-50">
        <div class="bg-white w-full max-w-md p-6 md:p-8 rounded-xl shadow-lg border relative">
                
  <h2 class="text-xl font-bold mb-4">
    <div class="flex">
      <p>Formulaire de Souscription</p>
            <button
                class=" ml-19 -mt-2 px-4 py-2 bg-pink-600 text-white "
                @click="showModal = false"
              >
                x
            </button>
    </div>
  </h2>
          <p v-if="planSelectionne">Plan choisi : {{ planSelectionne.nom }}</p>
          <form @submit.prevent="demarrerPaiement">
            <div class="mb-4">
              <label class="block mb-1">Nom complet</label>
              <input v-model="form.nom" type="text" class="w-full border rounded px-3 py-2" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Email</label>
              <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Téléphone</label>
              <input v-model="form.telephone" type="text" class="w-full border rounded px-3 py-2" />
            </div>
  
            <button
              class="bg-pink-600 text-white px-4 py-2  rounded"
              type="submit"
            >
              Payer
              
            </button>
          </form>
        </div>
      </div>
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

      <FooterComp />
  </template>
  
  
  <script>
import axios from 'axios'
import FooterComp from '../components/Footer.vue'
import NavbarComp from '../components/Navbar.vue'
import SkeletonCard from '../components/SkeletonCard.vue'

export default {
  name: 'UserSouscription',
  components: {
    FooterComp,
    NavbarComp,
    SkeletonCard 
  },
  data() {
    return {
      plan: null,
      paiementEchoue: false,
      paiementReussi: false,
      showModal: false,
      planSelectionne: null, // 🆕 Plan actuellement sélectionné
      utilisateur:[], // Contiendra les données utilisateur
      form: {
        nom: '',
        email: '',
        telephone: '',
        montant: 2000, // Montant par défaut

      }
    }
  },
  mounted() {
    this.fetchPlans();
    this.fetchUser();
  },
  methods: {
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
    ouvrirModal(plan) {
  this.planSelectionne = plan;
  this.form.montant = plan.prix; // optionnel : tu adaptes le montant automatiquement
  this.showModal = true;
},
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
    async fetchPlans() {
      try {
        const { data } = await axios.get('/souscriptions/plans', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        console.log(data);
        this.plan = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des plans :', error);
      }
    },
    soumettreFormulaire() {
      console.log('Formulaire soumis :', this.form);
      this.showModal = false;
    },
    demarrerPaiement() {
  // Exemple de génération de données personnalisées
      this.utilisateurid = `Bearer ${localStorage.getItem('access_token')}`; // ou localStorage.getItem('user_id'), etc.
      this.planid = this.planSelectionne.id,// ID du plan sélectionné
      this.reference = 'REF-' + Date.now(); // Générer une référence unique
      console.log('Formulaire soumis :', this.form);
  if (!window.FedaPay) {
    alert("FedaPay n'est pas chargé !");
    return;
  }
  window.FedaPay.init({
  public_key: "pk_sandbox_zRwf7maxW0LdhJ_gnJ7jNVEB",
  transaction: {
    amount: this.form.montant,
    currency: { iso: "XOF" },
    description: "Souscription Organisateur " + this.form.nom + " - " + this.planSelectionne.nom,
    custom_metadata :{
      type :'Souscription',
      user_id : this.utilisateur.id,
      plan_id: this.planSelectionne.id,
      reference : this.reference
    }        
  },
  customer: {
    firstname: this.form.nom,
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
}
  }
  
}
</script>

  