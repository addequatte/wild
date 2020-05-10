<template>
    <div class="navigation">
        <router-link to="/acceptance">
            <mt-button type="default">Приемка</mt-button>
        </router-link>
        <router-link to="/discrepancy">
            <mt-button type="default">Акт расхождения</mt-button>
        </router-link>
        <router-link to="/distribution">
            <mt-button type="default">Выдача</mt-button>
        </router-link>
        <router-link to="/refund">
            <mt-button type="default">Возврат</mt-button>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "navigation"
    }
</script>

<style scoped>
    .navigation button{
        margin-bottom: 1rem;
    }
</style>