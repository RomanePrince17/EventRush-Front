<template>
    <DefaultLayout>
        <h2 class="text-[#282831] mb-2 ">Salut! Sylvie,</h2>
        <P class="text-[#282831] mb-14">Vous trouverez ici tous vos paramètres</P>
        <h2 class="text-[#2F32A6] text-xl mb-6 ">Newsletter et notifications</h2>
        <P class="text-[#282831] mb-5">Activation</P>
        <div @click="toggle"
            class="w-14 h-8 mb-6 flex items-center rounded-full cursor-pointer transition-colors duration-300"
            :class="isActive ? 'bg-green-500' : 'bg-gray-300'">
            <div class="bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
                :class="isActive ? 'translate-x-6' : 'translate-x-1'">
            </div>
        </div>
        <h2 class="text-[#282831] mb-6 ">Inclure</h2>
        <div class="flex gap-4">
            <input type="checkbox">
            <p class="text-[#282831]">Newsletter Concert Hub</p>
        </div>
        <br>
        <div class="flex gap-4">
            <input type="checkbox">
            <p class="text-[#282831]">Newsletter Concert Hub</p>
        </div>  
        <br>
        <div class="flex gap-4 mb-15">
            <input type="checkbox">
            <p class="text-[#282831]">Newsletter Concert Hub</p>
        </div>  
        <h2 class="text-[#2F32A6] mb-6 ">Changer le mot de passe</h2>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe actuel</label>
                    <input type="text" id="first_name" class="border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:outline-none rounded-md p-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Entrer le mot de passe" required />
                </div>
                <div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nouveau mot de passe</label>
                    <input type="text" id="last_name" class="border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:outline-none rounded-md p-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Entrer le mot de passe" required />
                    <br>
                    <button type="submit" class=" mb-10 md:ml-80 text-white bg-[#FF0082]  focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enregistrer les modifications</button>
                </div>
                <h2 class="text-red-500 text-xl mb-6 ">Supprimer mon compte</h2>
            </div>

    </DefaultLayout>
</template>

<script>
import DefaultLayout from '../pages/DefaultLayout.vue'

export default {
    name:'SettingPage',
    components:{
        DefaultLayout
    },
    data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive
      // Tu peux ici appeler une API ou émettre un événement
      console.log('Switch activé ?', this.isActive)
    }
  }
   

}
</script>
  
 


