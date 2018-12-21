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
    			 { 	field: "tentinh_id", 
    				label: "Tên tỉnh",
    				foreign: "tentinh",
    				foreignValueField: "id",
					foreignTextField: "ten"},
    		     { 	field: "tenhuyen_id",
					label: "Tên huyện",
		    	    foreign: "tenhuyen",
					foreignValueField: "id",
					foreignTextField: "ten"},
				 { 	field: "tenxa_id",
					label: "Tên xã",
					width:250,
			    	foreign: "tenxa",
					foreignValueField: "id",
					foreignTextField: "ten"},
				 { field: "tentrgtram", label: "Tên Trường học/Trạm y tế", width:250 },
				 { field: "matrgtram", label: "Mã Trường/Trạm", width:250},
				
				 

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
