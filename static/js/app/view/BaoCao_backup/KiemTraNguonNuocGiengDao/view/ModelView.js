define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCao/KiemTraNguonNuocGiengDao/tpl/model.html'), 
	schema = require('json!schema/KiemTraNguonNuocGiengDaoSchema.json');

	var maxDate = new Date();
	return Gonrin.ModelView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "kiemtranguonnuocgiengdao",

			uiControl: {
				fields: [

					 {
						field: "conhatieugangieng10m",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
						cssClassField: "cssClass",
						dataSource: [{
							value: 0,
							text: "Có"
						}, {
							value: 1,
							text: "Không",
							cssClass: "yeallow"
						},],
					}, {
						field: "cobairacgangieng10m",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
						cssClassField: "cssClass",
						dataSource: [{
							value: 0,
							text: "Có"
						}, {
							value: 1,
							text: "Không",
							cssClass: "yeallow"
						},],
					}, {
						field: "cochuonggiasucgangieng10m",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
						cssClassField: "cssClass",
						dataSource: [{
							value: 0,
							text: "Có"
						}, {
							value: 1,
							text: "Không",
							cssClass: "yeallow"
						},],
					}, {
						field: "napdaygieng",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
						cssClassField: "cssClass",
						dataSource: [{
							value: 0,
							text: "Có"
						}, {
							value: 1,
							text: "Không",
							cssClass: "yeallow"
						},],
					}, {
						field: "thanhgieng",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
						cssClassField: "cssClass",
						dataSource: [{
							value: 0,
							text: "Có"
						}, {
							value: 1,
							text: "Không",
							cssClass: "yeallow"
						},],
					}, {
						field: "vachgieng",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
						cssClassField: "cssClass",
						dataSource: [{
							value: 0,
							text: "Có"
						}, {
							value: 1,
							text: "Không",
							cssClass: "yeallow"
						},],
					},

					{
						field: "sangieng",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
						cssClassField: "cssClass",
						dataSource: [{
							value: 0,
							text: "Có"
						}, {
							value: 1,
							text: "Không",
							cssClass: "yeallow"
						},],
					}, 
					{
						field: "ranhthoatnuoc",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
						cssClassField: "cssClass",
						dataSource: [{
							value: 0,
							text: "Có"
						}, {
							value: 1,
							text: "Không",
							cssClass: "yeallow"
						},],
					}, 
					{
						field: "dungculaynuoc",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
						cssClassField: "cssClass",
						dataSource: [{
							value: 0,
							text: "Có"
						}, {
							value: 1,
							text: "Không",
							cssClass: "yeallow"
						},],
					}, 


				],
			},

			tools: [{
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

							self.model
								.save(
									null,
									{
										success: function (
											model, respose,
											options) {
											self
												.getApp()
												.notify(
													"Lưu thông tin thành công");
											self
												.getApp()
												.getRouter()
												.navigate(
													self.collectionName
													+ "/collection");

										},
										error: function (model,
											xhr, options) {
											self
												.getApp()
												.notify(
													'Lưu thông tin không thành công!');

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
							return this.getApp().getRouter().getParam(
								"id") !== null;
						},
						command: function () {
							var self = this;
							self.model
								.destroy({
									success: function (model,
										response) {
										self
											.getApp()
											.notify(
												'Xoá dữ liệu thành công');
										self
											.getApp()
											.getRouter()
											.navigate(
												self.collectionName
												+ "/collection");
									},
									error: function (model, xhr,
										options) {
										self
											.getApp()
											.notify(
												'Xoá dữ liệu không thành công!');

									}
								});
						}
					},],
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
							self.getApp().notify("Get data Eror");
						},
					});
				} else {
					self.applyBindings();
				}

			},
		});

});