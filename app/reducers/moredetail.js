import * as actionTypes from '../constants/types'

const initialState = {
    loading: true,
    accessList: {},
    privilege_rule: {},
    end_time: '',
    city_name: '',
    list: []
}

export default function detail(state = initialState, action) {
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
                accessList: {
                    time_days: result.time_days,
                    total_save: result.total_save,
                    delivery_times: result.delivery_times
                },
                list: result.list,
                privilege_rule: result.privilege_rule,
                end_time: result.end_time,
                city_name: result.city_name
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