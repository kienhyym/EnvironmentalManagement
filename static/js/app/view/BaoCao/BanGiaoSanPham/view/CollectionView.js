define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/BanGiaoSanPham/tpl/collection.html'),
    	schema 				= require('json!schema/BanGiaoSanPhamSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangiaosanpham",
    	uiControl:{
    		fields: [
    			 { field: "id", label: "ID", width:250},
				 { field: "tenbienban", label: "Tên Biên Bản", width:250 },
				 { field: "thanhphan", label: "Thành Phần", width:250},
	    	     { field: "sanphambangiao", label: "Sản Phẩm Bàn Giao", width:250},
		     	
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
    	},
    });

});