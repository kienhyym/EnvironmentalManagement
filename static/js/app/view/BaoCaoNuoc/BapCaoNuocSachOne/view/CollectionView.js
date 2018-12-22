define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/BapCaoNuocSachOne/tpl/collection.html'),
		schema = require('json!schema/BapCaoNuocSachOneSchema.json');


	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocaonuocsachOne",
		uiControl: {
			fields: [{
					field: "thoigiankiemtra",
					label: "Thời gian kiểm tra",
					width: 250
				},
				{
					field: "ten",
					label: "Tên đơn vị cấp nước",
					width: 250
				},
				{
					field: "diachi",
					label: "Địa chỉ",
					width: 250
				},
				{
					field: "nguonnuoc",
					label: "Nguồn nước nguyên liệu",
					width: 250
				},
				{
					field: "somauvavitri",
					label: "Số mẫu và vị trí lấy mẫu nước",
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