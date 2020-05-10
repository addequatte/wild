<template>
    <div class="money dot-box">
        <label>Наличных в кассе:</label>
        <span>100 000.00 RUB</span>
    </div>
</template>

<script>
    import MoneyFormat from 'vue-money-format'

    export default {
        name: "money",
        components: {
            'money-format': MoneyFormat
        },
        data() {
            return {
                cash: 42355.66,
                cashless: 423444.00
            }
        }
    }
</script>

<style scoped>
    .money{
        margin-bottom: 1rem;
    }
    .money span {
        float: right;
    }
</style>