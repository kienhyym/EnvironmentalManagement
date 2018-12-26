define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/tpl/DanhMuc/DanhMucHD/collection.html'),
		schema = require('json!schema/DanhMucHoatDongSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "danhmuchoatdong",
		uiControl: {
			fields: [{
					field: "id",
					label: "ID",
					width: 250,
					readonly: true,
				},
				{
					field: "mahoatdong",
					label: "Mã",
					width: 250
				},
				{
					field: "tenhoatdong",
					label: "Tên hoạt động",
					width: 250
				},
				{
					field: "loai_hoatdong",
					label: "Phạm vi",
					template: function (dataRow) {
						if (dataRow.loai_hoatdong === "tinh") {
							return "Trong tỉnh"
						} else if (dataRow.loai_hoatdong === "huyen") {
							return "Trong huyện";
						} else if (dataRow.loai_hoatdong === "xa") {
							return "Trong Xã";
						} else {
							return "Trong Thôn";
						}
					},
					width: 250
				},
				{
					field: "muctieu",
					label: "Mục tiêu hoạt động",
					width: 250
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