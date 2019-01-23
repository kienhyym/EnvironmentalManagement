define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/DanhMuc/ThongSoBaoCaoChatLuongNuoc/collection.html'),
    	schema 				= require('json!schema/ThongSoBaoCaoChatLuongNuocSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "thongsobaocaochatluongnuoc",
    	uiControl:{
    		fields: [
	    	     { 
	    	    	field: "mathongso",label:"Mã Thông Số",
	    	     },
	    	     { field: "tenthongso", label: "Tên Thông số"},
	    	     { field: "gioihan_toida_txt", label: "Giới hạn tối đa", width: 200},
	    	     { field: "gioihan_toithieu_txt", label: "Giới hạn tối thiểu", width: 200},
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    	
		    },
		    pagination: {
            	page: 1,
            	pageSize: 100
            }
    	},
	    render:function(){
	    	 
	    	 this.uiControl.orderBy = [{"field": "mathongso", "direction": "asc"}];
	    	 this.applyBindings();
	    	 return this;
    	},
    });

});