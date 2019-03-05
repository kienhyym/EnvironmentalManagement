define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/DanhMuc/QuanHuyen/collection.html'),
    	schema 				= require('json!schema/QuanHuyenSchema.json');
    var CustomFilterView      = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "quanhuyen",
		bindings:"data-quanhuyen-bind",
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
		    	    		self.trigger("onSelected");
		    	    		var selected_items = self.uiControl.selectedItems;
		    	    		if(!!selected_items && selected_items.length>0){
		    	    			self.getApp().data("quanhuyen_id", selected_items[0]["id"]);
		    	    		}
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
    				{ field: "ma", label: "Mã", width:150},
    		     	{ field: "ten", label: "Tên", width:250 },
//    		     	{
//        	        	 field: "tinhthanh_id", 
//        	        	 label: "Tỉnh thành",
//        	        	 foreign: "tinhthanh",
//        	        	 foreignValueField: "id",
//        	        	 foreignTextField: "ten",
//        	        	 width:250
//        	         },
    		    ],
    		    onRowClick: function(event){
    	    		this.uiControl.selectedItems = event.selectedItems;
    	    	},
    	},
    	render:function(){
			var self= this;
            if (this.getApp().data("tinhthanh_id") !== null) {
                this.uiControl.filters = { "tinhthanh_id": { "$eq": this.getApp().data("tinhthanh_id") } };
			}

    		self.uiControl.orderBy = [{"field": "ten", "direction": "desc"}];
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
					{"tinhthanh_id": {"$eq": this.getApp().data("tinhthanh_id")}},
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
						// console.log("tinhthanh===", this.getApp().data("tinhthanh_id"));
						// if (this.uiControl.filters && this.uiControl.filters !== null){
						var filters = {"$and": [
							{"tinhthanh_id": {"$eq": this.getApp().data("tinhthanh_id")}},
							query
						]};
						// }
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