define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/KhaiThacNuocNgam/tpl/collection.html'),
    	schema 				= require('json!schema/KhaiThacNuocNgamSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "khaithacnuocngam",
    	uiControl:{
    		fields: [
    			{ field: "ngaybanhanhthongtu", label: "Ngày ban hành thông tư", width:250},
    			 { field: "thongtu", label: "Thông tư", width:250},
	    	     { field: "loaiphieu", label: "Loại phiếu", width:250},
		     	 { field: "tenphieu", label: "Tên phiếu", width:250 },
		     	 { field: "phamvi", label: "Phạm vi", width:250},
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