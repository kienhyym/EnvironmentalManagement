define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/BaoCaoKetQuaKiemTra/tpl/collection.html'),
    	schema 				= require('json!schema/BaoCaoKetQuaKiemTraSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "baocaoketquakiemtra",
    	uiControl:{
    		fields: [
    			 { field: "id", label: "ID", width:250},
				 { field: "tenbaocao", label: "Tên Báo Cáo", width:250 },
				 { field: "tenduan", label: "Tên Dự Án", width:250},
	    	     { field: "ykiennhomkiemtra", label: "Ý Kiến Nhóm Kiểm Tra", width:250},
		     	
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