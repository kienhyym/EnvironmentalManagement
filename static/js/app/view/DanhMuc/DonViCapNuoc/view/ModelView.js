define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/DonViCapNuoc/tpl/model.html'),
		schema = require('json!schema/DonViCapNuocSchema.json');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');


	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "donvicapnuoc",
		uiControl: {
			fields: [
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
				{
					field: "nguonnuoc_nguyenlieu",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "Nước mặt", value: 3},
						{text: "Nước ngầm", value: 2},
						{text: "Cả nước mặt và nước ngầm", value: 1},
						{text: "Loại khác", value: 0}
					]
				},
				{
					field: "phuongphap_khutrung",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "Sử dụng clo", value: 1},
						{text: "Sử dụng ozon", value: 0},
					]
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
						
						if (!self.validate()) {
							return;
						}
						self.model.save(null, {
							success: function (model, respose, options) {
								self.getApp().notify("Lưu thông tin thành công");
								self.getApp().getRouter().navigate(self.collectionName + "/collection");

							},
							error: function (model, xhr, options) {
								self.getApp().notify('Lưu thông tin không thành công!');
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
							error: function (model, xhr, options) {
								self.getApp().notify('Xoá dữ liệu không thành công!');

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
					error: function () {
						self.getApp().notify("Lỗi lấy dữ liệu");
					},
				});
			} else {
				self.applyBindings();
			}

		},
		validate: function () {
			var self = this;
			if (!self.model.get("tinhthanh")) {
				self.getApp().notify({message: "Tỉnh thành không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("quanhuyen")) {
				self.getApp().notify({message: "Quận huyện không được để trống"},{type: "warning"});
				return;
			}
//			if (!self.model.get("xaphuong")) {
//				self.getApp().notify({message: "Xã phường không được để trống"},{type: "warning"});
//				return;
//			}
			if (!self.model.get("ten")) {
				self.getApp().notify({message: "Tên đơn vị cấp nước không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("congsuat")) {
				self.getApp().notify({message: "Công suất thiết kế không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("tongso_hogiadinh")) {
				self.getApp().notify({message: "Tổng số hộ gia đình không được để trống"},{type: "warning"});
				return;
			}
			if (self.model.get("nguonnuoc_nguyenlieu") === null || self.model.get("nguonnuoc_nguyenlieu") === "" ) {
				self.getApp().notify({message: "Nguồn nước nguyên liệu không được để trống"},{type: "warning"});
				return;
			}
			if (self.model.get("phuongphap_khutrung") === null || self.model.get("phuongphap_khutrung") === "") {
				self.getApp().notify({message: "Phương pháp khử trùng không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("tansuat_noikiem")) {
				self.getApp().notify({message: "Tần suất thực hiện nội kiểm không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("diachi")) {
				self.getApp().notify({message: "Địa chỉ cụ thể không được để trống"},{type: "warning"});
				return;
			}
			return true;
		}
	});

});