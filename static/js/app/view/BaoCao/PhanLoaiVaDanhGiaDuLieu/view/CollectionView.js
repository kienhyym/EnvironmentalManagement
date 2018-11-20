define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/PhanLoaiVaDanhGiaDuLieu/tpl/collection.html'),
    	schema 				= require('json!schema/PhanLoaiVaDanhGiaDuLieuSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "phanloaivadanhgiadulieu",
    	uiControl:{
    		fields: [

				
				 { field: "tenduan", label: "Tên dự án", width:250},
				 { field: "tennhomdulieu", label: "Tên nhóm dữ liệu", width:250},
				 { field: "tonghopphanloai", label: "Tổng hợp phân loại", width:250},
				 { field: "thongtinbosung", label: "Thông tin bổ sung", width:250},
				 { field: "ngaytaobaocao", label: "Ngày tạo báo cáo", width:250},

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
