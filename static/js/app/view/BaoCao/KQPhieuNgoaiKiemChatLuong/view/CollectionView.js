define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/KQPhieuNgoaiKiemChatLuong/tpl/collection.html'),
    	schema 				= require('json!schema/KQPhieuNgoaiKiemChatLuongSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "kqphieungoaikiemtrachatluong",
    	uiControl:{
    		fields: [

				 { field: "tenvitri1", label: "Tên vị trí 1", width:250 },
				 { field: "tenvitri1", label: "Tên vị trí 2", width:250},
				 { field: "vitrilaymau1ph", label: "pH 1", width:250},
				 { field: "vitrilaymau1doduc", label: "Độ đục 1", width:250},
				 { field: "vitrilaymau1clodu", label: "Clo dư 1", width:250},
				 { field: "vitrilaymau1danhgia", label: "Đánh giá 1", width:250},

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
