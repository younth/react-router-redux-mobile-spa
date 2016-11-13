import * as actionTypes from '../constants/types'

const initialState = {
    loading: true,
    userPrivileges: {},
    cityPrivileges: [],
    cityName: ''
}

export default function card(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_HOMECARD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_HOMECARD_SUCCESS:
            let result = action.json.result
            return {
                ...state,
                loading: false,
                userPrivileges: result.user_privileges,
                cityPrivileges: result.city_privileges,
                cityName: result.city_name,
                isVip: result.is_vip,
                isLogin: result.is_login,
                isNew: result.is_new
            }
        case actionTypes.GET_HOMECARD_FAILURE:
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
