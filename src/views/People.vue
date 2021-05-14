<template>
<div class="people">
  <section class="container container--people animation-fade-in">
  <Loading v-if="loading"></Loading>
<Error v-if="error.isError" :msg-error="error.message"></Error>
  <div class="position-relative" v-if="!loading && people.length">
    <filter-text></filter-text>
    <filter-gender></filter-gender>
  </div>
    
    <div class="cards position-relative">
      <sort-by-name v-if="!loading && people.length"></sort-by-name>
      <div class="cards__buttons">
          <button-next-previous-page :previous-page="previous" :next-page="next" class="position-relative"></button-next-previous-page>
          <button-back class="button-back"></button-back>
          <button-home class="button-home"></button-home>
      </div>
          <div class="cards__card cards__card--pointer position-relative animation-fade-in" v-for="(character, index) in people" :key="index" @click="goCharacter(index + 1 )">
            <p class="cards__card-text"><router-link :to="{name: 'character', params: { id: index }}" class="cards__card-link">{{ character.name }} </router-link></p>
            <img src="../assets/imgs/luke-skywalker-removebg-preview.png" v-if="character.name === 'Luke Skywalker'" class="cards__image">
          </div>
      </div>
  </section>
</div>
</template>

<script>

// imports 

import { getResponse } from '@/helpers/fetch';
import { EventBus } from '@/main';

// components

import FilterGender from '@/components/filters/FilterGender.vue';
import FilterText from '@/components/filters/FilterText.vue';
import Loading from '@/components/Loading.vue';
import ButtonBack from '@/components/buttons/ButtonBack.vue';
import ButtonHome from '@/components/buttons/ButtonHome.vue';
import ButtonNextPreviousPage from '@/components/buttons/ButtonNextPreviousPage.vue';
import SortByName from '@/components/sorts/SortByName.vue';

export default {
  name: 'People',
  data() { return {
    people: '',
    people_backup: '',
    next: '',
    previous: '',
    loading: false,
    route: this.$route.fullPath,
    filter: {
      female: false,
      male: false,
    },
     error: {
          isError: false,
          message: '',
      }
  }},
  components:{ FilterGender, FilterText, ButtonBack, ButtonHome, ButtonNextPreviousPage, Loading, SortByName },
  created: function() { 
    this.getPeople();
    this.attachEventBus();
  },
  methods: {
    async getPeople() {
      this.loading = true;
      try{
        const [nextPage, previousPage, people] =  await getResponse(this.route);
        this.reassignData(nextPage,previousPage,people)
      }catch(error){
        this.error.isError = true;
        this.error.message = 'Ups! Could not get the information. Please try again later'
        console.log(error)
      }

      this.loading = false;
    },

    goCharacter(index){
      this.$router.push({name: 'character', params:{ id: index } })
    },

  attachEventBus() {
    EventBus.$on('filter-by-gender', (value) => this.filterByGender(value));
    EventBus.$on('filter-by-name', (query) => this.filterByName(query));    
    EventBus.$on('url-pagination', ( nextPage, previousPage, people ) => {this.reassignData(nextPage, previousPage, people)
      });
    EventBus.$on('sort-by-name-ascendant', () => { this.sortByNameAscendant()});
    EventBus.$on('sort-by-name-descendant', () => { this.sortByNameDescendant()});
  },

  reassignData(nextPage,previousPage,people){
      this.next = nextPage;
      this.previous = previousPage;
      this.people_backup = people;
      if(this.filter.female){ this.filterByGender('female'); return }
      if(this.filter.male){ this.filterByGender('male'); return }
      this.people = people;
  },

  filterByGender( gender ){
    if(gender === 'any' ){ this.people = this.people_backup; this.filter.male = false; this.filter.female = false; return; }
    if(gender === 'male') { this.filter.male = true; this.filter.female = false }
    if(gender === 'female') { this.filter.female = true; this.filter.male = false}
    this.people = this.people_backup.filter( character => character.gender === gender );
  },

  filterByName( query ){ 
    this.people = this.people_backup.filter( character => character.name.includes(query) ); 
  },
    
  sortByNameAscendant(){
    this.people.sort( (a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 
    (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0);
  },

  sortByNameDescendant(){
    this.people.sort( (a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : 
    (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 0);
  },
  }

}
</script>

<style scoped>

.container--people {
  background: url('../assets/imgs/wallpaper_characters.jpg');
  background-size:cover;
  position:relative;
}

.container--people::before{
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