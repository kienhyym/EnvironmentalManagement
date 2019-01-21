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
	    	     { field: "gioihan_toida_txt", label: "Giới hạn tối đa"},
	    	     { field: "gioihan_toithieu_txt", label: "Giới hạn tối thiểu"},
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    	
		    }
    	},
	    render:function(){
	    	 this.uiControl.orderBy = [{"field": "tenthongso", "direction": "desc"}];
	    	 this.applyBindings();
	    	 return this;
    	},
    });

});