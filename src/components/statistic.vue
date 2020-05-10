<template>
    <div class="statistic">
        <div class="item success">
            <label>Доставок за смену</label>
            <mt-badge type="success">30</mt-badge>
        </div>
        <div class="item warning">
            <label>Чужие доставки смену</label>
            <mt-badge type="warning">1</mt-badge>
        </div>
        <div class="item primary">
            <label>Недошедшие доставки смену</label>
            <mt-badge type="primary">3</mt-badge>
        </div>
        <div class="item error">
            <label>Возвратные доставки смену</label>
            <mt-badge type="error">5</mt-badge>
        </div>
    </div>
</template>

<script>
    export default {
        name: "statistic"
    }
</script>

<style scoped>
    .statistic .item {
        padding: 0.5em;
        border-radius: 3px;
        margin-bottom: 1rem;
    }
    .statistic .item .mint-badge{
        float: right;
    }
    .statistic .item.success {
        color: #4caf50;
        border: 2px solid #4caf50;
    }
    .statistic .item.warning {
        color: #fbc107;
        border: 2px solid #fbc107;
    }
    .statistic .item.primary {
        color: #30a2ff;
        border: 2px solid #30a2ff;
    }
    .statistic .item.error {
        color: #f44336;
        border: 2px solid #f44336;
    }
</style>