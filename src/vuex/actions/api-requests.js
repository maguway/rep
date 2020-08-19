export default {

    GET_HOTELS_FROM_JSON({commit}) {
        return import("../../../hotels.json")
            .then(hotels => {
                commit('SET_HOTELS_TO_STATE', hotels.hotels);
                return hotels;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

}