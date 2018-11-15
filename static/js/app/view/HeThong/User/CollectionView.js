define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/User/collection.html'),
    	schema 				= require('json!app/view/HeThong/User/Schema.json');
    
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "user",
    	uiControl:{
	    	fields: [
		     	 { field: "fullname", label: "Tên", width:150 },
		     	 { field: "phone", label: "Điện thoại", width:150 },
		     	 { field: "email", label: "Email", width:250},
		         { field: "active", label: "Kích hoạt", width:100},
		         { field: "roles", label: "Vai trò", textField: "name" },
		         
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