<template>
    <div class="v-order-details row">
        <div class="col-1">
            <img class="m-4 v-order-details__image" :src=" require('../../assets/images/' + order_details_data.image) "
                 alt="img">
        </div>
        <div class="col-2">
            <p>{{order_details_data.name}}</p>
        </div>
        <div class="col-2">
            <p>{{order_details_data.type}}</p>
        </div>
        <div class="col-2">
            <p>{{order_details_data.min_price}}</p>
        </div>
        <div class="col-2 v-order-details__quantity">
            <p>Количество персон: </p>
            <span>
                <span class="quantity__btn" @click="decrementOrder">-</span>
                {{order_details_data.quantity}}
                <span class="quantity__btn" @click="incrementOrder">+</span>
            </span>
        </div>
        <button class="ml-auto btn" @click="deleteFromOrder">Delete</button>
    </div>
</template>

<script>

    export default {
        name: "v-order-details",
        data() {
            return {};
        },
        components: {},
        props: {
            order_details_data: {
                type: Object,
                default() {
                    return {}
                }
            },
        },
        computed: {},
        methods: {


            decrementOrder() {
                this.$emit('decrement')
            },

            incrementOrder() {
                this.$emit('increment')
            },

            deleteFromOrder() {
                this.$emit('deleteFromOrder')
            }
        },
        mounted() {
            this.$set(this.order_details_data, 'quantity', 1)
        }
    }
</script>

<style lang="scss">
    .v-order-details {
        display: flex;
        flex-wrap: nowrap;
        /*justify-content: space-between;*/
        align-items: center;
        box-shadow: 0 0 8px 0 #c0c0c0;
        padding: $padding * 2;
        margin-bottom: $margin * 2;

        &__image {
            width: 50px;
        }

        .quantity__btn{
            cursor: pointer;
        }

        /*flex-basis: 100%;*/
    }
</style>