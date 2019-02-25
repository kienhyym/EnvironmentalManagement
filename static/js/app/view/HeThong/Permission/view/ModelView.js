define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!app/view/tpl/HeThong/Permission/model.html'),
    	schema 				= require('json!schema/PermissionSchema.json');
    
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "permission",
    	state: null,
    	uiControl:[
    	    {
				field:"canread",
				uicontrol:"combobox",
				textField: "text",
                valueField: "value",
				dataSource: [
					{ value: true, text: "Có" },
					{ value: false, text: "Không" },
                ]
			},
			{
				field:"cancreate",
				uicontrol:"combobox",
				textField: "text",
                valueField: "value",
				dataSource: [
					{ value: true, text: "Có" },
					{ value: false, text: "Không" },
                ]
			},
			{
				field:"canupdate",
				uicontrol:"combobox",
				textField: "text",
                valueField: "value",
				dataSource: [
					{ value: true, text: "Có" },
					{ value: false, text: "Không" },
                ]
			},
			{
				field:"candelete",
				uicontrol:"combobox",
				textField: "text",
                valueField: "value",
				dataSource: [
                    { value: true, text: "Có" },
                    { value: false, text: "Không" },
                ]
			},
      	],
    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.applyBindings();
        			},
        			error:function(xhr, error){
						if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
							self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
							self.getApp().getRouter().navigate("login");
						}
    					self.getApp().notify("Lỗi lấy dữ liệu");
    				},
        		});
    		}else{
    			self.applyBindings();
    		}
    		
    	},
    });

});