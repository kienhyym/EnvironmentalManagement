define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/KetQuaXNNuocTaiCho/tpl/collection.html'),
    	schema 				= require('json!schema/KetQuaXNNuocTaiChoSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "ketquaxetnghiemtaicho",
    	uiControl:{
    		fields: [
    			 { field: "id", label: "ID", width:250},
				 { field: "baocao_tenphieu", label: "Báo Cáo Tên Phiếu", width:250 },
				 { field: "tenmau", label: "Tên Mẫu", width:250},
	    	     { field: "mamau", label: "Mã Mẫu", width:250},
		     	
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