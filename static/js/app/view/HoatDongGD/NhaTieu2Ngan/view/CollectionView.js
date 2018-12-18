define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/HoatDongGD/NhaTieu2Ngan/tpl/collection.html'),
    	schema 				= require('json!schema/NhaTieu2NganSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "nhatieu2ngan",
    	uiControl:{
    		fields: [
    			 { field: "tenphuluc", label: "Tên phụ lục", width:250,},
    		     { field: "thongtu", label: "Thông tư", width:250},
				
				
				 

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
