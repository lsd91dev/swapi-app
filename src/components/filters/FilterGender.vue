<template>
  <div class="filterGender container-filter">
      <span class="container-filter__text"> Filter by gender </span>
        <input type="radio" name="gender" @change="filterGender()" value="any" id="any" v-model="filter.gender" ref="radio" checked> <label for="any">Any</label>
        <input type="radio" name="gender" @change="filterGender()" value="male" id="male" v-model="filter.gender"> <label for="male"> Male </label>
        <input type="radio" name="gender" @change="filterGender()" value="female" id="female" v-model="filter.gender"> <label for="female">Female</label>
  </div>
</template>

<script>
import { EventBus } from '../../main.js';
export default {
    name: 'FilterGender',
    data(){
      return {
        filter: {
          gender: ''
        }
      }
    },
    mounted(){
      this.$refs.radio.checked = true;
    },
    methods: {
      filterGender(){
        EventBus.$emit('filter-by-gender', this.filter.gender);
      }
    }
}
</script>

<style scoped>

.container-filter__text {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 800;
}

.container-filter input{
  margin-left: 1rem;
}

</style>