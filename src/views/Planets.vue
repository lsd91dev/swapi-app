<template>
<div> 
  <section class="container container--planets animation-fade-in">
   <Loading v-if="loading"></Loading>
   <Error v-if="error.isError" :msg-error="error.message"></Error>
  <div class="position-relative" v-if="!loading && planets.length">
    <filter-text></filter-text>
  </div>
        <div class="cards position-relative">
        <sort-by-name v-if="!loading && planets.length"></sort-by-name>
         <div class="cards__buttons">
         <button-next-previous-page :previous-page="previous" :next-page="next" class="position-relative"></button-next-previous-page>
          <button-back class="button-back"></button-back>
          <button-home class="button-home"></button-home>
      </div>
        <div v-for="(planet, index) in planets" :key="index" class="cards__card cards__card--pointer position-relative" @click="goPlanet(index + 1 )">
          <p class="cards__card-text"><router-link :to="{name: 'planet', params: { id: index }}" class="cards__card-link">{{ planet.name }} </router-link></p>
        </div>
      </div>
  </section>
</div>
</template>

<script>

// imports

import { getResponse } from '../helpers/fetch';
import { EventBus } from '@/main';

// components 

import Loading from '@/components/Loading';
import FilterText from '@/components/filters/FilterText';
import ButtonHome from '@/components/buttons/ButtonHome.vue';
import ButtonBack from '@/components/buttons/ButtonBack.vue';
import ButtonNextPreviousPage from '@/components/buttons/ButtonNextPreviousPage';
import SortByName from '@/components/sorts/SortByName.vue';

export default {
  name: 'Planets',
  components: { FilterText, ButtonHome, ButtonBack, ButtonNextPreviousPage, Loading, SortByName },
  data() { return {
    planets: '',
    planets_backup: '',
    next: '',
    previous: '',
    loading: false,
    route: this.$route.fullPath,
     error: {
          isError: false,
          message: '',
      }
  }},
  created: function() { 
    this.getPlanets();
    this.attachEventBus(); 
    },
  methods: {
    async getPlanets() {
      this.loading = true;
      try {
        const [nextPage, previousPage, planets] =  await getResponse(this.route);
        this.reassignData(nextPage,previousPage,planets)
      }catch(error){
        this.error.isError = true;
        this.error.message = 'Ups! Could not get the information. Please try again later'
        console.log(error)
      }
      this.loading = false;
    },

    goPlanet(index){
      this.$router.push({name: 'planet', params:{ id: index } })
    },

    attachEventBus() {  
    EventBus.$on('url-pagination', ( nextPage, previousPage, planets ) => {this.reassignData(nextPage,previousPage,planets)});
    EventBus.$on('filter-by-name', (query) => { this.planets = this.planets_backup.filter( planet => planet.name.includes(query))
    });
    EventBus.$on('sort-by-name-ascendant', () => { this.sortByNameAscendant()});
    EventBus.$on('sort-by-name-descendant', () => { this.sortByNameDescendant()});
  },

    reassignData(nextPage,previousPage,planets){
      this.next = nextPage;
      this.previous = previousPage;
      this.planets = planets;
      this.planets_backup = planets;
  },
   sortByNameAscendant(){
    this.planets.sort( (a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 
    (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0);
  },

  sortByNameDescendant(){
    this.planets.sort( (a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : 
    (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 0);
  },

  }
}
</script>

<style>
.container--planets {
  background: url('../assets/imgs/wallpaper_planets.jpg');
  background-size:cover;
  position:relative;
}

.container--planets::before{
  position: absolute;
  content: '';
  top:0;
  bottom:0;
  left:0;
  right:0;
  background: rgb(13,11,12);
  background: linear-gradient(282deg, rgba(13,11,12,0.7455357142857143) 0%, rgba(13,11,12,0.8547794117647058) 18%, rgba(13,11,12,0.896796218487395) 41%, rgba(13,11,12,0.9472163865546218) 54%, rgba(13,11,12,0.9472163865546218) 68%, rgba(13,11,12,1) 82%);
}

</style>