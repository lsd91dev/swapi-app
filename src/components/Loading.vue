<template>
    <div class="loading animation-fade-in"> 
        <span class="loading__text">Loading... </span>
        <i class="fas fa-sync fa-spin loading__icon"></i> 
    </div>
</template>

<script>
export default {
    name: 'Loading',
    methods: {
    }
}
</script>

<style>

.loading {
    background: rgb(13 11 12 / 65%);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 100vw;
    padding: 3rem;
    text-align: center;
    box-shadow: 10px 10px 10px rgb(13 11 12 / 65%);
    color: white;
    font-size: 3rem;
    z-index: 9999;
}

</style>