define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/PhuLuc/NhaTieuThonHVS/tpl/model.html'),
	schema 				    = require('json!schema/NhaTieuThonHVSSchema.json');
    
	var currentDate = new Date();
    return Gonrin.ModelDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "nhatieuthonhvs",
		// uiControl: {
		// 	fields: [
		// 		{
		// 			field: "gioitinh",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Nam" },
		// 				{ "value": 2, "text": "Nữ" },
		// 				{ "value": 3, "text": "Khác" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "hongheo",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "tuhoai",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "thamdoi",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "haingan",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "thamdoi",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "coongthong",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "kconhatieu",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "hopvs",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "khopvs",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "caithien",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
		// 	]
		// },
    	tools : [
	    	    {
	    	    	name: "defaultgr",
	    	    	type: "group",
	    	    	groupClass: "toolbar-group",
	    	    	buttons: [
						{
							name: "back",
							type: "button",
							buttonClass: "btn-default btn-sm",
							label: "TRANSLATE:BACK",
							command: function(){
								var self = this;
								self.close();
							}
						},
						{
			    	    	name: "save",
			    	    	type: "button",
			    	    	buttonClass: "btn-success btn-sm",
			    	    	label: "TRANSLATE:SAVE",
			    	    	command: function(){
			    	    		var self = this;
			    	    		
			                    self.model.save(null,{
			                        success: function (model, respose, options) {
			                            self.getApp().notify("Lưu thông tin thành công");
			                            self.trigger("close",self.model.toJSON());
			                            self.close();
			                            
			                            
			                        },
			                        error: function (model, xhr, options) {
			                            self.getApp().notify('Lưu thông tin không thành công!');
			                           
			                        }
			                    });
			    	    	}
			    	    },
						{
			    	    	name: "delete",
			    	    	type: "button",
			    	    	buttonClass: "btn-danger btn-sm",
			    	    	label: "TRANSLATE:DELETE",
			    	    	visible: function(){
			    	    		return this.getApp().getRouter().getParam("id") !== null;
			    	    	},
			    	    	command: function(){
			    	    		var self = this;
			                    self.model.destroy({
			                        success: function(model, response) {
			                        	self.getApp().notify('Xoá dữ liệu thành công');
			                        	self.trigger("delete",self.model.toJSON());
			                        	self.close();
			                        	
			                        	
			                        },
			                        error: function (model, xhr, options) {
			                            self.getApp().notify('Xoá dữ liệu không thành công!');
			                            
			                        }
			                    });
			    	    	}
			    	    },
	    	    	],
	    	    }],	    		        		        	
    	render:function(){
    		var self = this;
    		
    		var id = null;
    		if (self.viewData!==null){
    			id = self.viewData.id;
    			var capthon_id = self.viewData.capthon_id;
    			self.model.set("capthon_id",capthon_id);
    		}
    		if(id){
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.applyBindings();
        			},
        			error:function(){
    					self.getApp().notify("Get data Eror");
    				},
        		});
    		}else{
    			self.applyBindings();
    		}
    		
    	},
    });

});