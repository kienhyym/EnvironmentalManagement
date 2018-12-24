define(function (require) {

    "use strict";
    
    var $           = require('jquery'),
        Gonrin    	= require('gonrin');
       // storejs		= require('store');
    var Login		= require('app/bases/views/LoginView');
    var RegisterView	= require('app/bases/views/RegisterView');
    var ForgotPasswordView	= require('app/bases/views/ForgotPasswordView');
    return Gonrin.Router.extend({
        routes: {
        	"index" : "index",
            "login":"login",
            "logout": "logout",
            "forgot":"forgotPassword",
            "dangky":"dangky",
            "error":"error_page",
            "*path":  "defaultRoute"
        },
        defaultRoute:function(){
            	this.navigate("index",true);
        },
        index:function(){
        	//check storejs session
        	/*var app = this.getApp();
        	if(!app.check_valid_session()){
        		var token = storejs.get('gonrin.token');
            	if(token != null){
            		app.session.token = token;
            		$.ajaxSetup({
        	    	    headers: {
        	    	        'content-type':'application/json',
        	    	        'Authorization':token
        	    	    }
        	    	});
            	}
        	}
        	if(app.check_valid_session()){
	    		app.postLogin();
	    	}else{
	    		this.navigate("login");
	    	}*/
        },
        logout: function(){
        	var self = this;
        	$.ajax({
				url: self.getApp().serviceURL + '/logout',
       		    dataType:"json",
       		    success: function (data) {
       		    	self.navigate("login");
       		    },
       		    error: function(XMLHttpRequest, textStatus, errorThrown) {
       		    	self.getApp().notify(self.getApp().translate("LOGOUT_ERROR"));
       		    }
        	});
        },
        error_page: function(){
        	var app = this.getApp();
        	if(app.$content){
        		app.$content.html("Error Page");
        	}
        	return;
        },
        login: function(){
        	this.getApp().data("current_so", null);
            var loginview = new Login({el: $('body')});
            loginview.render();
        },
        dangky: function(){
        	var registerView = new RegisterView({el: $('body')});
        	registerView.render();
        },
        forgotPassword: function(){
            var forgotPassView = new ForgotPasswordView({el: $('body')});
            forgotPassView.render();
        },
    });

});