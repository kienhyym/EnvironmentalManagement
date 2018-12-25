define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/LapKHTinh/tpl/collection.html'),
		schema = require('json!schema/ItemThonSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "itemthon",
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
					field: "tentinh_id",
					label: "Tỉnh phê duyệt",
					foreign: "tentinh",
					foreignValueField: "id",
					foreignTextField: "ten"
				},
				{
					field: "hoatdong_thon",
					label: "Hoạt động"
				},
				{
					field: "muctieu_thon",
					label: "Mục tiêu"
				},
				{
					field: "sonutg_thon",
					label: "Số người tham gia là nữ"
				},
				{
					field: "songtg_thon",
					label: "Tổng số người tham gia"
				},
				{
					field: "dttstg_thon",
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