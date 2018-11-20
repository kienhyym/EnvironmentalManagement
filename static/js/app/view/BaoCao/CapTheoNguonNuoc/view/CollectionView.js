define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/CapTheoNguonNuoc/tpl/collection.html'),
    	schema 				= require('json!schema/CapTheoNguonNuocSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "captheonguonnuoc",
    	uiControl:{
    		fields: [
				 { field: "giengdao", label: "Giếng đào", width:250 },
				 { field: "giengkhoan", label: "Giếng khoan", width:250},
	    	     { field: "benuocmua", label: "Bể nước mưa", width:250},
	    	     { field: "mangtuchay", label: "Máng tự chảy", width:250},
	    	     { field: "loaikhac", label: "Loại khác", width:250},
	    	      { field: "cong", label: "Cống", width:250},
		     	
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