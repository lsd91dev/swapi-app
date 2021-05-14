<template>
  <section class="container container--planet animation-fade-in">
  <Loading v-if="loading"></Loading>
  <Error v-if="error.isError" :msg-error="error.message"></Error>
  <div class="cards__buttons position-relative">
          <button-return class="button-return" :url-path="urlPath"></button-return>
          <button-back class="button-back"></button-back>
          <button-home class="button-home"></button-home>
      </div>
  <div class="position-relative">
     <div v-if="planet" class="card">

        <div class="card__main animation-fade-in">
          <div class="card__description">
          
          <h1 class="card__name"> {{ planet.name }} </h1>
          
          <h2 class="card__gender"> Terrain: <small> {{ planet.terrain }} </small> </h2>
            <div class="card__details"> 
              <p class="card__badge"> 
                <span class="card__badge-title">Gravity:</span> 
                <span class="card__badge-text"> {{ planet.gravity }}</span> 
              </p>

              <p class="card__badge">
               <span class="card__badge-title"> Rotation period: </span> 
               <span class="card__badge-text"> {{ planet.rotation_period }} </span> 
              </p>

              <p class="card__badge"> 
                <span class="card__badge-title"> Orbital period: </span> 
                <span class="card__badge-text"> {{ planet.orbital_period }} </span> 
              </p>
              <p class="card__badge">
                <span class="card__badge-title"> Diameter: </span> 
                <span class="card__badge-text"> {{ planet.diameter }} </span> </p>
            </div>
          </div>
          <div class="card__image-container">
            <img src="../assets/imgs/Tatooine_planet-removebg-preview.png" class="card__image">
          </div>
        </div>
      </div>
     </div>
  </section>
</template>

<script>
// imports

import { getDataById } from '@/helpers/fetch.js';


// components

import Loading from '@/components/Loading';
import Error from '@/components/Error';
import ButtonBack from '@/components/buttons/ButtonBack';
import ButtonHome from '@/components/buttons/ButtonHome';
import ButtonReturn from '@/components/buttons/ButtonReturn';


export default {
  name: 'Starship',
  data() {
    return {
      id: '',
      loading: false,
      planet: '',
      error: {
          isError: false,
          message: '',
      },
      urlPath: 'planets'
    }
  },

  components: { Loading, ButtonBack, ButtonHome, ButtonReturn, Error},
  created: function() {
    this.id = this.$route.params.id;
    this.getPlanet(this.id);
  },

  methods: {
    async getPlanet(id){
      this.loading = true;
      try {     
        this.planet = await getDataById('planets',id);
      } catch(error) {
        this.error.isError = true;
        console.log(error)
        this.error.message = 'Ups! We could not get the information. We sorry!'
        
      } 
      this.loading = false;
    },

  }
}
</script>

<style>

.container--planet {
  background: url('../assets/imgs/wallpaper_planets.jpg');
  background-size:cover;
  background-position: right;
  position:relative;
}
 
.container--planet::before{
  position: absolute;
  content: '';
  top:0;
  bottom:0;
  left:0;
  right:0;
  background: rgb(13,11,12);
  background: linear-gradient(282deg, rgba(13,11,12,0.7455357142857143) 0%, rgba(13,11,12,0.8547794117647058) 18%, rgba(13,11,12,0.896796218487395) 41%, rgba(13,11,12,0.9472163865546218) 54%, rgba(13,11,12,0.9472163865546218) 68%, rgba(13,11,12,1) 82%);
}

.card__main {
  display: flex;
  flex-wrap: wrap;
  gap:1rem;
}

.card__name {
  font-size: 3.5rem;
  margin: 2rem 0;
  text-transform: uppercase;
  flex: 1 1 100%;
  position:relative;
}

.card__name::before {
  position:absolute;
  content: '';
  width:100%;
  height:0.1rem;
  background: rgb(255,232,31);
  bottom: 0;
  box-shadow: 3px 3px 17px rgb(255 232 31 / 60%);
}

.card__gender {
  flex: 1 1 100%;
}

.card__image-container { 
  flex: 1 1 auto;
  position:relative;
}

.card__image {
  max-height:100%;
  max-width:100%;
  border-radius: 50%;
  opacity:0.8;
}



.card__description {
  padding: 1rem;
  margin: 1rem 1rem;
  flex: 1 1 25rem;
  border: 1px solid white;
  box-shadow: 3px 3px 17px rgb(13 11 12);
}

.card__details{
  margin-top: 1rem;
}

.card__details p {
  margin-top: 1rem;
}

.card__badge {
    background-color: white;
    border-radius: 10px;
    display: inline-block;
    margin-left: 1rem;
    padding: 0.5rem;
    color: black;
    box-shadow: 3px 3px 17px rgb(13 11 12);
}

.card__badge-title{
  font-weight:600;
}
</style>