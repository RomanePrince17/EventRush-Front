<template>
    <div class="px-3">
       <NavbarSearch/>
       
        <div class="content mt-30  mb-4">
                <div class="lg:ml-17 lg:mb-15 mb-13">
                    <img src=" ../assets/images/bann_achat_ticket.png" alt="" class="lg:w-345 rounded-xl lg:h-full h-49 w-full">
                </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:p-6 lg:ml-80 mb-12 ">
                    <div 
                        v-for="(ticket, index) in tickets"
                        :key="index"
                        class="relative bg-white shadow-lg rounded-2xl overflow-hidden lg:w-190 w-full lg:h-60 h-50"
                    >
                                <!-- Date (fond bleu en absolute) -->
                                <div class="absolute rounded-2xl top-0 left-0 h-full lg:w-51 w-25 bg-[rgba(47,50,166,1)] flex items-center justify-center">
                                        <span class="text-white text-sm font-semibold transform ">
                                            {{ ticket.date }}
                                        </span>
                                </div>
                
                        <!-- Contenu principal -->
                        <div class="lg:ml-51  ml-25 p-4 flex flex-col justify-between h-full">
                            <div>
                                <div >
                                    <h3 class="lg:text-lg text-[12px] font-bold">{{ ticket.title }}</h3>
                                </div>
                                <div >
                                    <h3 class="lg:text-lg text-[12px] font-bold mb-1">{{ ticket.artist }}</h3>

                                </div>
                                <div class="flex gap-2 mb-1">
                                    <img src="../assets/icones/ticket.png" alt="">
                                    <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.status }}</p>

                                </div>
                                <div class="flex gap-2 mb-1">
                                    <img src="../assets/icones/dollar.png" alt="">
                                    <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.price }}</p>

                                </div>
                                <div class="flex gap-2 mb-1">
                                    <img src="../assets/icones/calendar.png" alt="">
                                    <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.time }}</p>

                                </div>
                                <div class="flex gap-1">
                                    <img src="../assets/icones/vector.png" alt="">
                                    <p class=" lg:text-lg text-[12px] text-gray-600">{{ ticket.location }}</p>
                                </div>
                            </div>
                            <div class="text-right">
                              <router-link to="/paiement">
                                <button class="bg-pink-500 text-white text-sm px-4 py-1 rounded-2xl hover:bg-pink-600 transition">
                                Payer
                                </button>
                              </router-link>
                                
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <div class="flex lg:text-lg text-[13px] lg:ml-16 gap-2">
            <img src="../assets/icones/vector.png" alt="">
            <p>Address: 1 MetLife Stadium Dr, East Rutherford, NJ 07073, USA</p>
        </div>
        <br>
        <iframe class=" rounded-2xl lg:ml-16 lg:w-345 w-85 lg:h-100 h-70" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.0315719364103!2d2.4541067747520544!3d6.389927693600545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023550004fade15%3A0x5345c8c7d00006d9!2sAkpakpa!5e0!3m2!1sfr!2sbj!4v1745449711283!5m2!1sfr!2sbj" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <p class="text-blue-500 lg:ml-18 mt-10 mb-2">Top reviews on this concert</p>
        <p class="text-blue-500 lg:ml-18 mb-2">Overage rates </p>
        <div class="space-y-6 lg:w-342 lg:ml-16">
            <h2 class="text-xl font-bold ">Commentaires</h2>
  
            <div
                v-for="(comment, i) in comments"
                :key="i"
                class="bg-white rounded-2xl shadow p-4 flex flex-col gap-2"
            >
                <!-- Profil + étoiles -->
                <div class="flex items-center gap-3">
                <img :src="comment.avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
                <div>
                    <p class="font-semibold">{{ comment.name }}</p>
                    <div class="flex gap-0.5">
                    <template v-for="n in 5" :key="n">
                        <svg
                        class="w-4 h-4"
                        :class="n <= comment.stars ? 'text-pink-400' : 'text-gray-300'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.05 3.23h3.397c.969 0 1.371 1.24.588 1.81l-2.749 1.998.999 3.243c.29.944-.755 1.725-1.54 1.151L10 12.347l-2.696 1.942c-.785.574-1.83-.207-1.54-1.151l.999-3.243-2.749-1.998c-.783-.57-.38-1.81.588-1.81h3.397l1.05-3.23z"
                        />
                        </svg>
                    </template>
                    </div>
                </div>
                </div>
        
                <!-- Texte -->
                <p class="text-gray-700 text-sm">{{ comment.text }}</p>
        
                <!-- Réponses -->
                <div v-if="comment.replies.length" class="ml-12 mt-2 space-y-2">
                <div
                    v-for="(reply, j) in comment.replies"
                    :key="j"
                    class="text-sm text-gray-700 border-l-4 border-blue-500 pl-3"
                >
                    <span class="font-semibold">{{ reply.name }}:</span> {{ reply.text }}
                </div>
                </div>
        
                <!-- Actions -->
                <div class="flex items-center gap-4 text-sm text-gray-500 mt-2">
                <button @click="comment.likes++" class="hover:text-blue-500 flex">
                    <img src="../assets/icones/like.png" alt="">
                     ({{ comment.likes }})
                </button>
                <button @click="comment.dislikes++" class="hover:text-red-500 flex">
                    <img src="../assets/icones/dislike.png" alt="">
                     ({{ comment.dislikes }})
                </button>
                <button @click="toggleReply(i)" class="hover:text-pink-500 flex">
                    <img src="../assets/icones/redo.png" alt="">
                    Répondre</button>
                </div>
        
                <!-- Champ réponse -->
                <div v-if="comment.showReply" class="mt-2 ml-12">
                <textarea
                    v-model="comment.newReply"
                    placeholder="Votre réponse..."
                    rows="2"
                    class="w-full p-2 border rounded-lg text-sm"
                ></textarea>
                <button
                    @click="submitReply(i)"
                    class="mt-1 bg-pink-500 text-white text-sm px-4 py-1 rounded-full hover:bg-blue-800"
                >
                    Envoyer
                </button>
                </div>
            </div>
  
      <!-- Votre commentaire -->
      <div class="  mb-1 mt-6">
        <textarea
          v-model="newComment"
          rows="3"
          placeholder="Ajoutez un commentaire..."
          class=" mb-6 lg:w-342 lg:mb-2 w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring focus:ring-royalblue"
        ></textarea>
        <div class="flex justify-center">
            <button
          @click="addComment"
          class="mt-2 bg-pink-500 text-white px-6 py-2 rounded-2xl  hover:bg-blue-900 transition"
        >
          Envoyer
        </button>

        </div>
       
      </div>
          <!-- Concert Cards - suggestions-->
    <section class="px-4  py-10">
      <div class="flex justify-between items-center mb-6">
        <h2 class="lg:text-2xl text-xl font-semibold">Suggestion pour vous</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6">
        <div v-for="(concert, index) in popularConcerts" :key="index" class="shadow-lg rounded-2xl overflow-hidden">
          <router-link to="/ticket">
            <img :src="concert.image" alt="" class="w-full aspect-square object-cover rounded-t-2xl"/>
            <div class="text-center m-5">
              <strong>{{ concert.artist }}</strong>
              <p>{{ concert.city }}</p>
              <p>{{ concert.date }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
        </div>
    </div>
    <FooterComp/>
</template>
<script>
import FooterComp from '../components/Footer.vue'
import NavbarSearch from '../components/Navbarsearch.vue'
export default {
name: 'ticketPage',
components:{
    FooterComp,
    NavbarSearch
},
data() {
      return {
        tickets: [
          { date: '25 mai 2025', title: 'Titre: Concert Gospel', location: ' Localisation: Amazone',status:'Status: disponible',price:' Prix: 2000 XOF', artist:' Artiste: Beyoncé',time:'Ven 9:00' },
        ],
        newComment: '',
        comments: [
          {
            name: 'Léa M.',
            avatar: 'https://i.pravatar.cc/40?img=1',
            stars: 4,
            text: 'Super événement !ouf, quelle surprise pour moi , un merveilleux cadeaux pour mon anniverssaire',
            likes: 2,
            dislikes: 0,
            replies: [],
            showReply: false,
            newReply: '',
          },
          {
            name: 'Théo B.',
            avatar: 'https://i.pravatar.cc/40?img=2',
            stars: 5,
            text: 'Expérience magique.',
            likes: 3,
            dislikes: 1,
            replies: [],
            showReply: false,
            newReply: '',
          },
          {
            name: 'Théo B.',
            avatar: 'https://i.pravatar.cc/40?img=2',
            stars: 5,
            text: 'Expérience magique.',
            likes: 3,
            dislikes: 1,
            replies: [],
            showReply: false,
            newReply: '',
          },
          {
            name: 'Théo B.',
            avatar: 'https://i.pravatar.cc/40?img=2',
            stars: 5,
            text: 'Expérience magique.',
            likes: 3,
            dislikes: 1,
            replies: [],
            showReply: false,
            newReply: '',
          },
        ],
        popularConcerts: [
        { image: '../assets/images/first_img.png', artist: 'Sila Gencoglu', city: 'Boston', date: 'Dec 18, 22:00' },
        { image: '../assets/images/two_img.png', artist: 'Justin Bieber', city: 'San Francisco', date: 'Dec 16, 20:00' },
        { image: '../assets/images/three_img.png', artist: 'Celine Dion', city: 'New York City', date: 'Dec 13, 21:00' },
        { image: '../assets/images/four_img.png', artist: 'Taylor Swift', city: 'San Diego', date: 'Dec 14, 21:00' },
      ],
      };
    },
    methods: {
      addComment() {
        if (this.newComment.trim()) {
          this.comments.push({
            name: 'Vous',
            avatar: 'https://i.pravatar.cc/40?img=3',
            stars: 5,
            text: this.newComment,
            likes: 0,
            dislikes: 0,
            replies: [],
            showReply: false,
            newReply: '',
          });
          this.newComment = '';
        }
      },
      toggleReply(index) {
        this.comments[index].showReply = !this.comments[index].showReply;
      },
      submitReply(index) {
        const replyText = this.comments[index].newReply.trim();
        if (replyText) {
          this.comments[index].replies.push({
            name: 'Vous',
            text: replyText,
          });
          this.comments[index].newReply = '';
          this.comments[index].showReply = false;
        }
      },
    },
};
</script>