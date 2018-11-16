define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/HeThong/Role/collection.html'),
    	schema 				= require('json!schema/RoleSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "role",
    	uiControl:{
    		fields: [
	    	     { 
	    	    	field: "id",label:"ID",width:50,readonly: true, 
	    	     },
		     	 { field: "name", label: "Tên", width:150 },
		     	 { field: "description", label: "Mô tả", width:150 },
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