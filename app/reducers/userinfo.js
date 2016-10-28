import * as actionTypes from '../constants/types'

const initialState = {
    name: 'userinfo'
}

export default function userinfo(state = initialState, action) {
    switch (action.type) {

        case actionTypes.GET_USERINFO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_USERINFO_SUCCESS: 
            return {
                ...state,
                loading: false,
                data: action.json
            }
        case actionTypes.GET_USERINFO_FAILURE:
            return {
                ...state,
                loading: false,
                data: null,
                error: action.error
            }
        default:
            return state
    }
}
