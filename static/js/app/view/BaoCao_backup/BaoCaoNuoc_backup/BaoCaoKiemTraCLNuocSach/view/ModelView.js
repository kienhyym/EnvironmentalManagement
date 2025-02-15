define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/BaoCaoKiemTraCLNuocSach/tpl/model.html'),
		schema = require('json!schema/BaoCaoKiemTraCLNuocSachSchema.json');

	var maxDate = new Date();
	var TongHopChatLuongNuocTinhNeuCo = require('app/view/BaoCaoNuoc/TongHopChatLuongNuocTinhNeuCo/view/ModelItemView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocaokiemtraclnuocsach",
		uiControl: {
			fields: [{
					field: "thoigiankiemtra",
					textFormat: "DD/MM/YYYY",
					extraFormats: ["DDMMYYYY"],
					maxDate,
				},
				{
					field: "tonghopchatluongnuoctinhneuco",
					uicontrol: false,
					itemView: TongHopChatLuongNuocTinhNeuCo,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-success btn-sm",
						label: "<span class='fa fa-plus'>Thêm</span>",
						command: "create"
					}, ],
					toolEl: "#addItem"
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
									self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
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
						if (self.model.get("tonghopchatluongnuoctinhneuco").length === 0) {
							self.$el.find("#addItem button").click();
						}
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				self.$el.find("#addItem button").click();
			}

		},
	});

});