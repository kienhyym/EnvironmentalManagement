define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/BaoCao/NguonNuocTuChay/tpl/collection.html'),
    	schema 				= require('json!schema/NguonNuocTuChaySchema.json');
    var CustomFilterView      = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "nguonnuoctuchay",
    	textField: "cong",
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
		    	    		self.trigger("onSelected");
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	    
    	],
      	uiControl:{
    		fields: [
    				{ field: "cong", label: "Tổng điểm", width:100},
    		     	{ field: "nguoisinhhoat", label: "Người sinh hoạt", width:100 },
    		     	{ field: "duongong", label: "Đường ống", width:100 },
    		     	{ field: "nuoitrong", label: "Nuôi thủy sản", width:100 },
    		     	{ field: "vatnuoi", label: "Gia súc gia cầm", width:100 },
    		     	{ field: "racthai", label: "Rác thải", width:100 },
    		     	{ field: "dungcudannuoc", label: "Đồ dẫn nước", width:100 },
    		     	{ field: "dungcuchuanuoc", label: "Đồ chứa nước", width:100 },
    		    ],
    		    onRowClick: function(event){
    	    		this.uiControl.selectedItems = event.selectedItems;
    	    	},
    	},
    	render:function(){
    		var self= this;
    		var filter = new CustomFilterView({
    			el: self.$el.find("#grid_search"),
    			sessionKey: "nguonnuoctuchay_filter"
    		});
    		filter.render();
    		
    		if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var filters = { "$or": [
					{"id": {"$like": text }},
					{"phamvi": {"$like": text }},
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
							{"id": {"$like": text }},
							{"phamvi": {"$like": text }},
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