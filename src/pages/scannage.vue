<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4 text-center">🎟 Afficher un billet</h1>

    <!-- Liste de boutons (pour tester différents IDs de billets) -->
    <div class="flex flex-wrap justify-center gap-2 mb-6">
      <button
        v-for="n in 51"
        :key="n"
        @click="fetchBillet(n)"
        class="bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
      >
        {{ n }}
      </button>
    </div>

    <!-- Détails du billet -->
    <div v-if="billet" class="max-w-4xl mx-auto bg-white shadow p-4 rounded-lg">
      <h2 class="text-lg font-semibold text-center mb-2">🎫 Billet #{{ billet.reference }}</h2>

      <!-- Détails -->
      <div class="mt-4 text-center text-sm text-gray-700">
        <p>🎤 Événement : <strong>{{ billet.event.titre }}</strong></p>
        <p>🎟 Type : {{ billet.type_ticket }}</p>
        <p>💰 Montant : {{ billet.montant }} FCFA</p>
      </div>
    </div>

    <!-- Image + QRCode -->
    <div v-if="billet" class="flex justify-center mt-4">
      <div class="flex items-center gap-6">
        <!-- Image -->
        <div>
          <img
            :src="billet.image"
            alt="Ticket"
            class="w-40 rounded shadow"
          />
        </div>

        <!-- QR Code -->
        <div>
          <qrcode-vue :value="billet.qr_code" :size="100" />
        </div>
      </div>
    </div>

    <!-- Messages -->
    <p v-if="loading" class="text-center text-gray-500 mt-6">Chargement...</p>
    <p v-if="error" class="text-center text-red-600 mt-6">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue' // Installe avec : npm install qrcode.vue

const billet = ref(null)
const loading = ref(false)
const error = ref('')

async function fetchBillet(billetId) {
  billet.value = null
  loading.value = true
  error.value = ''

  try {
    // ⚠️ Corriger l’URL ici (back-end réel à utiliser)
    const response = await fetch(`https://digitstage.online/api/events/billet/${billetId}`)

    if (!response.ok) throw new Error("Impossible de charger les données")

    const data = await response.json()

    // Si tes données sont dans data.data :
    billet.value = data.data

    // Vérifie dans la console :
    console.log("Billet reçu :", billet.value)
  } catch (err) {
    error.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
button {
  transition: 0.2s;
}
</style>
