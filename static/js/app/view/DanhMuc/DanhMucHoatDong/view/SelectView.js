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
		    	    		self.trigger("onSelected");
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
	    	     { field: "mahoatdong", label: "Mã", width:150},
		     	 { field: "tenhoatdong", label: "Tên" },
		     	 { field: "loai_hoatdong", label: "Phạm vi" },
		    ],
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    	},
    	},
    	render:function() {
    		var self= this;
    		var filters = this.viewFilters();
    		console.log("filters ", filters);
    		var filter = new CustomFilterView({
    			el: self.$el.find("#grid_search"),
    			sessionKey: "Dantoc_filter"
    		});
    		filter.render();
    		
    		if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var query = { "$or": [
					{"mahoatdong": {"$like": text }},
					{"tenhoatdong": {"$like": text }},
				]};
    			filters = self.viewFilters();
    			filters.filters['$and'].push(query);
    		}
    		self.uiControl.filters = filters.filters;
    		self.uiControl.orderBy = [{"field": "mahoatdong", "direction": "asc"}];
    		self.applyBindings();
    		
    		filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var query = { "$or": [
							{"mahoatdong": {"$like": text }},
							{"tenhoatdong": {"$like": text }},
						] };
						filters = self.viewFilters();
						filters.filters['$and'].push(query);
						$col.data('gonrin').filter(filters.filters);
					} else {
						self.uiControl.filters = null;
						filters = this.viewFilters();
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