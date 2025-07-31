<template>
  <div>
    <DefaultLayout>
        <h2 class="text-[#282831] mb-2 ">Salut! Sylvie,</h2>
        <P class="text-[#282831] mb-15">Vous trouverez ici toutes les informations sur votre profil</P>
        <h2 class="text-[#2F32A6] mb-6 ">Entrez votre code</h2>
        <div class="relative w-full  md:w-[400px] mb-15 ">
                    <input
                            type="email"
                            placeholder="Entrez le code "
                            class=" w-[490px] w-full h-[48px] px-4  rounded-full border border-gray-300 text-black bg-white "
                    />
                    <button class="absolute top-1/2 md:-ml-42 -ml-32 transform -translate-y-1/2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-full md:text-sm text-[9px]">
                      Enregistrer le code
                    </button>
        </div>
        <h2 class="text-[#2F32A6] mb-6">Vos bons d'achat</h2>
        <div class="grid grid-cols-1 md:grid-cols-3  w-full bg-[rgba(240,240,242,1)] shadow-lg rounded-2xl  h-100 ">
          
          <a href="mailto:romangbehoun@gmail.com" class="   pl-30 items-center rounded-2xl p-6 ">
            <img src="../assets/icones/bro.png"  alt="Email Icon" class=" md:ml-100 w-16 h-16 mt-9 mb-2 h-50"  />
            <div>
              <p class="text-[#2F32A6] mb-6 md:ml-102 "> Code</p>
              <p class="text-[#282831] mb-6 md:ml-100 ">Cadeaux!</p>
            </div>
          </a>
        </div>
    </DefaultLayout>
  </div>
</template>

<script>
import DefaultLayout from './DefaultLayout.vue';

export default {
    name:'RecompensePage',
    components:{
      DefaultLayout
    }

}
</script>