import axios from "axios";

export default {

    GET_HOTELS_FROM_JSON({commit}) {
        return axios.get('/api/hotels')
            .then(({ data: { hotels } }) => {
                commit('SET_HOTELS_TO_STATE', hotels);
                return hotels;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

}