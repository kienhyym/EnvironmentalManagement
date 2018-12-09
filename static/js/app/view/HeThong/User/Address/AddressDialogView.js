define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/HeThong/User/address.html'),
    	schema 				= require('json!schema/AddressSchema.json');
    var QuocGiaSelectView 	= require("app/view/DanhMuc/QuocGia/view/SelectView");
    var TinhThanhSelectView 	= require("app/view/DanhMuc/TinhThanh/view/SelectView");
    var QuanHuyenSelectView 	= require("app/view/DanhMuc/QuanHuyen/view/SelectView");
    var XaPhuongSelectView 	= require("app/view/DanhMuc/XaPhuong/view/SelectView");
    
    return Gonrin.ModelDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "address",
    	textField: "ten",
    	valueField: "id",
    	uiControl:{
	    		fields:[
	    			{
	    				field:"quocgia",
	    				uicontrol:"ref",
	    				textField: "ten",
	    				foreignRemoteField: "id",
	    				foreignField: "quocgia_id",
	    				dataSource: QuocGiaSelectView,
	    				value: {"id":"d28d1f82-527d-4a3d-8ecd-4abda3a58572","ma":"VN","ten":"Việt Nam"}
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
  			    	    	name: "save",
  			    	    	type: "button",
  			    	    	buttonClass: "btn-success btn-sm",
  			    	    	label: "TRANSLATE:SAVE",
  			    	    	command: function(){
  			    	    		var self = this;
  			    	    		var currUser = self.getApp().currentUser;
  			    	    		var currentSo = self.getApp().data("current_so");
  			    	    		var viewData = self.viewData;
//  			    	    		var url_profile = (self.getApp().serviceURL || "")+'/api/v1/sochamsoc/profile/'+ currentSo.id;
  			    	    		if (viewData !== null || viewData !== undefined){
  			    	    			var url_profile = (self.getApp().serviceURL || "")+'/api/v1/sochamsoc/profile/'+ viewData;
  			    	    			var params = {
  	  			    	    				quocgia_id: self.model.get('quocgia_id'),
  	  			    	    				quocgia: self.model.get('quocgia'),
  	  			    	    				tinhthanh_id: self.model.get('tinhthanh_id'),
  	  			    	    				tinhthanh: self.model.get('tinhthanh'),
  	  			    	    				quanhuyen_id: self.model.get('quanhuyen_id'), 
  	  			    	    				quanhuyen: self.model.get('quanhuyen'),
  	  			    	    				xaphuong_id: self.model.get('xaphuong_id'), 
  	  			    	    				xaphuong: self.model.get('xaphuong'), 
  	  			    	    				thonxom_id: self.model.get('thonxom_id'), 
  	  			    	    				diachi: self.model.get('diachi'),
  	  			    	    		}
  			    	    			self.getApp().showloading();
  	  			    	    		$.ajax({
  		  				    				url: url_profile,
  		  				    				method: 'POST',
  		  				    				data: JSON.stringify({"profile":params}),
  		  				    				dataType: "json",
  		  				    			  	contentType: "application/json",
  		  				    			  	success: function(data) {
  		  				    			  		self.getApp().notify("Cập nhập thông tin thành công!");
  		  				    			  		self.close();
  		  				    			  	},
  		  	  				    	    error: function (request, status, error) {
  		  	  				    	    	console.log(request)
  		  	  				    	        self.getApp().notify("Có lỗi xảy ra, Vui lòng thử lại sau");
  		  	  				    	        
  		  	  				    	    },
  		  	  				    	    complete: function(){
  		  	  				    	    	self.getApp().hideloading();
  		  	  				    	    }
  		  				    			  	
  		  				    			});
  			    	    		}else{
  			    	    			console.log("viewData truyen sang khong hop le", viewData);
  			    	    			self.getApp().notify("Có lỗi xảy ra, Vui lòng thử lại sau");
  			    	    		}
  			    	    		
  			    	    		
  			    	    	}
  			    	    },
  			    	  {
  			    	    	name: "close",
  			    	    	type: "button",
  			    	    	buttonClass: "btn-default btn-sm",
  			    	    	label: "TRANSLATE:CLOSE",
  			    	    	command: function(){
  			    	    		var self = this;
  			    	    		self.close();
  			    	    	}
  			    	    },
  	    	    	]
  	    	    },
  	    	],
  	    	
    	render: function(){
    		var self = this;
    		var viewData = self.viewData;
    		if (viewData !== null || viewData !== undefined){
    			self.getApp().showloading();
    			var url_profile = (self.getApp().serviceURL || "")+'/api/v1/sochamsoc/profile/'+ viewData;
    			$.ajax({
      				url: url_profile,
      				method: 'GET',
      				dataType: "json",
      			  	contentType: "application/json",
      			  	success: function(data) {
      			  		
      			  		self.model.set(data);
      			  		if(!!data && !!data.quocgia_id && data.quocgia_id.length>0){
      			  			self.getApp().data("quocgia_id",data.quocgia_id);
      			  		}
      			  		
      			  		self.getApp().data("tinhthanh_id",data.tinhthanh_id);
      			  		self.getApp().data("quanhuyen_id",data.quanhuyen_id);
      			  		self.getApp().data("xaphuong_id",data.xaphuong_id);
      			  		
      			  		
      			  	},
    	    	    error: function (request, status, error) {
    	    	    	console.log(request)
    	    	    }, 
    	    	    complete: function(data) {
    	    	    	self.getApp().hideloading();
    	    	    	self.applyBindings();
//    	    	    	self.model.on("change:quocgia_id", function(){
//    	    				var quocgia_id = self.model.get("quocgia_id");
//    	    				
//    	    				if(self.getApp().data("quocgia_id") !== quocgia_id){
//    	    					self.getApp().data("quocgia_id",quocgia_id);
//    	    				}
//    	    				
//    	    			});   	        		
    	        		self.model.on("change:tinhthanh_id", function(){
    	    				var tinhthanh_id = self.model.get("tinhthanh_id");
    	        			if(self.getApp().data("tinhthanh_id") !== tinhthanh_id){
    	    					self.getApp().data("tinhthanh_id",tinhthanh_id);
    	    				}
    	    			});
    	        		self.model.on("change:quanhuyen_id", function(){
    	    				var quanhuyen_id = self.model.get("quanhuyen_id");
    	        			if(self.getApp().data("quanhuyen_id") !== quanhuyen_id){
    	    					self.getApp().data("quanhuyen_id",quanhuyen_id);
    	    				}
    	    			});
    	            }
      			  	
      			});
    		}else{
    			self.getApp().notify("Có lỗi xảy ra, vui lòng thử lại sau ");
    			self.applyBindings();
    		}  		   		
    		return this;
    	},
    });

});