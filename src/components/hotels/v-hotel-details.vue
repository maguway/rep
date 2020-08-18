<template>
    <div class="v-hotel-details">
        <div class="row">
            <img class="col-1 v-hotel-details__image" :src=" require('../../assets/images/' + hotel_data.image) "
                 alt="img">
            <p class="col-2 v-hotel-details__name">{{hotel_data.name}}</p>
            <p class="col-2 v-hotel-details__country">{{hotel_data.country}}</p>
            <!--            <p class="v-hotel-details__address">{{hotel_data.address}}</p>-->
            <p class="col-1 v-hotel-details__stars">{{hotel_data.stars}}</p>
            <p class="col-2 v-hotel-details__type">{{hotel_data.type}}</p>
            <!--        <p class="v-hotel-details__description">{{hotel_data.description}}</p>-->
            <!--        <p class="v-hotel-details__services">{{hotel_data.services}}</p>-->
            <p class="col-1 v-hotel-details__min_price">{{hotel_data.min_price}} {{hotel_data.currency}}</p>
            <!--        <p class="v-hotel-details__currency">{{hotel_data.currency}}</p>-->
<!--            <p class="col-1 v-hotel-details__rating">{{hotel_data.rating}}</p>-->
            <!--        <p class="v-hotel-details__reviews_amount">{{hotel_data.reviews_amount}}</p>-->
            <!--        <p class="v-hotel-details__last_review">{{hotel_data.last_review}}</p>-->
            <p class="col-1 v-hotel-details__reviews_amount">{{hotel_data.reviews_amount}}</p>
            <button
                    class="ml-auto v-hotel-details__make_order btn"
                    style="width: 90px"
                    @click="addToOrder"
            >Бронь
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-hotel-details",
        data() {
            return {};
        },
        components: {},
        props: {
            hotel_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {},
        methods: {
            addToOrder() {
                this.$emit('addToOrder', this.hotel_data)
            },
        },
    }
</script>

<style lang="scss">
    .v-hotel-details {
        display: inline-flex;
        flex-basis: 100%;
        box-shadow: 0 0 8px 0 #c0c0c0;
        padding: $padding * 2;
        margin-bottom: $margin * 2;

        &__image {
            width: 80px;
        }

        &__make_order {
            width: 170px;
            margin-right: $margin;
        }


    }
</style>