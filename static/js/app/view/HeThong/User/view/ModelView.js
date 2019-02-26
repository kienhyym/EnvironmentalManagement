define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!app/view/tpl/HeThong/User/model.html'),
    	schema 				= require('json!schema/UserSchema.json');
    
    var DonViSelectView = require('app/view/HeThong/DonVi/view/SelectView');
    var RoleSelectView = require('app/view/HeThong/Role/view/SelectView');
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "user",
    	
	 	uiControl: {
	 		fields:[
				{
					  field:"donvi",
					  uicontrol: "ref",
					  textField: "ten",
					  //valueField: "value",
					  foreignRemoteField: "id",
					  foreignField: "donvi_id",
					  dataSource: DonViSelectView,
				},
				{				
					field:"roles",
					label:"Vai trò",
					uicontrol:"ref",
					textField: "name",
					selectionMode: "multiple",
					dataSource: RoleSelectView
					},
	 	]
    
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
							
							Backbone.history.history.back();
						}
					},
					{
		    	    	name: "save",
		    	    	type: "button",
		    	    	buttonClass: "btn-success btn-sm",
		    	    	label: "TRANSLATE:SAVE",
		    	    	command: function(){
		    	    		var self = this;
		    	    		// console.log(self.model.toJSON());
		                    self.model.save(null,{
		                        success: function (model, respose, options) {
		                            self.getApp().notify("Lưu thông tin thành công");
		                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                            
		                        },
		                        error: function (xhr, status, error) {
									if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
										self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
										self.getApp().getRouter().navigate("login");
									}
									try {
									  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
									}
									catch (err) {
									  self.getApp().notify({ message: "Lưu thông tin không thành công"}, { type: "danger", delay: 1000 });
									}
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
		                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                        },
		                        error: function (model, xhr, options, error) {
									if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
										self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
										self.getApp().getRouter().navigate("login");
									}
		                            self.getApp().notify('Xoá dữ liệu không thành công!');
		                            
		                        }
		                    });
		    	    	}
		    	    },
    	    	],
    	    }],
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