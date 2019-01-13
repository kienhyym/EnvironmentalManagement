define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!./tpl/collection.html'),
    	schema 				= require('json!schema/NganhSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "nganh",
    	uiControl:{
    		fields: [
	    	     { field: "manganh", label: "Mã", width:250},
		     	 { field: "tennganh", label: "Tên ngành" },
		     	{ field: "thutu", label: "Thứ tự" },
		     ],
		     onRowClick: function(event) {
		    	if(event.rowId) {
		        		var path = 'nganh/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    }
    	},
    	tools : [
    	    {
    	    	name: "defaultgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [{
	    	    	name: "create",
	    	    	type: "button",
	    	    	buttonClass: "btn-success btn-sm",
	    	    	label: "TRANSLATE:CREATE",
	    	    	command: function() {
	    	    		var self = this;
	    	    		self.getApp().getRouter().navigate("nganh/model");
	    	    	}
	    	    }]
    	    }
    	],
	    render:function(){
	    	 this.applyBindings();
	    	 return this;
    	},
    });

});