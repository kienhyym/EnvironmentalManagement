define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/PhieuNoiKiemChatLuong/tpl/collection.html'),
    	schema 				= require('json!schema/PhieuNoiKiemChatLuongSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "phieunoikiemchatluong",
    	uiControl:{
    		fields: [
    		    { field: "ngaybanhanhthongtu", label: "Ngày Ban Hành Thông", width:250},
				 { field: "tenphieu", label: "Tên Phiếu", width:250 },
				 { field: "loaiphieu", label: "Loại Phiếu", width:250},
	    	 { field: "tencoso", label: "Tên Cơ Sở", width:250},

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
