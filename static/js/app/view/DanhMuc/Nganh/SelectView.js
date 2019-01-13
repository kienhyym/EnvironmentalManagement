define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!./tpl/select.html'),
    	schema 				= require('json!schema/DanhMucNganhSchema.json');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "nganh",
    	tools : [
    	    {
    	    	name: "defaultgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [
					{
		    	    	name: "select",
		    	    	type: "button",
		    	    	buttonClass: "btn-success btn-sm",
		    	    	label: "TRANSLATE:SELECT",
		    	    	command: function(){
		    	    		var self = this;
		    	    		self.trigger("onSelected");
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
	    	     { field: "manganh", label: "Mã", width: 150 },
		     	 { field: "tennganh", label: "Tên ngành" },
		    ],
		    onRowClick: function(event) {
	    		this.uiControl.selectedItems = event.selectedItems;
	    	},
	    	onRendered: function(e){
	    		this.trigger("onRendered");
            }
    	},
    	render:function() {
    		var self= this;
			self.applyBindings();
    		return this;
    	},
    	
    });

});