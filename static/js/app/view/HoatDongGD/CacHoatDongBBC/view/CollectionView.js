define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/HoatDongGD/CacHoatDongBBC/tpl/collection.html'),
    	schema 				= require('json!schema/CacHoatDongBBCSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "cachoatdongbbc",
    	uiControl:{
    		fields: [
    			 { field: "hoatdongtinh", label: "Hoạt động cấp tỉnh", width:250,},
				 { field: "hdcaphuyen", label: "Hoạt động cấp huyện", width:250},
				 { field: "hdcapxa", label: "Hoạt động cấp xã, thôn", width:250},
				 { field: "truonghoc", label: "Trường học", width:250},
				
				
				 

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
