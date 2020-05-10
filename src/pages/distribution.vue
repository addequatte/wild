<template>
    <div class="distribution">
        <div class="step" v-if="step === 1">
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
            <mt-button type="primary" @click="step = 2" :disabled="value.length === 0">Далее</mt-button>
        </div>
        <div v-else-if="step === 2">
            <div class="dot-box mb-1" v-for="(item,i) of goods">
                <img :src="item.img">
                <div class="dot-box-error"
                     v-if="uuidError(item.json.uuid) && typeof item.json.act === 'undefined'">
                    <label>Товар: {{item.json.uuid}} не принадлежит выбранным доставкам: {{value.join(',')}}</label>
                    <mt-button type="danger" @click="act(i)">Создать акт расхождения</mt-button>
                </div>
                <div class="dot-box-error" v-else-if="typeof item.json.act !== 'undefined'">
                    <label>Акт расхождения: </label><span>{{item.json.act}}</span>
                </div>
                <ul class="result">
                    <li>
                        <label>Код товара: </label><span>{{item.json.uuid}}</span>
                    </li>
                    <li>
                        <mt-button v-if="typeof item.json.box === 'undefined' && !uuidError(item.json.uuid)"
                                   type="primary" size="small"
                                   class="btn-cell" @click="boxModal(i)">Вернуть
                        </mt-button>
                        <div v-if="typeof item.json.box !== 'undefined'">
                            <label>Возврат в коробке: </label><span>{{item.json.box}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="errors mb-1" v-for="(error, i) of errors">
                <div class="dot-box-error" v-if="lostActs.indexOf(error) === -1">
                    <label>Товар: {{error}} отсутствует в доставках: {{value.join(',')}}</label>
                    <mt-button type="danger" @click="lostAct(error)">Создать акт расхождения</mt-button>
                </div>
                <div class="dot-box-error" v-if="lostActs.indexOf(error) !== -1">
                    <label>Акт расхождения: </label><span>{{error}}</span>
                </div>
            </div>

            <router-link to="/">
                <mt-button type="primary" :disabled="!canFinish">Закончить выдачу</mt-button>
            </router-link>
        </div>
        <mt-popup v-if="popup" v-model="popupVisible" position="bottom">
            <img :src="popup.img">
            <div class="result">
                <ul>
                    <li><label>Код коробки: </label><span>{{popup.json.uuid}}</span></li>
                </ul>
            </div>
            <mt-button type="primary" @click="mergeBox">Привязать к доставке</mt-button>
        </mt-popup>
    </div>
</template>

<script>

    import acceptanceImg from '../assets/acceptance.gif'

    import deliveryJson4 from '../json/delivery4.json'
    import deliveryJson5 from '../json/delivery5.json'

    import goodsJson0 from '../json/goods0.json'
    import goodsJson1 from '../json/goods1.json'
    import goodsJson2 from '../json/goods2.json'
    import goodsJson3 from '../json/goods3.json'

    export default {
        name: "distribution",
        data() {
            return {
                step: 1,
                phone: undefined,
                passport: undefined,
                value: [],
                search: false,
                goodsI: undefined,
                popup: undefined,
                popupVisible: false,
                lostActs: [],
                result:
                    [
                        deliveryJson4,
                        deliveryJson5
                    ],
                goods:
                    [
                        {
                            img: acceptanceImg,
                            json: goodsJson0
                        },
                        {
                            img: acceptanceImg,
                            json: goodsJson1
                        },
                        {
                            img: acceptanceImg,
                            json: goodsJson2
                        },
                        {
                            img: acceptanceImg,
                            json: goodsJson3
                        },
                    ]
            }
        },
        computed: {
            goodsCodes() {
              let arr = [];
                for(let i in this.result) {
                    if(this.value.indexOf(this.result[i].uuid) !== -1) {
                        for(let n in this.result[i].goods) {
                            arr.push(this.result[i].goods[n]);
                        }
                    }
                }
                return arr;
            },
            errors() {
                let res = [];
                let arr = [];
                for(let i in this.goods) {
                    arr.push(this.goods[i].json.uuid);
                }

                for (let i in this.goodsCodes) {
                    if(arr.indexOf(this.goodsCodes[i]) === -1) {
                        res.push(this.goodsCodes[i]);
                    }
                }
                return res;
            },
            canFinish() {
                for (let i in this.goods) {
                    if (typeof this.goods[i].json.box === 'undefined' && typeof this.goods[i].json.act === 'undefined') {
                        return false;
                    }
                }

                for (let i in this.errors) {
                    if (this.lostActs.indexOf(this.errors[i]) === -1) {
                        return false;
                    }
                }

                return true
            },
            resultData() {
                let arr = [];

                for (let i in this.result) {
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
            lostAct(uuid) {
                this.lostActs.push(uuid)
            },
            uuidError(uuid) {
                return uuid && this.goodsCodes.indexOf(uuid) === -1 ? true : false;
            },
            act(i) {
                this.$set(this.goods[i].json, 'act', 'weqdsert')
            },
            boxModal(i) {
                this.goodsI = i;
                this.popup = this.goods[i];
                this.popupVisible = true
            },
            mergeBox() {
                this.$set(this.goods[this.goodsI].json, 'box', this.popup.json.uuid)
                this.popupVisible = false
                this.goodsI = undefined;
                this.popup = undefined;
            },
            finish() {
                this.$router.push({path: '/'})
            }
        }
    }
</script>

<style scoped>

</style>