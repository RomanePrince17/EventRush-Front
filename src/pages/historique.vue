<template>
    <div>
        <DefaultLayoutOrganisateur>
            <P class="text-[#282831] mb-6">Ici vous pouvez Voir l'historique des souscriptions</P>
            <h2 class="text-[#2F32A6] mb-6 mb-2">Historique des souscriptions</h2>
            <ul v-if="historique.length">
          <li v-for="(his, index) in historique" :key="index" class="mb-4 p-1 text-sm bg-white rounded shadow">
            <p class="text-[#282831]">{{ his.statut}}</p>
            <p>{{ his.date_debut }}</p>
            <p>{{ his.methode }}</p>
            <p>{{ his.statut_paiement }}</p>
            <p>{{ his.montant }}</p>
            <p>{{ his.reference }}</p>
            <p>{{ his.plan }}</p>
            <p>{{ his.utilisateur_nom }}</p>
            <p>{{ his.methode }}</p>



          </li>
        </ul>
        <p v-else class="text-gray-500">Chargement...</p>
            
         </DefaultLayoutOrganisateur>

    </div>
</template>
<script>
import axios from 'axios';
import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue'
export default {
    name:'HistoriquePage',
    components:{
        DefaultLayoutOrganisateur
    },
    data() {
    return {
        historique:[],
     
    }
  },
    async mounted(){
        const token = localStorage.getItem('access_token')
        console.log("Token envoyé :", token)
        const options = {
        method: 'GET',
        url: 'souscriptions/history',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
        };

        try {
        const response = await axios.request(options);
        this.historique = response.data;
        } catch (error) {
        console.error(error);
        }

    }

}
</script>