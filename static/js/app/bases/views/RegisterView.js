define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/bases/tpl/register.html'),
		schema = require('json!schema/UserDonviSchema.json');

	var TuyenDonViSelectView = require('app/view/HeThong/DangKyDonVi/view/SelectViewTuyenDonVi');
	var DonViSelectView = require('app/view/HeThong/DangKyDonVi/view/SelectViewDonVi');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	
	
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "user_donvi",
		uiControl: {
			fields: [{
					field: "captren",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "captren_id",
					dataSource: DonViSelectView,
				},
				{
					field: "donvi_tuyendonvi",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "donvi_tuyendonvi_id",
					dataSource: TuyenDonViSelectView
				},
				{
					field: "tinhthanh",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tinhthanh_id",
					dataSource: TinhThanhSelectView
				},
				{
					field: "quanhuyen",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "quanhuyen_id",
					dataSource: QuanHuyenSelectView
				},
				{
					field: "xaphuong",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "xaphuong_id",
					dataSource: XaPhuongSelectView
				},
			],


		},
		tools: [{
			name: "defaultgr",
			type: "group",
			groupClass: "toolbar-group",
			buttons: [
				{
					name: "back",
					type: "button",
					buttonClass: "btn-default btn-sm",
					label: "TRANSLATE:BACK",
					command: function () {
						var self = this;
						self.getApp().getRouter().navigate("login");
					}
				},
				{
					name: "save",
					type: "button",
					buttonClass: "btn-success btn-sm",
					label: "Đăng ký",

					command: function () {
						var self = this;
						var email = self.model.get("email");
						var phone = self.model.get("phone");
						var pass = self.model.get("password");
						var cfpass = self.model.get("cfpassword");
						if (self.validateEmail(email) === false) {
							console.log(email);
							self.getApp().notify({message: "Email không hợp lệ"},{type: "danger"});
						} else if (self.validatePhone(phone) === false) {
							self.getApp().notify({message: "Số điện thoại không đúng định dạng"},{type: "danger"});
						} else if (pass == null || pass != cfpass) {
							self.getApp().notify({message: "Xác nhận mật khẩu không đúng, vui lòng kiểm tra lại"},{type: "danger"});
						}else {
							self.model.save(null, {
								success: function (model, respose, options) {								
									self.getApp().getRouter().navigate("/login");
									self.getApp().notify("Đăng ký thông tin thành công, Vui lòng chờ cấp trên duyệt tài khoản!");
								},
								error: function (xhr, status, error) {
									try {
										self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
									}
									catch (err) {
										self.getApp().notify({ message: "Có lỗi xảy ra, vui lòng thử lại sau!" }, { type: "danger", delay: 1000 });
									}
								},
							});
						}

						

					},
				},
			],
		}],

		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
					},
					error: function () {
						self.getApp().notify("Lỗi lấy dữ liệu");
					},
				});
			} else {
				self.applyBindings();
			}

		},
		validateEmail: function(email) {
		    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(String(email).toLowerCase());
		},
		validatePhone: function (phone) {
			var regex_phone = /(0[1-9])+([0-9]{8})\b/g;
			return phone.match(regex_phone);
				
		}
	});

});