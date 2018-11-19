define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/NhanLucThamGiaKiemTra/tpl/collection.html'),
    	schema 				= require('json!schema/NhanLucThamGiaKiemTraSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "nhanlucthamgiakiemtra",
    	uiControl:{
    		fields: [
    			 { field: "id", label: "ID", width:250},
				 { field: "stt", label: "STT", width:250 },
				 { field: "hovaten", label: "Họ và tên", width:250},
	    	     { field: "congviec", label: "Công Việc Thực Hiện", width:250},
		     	
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