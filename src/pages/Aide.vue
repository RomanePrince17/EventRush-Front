<template>
    <DefaultLayout>
        <h2 class="text-[#282831] mb-2 ">Chère Sylvie,</h2>
        <P class="text-[#282831] mb-15">Comment pouvons-nous vous aider?</P>
        <div class="  max-w-screen-xl mx-auto">
    <h1 class="-mt-10 text-[#2F32A6] text-xl mb-4 md:mb-10">Service Client</h1>
    <p class="mb-4">Comment pouvons-nous vous aider ?</p>
    <p class="mb-4">
      Vous avez une question ? Nous avons peut-être déjà la réponse ! Consultez notre Foire aux questions (FAQ) ci-dessous.
    </p>

    <h1 class="text-[#2F32A6] text-xl mb-6 md:mb-10">Questions fréquemment posées</h1>

    <div class="space-y-4">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="rounded-xl bg-[rgba(240,240,242,1)]"
      >
        <button
          class="w-full text-left px-6 py-4 flex justify-between items-center"
          @click="toggle(index)"
        >
          <span class="font-medium">{{ faq.question }}</span>
          <img src="../assets/icones/check.png" alt="">
        </button>
        <div v-if="activeIndex === index" class="px-6 pb-4 text-gray-700">
          {{ faq.answer }}
        </div>
      </div>
    </div>

    <div class="mt-10">
      <h1 class="text-[#2F32A6] text-xl mb-4">Vous ne trouvez pas ce que vous cherchez ?</h1>
      <h1 class="text-[#2F32A6] text-xl mb-10">
        Notre centre d’entraide est l’endroit le plus rapide pour obtenir de l’aide.
      </h1>
    </div>

    <section class="py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="mailto:romangbehoun@gmail.com"
          class="flex flex-col items-center bg-[rgba(240,240,242,1)] shadow-lg rounded-2xl p-6 hover:bg-gray-700 transition duration-300"
        >
          <img src="@/assets/icones/email.png" alt="Email Icon" class="w-16 h-16 mt-2 mb-4" />
          <h3 class="text-lg text-black">Email</h3>
        </a>

        <button
          @click="toggleChat"
          class="flex flex-col items-center bg-[rgba(240,240,242,1)] shadow-lg rounded-2xl p-6 hover:bg-gray-700 transition duration-300"
        >
          <img src="@/assets/icones/group.png" alt="Live Chat Icon" class="w-16 h-16 mt-2 mb-4" />
          <h3 class="text-lg text-black">Live Chat</h3>
        </button>

        <a
          href="#"
          class="flex flex-col items-center bg-[rgba(240,240,242,1)] shadow-lg rounded-2xl p-6 hover:bg-gray-700 transition duration-300"
        >
          <img src="@/assets/icones/cel.png" alt="Call Icon" class="w-16 h-16 mt-2 mb-4" />
          <h3 class="text-lg text-black">Appelez-nous</h3>
        </a>
      </div>
    </section>

    <!-- Live Chat -->
    <div v-if="open" class="fixed bottom-4 right-4 w-11/12 md:w-80 bg-white border border-gray-300 shadow-xl rounded-lg p-4 z-50">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold text-gray-800">Assistant virtuel</h3>
        <button @click="open = false" class="text-gray-500 hover:text-red-500">✕</button>
      </div>

      <div class="h-40 overflow-y-auto text-sm text-gray-700 mb-2">
        <div v-for="(msg, index) in messages" :key="index" class="mb-1">
          <p class="font-semibold text-blue-600">Vous : {{ msg.question }}</p>
          <p class="text-gray-700">Assistant : {{ msg.answer }}</p>
        </div>
      </div>

      <form @submit.prevent="sendMessage">
        <input
          v-model="userInput"
          type="text"
          placeholder="Écrivez ici..."
          class="w-full border rounded-md p-2 text-sm focus:outline-none"
        />
      </form>
    </div>
  </div>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from './DefaultLayout.vue';

export default {
    name:'AidePage',
    components:{
        DefaultLayout,
    },
    data() {
      return {
          activeIndex:null,//index ouvert
        faqs: [
        {
          question: "Q : Quand pourrai-je avoir mon ticket ?",
          answer: "Votre ticket sera envoyé par email dès que votre commande sera confirmée. Cela peut prendre quelques minutes. Pensez à vérifier vos spams.",
          open: false,
          },
          {
          question: "Q : Où est mon billet ?",
          answer: "Si vous avez déjà passé commande, votre billet a été envoyé par email. Vérifiez votre boîte de réception ainsi que vos spams. Si vous ne le trouvez toujours pas, contactez-nous.",
          open: false,
          },
          {
          question: "Q : Comment et quand vais-je recevoir mon argent ?",
          answer: "Le remboursement est effectué via le mode de paiement original, sous 5 à 10 jours ouvrés après validation. Vous recevrez un email de confirmation dès que le processus est lancé.",
          open: false,
          },
          {
          question: "Q : Comment puis-je annuler ma commande ?",
          answer: "Vous pouvez annuler votre commande en nous contactant via notre formulaire ou par mail, tant qu'elle n'a pas encore été expédiée.",
          open: false,
          },
          {
          question: "Q : Quand recevrai-je mes billets ?",
          answer: "Les billets sont envoyés par email peu après la confirmation de votre commande. Si vous ne les recevez pas dans l’heure, contactez notre support.",
          open: false,
          }
              ],
              open: false,  // Permet d'ouvrir/fermer la fenêtre de chat
              userInput: '',  // Contenu du message de l'utilisateur
              messages: [],  // Liste des messages échangés
              responses: {
              "bonjour": "Bonjour ! Comment puis-je vous aider ?",
              "où est mon billet": "Vous pouvez retrouver votre billet dans l'espace 'Mes commandes'.",
              "annuler commande": "Vous pouvez annuler votre commande dans les 24h via le formulaire.",
              "quand vais-je recevoir mon argent": "Votre argent est envoyé dans les 2 à 5 jours ouvrables après traitement."
              }
          }
  },
  
      methods: {
          toggle(index) {
          this.activeIndex = this.activeIndex === index ? null : index;
          },
          toggleChat() {
          this.open = !this.open  // Change l'état de la fenêtre de chat (ouverte/fermée)
        },
        sendMessage() {
          const question = this.userInput.toLowerCase().trim()
          const answer = this.responses[question] || "Désolé, je n'ai pas compris. Veuillez reformuler."
          this.messages.push({ question: this.userInput, answer })
          this.userInput = ''  // Réinitialiser l'input de l'utilisateur après l'envoi
        }
      }
    }
</script>

  
 
  
  
