define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/DuyetVeSinhToanXa/tpl/model.html'),
		schema = require('json!schema/DuyetVeSinhToanXaSchema.json');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');

	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "duyet_vesinh_toanxa",
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
							var nam_datvesinh_toanxa = self.model.get("nam_datvesinh_toanxa");
							var nam_datvesinh_toanxa_benvung = self.model.get("nam_datvesinh_toanxa_benvung");
							if (toInt(nam_datvesinh_toanxa_benvung) < toInt(nam_datvesinh_toanxa) + 2) {
								self.getApp().notify({ message: "Năm đạt vệ sinh xã bền vững không hợp lệ!" }, { type: "danger" });
							} else {
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

			var currentUser = self.getApp().currentUser;
			if (!!currentUser && !!currentUser.donvi) {
				if (!!currentUser.donvi.tinhthanh_id) {
					self.model.set("tinhthanh_id", currentUser.donvi.tinhthanh_id);
					self.model.set("tinhthanh", currentUser.donvi.tinhthanh);
				}
			}

			// self.model.on("change:nam_datvesinh_toanxa", function () {
			// 	var nam_datvesinh_toanxa = self.model.get("nam_datvesinh_toanxa");

			// 	self.model.on("change:nam_datvesinh_toanxa_benvung", function () {
			// 		var nam_datvesinh_toanxa_benvung = self.model.get("nam_datvesinh_toanxa_benvung");

			// 		if (toInt(nam_datvesinh_toanxa_benvung) < toInt(nam_datvesinh_toanxa) + 2){
			// 			self.getApp().notify({message: "Năm đạt vệ sinh toàn xã bền vững không hợp lệ!!!"}, {type: "danger"});
			// 		}
			// 	});
			// });
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
					},
					error: function () {
						self.getApp().notify("Lấy dữ liệu lỗi");
					},
				});
			} else {
				self.applyBindings();
			}

		},
	});

});