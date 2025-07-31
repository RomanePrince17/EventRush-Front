<template>
    <DefaultLayoutOrganisateur>
      <p class="text-[#282831] mb-6 text-base sm:text-lg">
        Voici la liste de vos scanneurs
      </p>
  
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 class="text-[#2F32A6] text-lg sm:text-2xl mb-2 sm:mb-0">Liste des scanneurs</h2>
      </div>
  
      <div v-if="scanneurs.length === 0" class="text-center py-10">
        Scanneurs en cours de chargement...
        <p class="text-[#2F32A6]">Patientez...</p>
      </div>
  
      <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-100 text-gray-700 whitespace-nowrap">
            <tr>
              <th class="px-4 py-2">Titre de l'évènement</th>
              <th class="px-4 py-2">Nom scanneurs</th>
              <th class="px-4 py-2">email</th>
            </tr>
          </thead>
          <tbody>
              <template v-for="(event, index) in scanneurs" :key="index">
                <tr v-for="scan in event.scanneurs" :key="scan.id" class="border-t">
                  <td class="px-4 py-2">{{ event.titre }}</td>
                  <td class="px-4 py-2">{{ scan.name }}</td>
                  <td class="px-4 py-2">{{ scan.email }}</td>
                  
                  
                </tr>
              </template>
            </tbody>
        </table>
      </div>
  
    </DefaultLayoutOrganisateur>
  </template>
  
  <script>
  import axios from 'axios';
  import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue';
  
  export default {
    name: 'ListeScanneurs',
    components: {
      DefaultLayoutOrganisateur,
    },
    data() {
      return {
        scanneurs:[]
        
      };
    },
    methods: {
      async fetchScanneurs() {
        
        const token = localStorage.getItem('access_token');
        if (!token) return;
        
        const options = {
          method: 'GET',
          url: '/organisateur/scanneurs/index',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        };

        try {
          const { data } = await axios.request(options);
          console.log(data);
          this.scanneurs = data
          console.log(this.scanneurs)
        } catch (error) {
          console.error(error);
        }}
    },
    mounted() {
      this.fetchScanneurs();
    },
  };
  </script>
  