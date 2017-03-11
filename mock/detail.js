"use strict";

module.exports = function(req, res, next) {
    const data = {
        "error_no": 0,
        "error_msg": "",
        "result": {
            city_id: "131",
            state: "1",
            start_time: "1479015511",
            end_time: "1481731199",
            privilege_no: "131201611000002",
            privilege_type: "1000",
            privilege_desc: "配送折扣",
            privilege_name: "5折免配送费",
            privilege_info: {
            discount_rate: "50",
            day_limit: "3",
            month_limit: "30",
            max_discount: "4"
            },
            city_name: "北京市",
            time_days: 1,
            date_start: "2016.11.13",
            date_end: "2016.12.14",
            total_save: 0,
            delivery_times: 0,
            page: 1,
            limit: "10",
            "list": [{
                "shop_logo": "http://img.waimai.baidu.com/pb/3e61963d3fb0ce02d02a76d7262928aa32",
                "shop_name": "正宗云南过桥米线酸辣粉面 1",
                "save_money": 5,
                "create_time": "2016.10.29"
            }, {
                "shop_logo": "http://img.waimai.baidu.com/pb/3e61963d3fb0ce02d02a76d7262928aa32",
                "shop_name": "正宗云南过桥米线酸辣粉面 1",
                "save_money": 5,
                "create_time": "2016.10.29"
            }, {
                "shop_logo": "http://img.waimai.baidu.com/pb/3e61963d3fb0ce02d02a76d7262928aa32",
                "shop_name": "正宗云南过桥米线酸辣粉面 1",
                "save_money": 5,
                "create_time": "2016.10.29"
            }, {
                "shop_logo": "http://img.waimai.baidu.com/pb/3e61963d3fb0ce02d02a76d7262928aa32",
                "shop_name": "正宗云南过桥米线酸辣粉面 1",
                "save_money": 5,
                "create_time": "2016.10.29"
            }, {
                "shop_logo": "http://img.waimai.baidu.com/pb/3e61963d3fb0ce02d02a76d7262928aa32",
                "shop_name": "正宗云南过桥米线酸辣粉面 1",
                "save_money": 5,
                "create_time": "2016.10.29"
            }, {
                "shop_logo": "http://img.waimai.baidu.com/pb/3e61963d3fb0ce02d02a76d7262928aa32",
                "shop_name": "正宗云南过桥米线酸辣粉面 1",
                "save_money": 5,
                "create_time": "2016.10.29"
            }, {
                "shop_logo": "http://img.waimai.baidu.com/pb/3e61963d3fb0ce02d02a76d7262928aa32",
                "shop_name": "正宗云南过桥米线酸辣粉面 1",
                "save_money": 5,
                "create_time": "2016.10.29"
            }, {
                "shop_logo": "http://img.waimai.baidu.com/pb/3e61963d3fb0ce02d02a76d7262928aa32",
                "shop_name": "正宗云南过桥米线酸辣粉面 1",
                "save_money": 5,
                "create_time": "2016.10.29"
            }, {
                "shop_logo": "http://img.waimai.baidu.com/pb/3e61963d3fb0ce02d02a76d7262928aa32",
                "shop_name": "正宗云南过桥米线酸辣粉面 1",
                "save_money": 5,
                "create_time": "2016.10.29"
            }, {
                "shop_logo": "http://img.waimai.baidu.com/pb/3e61963d3fb0ce02d02a76d7262928aa32",
                "shop_name": "---------------------------",
                "save_money": 5,
                "create_time": "2016.10.29"
            }],
            "total_save": 676,
            "delivery_times": "121",
            "time_range": "11.01-11.08",
            "time_days": 374,
            "end_time": "2016.12.05",
            "privilege_rule": {   
                "max_discount": 4,
                "day_limit": 8,
                "month_limit": 40
            },
            "city_name": "北京市"
        }
    }

    // 这里不是express的中间件，res为原生
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data))
};