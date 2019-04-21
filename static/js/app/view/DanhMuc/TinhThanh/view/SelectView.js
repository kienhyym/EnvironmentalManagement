define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/DanhMuc/TinhThanh/collection.html'),
    	schema 				= require('json!schema/TinhThanhSchema.json');
    var CustomFilterView      = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "tinhthanh",
		bindings:"data-tinhthanh-bind",
    	textField: "ten",
//    	valueField: "id",
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
							if (this.uiControl.selectedItems && this.uiControl.selectedItems.length) { 
								var get_data_onSelected = this.uiControl.selectedItems[0];
								delete get_data_onSelected.stt;
								self.trigger("onSelected", get_data_onSelected);
							} else {
								self.trigger("onSelected");
							}
		    	    		var selected_items = self.uiControl.selectedItems;
		    	    		if(!!selected_items && selected_items.length>0){
								self.getApp().data("tinhthanh_id", selected_items[0]["id"]);
		    	    		}
		    	    		
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
//	    	     { 
//	    	    	field: "id",label:"ID",width:150,readonly: true, 
//	    	     },
				{
					field: "stt",
					label: "STT"
				},
	    	     { field: "ma", label: "Mã", width:200},
		     	 { field: "ten", label: "Tên", width:250 },
//		     	{
//    	        	 field: "quocgia_id", 
//    	        	 label: "Quốc gia",
//    	        	 foreign: "quocgia",
//    	        	 foreignValueField: "id",
//    	        	 foreignTextField: "ten",
//    	        	 width:250
//    	         },
//    	         { field: "quocgia", visible:false },
		    ],
		    noResultsClass:"alert alert-default no-records-found",
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    	},
    	},
    	render:function(){
    		
    		var self= this;
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
    		}
    		self.uiControl.orderBy = [{"field": "ten", "direction": "desc"}];
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
				self.uiControl.orderBy = [{"field": "ten", "direction": "desc"}];
				self.applyBindings();
    		});
    		return this;
    	},
    	
    });

});