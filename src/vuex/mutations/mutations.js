export default {

    SET_HOTELS_TO_STATE: (state, hotels) => {
        state.hotels = hotels;
    },
    SET_ORDER: (state, hotel) => {
        if (state.order.length) {
            let isHotelChosen = false;
            state.order.map(function (item) {
                if (hotel.name === item.name) {
                    isHotelChosen = true;
                    item.quantity++;
                }
            })
            if (!isHotelChosen) {
                state.order.push(hotel)
            }
        } else {
            state.order.push(hotel)
        }
    },
    REMOVE_FROM_ORDER: (state, index) => {
        state.order.splice(index, 1)
    },
    DECREMENT: (state, index) => {
        if ((state.order[index].quantity > 1)) {
            state.order[index].quantity--
        }
    },
    INCREMENT: (state, index) => {
        state.order[index].quantity++
    },

}