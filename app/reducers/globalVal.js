import * as actionTypes from '../constants/types'

const initialState = {
    lat: '',
    lng: ''
}

export default function userinfo(state = initialState, action) {
    switch (action.type) {

        case actionTypes.ADRESS_UPDATE:
            return {
                ...state,
                lat: action.lat || action.data.lat,
                lng: action.lng || action.data.lng
            }
        default:
            return state
    }
}
