define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!./tpl/collection.html'),
		schema 				= require('json!schema/NganhSchema.json');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "nganh",
		bindings:"data-nganh-bind",
    	uiControl:{
    		fields: [
				{
					field: "stt",
					label: "STT"
				},
	    	     { field: "manganh", label: "Mã"},
		     	 { field: "tennganh", label: "Tên ngành"},
		     	{ field: "thutu", label: "Thứ tự"},
		     ],
		     pagination: {
	            	page: 1,
	            	pageSize: 100
	            },
		     onRowClick: function(event) {
		    	if(event.rowId) {
		        		var path = 'nganh/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    }
    	},
    	tools : [
    	    {
    	    	name: "defaultgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [{
	    	    	name: "create",
	    	    	type: "button",
	    	    	buttonClass: "btn-success btn-sm",
	    	    	label: "TRANSLATE:CREATE",
	    	    	command: function() {
	    	    		var self = this;
	    	    		self.getApp().getRouter().navigate("nganh/model");
	    	    	}
	    	    }]
    	    }
    	],
	    render:function(){
			var self = this;
			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: self.collectionName +"_filter"
			});
			filter.render();
			 
			if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var filters = { "$or": [
					{"tennganh": {"$like": text }},
				] };
    			self.uiControl.filters = filters;
    		}
			self.applyBindings();

			filter.on('filterChanged', function(evt) {
				var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var filters = { "$or": [
							{"tennganh": {"$like": text }},
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