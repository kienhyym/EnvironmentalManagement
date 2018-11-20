define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/KQSuaChuaDuLieu/tpl/collection.html'),
    	schema 				= require('json!schema/KQSuaChuaDuLieuSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "kqsuachuadulieu",
    	uiControl:{
    		fields: [
				 { field: "tt", label: "TT", width:250 },
				 { field: "loi", label: "Lỗi", width:250},
	    	     { field: "sua", label: "Sửa", width:250},
	    	     { field: "loi", label: "Không sửa", width:250},
	    	     { field: "thoigiansua", label: "Thời gian sửa", width:250},
	    	     { field: "ghichu", label: "Ghi chú", width:250},
		     	
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