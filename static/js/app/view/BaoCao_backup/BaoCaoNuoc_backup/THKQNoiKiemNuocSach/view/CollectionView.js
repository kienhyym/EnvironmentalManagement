define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/THKQNoiKiemNuocSach/tpl/collection.html'),
		schema = require('json!schema/THKQNoiKiemNuocSachSchema.json');


	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "thkqnoikiemnuocsach",
		uiControl: {
			fields: [
				{
					field: "thongtuso",
					label: "Thông tư số",
					width: 250
				},
				{
					field: "ngaybanhanh",
					label: "Thời gian kiểm tra",
					width: 250
				},
				{
					field: "dvcapnuoc",
					label: "Đơn vị cấp nước",
					width: 250
				},
				{
					field: "diachi",
					label: "Địa chỉ",
					width: 250
				},
				{
					field: "congsuat",
					label: "Công suất thiết kế",
					width: 250
				},
				{
					field: "tonghgd",
					label: "Tổng số HGĐ được cung cấp nước",
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
