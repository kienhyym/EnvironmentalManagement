define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/DanhMuc/ThongSoBaoCaoChatLuongNuoc/collection.html'),
    	schema 				= require('json!schema/ThongSoBaoCaoChatLuongNuocSchema.json');
    var CustomFilterView      = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "thongsobaocaochatluongnuoc",
		bindings:"data-thongsobaocaochatluongnuoc-bind",
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
    			    	    		if (this.uiControl.selectedItems && this.uiControl.selectedItems.length) { 
										var get_data_onSelected = this.uiControl.selectedItems[0];
										delete get_data_onSelected.stt;   			    	    			
    			    	    			self.trigger("ThongSo_onSelected", get_data_onSelected);
    			    	    			self.getApp().trigger("ThongSo_onSelected", get_data_onSelected);

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
 	    	    	field: "mathongso",label:"Mã Thông Số",
 	    	     },
 	    	     { field: "tenthongso", label: "Tên Thông số"},
				  { field: "gioihan_toida_txt", label: "Giới hạn tối đa"},
				  { field: "gioihan_toithieu_txt", label: "Giới hạn tối thiểu"}
		    ],
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    	},
    	},
    	render:function(){
    		var self= this;
    		var filter = new CustomFilterView({
    			el: self.$el.find("#grid_search"),
    			sessionKey: "ThongSoNuoc_filter"
    		});
    		filter.render();
    		this.uiControl.orderBy = [{"field": "mathongso", "direction": "asc"}];
    		if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var filters = { "$or": [
					{"tenthongso": {"$like": text }},
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
							{"tenthongso": {"$like": text }},
						] };
						$col.data('gonrin').filter(filters);
						//self.uiControl.filters = filters;
					} else {
						self.uiControl.filters = null;
					}
				}
				self.applyBindings();
			});
			self.$el.find("#tbl_container_grid table").attr({"style": "table-layout: fixed"});
    		return this;
    	},
    	
    });

});