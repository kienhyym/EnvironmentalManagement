define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/DanhMuc/QuocGia/collection.html'),
		schema 				= require('json!schema/QuocGiaSchema.json');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "quocgia",
		bindings:"data-quocgia-bind",
    	uiControl:{
    		fields: [
				{
					field: "stt",
					label: "STT"
				},
	    	     { field: "ma", label: "Mã"},
		     	 { field: "ten", label: "Tên"},
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    	 //this.getApp().loading(); 
		    	 //this.getApp().alert("haha");
		    	
		    }
    	},
	    render:function(){
			var self = this;
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
				] };
				self.uiControl.filters = filters;
				self.uiControl.orderBy = [{"field": "ten", "direction": "asc"}];
    		}
			self.applyBindings();

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
    	},
    });

});