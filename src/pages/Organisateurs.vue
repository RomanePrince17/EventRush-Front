<template>
  <div>
    <Navbar />

    <div class="lg:mt-38 mt-28">
      <!-- Section Organisateurs -->
      <div class="ml-7 md:mb-30 px-5 flex flex-wrap md:gap-30 gap-5 md:ml-16 mt-90">
        
        <section class="mb-9 md:-mt-30 -mt-40 mr-9 w-full">
          <!-- Chargement -->
          <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 -ml-8 mb-9">
            <SkeletonCard v-for="n in 4" :key="'skeleton-upcoming-' + n" />
          </div>

          <!-- Affichage des organisateurs -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-10 gap-8 ml-3">
            <div
              v-for="(orga, index) in visibleOrganisateurs"
              :key="index"
              class="shadow-lg rounded-2xl overflow-hidden bg-white transition hover:shadow-xl cursor-pointer transform hover:scale-105 duration-300"
            >
              <router-link to="/ticket">
                <!-- Avatar -->
                <img
                  :src="orga.avatar || '/default-avatar.png'"
                  alt="Photo de profil"
                  class="w-full aspect-square object-cover rounded-t-2xl"
                />

                <!-- Infos -->
                <div class="text-center m-5">
                  <strong class="block text-lg text-[#2F32A6] truncate">{{ orga.nom }}</strong>
                  <p class="text-gray-600 text-sm truncate">{{ orga.email }}</p>
                  <p class="text-gray-500 text-xs italic">{{ orga.date || '' }}</p>
                </div>
              </router-link>
            </div>
          </div>

          <!-- Bouton Voir Plus -->
          <div v-if="!loading && organisateurs.length > visibleCount" class="w-full flex justify-center mt-8">
            <button
              @click="loadMore"
              class="bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-700 transition"
            >
              Voir plus
            </button>
          </div>
        </section>

        <!-- Section Appel à l'action -->
        <div class="items-center md:mb-20 mb-30 text-center w-full -mt-16 mr-13 mx-4 bg-[rgba(240,240,242,1)] pt-16 shadow-lg rounded-lg">
          <p class="mb-6 px-4 py-6 rounded-lg text-gray-700">
            Vous voulez publier des évènements et vendre des tickets ?
            Alors qu'attendez-vous pour devenir un organisateur ?
          </p>
          <router-link to="/ma_souscription">
            <button class="bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-700 transition">
              Souscription
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <FooterComp />
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import FooterComp from '../components/Footer.vue'
import SkeletonCard from '../components/SkeletonCard.vue'

export default {
  name: 'OrganisateursPage',
  components: {
    Navbar,
    FooterComp,
    SkeletonCard
  },
  data() {
    return {
      organisateurs: [],
      loading: true,
      visibleCount: 20 // nombre initial visible
    }
  },
  computed: {
    visibleOrganisateurs() {
      // Retourne la tranche des organisateurs à afficher
      return this.organisateurs.slice(0, this.visibleCount)
    }
  },
  mounted() {
    this.fetchOrganisateurs()
  },
  methods: {
    async fetchOrganisateurs() {
      const token = localStorage.getItem('access_token')

      try {
        const response = await axios.get('/admin/user/index', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        const allUsers = response.data.utilisateurs || []

        this.organisateurs = allUsers
          .filter(user => user.role === 'organisateur')
          .map(user => ({
            nom: user.nom,
            email: user.email,
            avatar: user.avatar || null,
            date: user.created_at ? new Date(user.created_at).toLocaleDateString() : ''
          }))

      } catch (error) {
        console.error('Erreur lors de la récupération des organisateurs :', error)
      } finally {
        this.loading = false
      }
    },
    loadMore() {
      // Charge 20 organisateurs supplémentaires
      this.visibleCount += 20
    }
  }
}
</script>

<style scoped>
/* Ajoute un effet d'agrandissement au hover déjà présent */
</style>
