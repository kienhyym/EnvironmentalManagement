define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/KhaiThacNuocTuHoChua/tpl/collection.html'),
    	schema 				= require('json!schema/KhaiThacNuocTuHoChuaSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "khaithacnuoctuhochua",
    	uiControl:{
    		fields: [
    			 { field: "id", label: "ID", width:250},
				 { field: "tenphieu", label: "Tên Phiếu", width:250 },
				 { field: "thongtu", label: "Thông Tư", width:250},
	    	     { field: "loaiphieu", label: "Loại Phiếu", width:250},
		     	
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