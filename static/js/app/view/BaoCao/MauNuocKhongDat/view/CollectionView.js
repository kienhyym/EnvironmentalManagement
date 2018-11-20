define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/MauNuocKhongDat/tpl/collection.html'),
    	schema 				= require('json!schema/MauNuocKhongDatSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "maunuockhongdat",
    	uiControl:{
    		fields: [
           
    			 { field: "giengdao", label: "Giếng đào ", width:250},
	    	     { field: "giengkhoan", label: "Giếng khoan ", width:250},
		     	 { field: "mangtuchay", label: "Máng tự chảy ", width:250 },
		     	  { field: "benuocmua", label: "Bể nước mưa",with:250},
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
