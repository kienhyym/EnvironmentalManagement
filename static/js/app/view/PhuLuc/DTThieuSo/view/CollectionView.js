define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/PhuLuc/DTThieuSo/tpl/collection.html'),
    	schema 				= require('json!schema/DTThieuSoSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "dtthieuso",
		uiControl:{
	    	fields: [
	    	     
	    	    	{ field: "ngdaotao_yte",label:"Số người được đào tạo"},
	    	    	{ field: "nuthamgia_yte",label:"Số người tham gia là nữ"},  	
	    	    	{ field: "ptnuthamgia_yte",label:"% người tham gia là nữ"},
	    	    	{ field: "dttsthamgia_yte",label:"Số người tham gia là DTTS"},
	    	    	{ field: "ptdttsthamgia_yte",label:"% người tham gia là DTTS"},
	    	     				  
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
