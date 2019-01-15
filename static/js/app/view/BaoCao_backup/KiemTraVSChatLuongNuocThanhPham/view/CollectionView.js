define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/KiemTraVSChatLuongNuocThanhPham/tpl/collection.html'),
    	schema 				= require('json!schema/KiemTraVSChatLuongNuocThanhPhamSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "kiemtrachatluongnuocthanhpham",
		uiControl:{
	    	fields: [
	    	     
	    	    	{ field: "ngaybanhanhthongtu",label:"Ngày ban hành"},
	    	    	{ field: "ngaytaophieu",label:"Ngày tạo phiếu"},
	    	    	{ field: "tenphieu",label:"Tên phiếu"},
	    	    	{field: "loaiphieu",label:"Loại phiếu"},
	    	    	{field: "diachi",label:"Địa chỉ"},
	    	    	{field: "sodan",label:"Số dân"},   	    	   	    
	    	     				  
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
