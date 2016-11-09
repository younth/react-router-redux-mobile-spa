import * as actionTypes from '../constants/types'

const initialState = {
    lat: '',
    lng: '',
    city_id: '',
    from: '',
    app_ver: '',
    data: '',
    privilege_no: ''
}

export default function globalVal(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADRESS_UPDATE:
            return {
                ...state,
                lat: action.lat || action.data.lat || state.lat,
                lng: action.lng || action.data.lng || state.lng,
                city_id: action.city_id || action.data.city_id || state.city_id,
                from: action.from || action.data.from || state.from,
                app_ver: action.app_ver || action.data.app_ver || state.app_ver
            }
        case actionTypes.SAVE_PAYRESULT:
            return {
                ...state,
                payResult: action.payResult || action.data.payResult
            }
        default:
            return state
    }
}

