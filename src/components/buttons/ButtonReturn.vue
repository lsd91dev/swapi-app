<template>
  <button @click="$router.push({name: urlPath})" class="button button-flex"> <i class="fas fa-arrow-left button__icon"></i> <span class="button__text"> Return to <b> {{ urlPath }}</b> </span> </button>
</template>

<script>
export default {
 props: {
     urlPath: { type: String, default: () => '' }
 }
}
</script>

<style scoped>
.button {
    padding: 1rem;
    border:2px solid rgb(255,255,255);
    border-radius: 5px;
    cursor: pointer;
    width:10rem;
    transition: all 500ms;
}
.button__icon{
    margin-right: 0.2rem;
}

.button__text {
    color: rgb(0,0,0);
    font-weight:600;
    transition: all 500ms;
}

.button:hover {
    background: rgb(13,11,12);
    color: rgb(255,255,255);
}
.button:hover .button__text {
    color: rgb(255,255,255);
}
</style>