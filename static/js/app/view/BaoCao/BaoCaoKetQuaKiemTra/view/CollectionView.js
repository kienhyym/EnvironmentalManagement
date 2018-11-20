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
				 { field: "tenbaocao", label: "Tên báo cáo", width:250 },
				 { field: "tenduan", label: "Tên dự án", width:250},
				 { field: "mucdich", label: "Mục đích", width:250},
	    	     { field: "ykiennhomkiemtra", label: "Ý kiến nhóm kiểm tra", width:250},
		     	
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