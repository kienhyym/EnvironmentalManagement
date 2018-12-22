define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/PhuLuc/LapKHTinh/tpl/collection.html'),
    	schema 				= require('json!schema/LapKHTinhSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "lapkhtinh",
		uiControl:{
	    	fields: [
	    	     
	    	    	{ 	field: "tentinhpd_id",
	    	    		label:"Tỉnh phê duyệt",
	    	    		foreign: "tentinhpd",
						foreignValueField: "id",
						foreignTextField: "ten"},
						
	    	    	{ field: "hoatdong_tinh",label:"Hoạt động cấp tỉnh"},
	    	    	{ field: "tiendo",label:"Tiến độ"},
	    	    	{ field: "vihema",label:"VIHEMA và WB  rà soát, chấp thuận"},
	    	    	{ field: "khpheduyet",label:"Kế hoạch BCC được phê duyệt"},
	    	    	{ field: "tgpheduyet",label:"Ngày/tháng/năm tỉnh phê duyệt"},  	    	   	    
	    	     				  
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
