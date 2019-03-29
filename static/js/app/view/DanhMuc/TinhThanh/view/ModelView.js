define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/tpl/DanhMuc/TinhThanh/model.html'),
		schema = require('json!schema/TinhThanhSchema.json');
	var QuocGiaSelectView = require('app/view/DanhMuc/QuocGia/view/SelectView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tinhthanh",
		bindings:"data-tinhthanh-bind",
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
							var ten = self.model.get("ten");
							var quocgia = self.model.get("quocgia");
							var tongdan_nam = self.model.get("tongdan_nam");
							var tongdan_nu = self.model.get("tongdan_nu");
							var tong_hgd = self.model.get("tong_hgd");
							const isNumeric = /^\d+$/;
							if (ten == null || ten == "") {
								self.getApp().notify({ message: "Tên tỉnh thành không được để trống!" }, { type: "danger" });
							} else if (quocgia == null || quocgia == undefined) {
								self.getApp().notify({ message: "Bạn chưa chọn tên quốc gia!" }, { type: "danger" });
							} else if(isNumeric.test(tongdan_nam) == false){
								self.getApp().notify({ message: "Tổng số nam của tỉnh không hợp lệ, vui lòng kiểm tra lại!" }, { type: "danger" });
							} else if(isNumeric.test(tongdan_nu) == false){
								self.getApp().notify({ message: "Tổng số nữ của tỉnh không hợp lệ, vui lòng kiểm tra lại!" }, { type: "danger" });
							} else if(isNumeric.test(tong_hgd) == false){
								self.getApp().notify({ message: "Tổng số HGĐ của tỉnh không hợp lệ, vui lòng kiểm tra lại!" }, { type: "danger" });
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
		uiControl: {
			fields: [
				{
					field: "quocgia",
					uicontrol: "ref",
					textField: "ten",
					//chuyen sang thanh object
					foreignRemoteField: "id",
					foreignField: "quocgia_id",
					dataSource: QuocGiaSelectView
				},
			]
		},
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