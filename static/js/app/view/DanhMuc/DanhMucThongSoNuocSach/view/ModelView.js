define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/tpl/DanhMuc/DanhMucThongSoNuocSach/model.html'),
		schema = require('json!schema/DanhMucThongSoNuocSachSchema.json');

	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
		}

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "danhmuc_thongso_nuocsach",
		bindings:"data-thongsobaocaochatluongnuoc-bind",
		uiControl: {
			fields: [
				{
					field: "batbuoc",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
						value: true,
						text: "Có",
					}, {
						value: false,
						text: "Không",

					}],
				},
			]
		},
		tools: [
			{
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
							if (!self.validate()) {
								return false;
							}
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
		validate: function(){
			var self = this;
			var tenthongso = self.model.get("tenthongso");
			var gioihan_toithieu = self.model.get("gioihan_toithieu");
			var gioihan_toida = self.model.get("gioihan_toida");
			if (!tenthongso) {
				self.getApp().notify({ message: "Tên thông số không được để trống!" }, { type: "danger" });
				return false;
			}
			if(gioihan_toithieu !== null && gioihan_toida !== null && gioihan_toithieu > gioihan_toida){
			self.getApp().notify({ message: "Giới hạn tối thiểu hoặc tối đa không hợp lệ!" }, { type: "danger" });
			return false;
			}

			// if(!gioihan_toida && gioihan_toithieu !== null){
			// 	if(Number.isInteger(gioihan_toithieu) == false){
			// 		self.getApp().notify({ message: "Giới hạn tối thiểu không hợp lệ!" }, { type: "danger" });
			// 		return false;
			// 	}
			// }
			// if(gioihan_toida !== "" || gioihan_toida !== null){
			// 	console.log("toi da vao day =>>>", gioihan_toida);
			// 	if(Number.isInteger(gioihan_toida) === false || gioihan_toithieu == null){
			// 	self.getApp().notify({ message: "Giới hạn tối đa không hợp lệ!" }, { type: "danger" });
			// 	return false;
			// 	}
			// }
			return true;
		}
	});

});