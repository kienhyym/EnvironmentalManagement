define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/PhuLuc/DTTruongHoc/tpl/collection.html'),
    	schema 				= require('json!schema/DTTruongHocSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "dttruonghoc",
    	uiControl:{
    		fields: [
    			 { 	field: "tinhthanh_id", 
    				label: "Tên tỉnh",
    				foreign: "tinhthanh",
    				foreignValueField: "id",
					foreignTextField: "ten"},
					
    		     { 	field: "quanhuyen_id",
					label: "Tên huyện",
		    	    foreign: "quanhuyen",
					foreignValueField: "id",
					foreignTextField: "ten"
				},
				 { 	field: "xaphuong_id",
					label: "Tên xã",
			    	foreign: "xaphuong",
					foreignValueField: "id",
					foreignTextField: "ten"},
				 { field: "truong_tram_yte", label: "Tên Trường học/Trạm y tế", width:250 },
				 { field: "ma_truong", label: "Mã Trường/Trạm", width:250},
				
				 

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
