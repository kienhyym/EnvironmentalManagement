define('jquery', [], function() {
    return jQuery;
});

require.config({
    baseUrl: '/static/js/lib',
    paths: {
        app: '../app',
        tpl: '../tpl',
        vendor: '../../vendor'
    },
    shim: {
    	'gonrin': {
            deps: ['underscore', 'jquery', 'backbone'],
            exports: 'Gonrin'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'gonrin', 'app/router',
	'app/bases/Nav/NavbarView',
	'text!tpl/base/layout.html', 
	'i18n!app/nls/app', 
	'store'], 
	function ($, Gonrin, Router, Nav, layout, lang, storejs) {
	$.ajaxSetup({
   	    headers: {
   	        'content-type':'application/json'
   	    }
   	});
	
	var app = new Gonrin.Application({
		serviceURL: 'http://127.0.0.1:9070',
		router: new Router(),
		lang: lang,
		//layout: layout,
		initialize: function(){
			
			this.nav = new Nav();
			this.nav.render();
			this.getCurrentUser();
		},
		getParameterUrl: function(parameter, url){
			if (!url) url = window.location.href;
			var reg = new RegExp( '[?&]' + parameter + '=([^&#]*)', 'i' );
		    var string = reg.exec(url);
		    return string ? string[1] : undefined;
		},
		showloading:function(){
			$("#loading").removeClass("hidden");
		},
		hideloading:function(){
			$("#loading").addClass("hidden");
		},
		getCurrentUser : function(){
			var self = this;
			token = storejs.get('X-USER-TOKEN');
			$.ajaxSetup({
		    	    headers: {
		    	    	'X-USER-TOKEN': token
		    	    }
		    	});
			$.ajax({
				url: self.serviceURL + '/current_user',
       		    dataType:"json",
       		    success: function (data) {
       		    	self.postLogin(data);
       		    },
       		    error: function(XMLHttpRequest, textStatus, errorThrown) {
       		    	self.hideloading();
       		    	self.router.navigate("login");
       		    }
       		});
		},
		hasRole: function(role){
    		return (gonrinApp().currentUser != null && gonrinApp().currentUser.roles!=null) && gonrinApp().currentUser.roles.indexOf(role)>=0;
    	},
		updateCurrentUser : function(hoten){
			var self = this;
			var currUser = self.currentUser;
			if(!!hoten && hoten!== ""){
				currUser.fullname = hoten;
				self.$header.find("span.username").html(currUser.fullname);
			}
		},
		postLogin: function(data){
			var self = this;
			$('body').html(layout);
			self.showloading();
			self.currentUser = new Gonrin.User(data);
			this.$header = $('body').find(".page-header");
			this.$content = $('body').find(".content-area");
			this.$navbar = $('body').find(".page-navbar");
		    var $user = self.$header.find("span.username");
		    if(!data.fullname || data.fullname === ""){
		    	data.fullname = data.id;
		    }
		    self.$header.find("span.username").html(data.fullname);
			this.$toolbox = $('body').find(".tools-area");
			this.nav = new Nav({el: this.$navbar});
			self.nav.render();
			self.hideloading();
			
			$("#logo").unbind('click').bind('click', function(){
				self.router.navigate("index");
            });
	    	$("#logout").bind('click', function(){
	    		if(self.router.currentRoute().route ==="login"){
	    			self.router.refresh();
	    		}else{
	    			self.router.navigate("login");
	    		}
	    	    
	    	});
			$("#userprofile").bind('click', function() {
				self.router.navigate("user/profile");
			});
		}
	});
	app.isMobile = false;
	app.registerScrollToolbar = function(view){
		if(!!app.isMobile){
			Backbone.off("window:scroll").on("window:scroll", function(evt){
				var toolwrap = view.$el.find(".toolbar-wraper");
				if(evt.direction === "up"){
					if($(window).scrollTop() > 30){
						toolwrap.addClass("autofix fix");
					}else{
						toolwrap.removeClass("autofix fix");
					}
				}
				else if(evt.direction === "down"){
					toolwrap.removeClass("autofix fix");
				}
			});
		}
		
	};
    Backbone.history.start();
    
    var iScrollPos = 0;
    
    $(window).scroll(function() {
    	var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > (iScrollPos + 30)) {
        	iScrollPos = iCurScrollPos;
        	Backbone.trigger('window:scroll', {direction: "down"});
        	
        } else if (iCurScrollPos < (iScrollPos - 30)){
        	iScrollPos = iCurScrollPos;
        	Backbone.trigger('window:scroll', {direction: "up"});
        }
        
    });
    
});
