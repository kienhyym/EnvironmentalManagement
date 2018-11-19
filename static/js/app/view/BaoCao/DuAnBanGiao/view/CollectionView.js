define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/DuAnBanGiao/tpl/collection.html'),
    	schema 				= require('json!schema/DuAnBanGiaoSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "duanbangiao",
    	uiControl:{
    		fields: [
    			 { field: "stt", label: "STT", width:250},
				 { field: "danhmucsp", label: "Danh Mục Sản Phẩm", width:250 },
				 { field: "khuondang", label: "Khuôn Dạng", width:250},
	    	     { field: "dvt", label: "DVT", width:250},
		     	
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