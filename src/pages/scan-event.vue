<template>
    <div>
      <DefaultLayoutOrganisateur>
        <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 class="text-2xl font-bold mb-6">Scanner un billet</h1>
          <button @click="ouvrirScan" class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
            📷 Lancer le scan
          </button>
  
          <!-- 🟡 Modale Scan -->
          <div v-if="showScanner" class="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
            <div class="bg-white p-4 rounded shadow-lg w-[90%] max-w-md">
              <h2 class="text-lg font-semibold mb-2">Scannez le QR Code</h2>
              <div id="reader" style="width: 300px; height: 300px;" class="border border-gray-400 rounded"></div>
              <div class="text-right mt-4">
                <button @click="fermerScan" class="text-sm text-red-500">Annuler</button>
              </div>
            </div>
          </div>
  
          <!-- 🔵 Modale Résultat -->
          <div v-if="showResult" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div class="bg-white p-5 rounded-lg shadow-md w-[90%] max-w-md text-center">
              <h2 class="text-xl font-bold mb-2">Résultat du Scan</h2>
              <p class="mb-2" :class="{
                'text-green-600': result.status === 'valide',
                'text-yellow-600': result.status === 'utilisé',
                'text-red-600': result.status === 'invalide'
              }">{{ result.message }}</p>
  
              <div v-if="result.billet" class="text-sm text-gray-600 mt-2">
                Event ID: {{ result.billet.event_id }}<br />
                Évènement: {{ result.billet.event }}
              </div>
  
              <button @click="fermerResult" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">OK</button>
            </div>
          </div>
        </div>
      </DefaultLayoutOrganisateur>
  
      <!-- 💡 Flash visuel -->
      <div v-if="flash" class="fixed inset-0 bg-white opacity-80 animate-fade z-[9999]"></div>
    </div>
  </template>
  
  <script setup>
import { ref, onUnmounted } from 'vue'
import { Html5Qrcode } from "html5-qrcode"
import DefaultLayoutOrganisateur from './DefaultLayoutOrganisateur.vue'

// 📦 Références réactives
const showScanner = ref(false)
const showResult = ref(false)
const result = ref({})
const flash = ref(false)
const eventId = 12
let scannerInstance = null

// 🎯 Fonctions principales
const ouvrirScan = () => {
  showScanner.value = true
  setTimeout(initScanner, 200)
}

const fermerScan = () => {
  stopScanner()
  showScanner.value = false
}

const fermerResult = () => {
  result.value = {}
  showResult.value = false
}

const stopScanner = () => {
  if (scannerInstance) {
    scannerInstance.stop().then(() => {
      scannerInstance.clear()
      scannerInstance = null
    })
  }
}

const initScanner = () => {
    scannerInstance = new Html5Qrcode("reader")
    scannerInstance.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      stopScanner()
      verifierQrCode(decodedText)
      showScanner.value = false
    },
    (error) => {
      console.warn("Erreur scan :", error)
    }
  )
}

const jouerSon = (type) => {
  const audio = new Audio()
  audio.src = type === 'success' ? '/sounds/success.mp3' : '/sounds/error.mp3'
  audio.play()
}

const verifierQrCode = async (code) => {
  flash.value = true
  setTimeout(() => { flash.value = false }, 600)
  if (navigator.vibrate) navigator.vibrate(200)

  try {
    const response = await fetch(`/events/${eventId}/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ qr_code: code })
    })

    const data = await response.json()

    if (data.success) {
      jouerSon('success')
      result.value = {
        status: 'valide',
        message: "✅ Billet scanné avec succès",
        billet: data.billet
      }
    } else {
      jouerSon('error')
      let status = 'invalide'
      if (data.message.includes('déjà')) status = 'utilisé'
      if (response.status === 405) status = 'invalide'

      result.value = {
        status,
        message: `❌ ${data.message}`,
        billet: null
      }
    }

    showResult.value = true
  } catch (error) {
    jouerSon('error')
    result.value = {
      status: 'invalide',
      message: 'Erreur réseau ou serveur.',
      billet: null
    }
    showResult.value = true
  }
}

// Nettoyage si besoin
onUnmounted(() => {
  stopScanner()
})
</script>
