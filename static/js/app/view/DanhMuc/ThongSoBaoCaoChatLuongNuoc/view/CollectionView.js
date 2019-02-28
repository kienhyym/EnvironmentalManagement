define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/DanhMuc/ThongSoBaoCaoChatLuongNuoc/collection.html'),
		schema 				= require('json!schema/ThongSoBaoCaoChatLuongNuocSchema.json');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "thongsobaocaochatluongnuoc",
		bindings:"data-thongsobaocaochatluongnuoc-bind",
    	uiControl:{
    		fields: [
				{ field: "stt", label: "STT"},
	    	     { 
	    	    	field: "mathongso",label:"Mã Thông Số",
	    	     },
	    	     { field: "tenthongso", label: "Tên Thông số"},
	    	     { field: "gioihan_toida_txt", label: "Giới hạn tối đa", width: 200},
	    	     { field: "gioihan_toithieu_txt", label: "Giới hạn tối thiểu", width: 200},
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    	
		    },
		    pagination: {
            	page: 1,
            	pageSize: 100
            }
    	},
	    render:function(){
			var self = this;
			this.uiControl.orderBy = [{"field": "tenthongso", "direction": "asc"}];
			 
			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: self.collectionName +"_filter"
			});
			filter.render();

			if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var filters = { "$or": [
					{"tenthongso": {"$like": text }},
				] };
				self.uiControl.filters = filters;
				self.uiControl.orderBy = [{"field": "tenthongso", "direction": "asc"}];
    		}
			this.applyBindings();

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
			return this;
    	},
    });

});