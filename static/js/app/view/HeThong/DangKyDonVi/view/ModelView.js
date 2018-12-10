define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!app/view/HeThong/DangKyDonVi/tpl/model.html'),
    	schema 				= require('json!schema/UserDonviSchema.json');
    
    var TuyenDonViEnum = require('json!app/enum/TuyenDonViEnum.json');
    
    var TrangThaiDangKyDonViEnum = require('json!app/enum/TrangThaiDangKyDonViEnum.json');
    var TuyenDonViSelectView = require('app/view/DanhMuc/TuyenDonVi/view/SelectView');
    var DonViSelectView = require('app/view/HeThong/DonVi/view/SelectView');
    
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "user_donvi",
    	state: null,
    	uiControl:{
    		fields:[
        		{
  				  field:"captren",
				  uicontrol: "ref",
				  textField: "ten",
				  foreignRemoteField: "id",
				  foreignField: "captren_id",
				  dataSource: DonViSelectView,
			},
			{
				field:"donvi_tuyendonvi",
				uicontrol: "ref",
	  				textField: "ten",
					foreignRemoteField: "id",
					foreignField: "donvi_tuyendonvi_id",
					dataSource: TuyenDonViSelectView
  			 },
  			{
 				field: "trangthai",
 				uicontrol: "combobox",
 				textField: "text",
 				valueField: "value",
 				dataSource: TrangThaiDangKyDonViEnum,
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
						label: "Quay lại",
						command: function(){
							var self = this;
							if(self.progressbar){
  		    	    		
  		    	    		}
							Backbone.history.history.back();
			                //self.getApp().getRouter().navigate(self.collectionName + "/collection");
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
		                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                            
		                        },
		                        error: function (model, xhr, options) {
		                            self.getApp().notify('Xin nhập đủ thông tin of chưa chọn trạng thái');
		                           
		                        }
		                    });
		    	    	}
		    	    },
					{
		    	    	name: "delete",
		    	    	type: "button",
		    	    	buttonClass: "btn-danger btn-sm",
		    	    	label: "Xóa",
		    	    	visible: function(){
		    	    		return this.getApp().getRouter().getParam("id") !== null;
		    	    	},
		    	    	command: function(){
		    	    		var self = this;
		    	    		
		                    self.model.destroy({
		                        success: function(model, response) {
		                        	if(self.progressbar){
		  		    	    		
		  		    	    		}
		                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                        },
		                        error: function (model, xhr, options) {
		                            //self.alertMessage("Something went wrong while processing the model", false);
		                            self.getApp().notify('Delete error');
		                            self.progressbar.hide();
		                        }
		                    });
		    	    	}
		    	    },
    	    	],
    	    },
    	    {
    	    	name: "exportgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [
					{
						name: "export",
						type: "button",
						buttonClass: "btn-warning btn-sm",
						label: "Tạo đơn vị và tài khoản theo đơn đăng ký",
						visible: function(){
							return this.getApp().getRouter().getParam("id") !== null;
						},
						command: function(){
							var self = this;
							
							var id = self.model.get('id');
							var url = "/api/v1/adddonviwilluser?id="+ id;
							//
							$.ajax({
		    	 				url: url,
		    	 				success: function(data) {
		    	 					self.getApp().getRouter().navigate(self.collectionName + "/collection");
		    	 					self.getApp().notify("Thêm tài khoản thành công");
		    	 				},
		    	 				error: function (xhr, status, error) {
		    	 			       try {
		    	 			    	    var msgJson = $.parseJSON(xhr.responseText); 
		    	 			    	    if(msgJson){
		    	 			    	    	self.getApp().notify(msgJson.error_message);
		    	 			    	    }
		    	 			    	}
		    	 			    	catch(err) {
		    	 			    		self.getApp().notify("Error");
		    	 			    		
		    	 			    	
		    	 			    	}
		    	 			    
		    	 			    }
		    	 			});
						}
					},   
    	    	]
    	    }
        ],
    	
    	UiControl:[
			{
				  field:"donvi_tuyendonvi",
				  uicontrol: "combobox",
				  textField: "text",
				  valueField: "value",
				  dataSource: TuyenDonViEnum,
			},
			{
				  field:"trangthai",
				  uicontrol: "combobox",
				  textField: "text",
				  valueField: "value",
				  dataSource: TrangThaiDangKyDonViEnum,
			},
    	],
    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			//progresbar quay quay
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