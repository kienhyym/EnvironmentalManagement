define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/HoatDongGD/HoatDongBCCTruongHoc/tpl/collection.html'),
    	schema 				= require('json!schema/HoatDongBCCTruongHocSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "hoatdongbcctruonghoc",
    	uiControl:{
    		fields: [
    			 { field: "id", label: "ID", width:250,},
				 { field: "bancamket", label: "Bản cam kết của Hiệu trưởng", width:250}
				
				
				 

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
