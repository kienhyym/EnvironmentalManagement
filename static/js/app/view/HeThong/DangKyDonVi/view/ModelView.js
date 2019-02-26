define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/HeThong/DangKyDonVi/tpl/model.html'),
		schema = require('json!schema/UserDonviSchema.json');

	var TuyenDonViEnum = require('json!app/enum/TuyenDonViEnum.json');

	var TrangThaiDangKyDonViEnum = require('json!app/enum/TrangThaiDangKyDonViEnum.json');
	var TuyenDonViSelectView = require('app/view/DanhMuc/TuyenDonVi/view/SelectView');
	var DonViSelectView = require('app/view/HeThong/DonVi/view/SelectView');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "user_donvi",
		state: null,
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
					field: "trangthai",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: TrangThaiDangKyDonViEnum,
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
				buttons: [{
						name: "back",
						type: "button",
						buttonClass: "btn-default btn-sm",
						label: "Quay lại",
						command: function () {
							var self = this;
							if (self.progressbar) {

							}
							Backbone.history.history.back();
							//self.getApp().getRouter().navigate(self.collectionName + "/collection");
						}
					},
					{
						name: "save",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "TRANSLATE:SAVE",
						command: function () {
							var self = this;

							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().notify("Lưu thông tin thành công");
									self.getApp().getRouter().navigate(self.collectionName + "/collection");

								},
								error: function (xhr, status, error) {
									try {
										if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
											self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
											self.getApp().getRouter().navigate("login");
										} else {
										  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
										}
									}
									catch (err) {
									  self.getApp().notify({ message: "Lưu thông tin không thành công"}, { type: "danger", delay: 1000 });
									}
								}
							});


						}
					},
					{
						name: "delete",
						type: "button",
						buttonClass: "btn-danger btn-sm",
						label: "Xóa",
						visible: function () {
							return this.getApp().getRouter().getParam("id") !== null;
						},
						command: function () {
							var self = this;

							self.model.destroy({
								success: function (model, response) {
									if (self.progressbar) {

									}
									self.getApp().getRouter().navigate(self.collectionName + "/collection");
								},
								error: function (xhr, status, error) {
									try {
										if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
											self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
											self.getApp().getRouter().navigate("login");
										} else {
										  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
										}
									}
									catch (err) {
									  self.getApp().notify({ message: "Xóa dữ liệu không thành công"}, { type: "danger", delay: 1000 });
									}
								}
							});
						}
					},
				],
			},
			{
				name: "exportgr",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [{
					name: "export",
					type: "button",
					buttonClass: "btn-warning btn-sm",
					label: "Tạo đơn vị và tài khoản theo đơn đăng ký",
					visible: function () {
						return this.getApp().getRouter().getParam("id") !== null;
					},
					command: function () {
						var self = this;

						var id = self.model.get('id');
						var url = "/api/v1/adduser_donvi?id=" + id;
						$.ajax({
							url: url,
							success: function (data) {
								self.getApp().getRouter().navigate(self.collectionName + "/collection");
								self.getApp().notify("Thêm tài khoản thành công");
							},
							error: function (xhr, status, error) {
								try {
									if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
										self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
										self.getApp().getRouter().navigate("login");
									} else {
									  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
									}
								}
								catch (err) {
								  self.getApp().notify({ message: "Thêm đơn vị không thành công"}, { type: "danger", delay: 1000 });
								}
							}
						});
					}
				}, ]
			}
		],

		UiControl: [{
				field: "donvi_tuyendonvi",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: TuyenDonViEnum,
			},
			{
				field: "trangthai",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: TrangThaiDangKyDonViEnum,
			},
		],
		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				//progresbar quay quay
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
					},
					error: function (xhr, status, error) {
						try {
							if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
								self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
								self.getApp().getRouter().navigate("login");
							} else {
							  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
							}
						}
						catch (err) {
						  self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
						}
					}
				});
			} else {
				self.applyBindings();
			}

		},
	});

});