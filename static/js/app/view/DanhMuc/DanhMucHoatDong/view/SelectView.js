define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
		var template 		= require('text!app/view/DanhMuc/DanhMucHoatDong/tpl/collection.html'),
    	schema 				= require('json!schema/DanhMucHoatDongSchema.json');
    var CustomFilterView    = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "danhmuchoatdong",
		bindings:"data-danhmuchoatdong-bind",
    	textField: "ten",
    	tools : [
    	    {
    	    	name: "defaultgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [
					{
		    	    	name: "select",
		    	    	type: "button",
		    	    	buttonClass: "btn-success btn-sm",
		    	    	label: "TRANSLATE:SELECT",
		    	    	command: function(){
							var self = this;
							var get_data_onSelected = this.uiControl.selectedItems[0];
							delete get_data_onSelected.stt;
		    	    		self.trigger("onSelected", this.uiControl.selectedItems[0]);
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
				{ field: "stt", label: "STT"},
	    	     { field: "mahoatdong", label: "Mã"},
		     	 { field: "tenhoatdong", label: "Tên" },
		     	 { field: "loai_hoatdong", label: "Phạm vi" },
		     	{
	            	 field: "nganh_id", 
	            	 label: "Ngành",
	            	 foreign: "nganh",
	            	 foreignValueField: "id",
	            	 foreignTextField: "tennganh",
	           	 }
		    ],
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    	},
    	},
    	render:function() {
    		var self= this;
			// var filters = this.viewFilters();
			// console.log("filters ", filters);
    		var filter_loaihoatdong = "";
    		if(self.viewData && self.viewData.loai_hoatdong){
    			filter_loaihoatdong = {"loai_hoatdong":{"$eq": self.viewData.loai_hoatdong }};
    		}
    		var filter = new CustomFilterView({
    			el: self.$el.find("#grid_search"),
    			sessionKey: "Danhmuchoatdong_filter"
    		});
    		filter.render();
    		
    		if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var query = { "$or": [
					{"mahoatdong": {"$like": text }},
					{"tenhoatdong": {"$like": text }},
				]};
    			if (filter_loaihoatdong && filter_loaihoatdong !== ""){
					// query = {"$and":{filter_hoatdong, query}};
					query = {"$and": [
						{"loai_hoatdong": {"$eq": self.viewData.loai_hoatdong}},
						query
					]};
    			}
    			self.uiControl.filters = query;
    			self.uiControl.orderBy = [{"field": "mahoatdong", "direction": "asc"},{"field": "loai_hoatdong", "direction": "asc"}];
//    			filters = self.viewFilters();
//    			filters.filters['$and'].push(query);
    		}else{
    			if (filter_loaihoatdong && filter_loaihoatdong !== ""){
    				self.uiControl.filters = filter_loaihoatdong;
    			}else{
    				self.uiControl.filters = null;
    			}
    			self.uiControl.orderBy = [{"field": "mahoatdong", "direction": "asc"},{"field": "loai_hoatdong", "direction": "asc"}];

    			
    		}
//    		self.uiControl.filters = filters.filters;
//    		self.uiControl.orderBy = [{"field": "mahoatdong", "direction": "asc"}];
    		self.applyBindings();
    		
    		filter.on('filterChanged', function(evt) {
				var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var query = { "$or": [
							{"mahoatdong": {"$like": text }},
							{"tenhoatdong": {"$like": text }},
						]};
						if (filter_loaihoatdong && filter_loaihoatdong !== ""){
		    				var filters = {"$and": [
								{"loai_hoatdong": {"$eq": self.viewData.loai_hoatdong}},
								query
							]};
		    			}
//						filters = self.viewFilters();
//						filters.filters['$and'].push(query);
						$col.data('gonrin').filter(filters);
					} else {
						self.uiControl.filters = null;
//						filters = this.viewFilters();
					}
				}
				self.applyBindings();
    		});
    		
    		return this;
    		
    	},
    	
    	/**
    	 * INIT FORM WITH FILTERS
    	 */
    	viewFilters: function() {
    		var self = this;
    		var filters = {
    			"filters": {
    				"$and": []
    			}
    		};
    		if (this.viewData && this.viewData.query) {
    			filters = this.viewData.query;
    		}
    		return JSON.parse(JSON.stringify(filters));
    	}
    	
    });

});