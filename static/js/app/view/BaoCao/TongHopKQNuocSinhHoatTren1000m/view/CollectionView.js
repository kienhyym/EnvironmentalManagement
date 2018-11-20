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
    			 { field: "ngaybanhanhthongtu", label: "Ngày Ban Hành Thông Thư", width:250},
    			 { field: "tenbaocao", label: "Tên Báo Cáo", width:250},
	    	     { field: "tenphuluc", label: "Tên Phụ Lục", width:250},
		     	 { field: "sophieu", label: "Số Phiếu", width:250 },
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
