define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/KQSuaChuaSieuDuLieu/tpl/collection.html'),
    	schema 				= require('json!schema/KQSuaChuaSieuDuLieuSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "kqsuachuasieudulieu",
    	uiControl:{
    		fields: [
				 { field: "tt", label: "TT", width:250 },
				 { field: "loi", label: "lỗi", width:250},
	    	     { field: "sua", label: "sửa", width:250},
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
