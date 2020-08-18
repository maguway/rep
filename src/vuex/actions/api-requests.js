import axios from "axios";

export default {

    GET_HOTELS_FROM_JSON({commit}) {
        return axios('http://localhost:3000/hotels', {
            method: "GET"
        })
            .then((hotels) => {
                commit('SET_HOTELS_TO_STATE', hotels.data);
                return hotels;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

}