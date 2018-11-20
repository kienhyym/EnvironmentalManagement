define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/BaoCao/BanGiaoDuLieuDaThuThap/tpl/collection.html'),
    	schema 				= require('json!schema/BanGiaoDuLieuDaThuThapSchema.json');
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangiaodulieudathuthap",
    	uiControl:{
    		fields: [
    			 { field: "ngaybaocao", label: "Ngày báo cáo", width:250 },
				 { field: "tenbienban", label: "Tên biên bản", width:250 },
				 { field: "thanhphan", label: "Thành phần", width:250},
				 { field: "bengiao", label: "Bên giao", width:250},
				 { field: "bennhan", label: "Bên nhận", width:250},
	    	     { field: "sanphambangiao", label: "Sản phẩm bàn giao", width:250},
		     	
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