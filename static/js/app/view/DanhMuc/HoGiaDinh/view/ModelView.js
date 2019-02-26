define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/HoGiaDinh/tpl/model.html'),
		schema = require('json!schema/HoGiaDinhSchema.json');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');

	var DanTocSelectView = require('app/view/DanhMuc/DanToc/view/SelectView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "hogiadinh",
		bindings:"data-hogiadinh-bind",
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
					field: "thonxom",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "thonxom_id",
					dataSource: ThonXomSelectView
				},
				{
					field: "dantoc",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "dantoc_id",
					dataSource: DanTocSelectView
				},
				{
					field: "gioitinh",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
						"value": 0,
						"text": "Nam"
					},
					{
						"value": 1,
						"text": "Nữ"
					},
					],
					value: 0
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
						var tenchuho = self.model.get("tenchuho");
						var gioitinh = self.model.get("gioitinh");
						var dantoc = self.model.get("dantoc");
						var tinhthanh = self.model.get("tinhthanh");
						var quanhuyen = self.model.get("quanhuyen");
						var xaphuong = self.model.get("xaphuong");
						var thonxom = self.model.get("thonxom");
						if (tenchuho === null || tenchuho === "") {
							self.getApp().notify({ message: "Tên chủ hộ không được để trống!" }, { type: "danger" });
						} else if (gioitinh === null || gioitinh === "") {
							self.getApp().notify({ message: "Giới tính của chủ hộ không được để trống!" }, { type: "danger" });
						} else if (dantoc === null || dantoc === undefined) {
							self.getApp().notify({ message: "Bạn chưa chọn tên dân tộc!" }, { type: "danger" });
						} else if (tinhthanh === null || tinhthanh === undefined) {
							self.getApp().notify({ message: "Bạn chưa chọn tên tỉnh thành!" }, { type: "danger" });
						} else if (quanhuyen === null || quanhuyen === undefined) {
							self.getApp().notify({ message: "Bạn chưa chọn tên quận huyện!" }, { type: "danger" });
						} else if (xaphuong === null || xaphuong === undefined) {
							self.getApp().notify({ message: "Bạn chưa chọn tên xã phường!" }, { type: "danger" });
						} else if (thonxom === null || thonxom === undefined) {
							self.getApp().notify({ message: "Bạn chưa chọn tên thôn xóm!" }, { type: "danger" });
						} else {
							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().notify("Lưu thông tin thành công");
									self.getApp().getRouter().navigate(self.collectionName + "/collection");

								},
								error: function (xhr, status, error) {
									if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
										self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
										self.getApp().getRouter().navigate("login");
									}
									try {
									  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
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
							error: function (model, xhr, options, error) {
								if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
									self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
									self.getApp().getRouter().navigate("login");
								}
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

			var currentUser = self.getApp().currentUser;
			if (!!currentUser && !!currentUser.donvi) {
				if (!!currentUser.donvi.tinhthanh_id) {
					self.model.set("tinhthanh_id", currentUser.donvi.tinhthanh_id);
					self.model.set("tinhthanh", currentUser.donvi.tinhthanh);
				}
				if (!!currentUser.donvi.quanhuyen_id) {
					self.model.set("quanhuyen_id", currentUser.donvi.quanhuyen_id);
					self.model.set("quanhuyen", currentUser.donvi.quanhuyen);
				}
				if (!!currentUser.donvi.xaphuong_id) {
					self.model.set("xaphuong_id", currentUser.donvi.xaphuong_id);
					self.model.set("xaphuong", currentUser.donvi.xaphuong);
					self.getApp().data("xaphuong_id", currentUser.donvi.xaphuong_id);
				}
			}
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
					},
					error: function (xhr, status, error) {
						if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
							self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
							self.getApp().getRouter().navigate("login");
						}
						self.getApp().notify("Lỗi lấy dữ liệu");
					},
				});
			} else {
				self.applyBindings();
			}

		},
	});

});