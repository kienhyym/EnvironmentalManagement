define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 		    = require('text!app/view/tpl/HeThong/User/profile.html');
    var ChangePasswordView  = require('app/view/HeThong/User/view/ChangePasswordView');
    var ProfileDialogView      = require('app/view/HeThong/User/view/ProfileDialogView');
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: {},
    	urlPrefix: "/api/v1/",
    	collectionName: "user",
    	render: function() {
            var self = this;
            this.applyBindings();
            var currentUser = this.getApp().currentUser;
    		if (!!currentUser) {
    			self.$el.find("#changepass").unbind("click").bind("click", function(){
    				var changepass = new ChangePasswordView();
    				changepass.dialog();
    				
    			});
    			
    			self.$el.find("#changeprofile").unbind("click").bind("click", function(){
    				var profile = new ProfileDialogView();
    				profile.dialog();
    				
    			});
    		}else{
    			self.getApp().getRouter().navigate("/login");
    		}
    	},
    });

});