define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/DanhMuc/XaPhuong/collection.html'),
    	schema 				= require('json!schema/XaPhuongSchema.json');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "xaphuong",
		bindings:"data-xaphuong-bind",
    	uiControl:{
	    	fields: [
				{
					field: "stt",
					label: "STT"
				},
		     	 { field: "ma", label: "Mã"},
		     	 { field: "ten", label: "Tên"},
		     	 {
	            	 field: "quanhuyen_id", 
	            	 label: "Quận Huyện",
	            	 foreign: "quanhuyen",
	            	 foreignValueField: "id",
					 foreignTextField: "ten"
	           	 },
		     ],
		     pagination: {
	            	page: 1,
	            	pageSize: 100
	            },
		     onRowClick: function(event){
		    		if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        	}
		    	}
    	},
	     render:function(){
	    	var self = this;
	    	 var currentUser = this.getApp().currentUser;
	    	 if (currentUser!==null && currentUser!== undefined && this.getApp().data("quanhuyen_id") !== null &&  currentUser.donvi.tuyendonvi_id >=3 && currentUser.donvi.tuyendonvi_id!==10) {
               this.uiControl.filters = { "quanhuyen_id": { "$eq": this.getApp().data("quanhuyen_id") } };
            }
			self.uiControl.orderBy = [{"field": "ten", "direction": "asc"}];

			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: self.collectionName +"_filter"
			});
			filter.render();

			if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var filters = { "$or": [
                    {"ten": {"$likeI": text }},
				]};
				self.uiControl.filters = filters;
				self.uiControl.orderBy = [{"field": "ten", "direction": "asc"}];
    		}
			this.applyBindings();

			filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var filters = { "$or": [
                            {"ten": {"$likeI": text }},
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
    	}
    	
    });

});