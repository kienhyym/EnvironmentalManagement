define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!app/view/BaoCaoNuoc/KQNgoaiKiemChatLuong/tpl/itemView.html'),
	schema 				= require('json!schema/KQNgoaiKiemChatLuongSchema.json');
    
	var currentDate = new Date();
    return Gonrin.ModelDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "kqngoaikiemchatluong",
		bindings: "data-item-bind",
    	uiControl:{
    		fields: [
				{
					field: "coliform_dat",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Đạt"
						}, 
						{
							"value": 0,
							"text": "Đạt không"
						},
					
					],
				},
				{
					field: "coli_dat",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Đạt"
						}, 
						{
							"value": 0,
							"text": "Đạt không"
						},
					
					],
				},
				{
					field: "doduc_dat",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Đạt"
						}, 
						{
							"value": 0,
							"text": "Đạt không"
						},
					
					],
				},
				{
					field: "aresen_dat",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Đạt"
						}, 
						{
							"value": 0,
							"text": "Đạt không"
						},
					
					],
				},
				{
					field: "clodu_dat",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Đạt"
						}, 
						{
							"value": 0,
							"text": "Đạt không"
						},
					
					],
				},
				{
					field: "mausac_dat",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Đạt"
						}, 
						{
							"value": 0,
							"text": "Đạt không"
						},
					
					],
				},
				{
					field: "muivi_dat",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Đạt"
						}, 
						{
							"value": 0,
							"text": "Đạt không"
						},
					
					],
				},
				{
					field: "ph_dat",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Đạt"
						}, 
						{
							"value": 0,
							"text": "Không đạt"
						},
					
					],
				},
				{
					field: "muivi_ten",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Có mùi"
						}, 
						{
							"value": 0,
							"text": "Không có mùi"
						},
					
					],
				},
		     ],
    	},
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
			                            self.getApp().notify({message: 'Vui lòng nhập số!'},{type: "danger"});
			                           
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
    		self.$el.find("#itemRemove").unbind("click").bind("click", function () {
				self.remove(true);
			});
			
    		var id = null;
    		if (self.viewData!==null){
    			id = self.viewData.id;
    			var baocao_id = self.viewData.baocao_id;
    			self.model.set("baocaonuocsachOne_id",baocao_id);
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