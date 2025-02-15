define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/DanhMucHoatDong/tpl/model.html'),
		schema = require('json!schema/DanhMucHoatDongSchema.json');
	var NganhSelectView = require('app/view/DanhMuc/Nganh/SelectView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "danhmuchoatdong",
		bindings:"data-danhmuchoatdong-bind",
		uiControl: {
			fields: [
				{
					field: "loai_hoatdong",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
						"value": "tinh",
						"text": "Tỉnh"
					},
					{
						"value": "huyen",
						"text": "Huyện"
					},
					{
						"value": "xa",
						"text": "Xã"
					},
					{
						"value": "thon",
						"text": "Thôn"
					},
					],
				},
				{
					field: "nganh",
					uicontrol: "ref",
					textField: "tennganh",
					foreignRemoteField: "id",
					foreignField: "nganh_id",
					dataSource: NganhSelectView
				},
			]
		},

		tools: [
			{
				name: "defaultgr",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [{
					name: "back",
					type: "button",
					buttonClass: "btn-default btn-sm",
					label: "TRANSLATE:BACK",
					command: function () {
						var self = this;
						Backbone.history.history.back();
					}
				},
				{
					name: "save",
					type: "button",
					buttonClass: "btn-success btn-sm",
					label: "TRANSLATE:SAVE",
					command: function () {
						var self = this;
						var tenhoatdong = self.model.get("tenhoatdong");
						var loai_hoatdong = self.model.get("loai_hoatdong");
						var nganh = self.model.get("nganh");

						if (tenhoatdong === null || tenhoatdong === "") {
							self.getApp().notify({ message: "Tên hoạt động không được để trống!" }, { type: "danger" });
						} else if (loai_hoatdong === null || loai_hoatdong === "") {
							self.getApp().notify({ message: "Bạn chưa chọn phạm vi hoạt động!" }, { type: "danger" });
						} else if (nganh === null || nganh === undefined) {
							self.getApp().notify({ message: "Bạn chưa chọn tên ngành!" }, { type: "danger" });
						} else {
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
					}
				},
				{
					name: "delete",
					type: "button",
					buttonClass: "btn-danger btn-sm",
					label: "TRANSLATE:DELETE",
					visible: function () {
						return this.getApp().getRouter().getParam("id") !== null;
					},
					command: function () {
						var self = this;
						self.model.destroy({
							success: function (model, response) {
								self.getApp().notify('Xoá dữ liệu thành công');
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