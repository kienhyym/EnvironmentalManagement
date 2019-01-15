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
					field: "ten",
					label: "Tên Đơn Vị"
				},
				{
					field: "congsuat",
					label: "Công suất"
				},
				{
					field: "tongso_hogiadinh",
					label: "Tổng số HGĐ"
				},
				{
					field: "tansuat_noikiem",
					label: "Tần suất nội kiểm"
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
			var self = this;
			if (this.getApp().data("tinhthanh_id") !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===2){
				this.uiControl.filters = {"tinhthanh_id": {"$eq": this.getApp().data("tinhthanh_id")}};
				self.uiControl.orderBy = [{"field": "quanhuyen_id", "direction": "desc"},{"field": "congsuat", "direction": "desc"}];

			} else if (this.getApp().data("quanhuyen_id") !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===3){
				this.uiControl.filters = {"quanhuyen_id": {"$eq": this.getApp().data("quanhuyen_id")}};
				self.uiControl.orderBy = [{"field": "congsuat", "direction": "desc"}];

    		} else {
				self.uiControl.orderBy = [{"field": "congsuat", "direction": "desc"}];
    		}
			this.applyBindings();
			return this;
		},
	});

});