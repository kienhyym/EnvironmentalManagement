define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/LapKHXa/tpl/collection.html'),
		schema = require('json!schema/TienDoKeHoachBCCSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "itemxa",
		uiControl: {
			fields: [{
					field: "nganh",
					label: "Ngành",
					template: function (rowData) {
						if (rowData.nganh === 1) {
							return "NGÀNH Y TẾ";
						} else {
							return "NGÀNH GIÁO DỤC";
						}
					},
				},
				{
					field: "hoatdong",
					label: "Hoạt động"
				},
				{
					field: "muctieu",
					label: "Mục tiêu"
				},
				{
					field: "ketqua_datduoc",
					label: "Kết quả đạt được"
				},
				{
					field: "songuoi_lanu",
					label: "Số người tham gia là nữ"
				},
				{
					field: "tongsonguoi_thamgia",
					label: "Tổng số người tham gia"
				},
				{
					field: "songuoi_dantocthieuso",
					label: "Số người tham gia là DTTS"
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