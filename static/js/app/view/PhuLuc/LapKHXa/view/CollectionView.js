define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/LapKHXa/tpl/collection.html'),
		schema = require('json!schema/ItemXaSchema.json');

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
					field: "tentinh_id",
					label: "Tỉnh phê duyệt",
					foreign: "tentinh",
					foreignValueField: "id",
					foreignTextField: "ten"
				},
				{
					field: "hoatdong_xa",
					label: "Hoạt động"
				},
				{
					field: "muctieu_xa",
					label: "Mục tiêu"
				},
				{
					field: "sonutg_xa",
					label: "Số người tham gia là nữ"
				},
				{
					field: "songtg_xa",
					label: "Tổng số người tham gia"
				},
				{
					field: "dttstg_xa",
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