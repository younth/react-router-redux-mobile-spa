import * as actionTypes from '../constants/types'
import { get } from '../fetch/get'

//获取广告数据列表，promise形式
export const getDemoData = () => {
    return {
        type: actionTypes.GET_ADLIST,
        promise: get('/news?tn=bdcmspage')
    }
}
