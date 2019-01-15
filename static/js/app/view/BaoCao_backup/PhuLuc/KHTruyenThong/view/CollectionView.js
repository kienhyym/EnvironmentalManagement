define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/PhuLuc/KHTruyenThong/tpl/collection.html'),
    	schema 				= require('json!schema/KHTruyenThongSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "khtruyenthong",
		uiControl:{
	    	fields: [
	    	     
	    	    	{ 	field: "diadiempd_id",
	    	    		label:"Điểm phê duyệt",
	    	    		foreign: "diadiempd",
						foreignValueField: "id",
						foreignTextField: "ten"},
						
	    	    	{ field: "hoatdong_yttinh",label:"Hoạt động cấp tỉnh"},
	    	    	{ field: "hoatdong_ythuyen",label:"Hoạt động cấp huyện"},
	    	    	{ field: "hoatdong_ytxa",label:"Hoạt động cấp xã"},
	    	    	{ field: "hoatdong_ytthon",label:"Hoạt động cấp thôn"},  	    	   	    
	    	     				  
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
