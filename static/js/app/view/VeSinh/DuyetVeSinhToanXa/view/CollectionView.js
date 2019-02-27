define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/VeSinh/DuyetVeSinhToanXa/tpl/collection.html'),
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
				},
				{
					field: "quanhuyen_id",
					label: "Huyện",
					foreign: "quanhuyen",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "xaphuong_id",
					label: "Xã",
					foreign: "xaphuong",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
	    	     { field: "nam_datvesinh_toanxa", label: "Năm đạt VSXT"},
	    	     { field: "nam_datvesinh_toanxa_benvung", label: "Năm đạt VSTX bền vững"},
		     ],
		     pagination: {
	            	page: 1,
	            	pageSize: 100
	            },
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    	
		    }
    	},
	    render:function(){
			var self = this;
			self.uiControl.filters = {"$and":[{"donvi_id":{"$eq": self.getApp().currentUser.donvi_id}}]};
			this.applyBindings();
			return this;
    	},
    });

});