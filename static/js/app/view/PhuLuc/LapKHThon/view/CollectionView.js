define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/PhuLuc/LapKHThon/tpl/collection.html'),
    	schema 				= require('json!schema/LapKHThonSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "lapkhthon",
		uiControl:{
	    	fields: [
	    	     
	    		{ 	field: "tentinh_id",
    	    		label:"Tỉnh phê duyệt",
    	    		foreign: "tentinh",
					foreignValueField: "id",
					foreignTextField: "ten"},
					
    	    	{ field: "tiendo",label:"Tiến độ"},
    	    	{ field: "vihema",label:"VIHEMA và WB"},
    	    	{ field: "khpheduyet",label:"Phê duyệt BCC"},
    	    	{ field: "tgpheduyet",label:"Ngày phê duyệt"},  	    	   	    
	    	     				  
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
