<template>
  <div class="home">
    <div class="section animation-fade-in">
      <p class="section__logo"> <span class="section__logo-SW">SW</span><span class="section__logo-API">API</span> </p>
      <Loading v-if="loading"></Loading>
      <Error v-if="error.isError" :msg-error="error.message"></Error>
      <Menu :menu-options="menu_options"></Menu>
    </div>
  </div>
</template>

<script>
import { getInitialData } from '@/helpers/fetch';
import Menu from '@/components/Menu';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default {
  name: 'Home',
  components: { Menu, Loading, Error },
  data(){
    return{
      menu_options: [],
      loading: false,
      error: {
          isError: false,
          message: '',
      }
    }
  },
  created: function() { this.getResponse() },
  methods: {
    async getResponse() {
      this.loading = true;
      try{
        const data = await getInitialData();
        Object.keys(data).forEach( key => {
          if(key === 'people'){ this.menu_options.push(key); }
          if(key === 'starships'){ this.menu_options.push(key); }
          if(key === 'planets'){ this.menu_options.push(key); }
          
        })
      }catch(error){
        this.error.isError = true;
        this.error.message = 'Ups! We could not get the information. We sorry!'
        console.log(error)
      }
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.section {
    position:relative;
    background: url('../assets/imgs/wallpaper.jpg');
    min-height:100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size:cover;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    justify-content: flex-end;
}

 .section::before{
  position: absolute;
  content: '';
  top:0;
  bottom:0;
  left:0;
  right:0;
  background: rgb(13,11,12);
  background: radial-gradient(circle, rgba(13,11,12,0.27494747899159666) 13%, rgba(13,11,12,0.7847514005602241) 24%, rgba(13,11,12,0.9416141456582633) 33%, rgba(13,11,12,1) 40%);

}

.section__loading {
    background: rgb(13 11 12 / 65%);
    position: relative;
    width: 100vw;
    /* padding: 1rem; */
    text-align: center;
    box-shadow: 10px 10px 10px rgb(13 11 12 / 65%);
    color: white;
    vertical-align: center;
    font-size: 3rem;
}

.section__logo{
  animation: fadeIn 500ms;
  position: relative;
  align-self: center;
  margin: auto 0;
  font-size: 20vw;
  font-weight: 800;
}

.section__logo-SW{
  color: rgb(13 11 12);
  text-shadow: -1px 0 rgb(255,232,31), 0 1px rgb(255,232,31), 1px 0 rgb(255,232,31), 0 -1px rgb(255,232,31);
}
</style>
