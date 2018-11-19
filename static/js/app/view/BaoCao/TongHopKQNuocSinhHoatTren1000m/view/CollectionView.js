define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/TongHopKQNuocSinhHoatTren1000m/tpl/collection.html'),
    	schema 				= require('json!schema/TongHopKQNuocSinhHoatTren1000mSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "tonghopkqnuocsinhhoattren1000m",
    	uiControl:{
    		fields: [
    			 { field: "id", label: "ID", width:250},
    			 { field: "thongtu", label: "Thông Tư", width:250},
	    	     { field: "tenphuluc", label: "Tên Phụ Lục", width:250},
		     	 { field: "sophieu", label: "Số Phiếu", width:250 },
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