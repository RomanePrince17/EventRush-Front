<template>
    <div>
      <DefaultLayoutOrganisateur>
        <p class="text-[#282831] mb-6">Ici vous pouvez voir toutes vos notifications</p>
        <h2 class="text-[#2F32A6] mb-6">Notifications</h2>
        <ul v-if="notifications.length">
          <li v-for="(notification, index) in notifications" :key="index" class="mb-4 p-1 bg-white text-sm rounded shadow">
            <p class="text-[#282831]">{{ notification.data.message || 'Notification reçue' }}</p>
          </li>
        </ul>
        <p v-else class="text-gray-500">Chargement...</p>
      </DefaultLayoutOrganisateur>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue'
  
  export default {
    name: 'NotificationPage',
    components: {
      DefaultLayoutOrganisateur
    },
    data() {
      return {
        notifications: [],
      }
    },
    async mounted() {
      const token = localStorage.getItem('access_token')
      console.log("Token envoyé :", token)  
      try {
        const response = await axios.get(
          '/notifications',
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        this.notifications = response.data.notifications
        console.log('Notifications récupérées :', this.notifications);
      } catch (error) {
        console.error('Erreur lors du chargement des notifications :', error.response?.data || error)
      }
    }
  }
  </script>
  
  <style scoped>
  /* Ajoute ici du style si tu veux personnaliser l'affichage */
  </style>
  