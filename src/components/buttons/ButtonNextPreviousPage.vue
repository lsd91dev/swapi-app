<template>
<div class="container-buttons">
  <button @click="previousOrNextPage('previous')" class="button button-flex"> <i class="fas fa-arrow-left button__icon"></i>Previous </button>
  <button @click="previousOrNextPage('next')" class="button button-flex"> Next <i class="fas fa-arrow-right button__icon"></i></button>
</div>
</template>

<script>
import { EventBus } from '../../main';
import { getResponsePagination } from '../../helpers/fetch';

export default {
    props: {
      nextPage: { type: String, default: () => '' },
      previousPage: { type: String, default: () => '' }
    },
    methods: {
    async previousOrNextPage(page){
      let url = (page === 'next' ? this.nextPage : this.previousPage); 
        try {
            const [nextPage, previousPage, response ] = await getResponsePagination(url);
            EventBus.$emit('url-pagination', nextPage, previousPage, response); 
        } catch (error){
            console.log('Ups! Could not get the information. Please try again later');
            console.log(error)
    }
  },
  }
}
</script>

<style>
.container-buttons{
  display:flex;
  margin-right:auto;
}
</style>