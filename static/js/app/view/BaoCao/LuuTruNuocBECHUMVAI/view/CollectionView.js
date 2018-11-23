define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/LuuTruNuocBECHUMVAI/tpl/collection.html'),
    	schema 				= require('json!schema/LuuTruNuocBECHUMVAISchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "luutrunuocbechumvai",
    	uiControl:{
    		fields: [
	    	     { field: "id", label: "ID", width:250},
	    	     { field: "cong", label: "Tổng số điểm", width:250},
	    	     { field: "thongtinkiemtra", label: "Thông tin kiểm tra", width:250},
	    	     
		     	
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