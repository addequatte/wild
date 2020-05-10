<template>
    <div>
        <money></money>
        <navigation></navigation>
        <statistic></statistic>
    </div>
</template>

<script>

    import Acceptance from './acceptance.vue'
    import Statistic from "../components/statistic.vue";
    import Money from "../components/money.vue";
    import Navigation from "../components/navigation.vue";

    export default {
        name: 'home',
        components: {
            Navigation,
            Money,
            Statistic,
            Acceptance
        },
    }
</script>

<style scoped>
    .mint-header {
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        background: linear-gradient(45deg, #b611a0, #471173);
        margin-bottom: 1rem;
    }
</style>