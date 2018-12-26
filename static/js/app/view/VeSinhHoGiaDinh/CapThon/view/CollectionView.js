define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinhHoGiaDinh/CapThon/tpl/collection.html'),
		schema = require('json!schema/VSCapThonSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "vscapthon",
		uiControl: {
			fields: [
				{
					field: "nambaocao",
					label: "Năm báo cáo"
				},
				{
					field: "tinhthanh_id",
					label: "Tỉnh",
					foreign: "tinhthanh",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "quanhuyen_id",
					label: "Huyện",
					foreign: "quanhuyen",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "xaphuong_id",
					label: "Xã",
					foreign: "xaphuong",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "thonxom_id",
					label: "Thôn",
					foreign: "thonxom",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "tong_hotrongthon",
					label: "Tổng số hộ"
				},
				{
					field: "tong_chuholanu",
					label: "Số hộ nữ là chủ hộ"
				},
				{
					field: "tong_sohongheo",
					label: "Số hộ nghèo"
				},

				{
					field: "tong_sohodtts",
					label: "Số hộ là DTTS"
				},
				{
					field: "tong_dantrongthon",
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