module.exports = function(req, res, next) {
    res.json({
        error_no: 0,
        error_msg: "",
        result: {
            is_vip: 0,
            city_id: "131",
            city_name: "北京市",
            displayname: "_DoubleW_",
            user_privileges: {
                valid: [{
                    city_id: 131,
                    state: 1,
                    start_time: "2016-10-28",
                    end_time: "2017-06-17",
                    privilege_no: 131201611000001,
                    privilege_type: 1000,
                    privilege_desc: "配送折扣",
                    privilege_name: "32131231",
                    privilege_info: {
                        discount_rate: 80,
                        day_limit: 4,
                        month_limit: 20,
                        max_discount: 4
                    },
                    expired: false, // 是否过期
                    renew_state: false, // 是否可续费
                    current_in_service: true, // 是否可用
                    expired_in: 3, // 还有多少天过期
                    city_name: "北京市",
                    discount_rate: 5, // 几折
                    off_sale: false // 是否下架
                }, {
                    city_id: 131,
                    state: 1,
                    start_time: "2016-10-28",
                    end_time: "2017-06-17",
                    privilege_no: 131201611000001,
                    privilege_type: 1000,
                    privilege_desc: "配送折扣",
                    privilege_name: "32131231",
                    privilege_info: {
                        discount_rate: 80,
                        day_limit: 4,
                        month_limit: 20,
                        max_discount: 4
                    },
                    expired: false, // 是否过期
                    renew_state: true, // 是否可续费
                    current_in_service: false, // 是否可用
                    expired_in: 3, // 还有多少天过期
                    city_name: "北京市",
                    discount_rate: 5, // 几折
                    off_sale: false // 是否下架
                }, {
                    city_id: 131,
                    state: 1,
                    start_time: "2016-10-28",
                    end_time: "2017-06-17",
                    privilege_no: 131201611000001,
                    privilege_type: 1000,
                    privilege_desc: "配送折扣",
                    privilege_name: "32131231",
                    privilege_info: {
                        discount_rate: 80,
                        day_limit: 4,
                        month_limit: 20,
                        max_discount: 4
                    },
                    expired: false, // 是否过期
                    renew_state: false, // 是否可续费
                    current_in_service: false, // 是否可用
                    expired_in: 3, // 还有多少天过期
                    city_name: "北京市",
                    discount_rate: 5, // 几折
                    off_sale: false // 是否下架
                }],
                expired: [{
                    city_id: 131,
                    state: 1,
                    start_time: "2016-10-28",
                    end_time: "2017-06-17",
                    privilege_no: 131201611000001,
                    privilege_type: 1000,
                    privilege_desc: "配送折扣",
                    privilege_name: "32131231",
                    privilege_info: {
                        discount_rate: 80,
                        day_limit: 4,
                        month_limit: 20,
                        max_discount: 4
                    },
                    expired: true, // 是否过期
                    renew_state: true, // 是否可续费
                    current_in_service: false, // 是否可用
                    expired_in: 3, // 还有多少天过期
                    city_name: "北京市",
                    discount_rate: 5, // 几折
                    off_sale: false // 是否下架
                }, {
                    city_id: 131,
                    state: 1,
                    start_time: "2016-10-28",
                    end_time: "2017-06-17",
                    privilege_no: 131201611000001,
                    privilege_type: 1000,
                    privilege_desc: "配送折扣",
                    privilege_name: "32131231",
                    privilege_info: {
                        discount_rate: 80,
                        day_limit: 4,
                        month_limit: 20,
                        max_discount: 4
                    },
                    expired: true, // 是否过期
                    renew_state: false, // 是否可续费
                    current_in_service: false, // 是否可用
                    expired_in: 3, // 还有多少天过期
                    city_name: "北京市",
                    discount_rate: 5, // 几折
                    off_sale: true // 是否下架
                }]
            },
            city_privileges: [{
                city_id: "131",
                city_name: "北京市",
                privilege_no: "4823133",
                privilege_name: "5折配送卡",
                start_time: "2016-11-22",
                end_time: "2016-11-30",
                privilege_rule: {
                    discount_rate: 80,
                    day_limit: 4,
                    month_limit: 20,
                    max_discount: 4
                },
                stock: 1030,
                btn_state: 1, // 1 购买 2 冲突 3 续费
                conflict_msg: '配送卡',
                price: 0.29 // 价格（分）
            }, {
                city_id: "131",
                city_name: "北京市",
                privilege_no: "4823133",
                privilege_name: "小度饭卡",
                start_time: "2016-11-22",
                end_time: "2016-11-30",
                privilege_rule: {
                    discount_rate: 80,
                    day_limit: 4,
                    month_limit: 20,
                    max_discount: 4
                },
                btn_state: 3,
                stock: 1000,
                conflict_msg: '配送卡',
                price: 0.29 // 价格（分）
            }, {
                city_id: "131",
                city_name: "北京市",
                privilege_no: "4823133",
                privilege_name: "小度饭卡",
                start_time: "2016-11-22",
                end_time: "2016-11-30",
                privilege_rule: {
                    discount_rate: 80,
                    day_limit: 4,
                    month_limit: 20,
                    max_discount: 4
                },
                btn_state: 2,
                stock: 10,
                conflict_msg: '7折配送卡',
                price: 0.29 // 价格（分）
            }, {
                city_id: "131",
                city_name: "北京市",
                privilege_no: "4823133",
                privilege_name: "小度饭卡",
                start_time: "2016-11-22",
                end_time: "2016-11-30",
                privilege_rule: {
                    discount_rate: 80,
                    day_limit: 4,
                    month_limit: 20,
                    max_discount: 4
                },
                btn_state: 1,
                stock: 0,
                conflict_msg: '配送卡',
                price: 0.29 // 价格（分）
            }]
        },
        _bdstoken: "8b55062b587a935cf6d93c28b028af77",
        _token_bindmobile: ""
    })
};
