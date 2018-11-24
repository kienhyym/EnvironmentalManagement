define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/KiemTraNguonNuocHoGiaDinh/tpl/collection.html'),
    	schema 				= require('json!schema/KiemTraNguonNuocHoGiaDinhSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "kiemtranguonnuochogiadinh",
		uiControl:{
	    	fields: [
	    	     
	    	    	{ field: "ngaybanhanhthongtu",label:"Ngày ban hành"},
	    	    	{ field: "tenhogiadinh",label:"Tên hộ gia đình"},
	    	    	{ field: "tenphieu",label:"Tên phiếu"},
	    	    	{field: "sonhankhau",label:"Số nhân khẩu"},
	    	    	{field: "nguoikiemtra",label:"Người kiểm tra"},
	    	    	{field: "thoigiankiemtra",label:"Thời gian kiểm tra"},   	    	   	    
	    	     				  
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
