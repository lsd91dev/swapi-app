<template> 
  <nav class="nav">
      <ul class="nav-menu">
          <li v-for="(option, index) in menuOptions" :key="index" class="nav__nav-item"><router-link :to='{ name: option }' class="nav__nav-link">  {{ option }} </router-link></li>
      </ul>
  </nav>
</template>

<script>
export default {
    name: 'Menu',
    props: {
        menuOptions: { type: Array, default: () => [] }
    },
}
</script>

<style>
.nav {
    position:relative;
    width:100vw;
}

.nav-menu {
    display: flex;
    justify-content: space-around;
    margin: 5rem 1rem;
    flex-wrap:wrap;
    list-style:none;
    gap:1rem;
}

.nav__nav-item{
    animation: fadeIn 500ms;
    position:relative;
    display: flex;
    flex: 0 1 20rem;
    justify-content: center;
    overflow:hidden;
}

.nav__nav-item::before {
    position: absolute;
    content: '';
    height: 0.5rem;
    width: 100%;
    background: rgb(255,255,255);
    bottom: 0;
    transform: translateX(-20rem);
    transition: transform 500ms;
}

.nav__nav-item:hover::before{
    transform:translateX(0);
    background: rgb(255,232,31);
}

.nav__nav-link {
    color: white;
    text-decoration:none;
    text-transform: uppercase;
    font-weight: 800;
    font-size: 3rem;
    transition: all 500ms;
}

.nav__nav-link:hover {
    color: rgb(255,232,31);
}
</style>