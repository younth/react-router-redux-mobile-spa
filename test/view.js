module.exports = function(req, res, next) {
    res.json({
        error_no: 0,
        error_msg: "",
        result: {
            city_id: "131",
            city_name: "北京市",
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
                period: 6,
                period_str: "半年",
                price: 1.1
            }, {
                period: 6,
                period_str: "半年",
                price: 1.1
            }]
        },
        _bdstoken: "e363037bbcb605758073b209fb81446e",
        _token_bindmobile: ""
    })
};
