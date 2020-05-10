<template>
    <div>
        <mt-field label="Телефон" v-model="phone"></mt-field>
        <mt-field label="Пасспорт" v-model="passport"></mt-field>
        <mt-button type="primary" @click="search = true" :disabled="!phone || !passport">Найти</mt-button>

        <div class="result" v-if="result && search">
            <mt-checklist
                    v-model="value"
                    title="Список доставок"
                    :options="resultData">
            </mt-checklist>
        </div>
        <div v-else-if="!result">
            Нет доставок
        </div>

        <mt-button type="primary" @click="finish" :disabled="value.length === 0">Провести выдачу</mt-button>
    </div>
</template>

<script>

    import deliveryJson4 from '../json/delivery4.json'
    import deliveryJson5 from '../json/delivery5.json'

    export default {
        name: "distribution",
        data() {
            return {
                phone: undefined,
                passport: undefined,
                value: [],
                search: false,
                result:
                    [
                        deliveryJson4,
                        deliveryJson5
                    ]
            }
        },
        computed: {
            resultData()
            {
                let arr = [];

                for(let i in this.result) {
                    this.result[i].cell = 'efsdwe'
                    arr.push({
                        label: `Доставка: ${this.result[i].uuid} телефон(${this.result[i].phone}) пасспорт(${this.result[i].passport}) из ячейки: ${this.result[i].cell}`,
                        value: this.result[i].uuid
                    })
                }
                return arr;
            }
        },
        methods: {
            finish() {
                this.$router.push({path:'/'})
            }
        }
    }
</script>

<style scoped>

</style>