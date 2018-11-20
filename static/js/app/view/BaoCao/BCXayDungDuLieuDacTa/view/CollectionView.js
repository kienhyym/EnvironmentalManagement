define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/BCXayDungDuLieuDacTa/tpl/collection.html'),
    	schema 				= require('json!schema/BCXayDungDuLieuDacTaSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bcxaydungdulieudacta",
    	uiControl:{
    		fields: [
    			 { field: "id", label: "ID", width:250},
				 { field: "tenphuluc", label: "Tên Phụ Lục", width:250 },
				 { field: "tenbaocao", label: "Tên Báo Cáo", width:250},
				 { field: "tenduan", label: "Tên Dự Án", width:250 },
				 { field: "donvithuchien", label: "Đơn Vị Thực Hiện", width:250 },
				 { field: "thongtinbosung", label: "Thông Tin Bổ Sung", width:250 },
				 { field: "ngaytaobaocao", label: "Ngày Tạo Báo Cáo", width:250 },
		     	
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