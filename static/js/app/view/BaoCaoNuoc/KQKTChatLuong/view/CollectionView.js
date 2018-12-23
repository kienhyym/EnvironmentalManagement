define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/KQKTChatLuong/tpl/collection.html'),
		schema = require('json!schema/KQKTChatLuongSchema.json');


	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "kqktchatluong",
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
					field: "tongdv",
					label: "Tổng số đơn vị cấp nước",
					width: 250
				},
				{
					field: "tyle",
					label: "Chiếm tỷ lệ",
					width: 250
				},
				{
					field: "csngoaikiem",
					label: "Số cơ sở thực hiện ngoại kiểm",
					width: 250
				},
				{
					field: "kinhphi",
					label: "Số kinh phí được cấp cho công tác ngoại kiểm",
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
