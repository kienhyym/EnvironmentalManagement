define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');

    var template 				= require('text!app/bases/tpl/register.html'),
    	schema 				= require('json!schema/UserDonviSchema.json');

    var TuyenDonViSelectView = require('app/view/HeThong/DangKyDonVi/view/SelectViewTuyenDonVi');
    var DonViSelectView = require('app/view/HeThong/DangKyDonVi/view/SelectViewDonVi');

    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "user_donvi",
    	uiControl: {
			fields: [
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
	  			 ],


				},
    	tools :
    		[
	    	    {
	    	    	name: "defaultgr",
	    	    	type: "group",
	    	    	groupClass: "toolbar-group",
	    	    	buttons: [

						{
			    	    	name: "save",
			    	    	type: "button",
			    	    	buttonClass: "btn-success btn-sm",
							label: "Đăng ký",

			    	    	command: function(){
								var self = this;

			                    self.model.save(null,{
			                        success: function (model, respose, options) {
			                            self.getApp().notify("Lưu thông tin thành công");
			                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
			                        },
			                        error: function (model, xhr, options) {
			                            self.getApp().notify('Lưu thông tin không thành công!');

			                        }
			                    });

			    	    	},
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
        			error:function(){
    					self.getApp().notify("Get data Eror");
    				},
        		});
    		}else
    		{
    			self.applyBindings();
    		}

    	},


    });

});
