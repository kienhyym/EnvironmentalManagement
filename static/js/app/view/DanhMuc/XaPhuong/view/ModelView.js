define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/tpl/DanhMuc/XaPhuong/model.html'),
		schema = require('json!schema/XaPhuongSchema.json');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "xaphuong",
		bindings:"data-xaphuong-bind",
		state: null,
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
							self.getApp().showloading();
							var ten = self.model.get("ten");
							var quanhuyen = self.model.get("quanhuyen");
							if (ten == null || ten == "") {
								self.getApp().notify({ message: "Tên xã phường không được để trống!" }, { type: "danger" });
							} else if (quanhuyen == null || quanhuyen == undefined) {
								self.getApp().notify({ message: "Bạn chưa chọn tên quận huyện!" }, { type: "danger" });
							} else {
								self.model.save(null, {
									success: function (model, respose, options) {
										self.getApp().hideloading();
										self.getApp().notify("Lưu thông tin thành công");
										self.getApp().getRouter().navigate(self.collectionName + "/collection");

									},
									error: function (xhr, status, error) {
										try {
											self.getApp().hideloading();
										  	self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
										}
										catch (err) {
											self.getApp().hideloading();
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
								error: function (model, xhr, options) {
									self.getApp().notify('Xoá dữ liệu không thành công!');

								}
							});
						}
					},
				],
			}],
		uiControl: {
			fields: [
				{
					field: "quanhuyen",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "quanhuyen_id",
					dataSource: QuanHuyenSelectView
				},
			]
		},
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
						self.getApp().notify("Không tìm thấy dữ liệu");
					},
				});
			} else {
				self.applyBindings();
			}

		},
	});

});