define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCaoPhuLuc5/BienBanBanGiaoSanPham/tpl/collection.html'),
    	schema 				= require('json!schema/BienBanBanGiaoSanPhamSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bienbanbangiaosanpham",
    	uiControl:{
    		fields: [
    		     { field: "chungtoigom", label: "Chúng tôi gồm", width:250},
				 { field: "bengiao", label: "Bên giao", width:250 },
				 { field: "bengiao", label: "Bên giao", width:250 },
				 { field: "bennhan", label: "Bên nhận", width:250},
				 { field: "daidienbennhan", label: "Đại diện bên nhận", width:250},
				 { field: "ngaytaobienban", label: "Ngày tạo biên bản", width:250},
				 

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
