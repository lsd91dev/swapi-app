<template>
  <div class="starships">
 <section class="container container--starships animation-fade-in">
  <Loading v-if="loading"></Loading>
  <Error v-if="error.isError" :msg-error="error.message"></Error>
  <div class="position-relative" v-if="!loading && starships.length">
    <filter-text></filter-text>
  </div>
      <div class="cards position-relative">
      <sort-by-name v-if="!loading && starships.length"></sort-by-name>
       <div class="cards__buttons">
       <button-next-previous-page :previous-page="previous" :next-page="next" class="position-relative"></button-next-previous-page>
          <button-back class="button-back"></button-back>
          <button-home class="button-home"></button-home>
      </div>
        <div class="cards__card cards__card--pointer position-relative" v-for="(starship, index) in starships" :key="index" @click="goStarship( index + 2 )">
          <p class="cards__card-text"><router-link :to="{name: 'starship', params: { id: index }}" class="cards__card-link">{{ starship.name }} </router-link></p>
        </div>
      </div>
      </section>
  </div>
</template>

<script>
import { EventBus } from '@/main';
import { getResponse } from '@/helpers/fetch';

import Loading from '@/components/Loading';
import FilterText from '@/components/filters/FilterText';
import ButtonNextPreviousPage from '@/components/buttons/ButtonNextPreviousPage.vue';
import ButtonBack from '@/components/buttons/ButtonBack'
import ButtonHome from '@/components/buttons/ButtonHome'
import SortByName from '@/components/sorts/SortByName.vue';

export default {
  name: 'Starships',
  data() { return {
    starships: '',
    starships_backup: '',
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
    this.getStarships();
    this.attachEventBus();
  },

  components: { FilterText, ButtonNextPreviousPage, ButtonBack, ButtonHome, Loading, SortByName },

  methods: {
    async getStarships() {
      this.loading = true;
      try{
        const [nextPage, previousPage, starships] =  await getResponse(this.route);
        this.reassignData(nextPage,previousPage,starships )
      }catch(error){
        this.error.isError = true;
        this.error.message = 'Ups! Could not get the information. Please try again later'
        console.log(error)
        console.log(error)
      }
      this.loading = false;
    },

    goStarship(index){
      this.$router.push({name: 'starship', params:{ id: index } })
    },

  attachEventBus() {  
    EventBus.$on('url-pagination', ( nextPage, previousPage, starships ) => {this.reassignData(nextPage,previousPage,starships)});
    EventBus.$on('filter-by-name', (query) => { this.starships = this.starships_backup.filter( starship => starship.name.includes(query))
    });
    EventBus.$on('sort-by-name-ascendant', () => { this.sortByNameAscendant()});
    EventBus.$on('sort-by-name-descendant', () => { this.sortByNameDescendant()});
  },

  reassignData(nextPage,previousPage,starships){
    this.next = nextPage;
    this.previous = previousPage;
    this.starships = starships;
    this.starships_backup = starships;
  },

   sortByNameAscendant(){
    this.starships.sort( (a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 
    (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0);
  },

  sortByNameDescendant(){
    this.starships.sort( (a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : 
    (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 0);
  },

    

  }
}
</script>

<style>


.container--starships {
  background: url('../assets/imgs/wallpaper_starship.jpeg');
  background-size:cover;
  position:relative;
}

.container--starships::before{
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