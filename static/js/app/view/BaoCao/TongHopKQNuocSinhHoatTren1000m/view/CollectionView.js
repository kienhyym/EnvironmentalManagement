define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/TongHopKQNuocSinhHoatTren1000m/tpl/collection.html'),
    	schema 				= require('json!schema/TongHopKQNuocSinhHoatTren1000mSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "tonghopkqnuocsinhhoattren1000m",
		uiControl:{
	    	fields: [
	    	     
	    	    	{ field: "ngaybanhanhthongtu",label:"Ngày ban hành"},
	    	    	{ field: "sophieu",label:"Số phiếu"},
	    	    	{ field: "tenbaocao",label:"Tên báo cáo"},
	    	    	{field: "phamvi",label:"Phạm vi"},
	    	    	{field: "ngaybaocao",label:"Ngày báo cáo"},
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
