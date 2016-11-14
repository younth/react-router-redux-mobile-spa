import * as actionTypes from '../constants/types'

const initialState = {
    loading: true,
    data: {},
    accessList: {},
    radioList: []
}

export default function confirm(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CONFIRMINFO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_CONFIRMINFO_SUCCESS:
            let result = action.json.result
            return {
                ...state,
                loading: false,
                data: result,
                accessList: result.privilege_rule,
                radioList: result.prices,
                isNew: result.is_new
            }
        case actionTypes.GET_CONFIRMINFO_FAILURE:
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
