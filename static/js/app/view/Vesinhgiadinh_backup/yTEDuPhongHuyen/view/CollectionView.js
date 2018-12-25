define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/Vesinhgiadinh/yTEDuPhongHuyen/tpl/collection.html'),
    	schema 				= require('json!schema/yTEDuPhongHuyenSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "yteduphonghuyen",
    	uiControl:{
    		fields: [
    			 { field: "tenphuluc", label: "Tên phụ lục", width:250,},
    		     { field: "thongtu", label: "Thông tư", width:250},
				 { field: "ngaybanhanhthongtu", label: "Ngày ban hành", width:250 },
				 { field: "ngaynaocao", label: "Ngày báo cáo", width:250 },
				 { field: "tenphieu", label: "Tên phiếu", width:250},
				 { field: "phamvi", label: "Phạm vi", width:250},
				
				 

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
