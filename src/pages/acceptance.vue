<template>
    <div class="acceptance">
        <div class="step dot-box" v-if="step === 1">
            <img :src="acceptanceImg">
            <ul class="result">
                <li>
                    <label>Код коробки: </label><span>{{json.uuid}}</span>
                </li>
                <li>
                    <label>Код ПВЗ: </label><span>{{json.uuid}}</span>
                </li>
                <li>
                    <label>Коды доставок:</label>
                    <ul>
                        <li v-for="(code, i) of json.delivery_codes">
                            Код доставки: {{code}}
                        </li>
                    </ul>
                </li>
            </ul>
            <mt-button type="primary" @click="step=2" class="mb-0">Далее</mt-button>
        </div>

        <div class="step" v-else-if="step===2">
            <h3>Код коробки: {{json.uuid}}</h3>
            <h3>Код ПВЗ:{{json.uuid_pvz}}</h3>
            <div class="dot-box mb-1" v-for="(delivery,i) of deliveries">
                <img :src="delivery.img">
                <div class="dot-box-error" v-if="uuidError(delivery.json.uuid) && typeof delivery.json.act === 'undefined'">
                    <label>Доставка: {{delivery.json.uuid}} не принадлежит коробке: {{json.uuid}}</label>
                    <mt-button type="danger" @click="act(i)">Создать акт расхождения</mt-button>
                </div>
                <div class="dot-box-error" v-else-if="typeof delivery.json.act !== 'undefined'">
                    <label>Акт расхождения</label><span>{{delivery.json.act}}</span>
                </div>
                <ul class="result">
                    <li>
                        <label>Код доставки: </label><span>{{delivery.json.uuid}}</span>
                    </li>
                    <li>
                        <label>Заказ: </label><span>{{delivery.json.order}}</span>
                    </li>
                    <li>
                        <label>Ячейка: </label><span>{{delivery.json.cell}}</span>
                        <mt-button v-if="typeof delivery.json.cell === 'undefined' && !uuidError(delivery.json.uuid)" type="primary" size="small"
                                   class="btn-cell" @click="cellModal(i)">Скан. ячейки
                        </mt-button>
                    </li>
                    <li>
                        <label>Телефон получателя: </label><span>{{delivery.json.phone}}</span>
                    </li>
                    <li>
                        <label>Пасспорт получателя: </label><span>{{delivery.json.passport}}</span>
                    </li>
                    <li>
                        <label>ФИО получателя: </label><span>{{delivery.json.fio}}</span>
                    </li>
                    <li>
                        <label>Коды товаров: </label>
                        <ul>
                            <li v-for="(goods, i) of delivery.json.goods">
                                {{goods}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <router-link to="/">
                <mt-button type="primary" :disabled="!canFinish">Закончить приемку</mt-button>
            </router-link>
        </div>
        <mt-popup v-if="popup" v-model="popupVisible" position="bottom">
            <img :src="popup.img">
            <div class="result">
                <ul>
                    <li><label>Код ячейки:</label><span>{{popup.json.uuid}}</span></li>
                </ul>
            </div>
            <mt-button type="primary" @click="mergeCell">Привязать к доставке</mt-button>
        </mt-popup>
    </div>
</template>

<script>

    import acceptanceImg from '../assets/acceptance.gif'
    import popupImg0 from '../assets/popup0.gif'
    import deliveryImg0 from '../assets/delivery0.gif'
    import deliveryImg1 from '../assets/delivery1.gif'
    import deliveryImg2 from '../assets/delivery2.gif'
    import deliveryImg3 from '../assets/delivery3.gif'
    import deliveryImg4 from '../assets/delivery4.gif'
    import deliveryImg5 from '../assets/delivery5.gif'
    import deliveryImg6 from '../assets/delivery6.gif'
    import deliveryImg7 from '../assets/delivery7.gif'
    import deliveryImg8 from '../assets/delivery8.gif'
    import deliveryImg9 from '../assets/delivery9.gif'

    import json from '../json/acceptance.json'
    import popupJson0 from '../json/popup0.json'
    import deliveryJson0 from '../json/delivery0.json'
    import deliveryJson1 from '../json/delivery1.json'
    import deliveryJson2 from '../json/delivery2.json'
    import deliveryJson3 from '../json/delivery3.json'
    import deliveryJson4 from '../json/delivery4.json'
    import deliveryJson5 from '../json/delivery5.json'
    import deliveryJson6 from '../json/delivery6.json'
    import deliveryJson7 from '../json/delivery7.json'
    import deliveryJson8 from '../json/delivery8.json'
    import deliveryJson9 from '../json/delivery9.json'
    import AcceptanceResult from "../components/acceptance-result.vue";

    export default {
        name: "acceptance",
        components: {AcceptanceResult},
        data() {
            return {
                step: 1,
                popupVisible: false,
                acceptanceImg: acceptanceImg,
                json: json,
                popup: undefined,
                popups: [
                    {
                        img: popupImg0,
                        json: popupJson0
                    },
                    {
                        img: popupImg0,
                        json: popupJson0
                    },
                    {
                        img: popupImg0,
                        json: popupJson0
                    },
                    {
                        img: popupImg0,
                        json: popupJson0
                    },
                    {
                        img: popupImg0,
                        json: popupJson0
                    },
                    {
                        img: popupImg0,
                        json: popupJson0
                    },
                    {
                        img: popupImg0,
                        json: popupJson0
                    },
                    {
                        img: popupImg0,
                        json: popupJson0
                    },
                    {
                        img: popupImg0,
                        json: popupJson0
                    },
                    {
                        img: popupImg0,
                        json: popupJson0
                    },
                    {
                        img: popupImg0,
                        json: popupJson0
                    },
                ],
                deliveryI: undefined,
                deliveries: [
                    {
                        json: deliveryJson0,
                        img: deliveryImg0
                    },
                    {
                        json: deliveryJson1,
                        img: deliveryImg1
                    },
                    {
                        json: deliveryJson2,
                        img: deliveryImg2
                    },
                    {
                        json: deliveryJson3,
                        img: deliveryImg3
                    },
                    {
                        json: deliveryJson4,
                        img: deliveryImg4
                    },
                    {
                        json: deliveryJson5,
                        img: deliveryImg5
                    },
                    {
                        json: deliveryJson6,
                        img: deliveryImg6
                    },
                    {
                        json: deliveryJson7,
                        img: deliveryImg7
                    },
                    {
                        json: deliveryJson8,
                        img: deliveryImg8
                    },
                    {
                        json: deliveryJson9,
                        img: deliveryImg9
                    }
                ]
            }
        },
        computed: {
          canFinish()
          {
              for (let i in this.deliveries) {
                  if(typeof this.deliveries[i].json.cell === 'undefined' && typeof this.deliveries[i].json.act === 'undefined') {
                      return false;
                  }
              }
              return true
          }
        },
        methods: {
            uuidError(uuid) {
                console.log(uuid)
                console.log(this.json.delivery_codes)
                return uuid && this.json.delivery_codes.indexOf(uuid) === -1 ? true : false;
            },
            cellModal(i) {
                this.deliveryI = i;
                this.popup = this.popups[i];
                this.popupVisible = true
            },
            act(i) {
                this.$set(this.deliveries[i].json, 'act','weqdsert')
            },
            mergeCell()
            {
                this.$set(this.deliveries[this.deliveryI].json, 'cell',this.popup.json.uuid)
                this.popupVisible = false
                this.deliveryI = undefined;
                this.popup = undefined;
            }
        }
    }
</script>

<style scoped>
    .mint-popup {
        padding: 1rem;
        top: auto;
        right: 0;
        bottom: 0;
        left: 0;
         transform: none;

    }
    .acceptance img {
        margin-bottom: 1rem;
    }

    .btn-cell {
        width: inherit;
        float: right;
        height: 1rem;
        margin: 0;
    }
</style>