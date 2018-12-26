define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinhHoGiaDinh/CapTinh/tpl/collection.html'),
		schema = require('json!schema/VSCapTinhSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "vscaptinh",
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
					field: "tong_sohuyen",
					label: "Tổng số huyện"
				},
				{
					field: "tong_soxa",
					label: "Tổng số xã"
				},
				{
					field: "tong_soho",
					label: "Tổng số hộ trong huyện"
				},
				{
					field: "tong_danso",
					label: "Tổng số dân trong huyện"
				},
				{
					field: "tong_sohongheo",
					label: "Số hộ nghèo"
				},
				{
					field: "tong_sohodtts",
					label: "Số hộ DTTS"
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