define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/KQKiemTraNuocSach/tpl/collection.html'),
		schema = require('json!schema/KQKiemTraNuocSachSchema.json');


	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "kqkiemtranuocsach",
		uiControl: {
			fields: [{
					field: "ngaybanhanh",
					label: "Thời gian kiểm tra",
					width: 250
				},
				{
					field: "tongsotinh",
					label: "Tổng số tỉnh trên khu vực phụ trách",
					width: 250
				},
				{
					field: "tongdonvicapnuoc",
					label: "Tổng số đơn vị cấp nước trên khu vực phụ trách",
					width: 250
				},
				{
					field: "sotinhcobaocao",
					label: "Số tỉnh có báo cáo",
					width: 250
				},
				{
					field: "chiemtile",
					label: "Chiếm tỷ lệ:......%",
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
