import * as actionTypes from '../constants/types'

const initialState = {
    loading: true
}

export default function card(state = initialState, action) {
    switch (action.type) {

        case actionTypes.GET_DISCOUNTDETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.GET_DISCOUNTDETAIL_SUCCESS:
            let result = action.json.result;
            return {
                ...state,
                loading: false,
                data: result,
                errno: 0
            }
        case actionTypes.GET_DISCOUNTDETAIL_FAILURE:
            // error_no 不等于0
            return {
                ...state,
                loading: false,
                errno: action.json.error_no,
                errmsg: action.json.error_msg
            }
        default:
            return state
    }
}