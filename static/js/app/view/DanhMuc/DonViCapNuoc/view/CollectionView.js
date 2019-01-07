define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/DonViCapNuoc/tpl/collection.html'),
		schema = require('json!schema/DonViCapNuocSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "donvicapnuoc",
		uiControl: {
			fields: [
    			{
					field: "ma",
					label: "Mã Đơn Vị",
				},
				{
					field: "ten",
					label: "Tên Đơn Vị"
				},
				{
					field: "nguonnuoc",
					label: "Nguồn Nước"
				},
				{
					field: "diachi",
					label: "Địa Chỉ"
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