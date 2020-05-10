<template>
    <div  class="acceptance-result">
        <mt-field label="Код коробки" v-model="acceptance.uuid"></mt-field>
        <mt-field label="Код ПВЗ"  v-model="acceptance.pvz_uuid"></mt-field>
        <mt-field v-for="(item,i) of acceptance.deliveries" label="Код доставки" v-model="acceptance.deliveries[i]"></mt-field>
        <mt-button type="default" @click="acceptance.deliveries.push(undefined)">+</mt-button>
        <mt-button type="primary" @click="addBox">Добавить коробку</mt-button>
    </div>
</template>

<script>
    export default {
        name: "acceptance-result",
        data() {
            return {
                acceptance :
                    {
                        uuid: "",
                        pvz_uuid: "",
                        deliveries: []
                    }
            }
        },
        methods: {
            addBox()  {
                this.$router.replace({ name: 'acceptanceBox',params: {box: this.acceptance}});
            }
        }
    }
</script>

<style scoped>
    .acceptance-result .form {
        margin-bottom: 1rem;
    }
</style>