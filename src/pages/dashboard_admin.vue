<template>
    <DefaultLayoutAdministrateur>
      <!-- Statistiques -->
      <div class="p-6 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Carte Utilisateurs -->
          <div class="bg-white p-6 rounded-2xl shadow text-center">
            <div class="text-4xl mb-2">👥</div>
            <div class="text-xl font-bold">{{ totalUsers }}</div>
            <div class="text-gray-600">Utilisateurs</div>
          </div>
  
          <!-- Carte Abonnés Actifs -->
          <div class="bg-white p-6 rounded-2xl shadow text-center">
            <div class="text-4xl mb-2">📈</div>
            <div class="text-xl font-bold">{{ activeSubscribers }}</div>
            <div class="text-gray-600">Abonnés actifs</div>
          </div>
  
          <!-- Carte Revenus -->
          <div class="bg-white p-6 rounded-2xl shadow text-center">
            <div class="text-4xl mb-2">💰</div>
            <div class="text-xl font-bold">{{ monthlyRevenue }} €</div>
            <div class="text-gray-600">Revenus mensuels</div>
          </div>
        </div>
      </div>
    </DefaultLayoutAdministrateur>
  </template>
  
  <script>
  import DefaultLayoutAdministrateur from './DefaultLayoutAdministrateur.vue'
  
  export default {
    name: 'DashboardPage',
    components: {
      DefaultLayoutAdministrateur
    },
    data() {
      return {
        totalUsers: 1240,
        activeSubscribers: 850,
        monthlyRevenue: 3200
      }
    }
  }
  </script>
  