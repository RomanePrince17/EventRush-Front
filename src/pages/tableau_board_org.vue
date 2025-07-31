<template>
    <DefaultLayoutOrganisateur>
      <div class="p-6 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Cartes dynamiques -->
          <div class="bg-white p-6 rounded-2xl shadow text-center">
            <div class="text-4xl mb-2">📅</div>
            <div class="text-xl font-bold">{{ totalEvenements }}</div>
            <div class="text-gray-600">Événements totaux</div>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow text-center">
            <div class="text-4xl mb-2">⏳</div>
            <div class="text-xl font-bold">{{ evenementsPasses }}</div>
            <div class="text-gray-600">Événements passés</div>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow text-center">
            <div class="text-4xl mb-2">📆</div>
            <div class="text-xl font-bold">{{ evenementsAVenir }}</div>
            <div class="text-gray-600">Événements à venir</div>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow text-center">
            <div class="text-4xl mb-2">🔥</div>
            <div class="text-xl font-bold">{{ evenementsEnCours }}</div>
            <div class="text-gray-600">Événements en cours</div>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow text-center">
            <div class="text-4xl mb-2">🎫</div>
            <div class="text-xl font-bold">{{ totalTickets }}</div>
            <div class="text-gray-600">Total tickets</div>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow text-center">
            <div class="text-4xl mb-2">✅</div>
            <div class="text-xl font-bold">{{ ticketsVendus }}</div>
            <div class="text-gray-600">Tickets vendus</div>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow text-center">
            <div class="text-4xl mb-2">📉</div>
            <div class="text-xl font-bold">{{ ticketsRestants }}</div>
            <div class="text-gray-600">Tickets restants</div>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow text-center">
            <div class="text-4xl mb-2">💰</div>
            <div class="text-xl font-bold">{{ chiffreAffaire.toFixed(2) }} €</div>
            <div class="text-gray-600">Chiffre d'affaires</div>
          </div>
        </div>
      </div>
    </DefaultLayoutOrganisateur>
  </template>
  
  <script>
  import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue'
  
  export default {
    name: 'DashboardPage',
    components: {
      DefaultLayoutOrganisateur
    },
    data() {
      return {
        totalEvenements: 0,
        evenementsPasses: 0,
        evenementsAVenir: 0,
        evenementsEnCours: 0,
        totalTickets: 0,
        ticketsVendus: 0,
        ticketsRestants: 0,
        chiffreAffaire: 0
      }
    },
    mounted() {
      this.chargerStatistiques()
    },
    methods: {
      async chargerStatistiques() {
        try {
          const [resEvents, resTickets] = await Promise.all([
            fetch('/organisateur/events'),
            fetch('/organisateur/ticket')
          ])
  
          const eventsData = await resEvents.json()
          const ticketsData = await resTickets.json()
  
          const events = eventsData.data || []
          const tickets = ticketsData.tickets || []
  
          const now = new Date()
  
          this.totalEvenements = events.length
          this.evenementsPasses = events.filter(e => new Date(e.date_fin) < now).length
          this.evenementsAVenir = events.filter(e => new Date(e.date_debut) > now).length
          this.evenementsEnCours = events.filter(e =>
            new Date(e.date_debut) <= now && new Date(e.date_fin) >= now
          ).length
  
          this.totalTickets = tickets.length
          this.ticketsRestants = tickets.reduce((sum, t) => sum + (t.quantite_restante || 0), 0)
          this.ticketsVendus = this.totalTickets - this.ticketsRestants
  
          this.chiffreAffaire = tickets.reduce((total, t) => {
            const vendu = (t.quantite_restante === 0 || t.quantite_restante === null)
            return vendu ? total + (t.prix || 0) : total
          }, 0)
  
        } catch (error) {
          console.error("Erreur lors du chargement des statistiques :", error)
        }
      }
    }
  }
  </script>
  