define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/HoatDongGD/HoatDongBCCHuyen/tpl/collection.html'),
    	schema 				= require('json!schema/HoatDongBCCHuyenSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "hoatdongbcchuyen",
    	uiControl:{
    		fields: [
    			 { field: "hoptrienkhai", label: "Họp triển khai cấp huyện", width:250,},
				 { field: "vschocanbo", label: "Tập huấn truyền thông", width:250}
				
				
				 

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
