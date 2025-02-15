define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/HeThong/User/changeprofile.html');
    
    return Gonrin.ModelDialogView.extend({
    	template : template,
    	modelSchema	: {},
    	urlPrefix: "/api/v1/",
    	collectionName: "profile",
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
  			    	    		var params = {
  			    	    				macongdan: self.$el.find('#profile_macongdan').val(),
  			    	    				phone: self.$el.find('#profile_phone').val(),
  			    	    				email: self.$el.find('#profile_email').val(),
  			    	    				fullname: self.$el.find('#profile_name').val()
								}
								if(!params.macongdan){
									self.getApp().notify({ message: "Mã công dân không được để trống!" }, { type: "danger" });
									return;
								}
								if(!params.fullname){
									self.getApp().notify({ message: "Họ và tên không được để trống!" }, { type: "danger" });
									return;
								}
								if(self.validatePhone(params.phone) === false){
									self.getApp().notify({ message: "Số điện thoại không đúng định dạng!" }, { type: "danger" });
									return;
								}
								if(self.validateEmail(params.email) === false){
									self.getApp().notify({ message: "Email không hợp lệ, vui lòng kiểm tra!" }, { type: "danger" });
									return;
								}
  			    	    		$.ajax({
	  				    				url: (self.getApp().serviceURL || "")+'/api/v1/user/changeprofile',
	  				    				method: 'POST',
	  				    				data: JSON.stringify(params),
	  				    				dataType: "json",
	  				    			  	contentType: "application/json",
	  				    			  	success: function(data) {
	  				    			  		self.getApp().hideloading();
	  				    			  		self.getApp().currentUser.fullname = data.fullname;
	  				    			  		self.getApp().currentUser.email = data.email;
	  				    			  		self.getApp().currentUser.macongdan = data.macongdan;
	  				    			  		self.getApp().currentUser.phone = data.phone;
		  				    			    if(!data.fullname || data.fullname === ""){
		  				    			    	data.fullname = data.email;
		  				    			    }
		  				    			   $("#fullname").html(data.fullname);
		  				    			    
	  				    			  		self.getApp().notify("Cập nhập thông tin thành công!");
	  				    			  		self.close();
	  				    			  	},
	  	  				    	    error: function (xhr, status, error) {
										try{
											if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED"){
												self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
												self.getApp().getRouter().navigate("login");
											} else {
												self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
											}
										}
										catch (err) {
	  	  				    	    	// console.log(request)
	  	  				    	    	self.getApp().hideloading();
										self.getApp().notify("Có lỗi xảy ra, vui lòng thử lại sau");
										}
	  	  				    	        
	  	  				    	    }
	  				    			  	
	  				    			});
  			    	    		
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
    		var currentUser = self.getApp().currentUser;
    		// console.log(currentUser);
    		if (!!currentUser){
    			self.$el.find('#profile_macongdan').val(currentUser.macongdan),
				self.$el.find('#profile_phone').val(currentUser.phone),
				self.$el.find('#profile_email').val(currentUser.email),
				self.$el.find('#profile_name').val(currentUser.fullname)
    		}
    		 
    		this.applyBindings();
    		return this;
		},
		validateEmail: function (email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		},
		validatePhone: function(inputPhone) {
			if (inputPhone == null || inputPhone == undefined) {
				return false;
			}
            var phoneno = /(09|08|07|05|03)+[0-9]{8}/g;
            const result = inputPhone.match(phoneno);
            if (result && result == inputPhone) {
                return true;
            } else {
                return false;
            }
		}	
    });
});