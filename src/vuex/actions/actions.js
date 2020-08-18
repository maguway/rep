export default {

    ADD_TO_ORDER({commit}, hotel) {
        commit('SET_ORDER', hotel)
    },
    DELETE_FROM_ORDER({commit}, index) {
        commit('REMOVE_FROM_ORDER', index)
    },
    DECREMENT_ORDER({commit}, index) {
        commit('DECREMENT', index)
    },
    INCREMENT_ORDER({commit}, index) {
        commit('INCREMENT', index)
    },
}