define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/PhuLuc/DuyetVeSinhToanXa/tpl/collection.html'),
    	schema 				= require('json!schema/DuyetVeSinhToanXaSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "duyet_vesinh_toanxa",
    	uiControl:{
    		fields: [
    			{
					field: "tinhthanh_id",
					label: "Tỉnh",
					foreign: "tinhthanh",
					foreignValueField: "id",
					foreignTextField: "ten",
					width: 250
				},
				{
					field: "quanhuyen_id",
					label: "Huyện",
					foreign: "quanhuyen",
					foreignValueField: "id",
					foreignTextField: "ten",
					width: 250
				},
				{
					field: "xaphuong_id",
					label: "Xã",
					foreign: "xaphuong",
					foreignValueField: "id",
					foreignTextField: "ten",
					width: 250
				},
	    	     { field: "nam_datvesinh_toanxa", label: "Năm đạt vệ sinh toàn xã"},
	    	     { field: "nam_datvesinh_toanxa_benvung", label: "Năm đạt vệ sinh toàn xã bền vững"},
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