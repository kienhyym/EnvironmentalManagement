define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
		var template 		= require('text!app/view/DanhMuc/HoGiaDinh/tpl/collection.html'),
    	schema 				= require('json!schema/HoGiaDinhSchema.json');
    var CustomFilterView    = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "hogiadinh",
		bindings:"data-hogiadinh-bind",
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
					field: "stt",
					label: "STT"
				},
				{
					field: "tenchuho",
					label: "Tên chủ hộ"
				},
				{
					field: "gioitinh",
					label: "Giới tính",
					template: function (dataRow) {
						if (dataRow.gioitinh === 1) {
							return "Nữ"
						} else{
							return "Nam";
						}
					},
				},
				{
					field: "dantoc_id",
					label: "Dân tộc",
					foreign: "dantoc",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
	            	 field: "thonxom_id", 
	            	 label: "Thôn/Xóm",
	            	 foreign: "thonxom",
	            	 foreignValueField: "id",
	            	 foreignTextField: "ten",
	           	 },
	           	{
	            	 field: "xaphuong_id", 
	            	 label: "Xã/Phường",
	            	 foreign: "xaphuong",
	            	 foreignValueField: "id",
	            	 foreignTextField: "ten",
	           	 },
//	           	{
//	            	 field: "quanhuyen_id", 
//	            	 label: "Quận/Huyện",
//	            	 foreign: "quanhuyen",
//	            	 foreignValueField: "id",
//	            	 foreignTextField: "ten",
//	           	 },
//	           	{
//	            	 field: "tinhthanh_id", 
//	            	 label: "Tỉnh/Thành phố",
//	            	 foreign: "tinhthanh",
//	            	 foreignValueField: "id",
//	            	 foreignTextField: "ten",
//	           	 },
		    ],
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    	},
    	},
    	render:function(){
    		var self= this;
    		var filter_thonxom = "";
    		if(self.viewData && self.viewData.thonxom_id){
    			filter_thonxom = {"thonxom_id":{"$eq": self.viewData.thonxom_id }};
    		}
    		var filter = new CustomFilterView({
    			el: self.$el.find("#grid_search"),
    			sessionKey: "HoGiaDinh_filter"
    		});
    		filter.render();
    		//data: {"q": JSON.stringify({"filters": filters, "order_by":[{"field": "thoigian", "direction": "desc"}], "limit":1})},

			self.uiControl.orderBy = [{"field": "tenchuho", "direction": "asc"}];
    		if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var filters = { "$or": [
					{"tenchuho": {"$like": text }},
				]};
    			if (filter_thonxom && filter_thonxom !== ""){
    				filters = {"$and": [
						{"thonxom_id": {"$eq": self.viewData.thonxom_id}},
						filters
					]};
    			}
    			self.uiControl.filters = filters;
    			self.uiControl.orderBy = [{"field": "tenchuho", "direction": "asc"}];
    		}else{
    			if (filter_thonxom && filter_thonxom !== ""){
    				self.uiControl.filters = filter_thonxom;
    			}else{
    				self.uiControl.filters = null;
    			}
    			
    		}
    		
    		self.applyBindings();
    		
    		filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var query = { "$or": [
							{"tenchuho": {"$like": text }},
						] };
						if (filter_thonxom && filter_thonxom !== ""){
		    				filters = {"$and": [
								{"thonxom_id": {"$eq": self.viewData.thonxom_id}},
								query
							]};
		    			}
						$col.data('gonrin').filter(filters);
						//self.uiControl.filters = filters;
					} else {
						if (filter_thonxom && filter_thonxom !== ""){
		    				self.uiControl.filters = filter_thonxom;
		    			}else{
		    				self.uiControl.filters = null;
		    			}
						
					}
				}
				self.applyBindings();
    		});
    		
    		return this;
    		
    	},
    	
    });

});