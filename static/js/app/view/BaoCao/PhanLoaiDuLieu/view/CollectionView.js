define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/PhanLoaiDuLieu/tpl/collection.html'),
    	schema 				= require('json!schema/PhanLoaiDuLieuSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "phanloaidulieu",
    	uiControl:{
    		fields: [
    		
				 { field: "stt", label: "STT", width:250 },
				 { field: "dulieu", label: "Dữ Liệu", width:250},
				 { field: "khuondang", label: "Khuôn Dạng", width:250},
				 { field: "dvt", label: "DVT", width:250},
				 { field: "soluong", label: "Số Lượng", width:250},
				 { field: "ghichu", label: "Ghi Chú", width:250},

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
