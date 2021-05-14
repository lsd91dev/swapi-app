<template>
    <div class="error animation-fade-in"> 
        <span class="error__text"> {{ msgError }} </span>
        <i class="fas fa-sad-tear"></i>
    </div>
</template>

<script>
export default {
    name: 'Error',
    methods: { },
    props: { msgError: { type: String, default: () => '' }}
}
</script>

<style>

.error {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    background: rgb(203 67 53 / 65%);
    text-align: center;
    box-shadow: 0 0 5px rgb(203 67 53 / 65%);
    color: white;
    width:60vw;
    font-size: 3rem;
    padding:3rem;
    z-index: 9999;
}

</style>