<template>
    <div class="px-3">
       <NavbarSearch/>
       <div class=" justify-center flex ">
            <form @submit.prevent="login" class=" md:w-150 bg-white p-6 rounded shadow-lg  space-y-4 mt-40 mb-30 ">
              <div>
                <label class="block text-sm text-gray-600  mb-2">Plan</label>
                <input
                  type="text"
                  v-model="plan"
                  placeholder="plan"
                  class="w-full h-12 px-4 mb-6 border  rounded-lg"
                  required
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600  mb-2">Téléphone</label>
                <input
                  type="number"
                  min="0"
                  v-model="telephone"
                  placeholder="Téléphone"
                  class="w-full h-12 focus:ring-pink-500  mb-6 px-4 border  rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                class="text-center focus:ring-pink-500 flex md:w-30 flex items-center justify-center gap-2 bg-pink-600 text-white rounded-lg py-2 hover:bg-pink-700 transition disabled:opacity-50"
              ><a href="https://sandbox-process.fedapay.com/">Souscrire</a>
              </button>
            </form>
      </div>
       
      
    </div>
    <FooterComp/>
</template>
<script>
import axios from 'axios';
import FooterComp from '../components/Footer.vue'
import NavbarSearch from '../components/Navbarsearch.vue'
export default {
name: 'PaiementPage',
components:{
    FooterComp,
    NavbarSearch
},
data() {
      return {
        plan:[],
        telephone:[],
       
    }
  },
  async mounted(){
    const options = {
        method: 'POST',
        url: 'https://gestevent-main-ai7iif.laravel.cloud/api/souscriptions',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer AqP3RhUBfR4HA2J6OwqowDEMqnjfHuQT9abifi1x8c91de8c'
        },
        data: {plans_souscription_id: this.plan, telephone: this.telephone}
      };

      try {
        const {data} = await axios.request(options);
        this.t
        console.log(data);
      } catch (error) {
        console.error(error);
      }


  }


};
</script>