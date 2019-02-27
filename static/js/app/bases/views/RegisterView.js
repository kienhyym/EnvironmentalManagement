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
						var donvi_ten = self.model.get("donvi_ten");
						var captren = self.model.get("captren");
						var email = self.model.get("email");
						var fullname = self.model.get("fullname");
						var phone = self.model.get("phone");
						var pass = self.model.get("password");
						var cfpass = self.model.get("cfpassword");
						var donvi_tuyendonvi = self.model.get("donvi_tuyendonvi");
						var tinhthanh = self.model.get("tinhthanh");
						var quanhuyen = self.model.get("quanhuyen");
						var xaphuong = self.model.get("xaphuong");
						var donvi_sodienthoai = self.model.get("donvi_sodienthoai");

						if (donvi_ten == null || donvi_ten == "") {
							self.getApp().notify({ message: "Tên đơn vị không được để trống!" }, { type: "danger" });
						} else if (captren == null || captren == undefined) {
							self.getApp().notify({ message: "Chưa chọn cơ quan cấp trên!" }, { type: "danger" });
						} else if (donvi_sodienthoai == null || donvi_sodienthoai == "") {
							self.getApp().notify({ message: "Số điện thoại của đơn vị không được để trống!" }, { type: "danger" });
						} else if (self.validatePhone(donvi_sodienthoai) === false) {
							self.getApp().notify({ message: "Số điện thoại của đơn vị không đúng định dạng!" }, { type: "danger" });
						} else if (self.validateEmail(email) === false) {
							self.getApp().notify({ message: "Email không hợp lệ" }, { type: "danger" });
						} else if (fullname == null || fullname == "") {
							self.getApp().notify({ message: "Tên người dùng không được để trống!" }, { type: "danger" });
						} else if  (phone == null || phone == ""){
							self.getApp().notify({ message: "Số điện thoại không được để trống!" }, { type: "danger" });
						} else if (self.validatePhone(phone) === false) {
							self.getApp().notify({ message: "Số điện thoại không đúng định dạng!" }, { type: "danger" });
						} else if (pass == null || pass == "") {
							self.getApp().notify({ message: "Mật khẩu không được để trống!" }, { type: "danger" });
						}else if (pass == null || pass != cfpass) {
							self.getApp().notify({ message: "Xác nhận mật khẩu không đúng, vui lòng kiểm tra lại!" }, { type: "danger" });
						} else if (donvi_tuyendonvi == null || donvi_tuyendonvi == undefined) {
							self.getApp().notify({ message: "Chưa chọn khối cơ quan!" }, { type: "danger" });
						} else if ((donvi_tuyendonvi.id ===2 || donvi_tuyendonvi.id ===3 || donvi_tuyendonvi.id ===4) && (tinhthanh == null || tinhthanh == undefined)) {
								self.getApp().notify({ message: "Chưa chọn tỉnh thành!" }, { type: "danger" });
							
						} else if ((donvi_tuyendonvi.id ===3 || donvi_tuyendonvi.id ===4) && (quanhuyen == null || quanhuyen == undefined)) {
							self.getApp().notify({ message: "Chưa chọn quận huyện!" }, { type: "danger" });
						} else if (donvi_tuyendonvi.id ===4 && (xaphuong == null || xaphuong == undefined)) {
								self.getApp().notify({ message: "Chưa chọn xã phường!" }, { type: "danger" });
						} else {
							self.$el.find(".toolbar .btn-group .btn-success[btn-name='save']").prop('disabled', true);
							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().getRouter().navigate("/login");
									self.$el.find(".toolbar .btn-group .btn-success[btn-name='save']").prop('disabled', false);
									self.getApp().notify("Đăng ký thông tin thành công, Vui lòng chờ cấp trên duyệt tài khoản!");
								},
								error: function (xhr, status, error) {
									try {
										self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
									}
									catch (err) {
										self.getApp().notify({ message: "Đăng kí thông tin không thành công!"}, { type: "danger", delay: 1000 });
									}
								}
							});
						}
					},
				},
			],
		}],

		render: function () {
			var self = this;
			self.model.on("change:donvi_tuyendonvi", function(){
				var donvi_tuyendonvi = self.model.get("donvi_tuyendonvi");
				if (donvi_tuyendonvi.id === 2){
					self.$el.find("#quanhuyen").hide();
					self.$el.find("#xaphuong").hide();
				}
				if (donvi_tuyendonvi.id === 3){
					self.$el.find("#xaphuong").hide();
				}
				
			})
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
					},
					error: function () {
						self.getApp().notify("Lỗi lấy dữ liệu!");
					},
				});
			} else {
				self.applyBindings();
				// console.log("self getFE===", self.getFieldElement("quanhuyen"));
				// console.log("tinhthanhid====", self.model.get("tinhthanh_id"));
				// self.getFieldElement("quanhuyen").data("gonrin").setFilters({ "tinhthanh_id": { "$eq": self.model.get("tinhthanh_id")}});
			}

		},
		validateEmail: function (email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		},
		validatePhone: function(inputPhone) {
			if (inputPhone == null || inputPhone == undefined) {
				return false;
			}
            var phoneno = /(09|08|07|05|03)+[0-9]{8}/g;
            const result = inputPhone.match(phoneno);
            if (result && result == inputPhone) {
                return true;
            } else {
                return false;
            }
        }
	});
});