define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/SLMauNuocKhongDat/tpl/collection.html'),
    	schema 				= require('json!schema/SLMauNuocKhongDatSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "slmaunuockhongdat",
    	uiControl:{
    		fields: [
    			 { field: "cosocapnuoctt", label: "Cơ sở cung cấp nước", width:250},
				 { field: "giengdao", label: "Giếng đào", width:250 },
				 { field: "giengkhoan", label: "Giếng khoan", width:250},
	    	     { field: "mangtuchay", label: "Máng lần, tự chảy", width:250},
	    	     { field: "benuocmua", label: "Bể nước mưa", width:250},
	    	     { field: "loaikhac", label: "Loại khác", width:250},
		     	
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