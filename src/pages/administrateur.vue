<template>
    <DefaultLayoutAdministrateur>
        <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Utilisateurs" :value="totalUsers" icon="👥" />
      <StatCard title="Abonnés actifs" :value="activeSubscribers" icon="📈" />
      <StatCard title="Revenus mensuels" :value="monthlyRevenue + ' €'" icon="💰" />
    </div> 
        <h2 class="text-[#282831] mb-2 ">Salut! Sylvie,</h2>
        <P class="text-[#282831] mb-6">Vous trouverez ici toutes les informations sur votre profil</P>
        <h2 class="text-[#2F32A6] mb-6 ">Modifiez votre profil</h2>
    </DefaultLayoutAdministrateur>
</template>
<script>
import DefaultLayoutAdministrateur from '../pages/DefaultLayoutAdministrateur.vue'
export default {
    name:'Administrateur',
    components:{
        DefaultLayoutAdministrateur
    }
}
</script>