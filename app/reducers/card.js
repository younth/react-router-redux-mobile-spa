import * as actionTypes from '../constants/types'

const initialState = {
    name: 'card',
    loading: true,
    state: 0
}

export default function card(state = initialState, action) {
    switch (action.type) {

        case actionTypes.GET_HOMECARD_REQUEST:
            return {
                ...state,
                loading: true,
                state: 1
            }
        case actionTypes.GET_HOMECARD_SUCCESS:
            return {
                ...state,
                loading: false,
                user_privileges: action.json.result.user_privileges,
                city_privileges: action.json.result.city_privileges,
                isVip: action.json.result.is_vip,
                state: 2
            }
        case actionTypes.GET_HOMECARD_FAILURE:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.error,
                state: 3
            }
        default:
            return state
    }
}