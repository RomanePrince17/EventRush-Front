<template>
  <div>
    <Navbar/>
    <br><br>
    <ContactComp />
  </div>
  <FooterComp/>

</template>

<script>
import Navbar from '../components/Navbar.vue';
import FooterComp from '../components/Footer.vue';
import ContactComp from '../components/Contact.vue';

export default {
name:'ContactPage',
components:{
    Navbar,
    FooterComp,
    ContactComp
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

