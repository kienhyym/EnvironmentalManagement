define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/DanhSachDonViThuocSUP/tpl/collection.html'),
		schema = require('json!schema/DanhSachDonViThuocSUPSchema.json');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "danhsach_donvi_thuocSUP",
		bindings:"data-sup-bind",
		uiControl: {
			fields: [
				{
					field: "stt",
					label: "STT"
				},
				{
	            	 field: "xaphuong_id", 
	            	 label: "Xã Phường",
	            	 foreign: "xaphuong",
	            	 foreignValueField: "id",
					 foreignTextField: "ten"
	           	 },
	           	{
	            	 field: "quanhuyen_id", 
	            	 label: "Quận/Huyện",
	            	 foreign: "quanhuyen",
	            	 foreignValueField: "id",
					 foreignTextField: "ten"
	           	 },
	           	{
	            	 field: "tinhthanh_id", 
	            	 label: "Tỉnh/Thành",
	            	 foreign: "tinhthanh",
	            	 foreignValueField: "id",
					 foreignTextField: "ten"
	           	 },
			],
			pagination: {
            	page: 1,
            	pageSize: 100
            },
            noResultsClass:"alert alert-default no-records-found",
			onRowClick: function (event) {
				if (event.rowId) {
					var path = this.collectionName + '/model?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
				}

			}
		},
		render: function () {
			var self = this;
			var queries = "";
			var currentUser = self.getApp().currentUser;
			if(currentUser!== null ){
				if(currentUser.donvi.tuyendonvi_id === 2){
					queries = {"tinhthanh_id":{"$eq":currentUser.donvi.tinhthanh_id}}
				}else if (currentUser.donvi.tuyendonvi_id === 3){
					queries = {"quanhuyen_id":{"$eq":currentUser.donvi.quanhuyen_id}}

				}else if (currentUser.donvi.tuyendonvi_id === 4){
					queries = {"xaphuong_id":{"$eq":currentUser.donvi.xaphuong_id}}
				}
			}else{
				self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
				self.getApp().getRouter().navigate('login');
				return;
			}
			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: self.collectionName +"_filter"
			});
			filter.render();
			self.uiControl.filters = queries;
			self.uiControl.orderBy = [{"field": "tinhthanh_id", "direction": "asc"},
				{"field": "quanhuyen_id", "direction": "asc"},
				{"field": "xaphuong_id", "direction": "asc"}];
//			if(!filter.isEmptyFilter()) {
//    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
//    			var filters = { "$or": [
//					{"tinhthanh": {"$likeI": text }},
//					{"quanhuyen": {"$likeI": text }},
//					{"xaphuong": {"$likeI": text }},
//					]};
//    			if (queries!==""){
//    				filters = {"$and":[queries,{ "$or": [
//    					{"tinhthanh": {"$likeI": text }},
//    					{"quanhuyen": {"$likeI": text }},
//    					{"xaphuong": {"$likeI": text }},
//    					]}
//        			]};
//    			}
//				self.uiControl.filters = filters;
//				self.uiControl.orderBy = [{"field": "tinhthanh_id", "direction": "asc"},
//					{"field": "quanhuyen_id", "direction": "asc"},
//					{"field": "xaphuong_id", "direction": "asc"}];
//    		}
			this.applyBindings();

			filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var filters = {"$and":[queries,{ "$or": [
							{"tinhthanh": {"$likeI": text }},
							{"quanhuyen": {"$likeI": text }},
							{"xaphuong": {"$likeI": text }},
							]}
		    			]};
						$col.data('gonrin').filter(filters);
						//self.uiControl.filters = filters;
					} else {
						self.uiControl.filters = null;
					}
				}
				self.applyBindings();
    		});
			return this;
		},
	});

});