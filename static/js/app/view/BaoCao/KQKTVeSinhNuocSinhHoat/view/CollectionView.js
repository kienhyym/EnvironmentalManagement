define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/KQKTVeSinhNuocSinhHoat/tpl/collection.html'),
    	schema 				= require('json!schema/KQKTVeSinhNuocSinhHoatSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "kqktvesinhnuocsinhhoat",
    	uiControl:{
    		fields: [
    			 { field: "tenbaocao", label: "Tên báo cáo", width:250},
    			 { field: "donvibaocao", label: "Đơn vị báo cáo", width:250},
	    	     { field: "ngaytaophieu", label: "Ngày tạo phiếu", width:250},
	    	     { field: "sophieu", label: "Số phiếu", width:250},
                 { field: "tenphuluc", label: "Tên phụ lục", width:250},
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
