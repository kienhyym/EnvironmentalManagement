define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/DanhMuc/XaPhuong/collection.html'),
    	schema 				= require('json!schema/XaPhuongSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "xaphuong",
    	uiControl:{
	    	fields: [
		     	 { field: "ma", label: "Mã", width:250},
		     	 { field: "ten", label: "Tên", width:250 },
		     	 {
	            	 field: "quanhuyen_id", 
	            	 label: "Quận Huyện",
	            	 foreign: "quanhuyen",
	            	 foreignValueField: "id",
	            	 foreignTextField: "ten",
	           	 },
		     ],
		     onRowClick: function(event){
		    		if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        	}
		    	}
    	},
	     render:function(){
	    	 if (this.getApp().data("quanhuyen_id") !== null){
	    			this.uiControl.filters = {"quanhuyen_id": {"$eq": this.getApp().data("quanhuyen_id")}};
	    		}
	    	 this.applyBindings();
	    	 return this;
    	}
    	
    });

});