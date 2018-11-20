define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/KQKTChatLuongNuocSinhHoat/tpl/collection.html'),
    	schema 				= require('json!schema/KQKTChatLuongNuocSinhHoatSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "kqktchatluongnuocsinhhoat",
    	uiControl:{
    		fields: [
    			 { field: "thongtu", label: "Cơ sở cung cấp nước", width:250},
				 { field: "ngaybanhanhthongtu", label: "Giếng đào", width:250 },
				 { field: "tenbaocao", label: "Giếng khoan", width:250},
	    	     { field: "donvibaocao", label: "Máng lần, tự chảy", width:250},
		     	
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