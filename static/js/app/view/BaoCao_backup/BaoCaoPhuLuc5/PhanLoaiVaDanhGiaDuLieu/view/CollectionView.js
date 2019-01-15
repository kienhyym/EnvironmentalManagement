define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCaoPhuLuc5/PhanLoaiVaDanhGiaDuLieu/tpl/collection.html'),
    	schema 				= require('json!schema/PhanLoaiVaDanhGiaDuLieuSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "phanloaivadanhgiadulieu",
    	uiControl:{
    		fields: [
    		    { field: "tenphuluc", label: "Tên phụ lục", width:250},
				 { field: "tenbaocao", label: "Tên báo cáo", width:250 },
				 { field: "daidienbengiao", label: "Đại diện bên giao", width:250},
				 { field: "daidienbennhan", label: "Đại diện bên nhận", width:250},
				 { field: "ngaybaocao", label: "Ngày báo cáo", width:250},
				 

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
