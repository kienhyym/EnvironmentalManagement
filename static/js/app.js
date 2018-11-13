define ('jquery', [], function() {
	return jQuery;
});

require.config({
	baseUrl: '/static/js/lib',
	paths: {
		app: '../app',
		schema: '../schema',
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

require([
	'jquery',
	'gonrin',
	'app/router',
	'app/view/base/nav/NavbarView',
	'text!app/view/base/layout.html',
	'i18n!app/nls/app'
	], function ($, Gonrin, Router, Nav, layout, lang) {
	$.ajaxSetup({
		headers: {
			"content-type": "application/json"
		}
	});
	
	var app = new Gonrin.Application({
		router: new Router(),
		lang: lang,
		initialize: function() {
			var self = this;
//			self.currentUser = new Gonrin.User(data);
			$('body').html(layout);
			this.$header = $('body').find(".page-header");
			this.$content = $('body').find(".content-area");
			this.$navbar = $('body').find(".page-navbar");
			this.$toolbox = $('body').find(".tools-area");
			// display current username into header bar
			this.$header.find("#header-display-name").html(self.currentUser && self.currentUser.displayname ? self.currentUser.displayname : "Developer");
			this.nav = new Nav({el: this.$navbar});
			self.nav.render();
			this.$selectDivision = $('body').find("#selectDivisions");
			self.enableSelectDivisions();
			
			this.router.navigate("/index");
		},
		
//		getCurrentUser: function() {
//			var self = this;
//			$.ajax({
//				url: self.serviceURL + "/user/current-user",
//				dataType: "json",
//				success: function(data) {
//					self.postLogin(data);
//				},
//				error: function(XMLHttpRequest, textStatus, errorThrown) {
//					self.router.navigate("/login")
//				}
//			})
//		},
		
//		postLogin: function(data) {
//			var self = this;
//			self.currentUser = new Gonrin.User(data);
//			$('body').html(layout);
//			this.$header = $('body').find(".page-header");
//			this.$content = $('body').find(".content-area");
//			this.$navbar = $('body').find(".page-navbar");
//			this.$toolbox = $('body').find(".tools-area");
//			// display current username into header bar
//			this.$header.find("#header-display-name").html(self.currentUser.displayname ? self.currentUser.displayname : "...");
//			this.nav = new Nav({el: this.$navbar});
//			self.nav.render();
//			
//			this.$selectDivision = $('body').find("#selectDivisions");
//			self.enableSelectDivisions(data.divisions);
//		},
		
		enableSelectDivisions: function(divisions) {
			var self = this;
			if(!!divisions){
				var value = null;
				if(divisions.length > 0) {
					value = divisions[0].id;
					self.data("currentDivision", divisions[0]);
				}
				self.$selectDivision.combobox({
					dataSource: divisions,
					textField: "name",
                    valueField: "id",
                    value: value
				});
				
				self.$selectDivision.on('change.gonrin', function(e){
                	var division_id = self.$selectDivision.data('gonrin').getValue();
                	$.each(divisions, function(idx, obj){
                		if(obj.id == division_id){
                			self.data("currentDivision", obj);
                		}
                	});
                });
			}else{
				self.$selectDivision.hide();
			}
			
		}
	});
	Backbone.history.start();
});
