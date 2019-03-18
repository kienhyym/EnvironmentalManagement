define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/HoGiaDinh/tpl/collection.html'),
		schema = require('json!schema/HoGiaDinhSchema.json');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "hogiadinh",
		bindings:"data-hogiadinh-bind",
		uiControl: {
			fields: [
				{
					field: "stt",
					label: "STT"
				},
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
			if (this.getApp().currentUser !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===2){
				this.uiControl.filters = {"tinhthanh_id": {"$eq": this.getApp().currentUser.donvi.tinhthanh_id}};
				self.uiControl.orderBy = [{"field": "quanhuyen_id", "direction": "asc"},{"field": "xaphuong_id", "direction": "asc"},{"field": "thonxom_id", "direction": "asc"},{"field": "tenchuho", "direction": "asc"}];

			} else if (this.getApp().currentUser !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===3){
				this.uiControl.filters = {"quanhuyen_id": {"$eq": this.getApp().currentUser.donvi.quanhuyen_id}};
				self.uiControl.orderBy = [{"field": "xaphuong_id", "direction": "asc"},{"field": "thonxom_id", "direction": "asc"},{"field": "tenchuho", "direction": "asc"}];

    		} else if (this.getApp().currentUser !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===4){
				this.uiControl.filters = {"xaphuong_id": {"$eq": this.getApp().currentUser.donvi.xaphuong_id}};
				self.uiControl.orderBy = [{"field": "thonxom_id", "direction": "asc"},{"field": "tenchuho", "direction": "asc"}];
    		}
			self.uiControl.orderBy = [{"field": "tinhthanh_id", "direction": "asc"},
				{"field": "quanhuyen_id", "direction": "asc"},
				{"field": "xaphuong_id", "direction": "asc"},
				{"field": "thonxom_id", "direction": "asc"},
				{"field": "tenchuho", "direction": "asc"}];

			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: self.collectionName +"_filter"
			});
			filter.render();

//			if(!filter.isEmptyFilter()) {
//				var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
//    			var filters = { "$or": [
//					{"tenchuho": {"$likeI": text }},
//				]};
//				self.uiControl.filters = filters;
//			}
			this.applyBindings();

			filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					var default_filter = self.uiControl.filters;
					if (text !== null){
						
		    			var filters = {"tenchuho": {"$likeI": text }};
		    			if (default_filter !==null  && default_filter!== ""){
		    				filters = { "$and": [
		    					filters,
		    					default_filter
		    				]};
		    			}
						$col.data('gonrin').filter(filters);
						//self.uiControl.filters = filters;
					} else {
						self.uiControl.filters = default_filter;
					}
				}
				self.applyBindings();
    		});
			return this;
		},
	});

});