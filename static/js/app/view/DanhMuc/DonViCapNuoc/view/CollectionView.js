define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/DonViCapNuoc/tpl/collection.html'),
		schema = require('json!schema/DonViCapNuocSchema.json');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "donvicapnuoc",
		bindings:"data-donvicapnuoc-bind",
		bindingBlocks: 'block-donvicapnuoc-bind',
		uiControl: {
			fields: [
				{
					field: "stt",
					label: "STT"
				},
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
					field: "diachi",
					label: "Địa Chỉ"
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
				self.uiControl.orderBy = [{"field": "quanhuyen_id", "direction": "desc"},{"field": "congsuat", "direction": "desc"}];

			} else if (this.getApp().data("quanhuyen_id") !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===3){
				this.uiControl.filters = {"$and":[{"quanhuyen_id": {"$eq": this.getApp().data("quanhuyen_id")}}, {"congsuat":{"$lt":1000}}]};
				self.uiControl.orderBy = [{"field": "congsuat", "direction": "desc"}];

    		} else {
				self.uiControl.orderBy = [{"field": "congsuat", "direction": "desc"}];
				}
				
			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: self.collectionName +"_filter"
			});
			filter.render();
	
			if(!filter.isEmptyFilter()) {
				var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
					var query = { "$or": [
					{"ten": {"$likeI": text }},
				]};
				if (this.getApp().data("tinhthanh_id") !== null && this.getApp().currentUser.donvi.tuyendonvi_id === 2){
					var filters = {"$and": [
						{"tinhthanh_id": {"$eq": this.getApp().data("tinhthanh_id")}},
						query
					]};
				} else if (this.getApp().data("quanhuyen_id") !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===3){
					var filters = {"$and": [
						{"quanhuyen_id": {"$eq": this.getApp().data("quanhuyen_id")}},
						{"congsuat":{"$lt":1000}},
						query
					]};
				}
				self.uiControl.filters = filters;
			} else {
				if (this.getApp().data("tinhthanh_id") !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===2){
					this.uiControl.filters = {"$and":[{"tinhthanh_id": {"$eq": this.getApp().data("tinhthanh_id")}}]};
					self.uiControl.orderBy = [{"field": "quanhuyen_id", "direction": "desc"},{"field": "congsuat", "direction": "desc"}];
	
				} else if (this.getApp().data("quanhuyen_id") !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===3){
					this.uiControl.filters = {"$and":[{"quanhuyen_id": {"$eq": this.getApp().data("quanhuyen_id")}}, {"congsuat":{"$lt":1000}}]};
	//				this.uiControl.filters = {"quanhuyen_id": {"$eq": this.getApp().data("quanhuyen_id")}, "congsuat":{"$lt":1000}};
					self.uiControl.orderBy = [{"field": "congsuat", "direction": "desc"}];
				} else {
					self.uiControl.filters = null;
				}
			}
			this.applyBindings();
	
			filter.on('filterChanged', function(evt) {
					var $col = self.getCollectionElement();
					var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var query = { "$or": [
							{"ten": {"$likeI": text }},
						]};
						if (this.getApp().data("tinhthanh_id") !== null && this.getApp().currentUser.donvi.tuyendonvi_id === 2){
							var filters = {"$and": [
							{"tinhthanh_id": {"$eq": this.getApp().data("tinhthanh_id")}},
							query
						]};
						} else if (this.getApp().data("quanhuyen_id") !== null && this.getApp().currentUser.donvi.tuyendonvi_id ===3){
						var filters = {"$and": [
							{"quanhuyen_id": {"$eq": this.getApp().data("quanhuyen_id")}},
							{"congsuat":{"$lt":1000}},
							query
						]};
					}
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