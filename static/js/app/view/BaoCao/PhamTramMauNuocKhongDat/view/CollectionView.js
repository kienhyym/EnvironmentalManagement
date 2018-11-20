define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
		Gonrin				= require('gonrin');

    var template 			= require('text!app/view/BaoCao/PhamTramMauNuocKhongDat/tpl/collection.html'),
    	schema 				= require('json!schema/PhamTramMauNuocKhongDatSchema.json');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "phantrammaunuockhongdat",
    	uiControl:{
    		fields: [

				 { field: "id", label: "ID", width:250 },
				 { field: "soluong", label: "Số lưọng", width:250},
				 { field: "phantram", label: "Bao Nhiêu %", width:250},
				

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
