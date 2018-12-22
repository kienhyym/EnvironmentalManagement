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
					field: "hotrongthon",
					label: "Số thôn trong xã"
				},
				{
					field: "chuholanu",
					label: "Tổng Số hộ trong xã"
				},
				{
					field: "sohongheo",
					label: "Hộ có nữ là chủ hộ"
				},
				
				{
					field: "sohodtts",
					label: "Số hộ nghèo là"
				},
				{
					field: "dantrongthon",
					label: "Số hộ là DTTS"
				},
				{
					field: "dantrongthon",
					label: "Tổng dân số trong xã"
				},
				{
					field: "sonu",
					label: "Số nữ"
				},
				{
					field: "sonam",
					label: "Số nam "
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