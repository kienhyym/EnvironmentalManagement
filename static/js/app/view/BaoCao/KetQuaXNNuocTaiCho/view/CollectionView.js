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
				 { field: "baocao_tenphieu", label: "Báo cáo tên phiếu", width:250 },
				 { field: "mamau", label: "Mã mẫu", width:250},
				 { field: "tenmau", label: "Tên mẫu", width:250},
	    	     { field: "vitrilaymau", label: "Vị trí lấy mẫu", width:250},
	    	     { field: "danhgia", label: "Đánh giá", width:250},
		     	
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