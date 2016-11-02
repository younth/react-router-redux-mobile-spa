module.exports = function(req, res, next) {

	res.json({
		error_no: 0,
		error_msg: "",
		result: {
			is_vip: 1,
			city_id: "131",
			city_name: "北京市",
			displayname: "_DoubleW_",
			user_privileges: [{ // 用户特权列表
				'city_id': 131, // 城市id 
				'city_name': '北京', // 城市名字 
				'privilege_id': 1,
				'privilege_name': '配送月卡',
				'start_time': '2016-05-17', // 会员开始时间 
				'end_time': '2016-07-18', // 会员结束时间 
				'valid': true, // 是否有效
				'discount_desc': '5', // 折扣描述
				'renew_state': false, //是否可续费状态,
				'expired_in': 3 // 几天内到期
			}, { // 用户特权列表
				'city_id': 132, // 城市id 
				'city_name': '上海', // 城市名字 
				'privilege_id': 2,
				'privilege_name': '测试卡',
				'start_time': '2016-01-01', // 会员开始时间 
				'end_time': '2016-02-01', // 会员结束时间 
				'valid': true, // 是否有效
				'discount_desc': '7', // 折扣描述
				'renew_state': true, //是否可续费状态,
				'expired_in': 3 // 几天内到期
			}],
			city_privileges: [{
				city_id: "131",
				city_name: "北京市",
				privilege_no: "4823133",
				privilege_name: "5折配送卡",
				start_time: "2016-11-22",
				end_time: "2016-11-30",
				discount: "7", // 库存
				price: 0.29 // 价格（分）
			}]
		},
		_bdstoken: "8b55062b587a935cf6d93c28b028af77",
		_token_bindmobile: ""

	})
};