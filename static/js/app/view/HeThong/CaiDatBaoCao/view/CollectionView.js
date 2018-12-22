define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/HeThong/CaiDatBaoCao/tpl/collection.html'),
    	schema 				= require('json!schema/BaoCaoTuyenDonViSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bctuyendonvi",
    	uiControl:{
	    	fields: [
	    	     { 
	    	    	field: "id",label:"ID",width:250,readonly: true,"visible":false 
	    	     },
		     	 { field: "tuyendonvi_id", label: "Tuyến Đơn Vị", width:250 },
		     	 { field: "collectionNames", label: "Danh sách báo cáo", width:250},
		     ],
		     onRowClick: function(event){
		    		if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        	}
		    	}
    	},
	     render:function(){
	    	 this.applyBindings();
	    	 return this;
    	}
    	
    });

});