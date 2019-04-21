define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/DanhSachDonViThuocSUP/tpl/model.html'),
		schema = require('json!schema/DanhSachDonViThuocSUPSchema.json');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "danhsach_donvi_thuocSUP",
		bindings:"data-sup-bind",
		uiControl: {
			fields: [
				{
					field: "xaphuong",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "xaphuong_id",
					dataSource: XaPhuongSelectView
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
					dataSource: QuanHuyenSelectView,
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
						self.getFieldElement("quanhuyen").data("gonrin").setFilters({"tinhthanh_id": { "$eq": self.model.get("tinhthanh_id")}});
						self.getFieldElement("xaphuong").data("gonrin").setFilters({"quanhuyen_id": { "$eq": self.model.get("quanhuyen_id")}});

						self.model.on('change:tinhthanh_id', function(){
							self.getFieldElement("quanhuyen").data("gonrin").setFilters({"tinhthanh_id": { "$eq": self.model.get("tinhthanh_id")}});

						});
						self.model.on('change:quanhuyen_id', function(){
							self.getFieldElement("xaphuong").data("gonrin").setFilters({"quanhuyen_id": { "$eq": self.model.get("quanhuyen_id")}});

						});
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
				var currentUser = self.getApp().currentUser;
				if(currentUser!== null ){
					if(currentUser.donvi.tuyendonvi_id === 2){
						self.model.set("tinhthanh_id",currentUser.donvi.tinhthanh_id);
						self.model.set("tinhthanh",currentUser.donvi.tinhthanh);
						self.$el.find("#tinhthanh").prop('disabled', true);
//						self.getApp().data("tinhthanh_id",currentUser.donvi.tinhthanh_id);

					}else if (currentUser.donvi.tuyendonvi_id === 3){
						self.model.set("tinhthanh_id",currentUser.donvi.tinhthanh_id);
						self.model.set("tinhthanh",currentUser.donvi.tinhthanh);
						self.model.set("quanhuyen_id",currentUser.donvi.quanhuyen_id);
						self.model.set("quanhuyen",currentUser.donvi.quanhuyen);
						self.$el.find("#tinhthanh").prop('disabled', true);
						self.$el.find("#quanhuyen").prop('disabled', true);
//						self.getApp().data("quanhuyen_id",currentUser.donvi.quanhuyen_id);

					}else if (currentUser.donvi.tuyendonvi_id === 4){
						self.model.set("tinhthanh_id",currentUser.donvi.tinhthanh_id);
						self.model.set("tinhthanh",currentUser.donvi.tinhthanh);
						self.model.set("quanhuyen_id",currentUser.donvi.quanhuyen_id);
						self.model.set("quanhuyen",currentUser.donvi.quanhuyen);
						self.model.set("xaphuong_id",currentUser.donvi.xaphuong_id);
						self.model.set("xaphuong",currentUser.donvi.xaphuong);
						self.$el.find("#tinhthanh").prop('disabled', true);
						self.$el.find("#quanhuyen").prop('disabled', true);
						self.$el.find("#xaphuong").prop('disabled', true);
//						self.getApp().data("xaphuong_id",currentUser.donvi.xaphuong_id);

					}
				}
				self.applyBindings();
				self.model.on('change:tinhthanh_id', function(){
					self.getFieldElement("quanhuyen").data("gonrin").setFilters({"tinhthanh_id": { "$eq": self.model.get("tinhthanh_id")}});
				});
				self.model.on('change:quanhuyen_id', function(){
					self.getFieldElement("xaphuong").data("gonrin").setFilters({"quanhuyen_id": { "$eq": self.model.get("quanhuyen_id")}});
				});
			}
		},
	});

});