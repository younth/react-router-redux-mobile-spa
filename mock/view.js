module.exports = function(req, res, next) {
    res.json({
        error_no: 0,
        error_msg: "",
        result: {
            city_id: '132',
            city_name: "上海市",
            last_city_id: 131,
            last_city_name: "北京市",
            privilege_no: "131201611000001",
            stock: 1030,
            privilege_rule: {
                max_discount: 4,
                day_limit: 4,
                month_limit: 20
            },
            prices: [{
                period: 31,
                period_str: "一个月",
                price: 10,
                newuser_price: 9
            }, {
                period: 93,
                period_str: "三个月",
                price: 30,
                newuser_price: 20
            }]
        }
    })
};
