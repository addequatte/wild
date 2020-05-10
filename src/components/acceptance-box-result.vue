<template>
    <div class="acceptance-box-result">
        <div class="form dot-box" v-for="(delivery,i) of deliveries">
            <img :src="acceptanceImg">
            <div class="dot-box-error" v-if="uuidError(delivery.uuid)">
                <label>Доставка: {{delivery.uuid}} не принадлежит коробки: {{box.uuid}}</label>
                <mt-button type="danger" @click="">Создать акт расхождения</mt-button>
            </div>
            <mt-field label="Код доставки" v-model="deliveries[i].uuid"></mt-field>
            <mt-field label="Заказ"  v-model="deliveries[i].order"></mt-field>
            <mt-field label="Ячейка"  v-model="deliveries[i].cell"></mt-field>
            <mt-field label="Телефон получателя"  v-model="deliveries[i].phone"></mt-field>
            <mt-field label="Пасспорт получателя"  v-model="deliveries[i].passport"></mt-field>
            <mt-field label="ФИО получателя"  v-model="deliveries[i].FIO"></mt-field>
            <mt-field v-for="(item,i) of deliveries[i].goods" label="Код товара" v-model="deliveries[i].goods[i]"></mt-field>
            <mt-button type="default" @click="deliveries[i].goods.push(undefined)">+</mt-button>
            <mt-button type="primary" @click="">Перейти к товарам</mt-button>
        </div>
        <mt-button type="primary"  @click="deliveries.push(delivery)">Добавить доставку</mt-button>
    </div>

</template>

<script>

    import acceptanceImg from '../assets/acceptance.gif'

    export default {
        name: "acceptance-box-result",
        data() {
            return {
                acceptanceImg: acceptanceImg,
                delivery: {
                    uuid: undefined,
                    order: undefined,
                    cell: undefined,
                    phone: undefined,
                    passport: undefined,
                    FIO: undefined,
                    goods: []

                },
                deliveries: []
            }
        },
        computed: {

        },
        props: {
          box: {
              type: Object,
              default() {
                  return {}
              }
          }
        },
        methods: {
            uuidError(uuid) {
                return uuid && this.box.deliveries.indexOf(uuid) === -1 ? true : false;
            },
            addDevivery() {

            }
        }
    }
</script>

<style scoped>
    .acceptance-box-result .form {
        margin-bottom: 1rem;
    }
</style>