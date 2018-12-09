define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
		
    var template 			= require('text!app/view/tpl/HeThong/DonVi/model.html'),
    	schema 				= require('json!schema/DonViSchema.json');
    
    var TuyenDonViSelectView  = require('app/view/DanhMuc/TuyenDonVi/view/SelectView');
    var DonViSelectView = require('app/view/HeThong/DonVi/view/SelectView');
    
    var QuocGiaSelectView 		= require('app/view/DanhMuc/QuocGia/view/SelectView');
    var TinhThanhSelectView 	= require("app/view/DanhMuc/TinhThanh/view/SelectView");
    var QuanHuyenSelectView 	= require('app/view/DanhMuc/QuanHuyen/view/SelectView');
    var XaPhuongSelectView		= require('app/view/DanhMuc/XaPhuong/view/SelectView');
    
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "donvi",
    	state: null,
    	uiControl: {
    		fields:[
    			{
  				  	field:"tuyendonvi",
  				  	uicontrol: "ref",
	  				textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tuyendonvi_id",
					dataSource: TuyenDonViSelectView
    			},  
    			{
  				  field:"captren",
  				  uicontrol: "ref",
  				  textField: "ten",
  				  //valueField: "value",
  				  foreignRemoteField: "id",
  				  foreignField: "captren_id",
  				  dataSource: DonViSelectView,
    			},
    			{
    				field:"quocgia",
    				uicontrol:"ref",
    				textField: "ten",
    				foreignRemoteField: "id",
    				foreignField: "quocgia_id",
    				dataSource: QuocGiaSelectView
    			},
        		{
    				field:"tinhthanh",
    				uicontrol:"ref",
    				textField: "ten",
    				foreignRemoteField: "id",
    				foreignField: "tinhthanh_id",
    				dataSource: TinhThanhSelectView
    			},
    			{
    				field:"quanhuyen",
    				uicontrol:"ref",
    				textField: "ten",
    				foreignRemoteField: "id",
    				foreignField: "quanhuyen_id",
    				dataSource: QuanHuyenSelectView
    			},
    			{
    				field:"xaphuong",
    				uicontrol:"ref",
    				textField: "ten",
    				foreignRemoteField: "id",
    				foreignField: "xaphuong_id",
    				dataSource: XaPhuongSelectView
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
		    	    		console.log(self.model.toJSON());
		                    self.model.save(null,{
		                        success: function (model, respose, options) {
		                            self.getApp().notify("Lưu thông tin thành công");
		                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                            
		                        },
		                        error: function (model, xhr, options) {
		                            self.getApp().notify('Lưu thông tin không thành công!');
		                           
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
        			error:function(){
    					self.getApp().notify("Không lấy được dữ liệu");
    				},
        		});
    		}else{
    			self.applyBindings();
    		}
    		
    	},
    });

});