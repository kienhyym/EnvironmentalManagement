define(function (require) {

    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin            	= require('gonrin'),
        storejs				= require('store'),
        tpl                 = require('text!app/bases/tpl/register.html'),
        template = _.template(tpl);

    return Gonrin.View.extend({
        render: function () {
        	var self = this;
            this.$el.html(template());
            this.$el.find("#register-form").unbind("submit").bind("submit", function(){
            	self.processRegister();
            	return false;
            });
            return this;
        },
       	processRegister: function(){
       		var self = this;
       		var hoten = this.$('[name=hoten]').val();
       		var phone = this.$('[name=phone]').val();
       		var email = this.$('[name=email]').val();
       		var macongdan = this.$('[name=macongdan]').val();
       		var password = this.$('[name=password]').val();
       		var confirm_password = this.$('[name=confirm_password]').val();
       		if(phone === undefined || phone === ""){
       			self.getApp().notify("Số điện thoại không được bỏ trống");
       			return false;
       		}
       		if(email === undefined || email === ""){
       			self.getApp().notify("Email không được bỏ trống");
       			return false;
       		}
       		if(password === undefined || password === "" || password !== confirm_password){
       			self.getApp().notify("Mật khẩu không khớp");
       			return false;
       		}
       		var data = JSON.stringify({
       	   		        fullname: hoten,
       	   		        phone:phone,
       	   		        email: email,
       	   		        macongdan:macongdan,
       	   		        password: password,
       	   		        password_confirm: confirm_password
       		});
       		var self = this;
       		$.ajax({
       		    url: (self.getApp().serviceURL || "") + '/api/register',
       		    type: 'post',
       		    data: data,
       		    headers: {
    		    	'content-type': 'application/json'
    		    },
    		    beforeSend: function(){
       		    	$("#loading").removeClass("hidden");
       		    },
       		    complete: function(){
    		    	$("#loading").addClass("hidden");
    		    },
       		    dataType: 'json',
       		    success: function (data) {
       		    	$.ajaxSetup({
       		    	    headers: {
       		    	    	'X-USER-TOKEN': data.token
       		    	    }
       		    	});
       		    	storejs.set('X-USER-TOKEN', data.token);
       		    	self.getApp().postLogin(data);
       		    	
       		    },
       		    error: function(request, textStatus, errorThrown) {
       		    	try {
       		    		self.getApp().notify($.parseJSON(request.responseJSON).error_message);
       		    		}				  	  				    	
       		    	catch(err) {
       		    		self.getApp().notify('có lỗi xảy ra, vui lòng thử lại sau');
       		    		}
       		    }
       		});
     }

    });

});