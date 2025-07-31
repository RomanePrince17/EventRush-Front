<template>
    <footer class="bg-gray-800 text-white py-6">
      <div class=" container mx-auto px-4 md:px-19">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <!-- Colonne 1: Newsletter et Boutons Store -->
          <div class="space-y-4">
            <p class="hover:text-gray-400">Restons en contact</p>
            <p class="hover:text-gray-400">Restez informé des dernières nouvelles de EventRush et des offres exclusives !</p>
            <div class="relative w-full">
              <input
                type="email"
                placeholder="Entrez votre email"
                class="w-full h-[48px] px-3 pr-36 rounded-full border border-gray-300 text-black bg-white"
              />
              <button class="absolute top-1/2 right-3  transform -translate-y-1/2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-full text-sm">
                S'abonner 
              </button>
            </div>
            <p>En vous abonnant, vous acceptez nos termes et conditions ainsi que notre politique de confidentialité</p>
            <div class="flex gap-4 mt-6">
              <!-- Play Store Button -->
              <a href="#" class="flex items-center bg-white text-white px-4 py-2 rounded-lg">
                <img src="../assets/images/icons/google-paly.png" alt="Play Store" class="w-6 h-6 mr-2" />
                <div class="text-left">
                  <p class="text-xs leading-none text-gray-500">DISPONIBLE SUR</p>
                  <p class="text-sm font-bold text-gray-500">Google Play</p>
                </div>
              </a>
              <!-- App Store Button -->
              <a href="#" class="flex items-center bg-white text-white px-4 py-2 rounded-lg">
                <img src="../assets/images/icons/apple.png" alt="App Store" class="w-6 h-6 mr-2" />
                <div class="text-left">
                  <p class="text-xs leading-none text-gray-500">Téléchargez sur le</p>
                  <p class="text-sm font-bold text-gray-500">App Store</p>
                </div>
              </a>
            </div>
          </div>
  
          <!-- Colonne 2: Liens de navigation -->
          <div class="lg:pl-27 ">
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-gray-400">Concert Hub</a></li>
              <li><a href="#" class="hover:text-gray-400">À propos de nous</a></li>
              <li><a href="#" class="hover:text-gray-400">Carrières</a></li>
              <li><a href="#" class="hover:text-gray-400">Presse</a></li>
              <li><a href="#" class="hover:text-gray-400">Organisateurs d'événements</a></li>
              <li><a href="#" class="hover:text-gray-400">Accès</a></li>
              <li><a href="#" class="hover:text-gray-400">Politique de confidentialité</a></li>
              <li><a href="#" class="hover:text-gray-400">Termes & Conditions</a></li>
            </ul>
          </div>
  
          <!-- Colonne 3: Support -->
          <div class="lg:pl-27 ">
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-gray-400">Besoin d'aide</a></li>
              <li><a href="#" class="hover:text-gray-400">FAQ</a></li>
              <li><a href="#" class="hover:text-gray-400">Centre d'aide</a></li>
              <li><a href="#" class="hover:text-gray-400">Contactez-nous</a></li>
              <li><a href="#" class="hover:text-gray-400">Service client</a></li>
            </ul>
          </div>
  
          <!-- Colonne 4: Liens supplémentaires -->
          <div class="lg:pl-27 ">
            <ul class="space-y-2 ">
              <li><a href="#" class="hover:text-gray-400">Besoin de plus d'infos</a></li>
              <li><a href="#" class="hover:text-gray-400">Concerts annulés</a></li>
              <li><a href="#" class="hover:text-gray-400">Assurance annulation</a></li>
              <li><a href="#" class="hover:text-gray-400">Événements reprogrammés</a></li>
            </ul>
          </div>
  
        </div>
  
        <!-- Icônes des réseaux sociaux -->
        <div class="flex gap-4 mt-8 justify-center">
          <a href="#" class="hover:text-gray-400"><img class="w-6 h-6" src="../assets/images/medias/instagram.png" alt="Instagram" /></a>
          <a href="#" class="hover:text-gray-400"><img class="w-6 h-6" src="../assets/images/medias/youtube.png" alt="YouTube" /></a>
          <a href="#" class="hover:text-gray-400"><img class="w-6 h-6" src="../assets/images/medias/x.png" alt="X" /></a>
          <a href="#" class="hover:text-gray-400"><img class="w-6 h-6" src="../assets/images/medias/spotify.png" alt="Spotify" /></a>
          <a href="#" class="hover:text-gray-400"><img class="w-6 h-6" src="../assets/images/medias/facebook.png" alt="Facebook" /></a>
        </div>
  
        <!-- Copyright -->
        <div class="text-center mt-6">
          <p class="text-sm text-gray-400">© 2025 EventRush Tous droits réservés</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComp'
  }
  </script>
  