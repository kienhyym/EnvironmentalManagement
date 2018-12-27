define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/PhuLuc/VSToanXa/tpl/collection.html'),
    	schema 				= require('json!schema/VSToanXaSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "vstoanxa",
		uiControl:{
	    	fields: [
	    	     
	    	    	{ 	field: "tinhthanh_id",
	    	    		label:"Tên Tỉnh",
						foreign: "tinhthanh",
						foreignValueField: "id",
						foreignTextField: "ten"},
						
					{ 	field: "quanhuyen_id",
		    	    		label:"Tên Huyện",
							foreign: "quanhuyen",
							foreignValueField: "id",
							foreignTextField: "ten"},
						
	    	    	{ 	field: "xaphuong_id",
						label:"Tên Xã",
						foreign: "xaphuong",
						foreignValueField: "id",
						foreignTextField: "ten"}, 
						
	    	    	{ field: "sohogd",label:"Tổng số Hộ gia đình trong xã"},
	    	    	{ field: "danso",label:"Tổng dân số của xã"},
	    	     				  
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
