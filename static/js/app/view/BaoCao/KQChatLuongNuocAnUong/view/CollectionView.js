define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/KQChatLuongNuocAnUong/tpl/collection.html'),
    	schema 				= require('json!schema/KQChatLuongNuocAnUongSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "kqchatluongnuocanuong",
    	uiControl:{
    		fields: [
    			 { field: "ngaybanhanhthongtu", label: "Ngày ban hành thông tư", width:250},
    			 { field: "thongtu", label: "Thông tư", width:250},
	    	     { field: "tenphuluc", label: "Tên phụ Lục", width:250},
		     	 { field: "sophieu", label: "Số Phiếu", width:250 },
           	 { field: "donvibaocao", label: "Đơn vị báo cáo", width:250 },
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
