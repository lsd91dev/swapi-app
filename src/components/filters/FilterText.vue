<template>
  <div class="filterText container-filter">
    <input type="text" name="filter" id="search" @keypress.enter="filterByName($refs.search.value)" ref="search" class="container-filter__input" required autocomplete="off">
    <label for="search" class="container-filter__label"> Search by name </label>
  </div>
</template>

<script>
import { EventBus } from '@/main.js';

export default {
    name: 'FilterText',
    created: function(){ },
    methods: { 
      filterByName(query) {
        EventBus.$emit('filter-by-name', query)
      }
    }
}
</script>

<style scoped>

.container-filter {
    height: 8rem;
    display: flex;
    align-content: center;
    justify-content: space-around;
    flex-direction: column;
}

.container-filter__label {
  font-size: 1.5rem;
  order:0;
  position:absolute;
  pointer-events:none;
  transition: all 500ms;
}

.container-filter__input {
    order:1;
    height: 2rem;
    background: inherit;
    border: 0;
    border-bottom: 1px solid rgb(255,232,31);
    color: rgb(255,255,255);
    font-size:1.2rem;
    width: 75vw;
}

.container-filter__input:focus{
  outline:none;
}

.container-filter__input:focus + .container-filter__label {
  transform: translateY(-25px);
  font-size: 14px;
  color: rgb(255,232,31);
}

.container-filter__input:valid + .container-filter__label {
  transform: translateY(-25px);
  font-size: 14px;
  color: rgb(255,232,31);
}

</style>