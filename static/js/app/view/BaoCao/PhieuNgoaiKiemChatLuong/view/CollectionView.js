define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/PhieuNgoaiKiemChatLuong/tpl/collection.html'),
    	schema 				= require('json!schema/PhieuNgoaiKiemChatLuongSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "phieungoaikiemchatluong",
    	uiControl:{
    		fields: [
    			{ field: "ngaybanhanhthongtu", label: "Ngày ban hành thông tư", width:250},
				 { field: "tenphieu", label: "Tên phiếu", width:250 },
				 { field: "diachi", label: "Địa chỉ", width:250},
				 { field: "loaiphieu", label: "Loại phiếu", width:250},



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
