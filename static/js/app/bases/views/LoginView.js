define(function (require) {

    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin            	= require('gonrin'),
        storejs				= require('store'),
        tpl                 = require('text!app/bases/tpl/login.html'),
        template = _.template(tpl);
    return Gonrin.View.extend({
        render: function () {
        	var self = this;
        	storejs.set('X-USER-TOKEN', '');
        	self.getApp().currentUser = null;
			$("body").attr({'style':'background-color: #e9ecf3 !important;'});

            this.$el.html(template());
            
            $("#recover_account").unbind('click').bind('click', function(){
            	self.getApp().getRouter().navigate("recorver");
        	});
            $("#register-btn").unbind('click').bind('click', function(){
                	self.getApp().getRouter().navigate("dangky");
        	});
        	$("#forget-password").unbind('click').bind('click', function(){
                self.getApp().getRouter().navigate("forgot");
        	});

            
            this.$el.find("#login-form").unbind("submit").bind("submit", function(){
            	self.processLogin();
            	return false;
            });
            return this;
        },
       	processLogin: function(){
       		var username = this.$('[name=username]').val();
			   var password = this.$('[name=password]').val();
       		var data = JSON.stringify({
       		        data: username,
       		        password: password
       		    });
       		var self = this;
       		$.ajax({
       		    url:  self.getApp().serviceURL+'/api/v1/login',
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
       		    	console.log(data);
       		    	$.ajaxSetup({
       		    	    headers: {
       		    	    	'X-USER-TOKEN': data.token
       		    	    }
       		    	});
       		    	storejs.set('X-USER-TOKEN', data.token);
       		    	self.getApp().postLogin(data);
       		    },
       		    error: function(xhr, status, error){
    		    	try {
    		    		self.getApp().notify($.parseJSON(xhr.responseText).error_message);
    		    		}				  	  				    	
    		    	catch(err) {
    		    		self.getApp().notify("có lỗi xảy ra, vui lòng thử lại sau ");
    		    		}
	       			
	       		 }
       		});
       	},

    });

});