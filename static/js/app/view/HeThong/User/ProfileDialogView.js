define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/User/changeprofile.html');
    
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
  			    	    				hoten: self.$el.find('#profile_name').val()
  			    	    		}
  			    	    		self.getApp().showloading();
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
	  				    			  		self.getApp().currentUser.id_card = data.id_card;
	  				    			  		self.getApp().currentUser.phone_number = data.phone_number;
		  				    			    if(!data.fullname || data.fullname === ""){
		  				    			    	data.fullname = data.id;
		  				    			    }
		  				    			   $("#fullname").html(data.fullname);
		  				    			    
	  				    			  		self.getApp().notify("Cập nhập thông tin thành công!");
	  				    			  		self.close();
	  				    			  	},
	  	  				    	    error: function (request, status, error) {
	  	  				    	    	console.log(request)
	  	  				    	    	self.getApp().hideloading();
	  	  				    	        self.getApp().notify("Có lỗi xảy ra, Vui lòng thử lại sau");
	  	  				    	        
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
    		console.log(currentUser);
    		if (!!currentUser){
    			self.$el.find('#profile_macongdan').val(currentUser.id_card),
				self.$el.find('#profile_phone').val(currentUser.phone_number),
				self.$el.find('#profile_email').val(currentUser.email),
				self.$el.find('#profile_name').val(currentUser.fullname)
    		}
    		 
    		this.applyBindings();
    		return this;
    	},
    });

});