define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/KiemTraNguonNuocHoGiaDinh/tpl/collection.html'),
    	schema 				= require('json!schema/KiemTraNguonNuocHoGiaDinhSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "kiemtranguonnuochogiadinh",
		uiControl:{
	    	fields: [
	    	     { 
	    	    	field: "id",label:"ID",width:250,readonly: true, 
	    	     },
		     	
		     	 {
	            	 field: "xaphuong_id", 
	            	 label: "Xã Phường",
	            	 foreign: "xaphuong",
	            	 foreignValueField: "id",
	            	 foreignTextField: "ten",
					},
					{
						field: "thonxom", 
						label: "Thôn Xóm",
						foreign: "thonxom",
						foreignValueField: "id",
						foreignTextField: "ten",
					   },
					   {
						field: "tinhthanh", 
						label: "Tỉnh Thành",
						foreign: "tinhthanh",
						foreignValueField: "id",
						foreignTextField: "ten",
					   },
					   {
						field: "quanhuyen", 
						label: "Quận Huyện",
						foreign: "quanhuyen",
						foreignValueField: "id",
						foreignTextField: "ten",
					   },
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