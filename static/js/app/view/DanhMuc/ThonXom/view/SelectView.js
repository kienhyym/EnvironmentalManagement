define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/DanhMuc/ThonXom/collection.html'),
    	schema 				= require('json!schema/ThonXomSchema.json');
    var CustomFilterView      = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "thonxom",
		bindings:"data-thonxom-bind",
    	textField: "ten",
    	valueField: "id",
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
		    	    		self.trigger("onSelected", get_data_onSelected);
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
					{
						field: "stt",
						label: "STT"
					},
    				 { field: "ma", label: "Mã"},
    		     	 { field: "ten", label: "Tên" },
    		     	{
    	            	 field: "xaphuong_id", 
    	            	 label: "Xã/Phường",
    	            	 foreign: "xaphuong",
    	            	 foreignValueField: "id",
    	            	 foreignTextField: "ten",
    	           	 },
    		    ],
    		    onRowClick: function(event){
    	    		this.uiControl.selectedItems = event.selectedItems;
    	    	},
    	},
    	render:function(){
    		var currentUser = this.getApp().currentUser;
            if (this.getApp().data("xaphuong_id") !== null) {
                this.uiControl.filters = { "xaphuong_id": { "$eq": this.getApp().data("xaphuong_id") } };
            }
    		this.uiControl.orderBy = [{"field": "ten", "direction": "desc"}];
    		var self= this;
    		var filter = new CustomFilterView({
    			el: self.$el.find("#grid_search"),
    			sessionKey: self.collectionName +"_filter"
    		});
    		filter.render();
    		
    		if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var query = { "$or": [
					{"ten": {"$like": text }},
				]};
				var filters = {"$and": [
					{"xaphuong_id": {"$eq": this.getApp().data("xaphuong_id")}},
					query
				]};
    			self.uiControl.filters = filters;
    		}
    		self.applyBindings();
    		
    		filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var query = { "$or": [
							{"ten": {"$like": text }},
						]};
						var filters = {"$and": [
							{"xaphuong_id": {"$eq": this.getApp().data("xaphuong_id")}},
							query
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