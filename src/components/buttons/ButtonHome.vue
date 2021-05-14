<template>
    <a class="button-link button-flex" @click="goHome()">
    <i class="fas fa-home button-link__icon"></i>
    <router-link to="/" class="button-link__link"> Home </router-link>
    </a>
</template>

<script>
export default {
    name: 'ButtonHome',
    methods: {
        goHome(){
            this.$router.push({ path: '/api' }).catch( () => { });
        }
    }
}
</script>

<style>

.button-link {
    padding: 1rem;
    border:2px solid rgb(255,255,255);
    border-radius: 5px;
    cursor: pointer;
    width:10rem;
    text-align:center;
    transition: all 500ms;
}
.button-link__icon{
    margin-right: 0.2rem;
}

.button-link__link {
    color: rgb(255,255,255);
    text-decoration:none;
    font-weight:600;
    transition: all 500ms;
}

.button-link:hover {
    background: rgb(255,255,255);
    color: rgb(0,0,0);
}
.button-link:hover .button-link__link {
    color:rgb(0,0,0);
}
</style>