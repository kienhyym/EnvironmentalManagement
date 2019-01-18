define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/HeThong/CaiDatBaoCaoVienChuyenNganh/tpl/collection.html'),
    	schema 				= require('json!schema/MapVienChuyenNganhNuocVaTinhSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "map_vienchuyennganhnuoc_tinh",
    	uiControl:{
	    	fields: [
	    	     { 
	    	    	field: "id",label:"ID",readonly: true,"visible":false 
	    	     },
		     	 { field: "donvi_id", label: "Đơn Vị"},
		     	 { field: "danhsachtinhthanh", label: "Danh sách tỉnh thành"},
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