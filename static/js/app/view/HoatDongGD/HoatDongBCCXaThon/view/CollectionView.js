define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/HoatDongGD/HoatDongBCCXaThon/tpl/collection.html'),
    	schema 				= require('json!schema/HoatDongBCCXaThonSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "hoatdongbccxathon",
    	uiControl:{
    		fields: [
    			 { field: "hopcapxa", label: "Họp triển khai cấp huyện", width:250,},
				 { field: "camketdat", label: "Cam kết VSTX từ UBND Xã", width:250},
				 { field: "vstx", label: "Hoạt động truyền thông cấp xã", width:250},
				 { field: "truyenthongthon", label: "Hoạt động truyền thông cấp thôn", width:250},
				
				
				 

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
