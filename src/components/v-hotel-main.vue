<template>
    <div class="v-hotel-main">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "v-hotel-main",
        data() {
            return {};
        },
        components: {},
        props: {},
        computed: {},
        methods: {},
        watch: {},
        mounted() {},
    }
</script>

<style lang="scss">
    .v-hotel-main {
        max-width: 1200px;
        margin: 0 auto;
    }
</style>