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
					field: "tenthon_id",
					label: "Thôn xóm",
					foreign: "tenthon",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "hotrongthon",
					label: "Tổng số hộ trong xã"
				},
				{
					field: "dantrongthon",
					label: "Tổng số dân trong xã"
				},
				{
					field: "sohongheo",
					label: "Số hộ nghèo"
				},
				{
					field: "sohodtts",
					label: "Số hộ là DTTS"
				},
				{
					field: "sonam",
					label: "Nam"
				},
				{
					field: "sonu",
					label: "Nữ"
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