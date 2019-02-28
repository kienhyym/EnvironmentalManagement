define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/DanhMucHoatDong/tpl/collection.html'),
		schema = require('json!schema/DanhMucHoatDongSchema.json');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "danhmuchoatdong",
		bindings:"data-danhmuchoatdong-bind",
		uiControl: {
			fields: [
				{
					field: "stt",
					label: "STT"
				},
				{
					field: "mahoatdong",
					label: "Mã",
				},
				{
					field: "tenhoatdong",
					label: "Tên hoạt động",
				},
				{
					field: "loai_hoatdong",
					label: "Phạm vi",
					template: function (dataRow) {
						if (dataRow.loai_hoatdong === "tinh") {
							return "Cấp Tỉnh"
						} else if (dataRow.loai_hoatdong === "huyen") {
							return "Cấp Huyện";
						} else if (dataRow.loai_hoatdong === "xa") {
							return "Cấp Xã";
						} else {
							return "Cấp Thôn";
						}
					},
				},
				{
					field: "muctieu",
					label: "Mục tiêu hoạt động",
				},
				{
	            	 field: "nganh_id", 
	            	 label: "Ngành",
	            	 foreign: "nganh",
	            	 foreignValueField: "id",
	            	 foreignTextField: "tennganh",
	           	 }
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
			this.uiControl.orderBy = [{"field": "loai_hoatdong", "direction": "asc"},{"field": "tenhoatdong", "direction": "asc"}];

			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: self.collectionName +"_filter"
			});
			filter.render();

			if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var filters = { "$or": [
					{"tenhoatdong": {"$like": text }},
				] };
				self.uiControl.filters = filters;
				self.uiControl.orderBy = [{"field": "tenhoatdong", "direction": "asc"}];
    		}
			this.applyBindings();

			filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var filters = { "$or": [
							{"tenhoatdong": {"$like": text }},
						] };
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