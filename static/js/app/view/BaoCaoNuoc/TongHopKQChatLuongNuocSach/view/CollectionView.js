define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/tpl/collection.html'),
		schema = require('json!schema/TongHopKetQuaKiemTraChatLuongNuocSachSchema.json');


	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tonghop_ketqua_chatluong_nuocsach",
		uiControl: {
			fields: [{
					field: "nambaocao",
					label: "Năm báo cáo",
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
