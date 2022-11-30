<script setup>
import axios from "axios";
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import CardActivity from '../components/CardActivity.vue'
import Carousel from '../components/Carousel.vue'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const route = useRoute();
const router = useRouter();
const activity = ref(0);
const activities = ref([]);
 
const modules = [Pagination, Navigation];
 
const back = () => {
    router.push("/actividades");
};

const getActivities = async () => {
    try {
        const { data } = await axios.get("https://json-biglifeapp.herokuapp.com/activity?_page=1&_limit=9");
        activities.value = data;
    } catch (error) {
        console.log(error);
    }
}; 

const getData = async () => {
    try {
        const { data } = await axios.get(
            `https://json-biglifeapp.herokuapp.com/activity/${route.params.id}`
        );
        activity.value = data;
        activity.value.activity = JSON.parse(activity.value.activity);
    } catch (error) {
        console.log(error);
        activity.value = null;
    }
};
watchEffect(() => getData())
// getData();
getActivities(); 

</script>
<template>
  <div class="px-10 py-20" v-if="activity">
    <div class="container  mx-auto">
      <div class="pb-5">
        <span @click="back()" class="inline-block cursor-pointer">
          <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5555 0.270549C12.1866 -0.0901833 11.5886 -0.090183 11.2197 0.27055L0.533629 10.7212C0.489678 10.7642 0.450964 10.8103 0.417487 10.8589C0.367803 10.8917 0.320597 10.9295 0.276645 10.9725C-0.0922152 11.3332 -0.0922149 11.9181 0.276645 12.2788L10.9627 22.7295C11.3316 23.0902 11.9296 23.0902 12.2985 22.7295C12.6673 22.3687 12.6673 21.7839 12.2985 21.4231L3.22481 12.5494H26.0763C26.5864 12.5494 27 12.1358 27 11.6257C27 11.1155 26.5864 10.7019 26.0763 10.7019H3.22481L12.5555 1.57688C12.9243 1.21614 12.9243 0.631282 12.5555 0.270549Z" fill="#464646"/>
          </svg> 
        </span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div class="" >
          <carousel
            :images="activity.activity.image"
          /> 
        </div>
        <div class="">
          <h1 class="font-bold text-3xl text-[#464646]">{{ activity.title }}</h1>
          <p class="font-normal text-lg text-[#4F4F4F] py-3"> {{ activity.activity.description }} </p>

          <div class="flex  py-2">
            <div class="flex mt-1  items-start pr-2" >
              <img class="-mr-2" src="@/assets/user.svg" v-for="(item,index) in activity.activity.participants" :key="index" />
            </div> 
            <h4 class="font-normal text-lg text-[#464646]">{{ activity.activity.subtitle }}</h4> 
          </div>
          <div class="flex py-3">
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.22125 9.6929C7.26176 9.6929 6.44781 8.9098 6.44781 7.92403C6.44781 6.96743 7.23249 6.15594 8.22125 6.15594C9.18154 6.15594 9.99548 6.93826 9.99548 7.92403C9.99548 8.9098 9.18154 9.6929 8.22125 9.6929ZM8.22162 4.84937C6.53508 4.84937 5.13965 6.24127 5.13965 7.92259C5.13965 9.60471 6.53508 10.9966 8.22162 10.9966C9.90895 10.9966 11.3044 9.60471 11.3044 7.92259C11.3044 6.24127 9.90895 4.84937 8.22162 4.84937Z" fill="#464646"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.22076 21.8121L2.54981 10.8526C2.08467 9.9536 1.85132 8.96783 1.85132 7.92448C1.85132 4.41591 4.73149 1.54611 8.25003 1.54611C11.7686 1.54611 14.6479 4.41591 14.6479 7.92448C14.6479 8.93944 14.4154 9.92521 13.9503 10.8235L8.22076 21.8121ZM15.9291 7.92305C15.9291 3.68972 12.4683 0.239502 8.22195 0.239502C3.97643 0.239502 0.515625 3.68972 0.515625 7.92305C0.515625 9.14068 0.805937 10.3875 1.38735 11.46L7.64054 23.5504C7.75682 23.7822 7.98939 23.8982 8.22195 23.8982C8.45452 23.8982 8.68788 23.7531 8.80337 23.5504L11.9446 17.5052L15.0858 11.46C15.638 10.3583 15.9291 9.14068 15.9291 7.92305Z" fill="#464646"/>
            </svg>

            <p class="font-normal text-base pl-2">{{ activity.activity.locations[0].province  }}</p>
          </div>
          <p class="font-medium text-2xl text-[#464646] mt-10">{{ activity.points }} puntos</p>

        </div>
      </div>
      <div class="grid md:grid-cols-2">
        <div class="">
          <!-- ¿Qué incluye? -->
          <div class="mt-20">
            <h4 class="text-2xl font-semibold text-[#464646] mb-2">¿Qué incluye?</h4>
            <hr width="180px" class="p-[2px] bg-[#FF6C5F]">
            <hr class="border">
            <div class="mt-10" v-html="activity.activity.benefits"></div>
          </div>
          <!-- Reglas: -->
          <div class="mt-20">
            <h4 class="text-2xl font-bold text-[#464646] mb-10 flex">
              <img src="@/assets/rules.svg" alt="" class="pr-2">
              Reglas:
            </h4> 
            <div class="mt-5" v-html="(activity.activity.small_print)"></div>
          </div>
        </div>
      </div>
      <!-- Otras actividades similares: -->
      <div class="mt-20">
        <h4 class="text-2xl font-bold text-[#464646] mb-10">Otras actividades similares:</h4>  
        <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="20" 
            :navigation="true"
            :breakpoints="{
              '640': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '768': {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              '1024': {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }"
          >
            <swiper-slide v-for="(activity,index) in activities" :key="index">
              <CardActivity
                :key="activity.id"
                :activity="activity"
              /> 
            </swiper-slide> 
          </swiper> 
      </div>
    </div>
 
  </div>
  <div class="text-center h-screen place-content-center place-items-center flex" v-else>
    <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>

    <h1 >Cargando...</h1>  
    <!-- <button class="block" @click="back()">Volver al listado</button> -->
  </div>

</template>

<style>
 
</style>
