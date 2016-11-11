import * as actionTypes from '../constants/types'

const initialState = {
    payResult: ''
}

export default function baseInfo(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SAVE_PAYRESULT:
            return {
                ...state,
                payResult: action.payResult || action.data.payResult
            }
        default:
            return state
    }
}

