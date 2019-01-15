define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/KQKTVeSinhNuocSinhHoatCapXa/tpl/collection.html'),
    	schema 				= require('json!schema/KQKTVeSinhNuocSinhHoatCapXaSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "kqktvesinhnuocsinhhoatcapxa",
		uiControl:{
	    	fields: [
	    	     
	    	    	{ field: "ngaybanhanhthongtu",label:"Ngày ban hành"},
	    	    	{ field: "ngaytaophieu",label:"Ngày tạo phiếu"},
	    	    	{ field: "donvibaocao",label:"Đơn vị báo cáo"},
	    	    	{field: "ngaybaocao",label:"Ngày báo cáo"},
	    	    	{field: "phamvi",label:"Phạm vi"},
	    	    	{field: "kyten",label:"Ký tên"},   	    	   	    
	    	     				  
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
