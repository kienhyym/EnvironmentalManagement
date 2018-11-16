define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
		
    var template 				= require('text!app/view/tpl/HeThong/User/changepassword.html');
    
    return Gonrin.ModelDialogView.extend({
    	template : template,
    	modelSchema	: {},
    	urlPrefix: "/api/v1/",
    	collectionName: "user",
    	tools : [
    	    	    {
    	    	    	name: "defaultgr",
    	    	    	type: "group",
    	    	    	groupClass: "toolbar-group",
    	    	    	buttons: [
    						{
    							name: "close",
    							type: "button",
    							buttonClass: "btn-default btn-sm",
    							label: "TRANSLATE:CLOSE",
      			    	    	command: function(){
      			    	    		var self = this;
      			    	    		self.close();
    				                //self.getApp().getRouter().navigate(self.collectionName + "/collection");
    							}
    						},
    						{
    			    	    	name: "save",
    			    	    	type: "button",
    			    	    	buttonClass: "btn-success btn-sm",
    			    	    	label: "Đổi mật khẩu",
    			    	    	command: function(){
    			    	    		var self = this;
    			    	    		var pass = self.$el.find("#password").val();
    			                    var newpass = self.$el.find("#newpassword").val();
    			                    var confirm = self.$el.find("#confirm_password").val();
    			                    console.log(newpass, confirm, pass);
    			                    if(newpass === confirm && newpass!==''){
    			                    	$.ajax({
      	  				    				url: (self.getApp().serviceURL || "")+'/api/v1/user/changepw',
      	  				    				method: 'POST',
      	  				    				data: JSON.stringify({password: pass, newpassword: newpass, confirm:confirm}),
      	  				    				dataType: "json",
      	  				    			  	contentType: "application/json",
      	  				    			  	success: function(data) {
      	  				    			  		self.getApp().notify('Thay đổi mật khẩu thành công!');
      	  				    			  		self.close();
      	  				    			  	},
    		  	  				    	    error: function (request, status, error) {
    		  	  				    	    	console.log(request);
    		  	  				    	        self.getApp().notify('Cập nhật không thành công!');

    		  	  				    	    }
      	  				    			  	
      	  				    			});
    			                    }else{
    			                    	self.getApp().notify("Mật khẩu mới không khớp với nhập lại mật khẩu mới");

    			                    }
    			    	    	}
    			    	    }
    	    	    	],
    	    	    }
    	        ],
    	render:function(){
    		var self = this;
    		this.applyBindings();
    		return this;
    	},
    });

});