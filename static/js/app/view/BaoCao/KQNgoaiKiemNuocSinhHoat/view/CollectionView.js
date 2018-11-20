define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/KQNgoaiKiemNuocSinhHoat/tpl/collection.html'),
    	schema 				= require('json!schema/KQNgoaiKiemNuocSinhHoatSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "kqngoaikiemnuocsinhhoat",
    	uiControl:{
    		fields: [
    			 { field: "tenbaocao", label: "Tên báo cáo", width:250},
    			 { field: "donvibaocao", label: "Đơn vị báo cáo", width:250},
	    	     { field: "ngaybaocao", label: "Ngày báo cáo", width:250},
	    	     { field: "sophieu", label: "Số phiếu", width:250},
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
