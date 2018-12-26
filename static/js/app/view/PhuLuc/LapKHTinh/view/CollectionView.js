define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/LapKHTinh/tpl/collection.html'),
		schema = require('json!schema/KeHoachThucHienSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "kehoachthuchien",
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
					field: "tinhthanh",
					textField: "ten",
					label: "Tên tỉnh",
					foreignRemoteField: "id",
					foreignField: "tinhthanh_id",
				},
				{
					field: "ngay_pheduyet",
					label: "Ngày phê duyệt",
				},
				{
					field: "xaydungduthao_bcc",
					label: "Xây dựng dự thảo kế hoạch BCC",
					template: function (rowData) {
						if (rowData.xaydungduthao === 2) {
							return "Đã hooàn thành dự thảo";
						} else if (rowData.xaydungduthao === 1) {
							return "Đang xây dựng";
						} else {
							return "Chưa xây dựng";
						}
					},
				},
				{
					field: "vihema_chapthuan",
					label: "VIHEMA và WB",
					template: function (rowData) {
						if (rowData.vihera === 2) {
							return "Đã chấp thuận";
						} else if (rowData.vihera === 1) {
							return "Đang rà soát";
						} else {
							return "Chưa rà soát";
						}
					},
				},
				{
					field: "sohoatdong_bcc",
					label: "Số hoạt động BCC cốt lõi"
				},
				{
					field: "trangthai_tinhpheduyen",
					label: "Trạng thái phê duyệt",
					template: function (rowData) {
						if (rowData.trangthai_tinhpheduyen === 1) {
							return "Đã phê duyệt";
						} else {
							return "Chưa phê duyệt";
						}
					},
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