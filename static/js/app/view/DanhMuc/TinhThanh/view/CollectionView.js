define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/DanhMuc/TinhThanh/collection.html'),
    	schema 				= require('json!schema/TinhThanhSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "tinhthanh",
    	uiControl:{
    		fields: [
		     	 { field: "ma", label: "Mã", width:250},
		     	 { field: "ten", label: "Tên", width:250},
		     	 {
	            	 field: "quocgia_id", 
	            	 label: "Quốc gia",
	            	 foreign: "quocgia",
	            	 foreignValueField: "id",
					 foreignTextField: "ten",
					 width:250
	           	 },
	           	{
		        	 field: "quocgia", 
		        	 visible: false
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
	    	 self.uiControl.orderBy = [{"field": "ten", "direction": "desc"}];
	    	 this.applyBindings();
	    	 return this;
    	},
    	
    });

});