define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/DanhMucHoatDong/tpl/collection.html'),
		schema = require('json!schema/DanhMucHoatDongSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "danhmuchoatdong",
		bindings:"data-danhmuchoatdong-bind",
		uiControl: {
			fields: [
				{
					field: "mahoatdong",
					label: "Mã",
				},
				{
					field: "tenhoatdong",
					label: "Tên hoạt động",
				},
				{
					field: "loai_hoatdong",
					label: "Phạm vi",
					template: function (dataRow) {
						if (dataRow.loai_hoatdong === "tinh") {
							return "Cấp Tỉnh"
						} else if (dataRow.loai_hoatdong === "huyen") {
							return "Cấp Huyện";
						} else if (dataRow.loai_hoatdong === "xa") {
							return "Cấp Xã";
						} else {
							return "Cấp Thôn";
						}
					},
				},
				{
					field: "muctieu",
					label: "Mục tiêu hoạt động",
				},
				{
	            	 field: "nganh_id", 
	            	 label: "Ngành",
	            	 foreign: "nganh",
	            	 foreignValueField: "id",
	            	 foreignTextField: "tennganh",
	           	 }
			],
			pagination: {
            	page: 1,
            	pageSize: 100
            },
			onRowClick: function (event) {
				if (event.rowId) {
					var path = this.collectionName + '/model?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
				}

			}
		},
		render: function () {
			this.uiControl.orderBy = [{"field": "loai_hoatdong", "direction": "asc"},{"field": "tenhoatdong", "direction": "asc"}];
			this.applyBindings();
			return this;
		},
	});

});