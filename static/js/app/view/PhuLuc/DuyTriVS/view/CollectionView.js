define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/PhuLuc/DuyTriVS/tpl/collection.html'),
    	schema 				= require('json!schema/DuyTriVSSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "duytrivs",
		uiControl:{
	    	fields: [
	    	     
	    	    	{ field: "tinhhuyen",label:"Tỉnh/Huyện"},
	    	    	{ field: "tenxa",label:"Xã"},  	
	    	    	{ field: "namdatvstx",label:"Năm đạt VSTX"},
	    	    	{ field: "truongvs",label:"% trường duy trì được tình trạng vệ sinh"},
	    	    	{ field: "tramytevs",label:"% trạm y tế duy trì được tình trạng vệ sinh"},
	    	     				  
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
