define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/CapXa/tpl/collection.html'),
		schema = require('json!schema/CapXaSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "capxa",
		uiControl: {
			fields: [

				{
					field: "tentinh_id",
					label: "Tên tỉnh",
					foreign: "tentinh",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "tenhuyen_id",
					label: "Tên xã",
					foreign: "tenhuyen",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				
				{
					field: "sothon",
					label: "Tổng Số thôn"
				},
				{
					field: "hotrongxa",
					label: "Tổng Số hộ"
				},
				{
					field: "chuholanu",
					label: "Hộ có nữ là chủ hộ"
				},
				
				{
					field: "sohongheo",
					label: "Tổng số hộ nghèo"
				},
				{
					field: "sohodtts",
					label: "Số hộ là DTTS"
				},
				{
					field: "dantrongxa",
					label: "Tổng dân số"
				},
				{
					field: "sonu",
					label: "Số Nữ"
				},
				{
					field: "sonam",
					label: "Số Nam "
				},

			],
			onRowClick: function (event) {
				if (event.rowId) {
					var path = this.collectionName + '/model?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
				}
			}
		},
		render: function () {
			this.applyBindings();
			return this;
		},
	});

});