define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/CapThon/tpl/collection.html'),
		schema = require('json!schema/CapThonSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "capthon",
		uiControl: {
			fields: [
				{
					field: "danhgianam",
					label: "Ngày báo cáo"
				},
				{
					field: "tentinh_id",
					label: "Tỉnh",
					foreign: "tentinh",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "tenhuyen_id",
					label: "Huyện",
					foreign: "tenhuyen",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "tenxa_id",
					label: "Xã",
					foreign: "tenxa",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "thon_id",
					label: "Thôn",
					foreign: "thon",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "hotrongthon",
					label: "Tổng số hộ"
				},
				{
					field: "chuholanu",
					label: "Số hộ nữ là chủ hộ"
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
					field: "dantrongthon",
					label: "Tổng số dân"
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