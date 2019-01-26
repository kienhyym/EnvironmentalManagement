define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/tpl/DanhMuc/ThonXom/model.html'),
		schema = require('json!schema/ThonXomSchema.json');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "thonxom",
		bindings:"data-thonxom-bind",
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
							var ten = self.model.get("ten");
							var xaphuong = self.model.get("xaphuong");
							if (ten === null || ten === "") {
								self.getApp().notify({ message: "Tên thôn xóm không được để trống!" }, { type: "danger" });
							} else if (xaphuong === null || xaphuong === undefined) {
								self.getApp().notify({ message: "Bạn chưa chọn tên xã phường!" }, { type: "danger" });
							} else {
								self.model.save(null, {
									success: function (model, respose, options) {
										self.getApp().notify("Lưu thông tin thành công");
										self.getApp().getRouter().navigate(self.collectionName + "/collection");

									},
									error: function (xhr, status, error) {
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
					field: "xaphuong",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "xaphuong_id",
					dataSource: XaPhuongSelectView
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
						self.getApp().notify("Lỗi lấy dữ liệu");
					},
				});
			} else {
				self.applyBindings();
			}

		},
	});

});