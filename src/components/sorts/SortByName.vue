<template>
  <div class="buttons">
    <button @click="sortByNameAscendant()" class="button"> <i class="fas fa-sort-alpha-up button__icon-sort"></i></button>
    <button @click="sortByNameDescendant()" class="button"> <i class="fas fa-sort-alpha-down-alt button__icon-sort"></i> </button>
  </div>
</template>

<script>
import { EventBus } from '@/main.js';

export default {
    name: 'SortByName',
    created: function(){ },
    methods: { 
      sortByNameAscendant() {
        EventBus.$emit('sort-by-name-ascendant')
      },
      sortByNameDescendant() {
        EventBus.$emit('sort-by-name-descendant')
      },
    }
}
</script>

<style scoped>

.buttons{
    position: fixed;
    display:flex;
    bottom: 65px;
    right: 0px;
    transform: rotate(90deg);
    z-index: 9999;
    width: 5rem;
}


.button__icon-sort{
    font-size: 2rem;
    transform: rotate(-90deg);
}
</style>