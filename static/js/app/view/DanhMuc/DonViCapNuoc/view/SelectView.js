define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
		var template 		= require('text!app/view/DanhMuc/DonViCapNuoc/tpl/collection.html'),
    	schema 				= require('json!schema/DonViCapNuocSchema.json');
    var CustomFilterView    = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "donvicapnuoc",
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
		    	    		self.trigger("onSelected", this.uiControl.selectedItems[0]);
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
    			{
					field: "ma",
					label: "Mã Đơn Vị",
				},
				{
					field: "ten",
					label: "Tên Đơn Vị"
				},
				{
					field: "nguonnuoc",
					label: "Nguồn Nước"
				},
				{
					field: "diachi",
					label: "Địa Chỉ"
				},
		    ],
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    	},
    	},
    	render:function(){
    		var self= this;
    		var filter = new CustomFilterView({
    			el: self.$el.find("#grid_search"),
    			sessionKey: "DonViCapNuoc_filter"
    		});
    		filter.render();
    		//data: {"q": JSON.stringify({"filters": filters, "order_by":[{"field": "thoigian", "direction": "desc"}], "limit":1})},

			self.uiControl.orderBy = [{"field": "ten", "direction": "asc"}];
    		if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var filters = { "$or": [
    				{"ma": {"$like": text },
    				{"diachi": {"$like": text },
					{"ten": {"$like": text }},
				] };
    			self.uiControl.filters = filters;
    			self.uiControl.orderBy = [{"field": "ten", "direction": "asc"}];
    		}else{
    			self.uiControl.filters = null;
    			
    		}
    		
    		self.applyBindings();
    		
    		filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var filters = { "$or": [
		    				{"ma": {"$like": text },
		    				{"diachi": {"$like": text },
							{"ten": {"$like": text }},
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