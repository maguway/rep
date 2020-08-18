<!--v-for="hotel in this.$storage.state.hotels"-->
<template>
    <div class="v-hotel-list">
        <h4>Список отелей</h4>
        <router-link :to="{name: 'order', params: {order_data: ORDER}}">
            <div class="ml-auto v-hotel-list__link_to_order">Отели, бронь: {{ORDER.length}}</div>
        </router-link>
        <div class="row align-items-start">
            <!--            Фильтры-->
            <div class="filters col-3">

                <!--                Тип (Отель/апартаменты)-->
                <div>
                    <h5>Отель/Апартаменты</h5>
                    <b-form-select
                            style="width: 150px"
                            v-model="selected_type"
                            :selected="selected_type"
                            :options="categories"
                    />
                    <!--                    <div>Selected: <strong>{{ selected_type }}</strong></div>-->
                </div>
                <br>
                <!--                Страна -->
                <div>
                    <h5>Страна</h5>
                    <b-form-select
                            style="width: 150px"
                            v-model="selected_country"
                            :selected="selected_country"
                            :options="countries"
                    />
                    <!--                    <div>Selected: <strong>{{ selected_country }}</strong></div>-->
                </div>

                <br><br>

                <!--                Ценовой диапазон-->
                <h5>Цены</h5>
                <br>
                <div class="range-slider">
                    <input type="range" min="0" max="5000" step="100" v-model="minPrice" @change="setRangeSlider">
                    <input type="range" min="0" max="5000" step="100" v-model="maxPrice" @change="setRangeSlider">
                </div>
                <div class="range-values">
                    <p>Min: {{minPrice}}</p>
                    <p>Max: {{maxPrice}}</p>
                </div>

                <!--                уровень отеля по количеству звезд-->
                <div>
                    <b-form-group label="">
                        <h5>&#10031;&#10031;&#10031;&#10031;&#10031;</h5>
                        <b-form-checkbox-group
                                v-model="selected_star"
                                :options="options_star"
                                name="stars"
                                stacked
                        ></b-form-checkbox-group>
                    </b-form-group>
                    <!--                    <div class="mt-3">Selected: <strong>{{ selected_star }}</strong></div>-->
                </div>


                <!--                по количеству отзывов-->
                <div>
                    <h5>Отзывы</h5>
                    <input
                            style="height: 40px"
                            type="number" min="0"
                            oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                            v-model="reviews">
                </div>
                <br>
                <div class="row">
                    <button class="btn" style="margin-right: 5px" @click="reset">Сбросить</button>
                    <button class="btn" @click="exec">Выполнить</button>
                </div>

            </div>
            <div class="v-hotel-list__list col-9">
                <div class="row" style="flex-wrap: nowrap">
                    <h6 class="col-3">Отель</h6>
                    <h6 class="col-2">Страна</h6>
                    <h6 class="col-1">Звезды</h6>
                    <h6 class="col-2">Тип</h6>
                    <h6 class="col-1">Цена</h6>
                    <h6 style="width: 60px">Отзывы</h6>
                    <h6 class="col-2">Бронь</h6>
                </div>
                <v-hotel-detail
                        id="rowHotels"
                        v-for="hotel in chunc"
                        :key="hotel.name"
                        :hotel_data="hotel"
                        @addToOrder="addToOrder"
                />
                <b-pagination
                        v-if="sortedHotels.length > 0"
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        pills


                ></b-pagination>
                <div v-else>
                    <hr>
                    <h5>Записей не найдено</h5>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import vHotelDetail from './v-hotel-details'
    import {mapActions, mapGetters} from 'vuex'


    export default {
        name: "v-hotel-list",
        data() {
            return {
                perPage: 3,
                currentPage: 1,

                reviews: 0,
                sortedHotels: [],
                minPrice: 0,
                maxPrice: 5000,
                categories: [
                    {text: 'Все', value: 'Все'},
                    {text: 'Отель', value: 'Отель'},
                    {text: 'Апартаменты', value: 'Апартаменты'},
                ],
                selected_type: "Все",

                countries: [
                    {text: 'Все', value: 'Все'},
                    {text: 'Греция', value: 'Греция'},
                    {text: 'Италия', value: 'Италия'},
                ],
                selected_country: "Все",

                selected_star: [],
                options_star: [
                    {text: '1', value: 1},
                    {text: '2', value: 2},
                    {text: '3', value: 3},
                    {text: '4', value: 4},
                    {text: '5', value: 5},
                ]

            };
        },
        components: {
            vHotelDetail
        },
        props: {},
        computed: {
            ...mapGetters([
                'HOTELS',
                'ORDER'
            ]),
            rows() {
                return this.filteredHotels.length;
            },
            filteredHotels() {
                return this.sortedHotels;
/*                if (this.sortedHotels.length) {
                    return this.sortedHotels;
                } else {
                    return this.HOTELS;
                }*/
            },
            chunc() {
                let tmp = (this.currentPage - 1) * this.perPage
                return this.filteredHotels.slice(tmp, tmp + this.perPage)
            },
        },
        methods: {
            ...mapActions([
                'GET_HOTELS_FROM_JSON',
                'ADD_TO_ORDER'
            ]),
            setRangeSlider() {
                if (this.minPrice > this.maxPrice) {
                    let tmp = this.maxPrice;
                    this.maxPrice = this.minPrice;
                    this.minPrice = tmp;
                }
                // this.selectFilters()
            },
            exec() {
                this.selectFilters()
            },
            selectFilters() {
                let vm = this;
                this.sortedHotels = [...this.HOTELS]

                // фильтр типов отелей
                this.selected_type !== 'Все' ?
                    this.sortedHotels = this.sortedHotels.filter(item => {
                        return item.type === vm.selected_type
                    }) :
                    null


                // фильтр стран
                this.selected_country !== 'Все' ?
                    this.sortedHotels = this.sortedHotels.filter(item => {
                        return item.country === vm.selected_country
                    }) :
                    null

                // фильтр минимальной стоимости
                this.sortedHotels = this.sortedHotels.filter(item => {
                    return item.min_price >= vm.minPrice && item.min_price <= vm.maxPrice
                })

                // фильтр звездного уровня
                if (vm.selected_star.length > 0) {

                    let tempArr = []
                    vm.selected_star.map(item => {
                        vm.sortedHotels.map(el => {
                            el.stars === item ? tempArr.push(el) : null
                        })
                    })
                    vm.sortedHotels = tempArr
                }

                // фильтр по количеству отзывов
                this.sortedHotels = this.sortedHotels.filter(item => {
                    return item.reviews_amount >= vm.reviews
                })

            },
            reset() {
                let vm = this
                vm.selected_country = "Все"
                vm.selected_type = 'Все'
                vm.selected_star = []
                vm.minPrice = 0
                vm.maxPrice = 5000
                vm.reviews = 0
                this.selectFilters()
            },
            addToOrder(data) {
                this.ADD_TO_ORDER(data);
            },
        },
        async mounted() {
            // mapActions замещают:
            // this.$store.dispatch('GET_HOTELS_FROM_JSON')
            // mapGetters замещают:
            // this.storage.state.hotels
            await this.GET_HOTELS_FROM_JSON();
            this.exec();
        }
    }
</script>

<style lang="scss">
    .v-hotel-list {
        /*        &__list {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                }*/

        &__link_to_order {
            /*position: absolute;*/
            width: 170px;
            top: 10px;
            right: 10px;
            padding: $padding * 2;
            border: solid 1px #aeaeae;
            margin: $margin * 2;
            border-radius: $radius * 2;
        }
    }

    .filters {
        display: inline-flex;
        flex-direction: column;
        /*justify-content: space-between;*/
        justify-content: center;
        align-items: center;
        /*margin: auto;*/
        margin-top: 0;
        vertical-align: top !important;
    }

    .range-slider {
        width: 100px;
        margin: auto 16px;
        text-align: center;
        position: relative;
    }

    .range-slider svg, .range-slider input[type=range] {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    input[type=range]::-webkit-slider-thumb {
        z-index: 2;
        position: relative;
        top: 2px;
        margin-top: -7px;
    }

</style>