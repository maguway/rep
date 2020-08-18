<template>
    <div id="app">
        <h3>ОТЕЛИ</h3>
        <v-main-hotel/>
    </div>
</template>

<script>
    import vMainHotel from './components/v-hotel-main.vue'

    export default {
        name: 'App',
        components: {
            vMainHotel
        },
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
