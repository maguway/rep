<template>
    <div class="v-order">
        <h3 v-show="order_data.length">Order</h3>
        <router-link :to="{name: 'hotels'}">
            <div class="ml-auto v-hotel-list__link_to_order">Назад</div>
        </router-link>
        <p v-if="!order_data.length">Отели не забронированы...</p>
        <v-order-details
                v-for="(item, idx) in order_data"
                :key="item.name"
                :order_details_data="item"
                @deleteFromOrder="deleteFromOrder(idx)"
                @decrement="decrement(idx)"
                @increment="increment(idx)"
        />
        <div class="v-order__total">
            <p class="total__name">Total:</p>
            <p>{{myRound(orderTotalCost)}} &#8381;</p>
        </div>
    </div>
</template>

<script>
    import vOrderDetails from './v-order-details'
    import {mapActions} from 'vuex'

    export default {
        name: "v-order",
        data() {
            return {};
        },
        components: {
            vOrderDetails,
        },
        props: {
            order_data: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        computed: {
            orderTotalCost() {
                let result = [];

                if (this.order_data.length) {
                    for (let item of this.order_data) {
                        result.push(item.min_price * item.quantity);
                    }

                    result = result.reduce(function (sum, el) {
                        return sum + el;
                    })
                    return result;
                } else {
                    return 0;
                }
            }
        },
        methods: {
            ...mapActions([
                'DELETE_FROM_ORDER',
                'DECREMENT_ORDER',
                'INCREMENT_ORDER',
            ]),
            decrement(index) {
                this.DECREMENT_ORDER(index)
            },
            increment(index) {
                this.INCREMENT_ORDER(index)
            },
            deleteFromOrder(index) {
                this.DELETE_FROM_ORDER(index);
            },
            myRound(dataNumber) {
                return dataNumber.toFixed(0)
            },
        }
    }
</script>

<style lang="scss">
    .v-order {
        margin-bottom: 100px;

        &__total {
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            padding: $padding $padding * 3;
            display: flex;
            justify-content: center;
            background: #26ae68;
            color: #ffffff;
            font-size: 18px;
        }

        .total__name {
            margin-right: $margin * 2;
        }
    }
</style>