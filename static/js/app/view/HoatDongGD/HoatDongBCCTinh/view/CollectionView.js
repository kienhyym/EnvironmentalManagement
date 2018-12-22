define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/HoatDongGD/HoatDongBCCTinh/tpl/collection.html'),
    	schema 				= require('json!schema/HoatDongBCCTinhSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "hoatdongbcctinh",
    	uiControl:{
    		fields: [
    			 { field: "hophoinhgi", label: "Họp hội nghi cấp tính", width:250,},
				 { field: "taphuan", label: "Tập huấn truyền thông", width:250},
				 { field: "cachoatdong", label: "Hoạt động truyền thông", width:250},
				 { field: "thanhlapcuahang", label: "Cửa hàng tiện ích", width:250},
				 { field: "taphuantruyenthong", label: "Tập huấn thay đổi hành vi", width:250},
				
				
				 

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
