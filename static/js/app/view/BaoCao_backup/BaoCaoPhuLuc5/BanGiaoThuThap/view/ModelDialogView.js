define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!app/view/BaoCaoPhuLuc5/BanGiaoThuThap/tpl/model.html'),
	schema 				= require('json!schema/BanGiaoThuThapSchema.json');
    
	var currentDate = new Date();
    return Gonrin.ModelDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "bangiaothuthap",
		
    	uiControl:{
    		fields: [
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
			                        error: function (xhr, status, error) {
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
    			var baocao_id = self.viewData.baocao_id;
    			self.model.set("bangiaodulieudathuthap_id",baocao_id);
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