define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/HoGiaDinh/tpl/collection.html'),
		schema = require('json!schema/HoGiaDinhSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "hogiadinh",
		uiControl: {
			fields: [
				{
					field: "tenchuho",
					label: "Tên chủ hộ"
				},
				{
					field: "gioitinh",
					label: "Giới tính",
					template: function (dataRow) {
						if (dataRow.gioitinh === 1) {
							return "Nữ"
						} else{
							return "Nam";
						}
					},
				},
				{
					field: "dantoc_id",
					label: "Dân tộc",
					foreign: "dantoc",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
	            	 field: "thonxom_id", 
	            	 label: "Thôn/Xóm",
	            	 foreign: "thonxom",
	            	 foreignValueField: "id",
	            	 foreignTextField: "ten",
	           	 },
	           	{
	            	 field: "xaphuong_id", 
	            	 label: "Xã/Phường",
	            	 foreign: "xaphuong",
	            	 foreignValueField: "id",
	            	 foreignTextField: "ten",
	           	 },
	           	{
	            	 field: "quanhuyen_id", 
	            	 label: "Quận/Huyện",
	            	 foreign: "quanhuyen",
	            	 foreignValueField: "id",
	            	 foreignTextField: "ten",
	           	 },
	           	{
	            	 field: "tinhthanh_id", 
	            	 label: "Tỉnh/Thành phố",
	            	 foreign: "tinhthanh",
	            	 foreignValueField: "id",
	            	 foreignTextField: "ten",
	           	 },
			],
			pagination: {
            	page: 1,
            	pageSize: 100
            },
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
				self.uiControl.orderBy = [{"field": "quanhuyen_id", "direction": "asc"},{"field": "xaphuong_id", "direction": "asc"},{"field": "thonxom_id", "direction": "asc"},{"field": "tenchuho", "direction": "asc"}];

			} else if (this.getApp().data("quanhuyen_id") !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===3){
				this.uiControl.filters = {"quanhuyen_id": {"$eq": this.getApp().data("quanhuyen_id")}};
				self.uiControl.orderBy = [{"field": "xaphuong_id", "direction": "asc"},{"field": "thonxom_id", "direction": "asc"},{"field": "tenchuho", "direction": "asc"}];

    		} else if (this.getApp().data("xaphuong_id") !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===4){
				this.uiControl.filters = {"xaphuong_id": {"$eq": this.getApp().data("xaphuong_id")}};
				self.uiControl.orderBy = [{"field": "thonxom_id", "direction": "asc"},{"field": "tenchuho", "direction": "asc"}];
    		}
//			self.uiControl.orderBy = [{"field": "tinhthanh", "direction": "asc"},
//				{"field": "quanhuyen", "direction": "asc"},
//				{"field": "xaphuong", "direction": "asc"},
//				{"field": "tenchuho", "direction": "asc"}];

			this.applyBindings();
			return this;
		},
	});

});