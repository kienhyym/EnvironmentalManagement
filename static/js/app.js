define('jquery', [], function () {
	return jQuery;
});

require.config({
	baseUrl: static_url + '/js/lib',
	//    baseUrl: '/static/js/lib',
	paths: {
		app: '../app',
		tpl: '../tpl',
		schema: '../schema',
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
		'text!app/bases/tpl/layout.html',
		'i18n!app/nls/app',
		'store'
	],
	function ($, Gonrin, Router, Nav, layout, lang, storejs) {
		$.ajaxSetup({
			headers: {
				'content-type': 'application/json'
			}
		});

		var app = new Gonrin.Application({
			serviceURL: 'http://127.0.0.1:9070',
		//	serviceURL: 'http://103.74.120.56:9070',
			serviceURL: location.protocol+'//'+location.hostname+(location.port ? ':'+location.port : ''),
			staticURL: static_url,
			router: new Router(),
			lang: lang,
			mapKyBaoCao: {},
			//layout: layout,
			initialize: function () {
				this.nav = new Nav();
				this.nav.render();
				this.getCurrentUser();
				this.mapKyBaoCao = this.getMapKyBaoCao();
			},
			getParameterUrl: function (parameter, url) {
				if (!url) url = window.location.href;
				var reg = new RegExp('[?&]' + parameter + '=([^&#]*)', 'i');
				var string = reg.exec(url);
				return string ? string[1] : undefined;
			},
			showloading: function () {
				$("#loading").removeClass("hidden");
			},
			hideloading: function () {
				$("#loading").addClass("hidden");
			},
			create_UUID: function () {
				var dt = new Date().getTime();
				var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
					var r = (dt + Math.random() * 16) % 16 | 0;
					dt = Math.floor(dt / 16);
					return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
				});
				return uuid;
			},
			getCurrentUser: function () {
				var self = this;
				token = storejs.get('X-USER-TOKEN');
				$.ajaxSetup({
					headers: {
						'X-USER-TOKEN': token
					}
				});
				$.ajax({
					url: self.serviceURL + '/current_user',
					dataType: "json",
					success: function (data) {
						self.postLogin(data);
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						self.hideloading();
						self.router.navigate("login");
					}
				});
			},
			hasRole: function (role) {
				return (gonrinApp().currentUser != null && gonrinApp().currentUser.roles != null) && gonrinApp().currentUser.roles.indexOf(role) >= 0;
			},
			updateCurrentUser: function (hoten) {
				var self = this;
				var currUser = self.currentUser;
				if (!!hoten && hoten !== "") {
					currUser.fullname = hoten;
					self.$header.find("span.username").html(currUser.fullname);
				}
			},
			postLogin: function (data) {
				var self = this;
				$("body").attr({'style':'background-color: #fff !important;'});

				$('body').html(layout);
				self.showloading();
				self.currentUser = new Gonrin.User(data);
				if (!!data.donvi.tinhthanh_id){
					self.data("tinhthanh_id", data.donvi.tinhthanh_id);
				}
				if (!!data.donvi.quanhuyen_id){
					self.data("quanhuyen_id", data.donvi.quanhuyen_id);
				}
				if (!!data.donvi.xaphuong_id){
					self.data("xaphuong_id", data.donvi.xaphuong_id);
				}
				
				this.$header = $('body').find(".page-header");
				this.$content = $('body').find(".content-area");
				this.$navbar = $('body').find(".page-navbar");
				var $user = self.$header.find("span.username");
				if (!data.fullname || data.fullname === "") {
					data.fullname = data.id;
				}
				self.$header.find("span.username").html(data.fullname);
				this.$toolbox = $('body').find(".tools-area");
				this.nav = new Nav({el: this.$navbar});
				self.nav.render();
				self.hideloading();

				$("#logo").unbind('click').bind('click', function () {
					self.router.navigate("index");
				});
				$("#logout").bind('click', function () {
					self.currentUser = null;
					$.ajax({
						url: "/logout",

						dataType: "json",
						contentType: "application/json",
						success: function (data) {
							console.log("data : ", data);
						},
						error: function (xhr, status, error) {

						}
					});
					if (self.router.currentRoute().route === "login") {
						self.router.refresh();
					} else {
						self.router.navigate("login");
					}

				});
				$("#userprofile").bind('click', function () {
					self.router.navigate("user/profile");
				});
			},
			get_currentRoute_loaibaocao:function(){
				var self = this;
				var currentRoute = self.router.currentRoute()['fragment'];
				if (currentRoute.indexOf('model/quy1')>=0){
					return "quy1";
				}else if (currentRoute.indexOf('model/quy2')>=0){
					return "quy2";
				}else if (currentRoute.indexOf('model/quy3')>=0){
					return "quy3";
				}else if (currentRoute.indexOf('model/quy4')>=0){
					return "quy4";
				}else if (currentRoute.indexOf('model/6thangdau')>=0){
					return "6thangdau";
				}else if (currentRoute.indexOf('model/6thangcuoi')>=0){
					return "6thangcuoi";
				}else if (currentRoute.indexOf('model/nam')>=0){
					return "nam";
				}else{
					return null;
				}
			},
			check_chuongtrinhSUP:function(check_thuoc_sup,element){
				var self = this;
				if (check_thuoc_sup === 0 || check_thuoc_sup === "0"){
					element.find(".chuongtrinhsup").hide();
					element.find("#header_table_notsup").show();
					element.find("#header_table_sup").hide();
					
				} else{
					element.find(".chuongtrinhsup").show();
					element.find("#header_table_notsup").hide();
					element.find("#header_table_sup").show();
				}
				
			},
//			process_loaikybaocao:function(baocao, Model, elementView){
//				var self = this;
//				var currentRoute = self.router.currentRoute()['fragment'];
//				if (currentRoute.indexOf('model/quy1')>=0){
//					Model.set("loaikybaocao",2);
//					Model.set("kybaocao",1);
//					elementView.find("#kydanhgia").val("Qúy I");
//					self.data(baocao + "_loaibaocao_route","quy1");
//				} else if(currentRoute.indexOf('model/quy2')>=0){
//					Model.set("loaikybaocao",2);
//					Model.set("kybaocao",2);
//					elementView.find("#kydanhgia").val("Qúy II");
//					self.data(baocao + "_loaibaocao_route","quy2");
//				} else if(currentRoute.indexOf('model/quy3')>=0){
//					Model.set("loaikybaocao",2);
//					Model.set("kybaocao",3);
//					elementView.find("#kydanhgia").val("Qúy III");
//					self.data(baocao + "_loaibaocao_route","quy3");
//				} else if(currentRoute.indexOf('model/quy4')>=0){
//					Model.set("loaikybaocao",2);
//					Model.set("kybaocao",4);
//					elementView.find("#kydanhgia").val("Qúy IV");
//					self.data(baocao + "_loaibaocao_route","quy4");
//				} else if(currentRoute.indexOf('model/6thangdau')>=0){
//					Model.set("loaikybaocao",3);
//					Model.set("kybaocao",1);
//					elementView.find("#kydanhgia").val("6 tháng đầu năm");
//					self.data(baocao + "_loaibaocao_route","6thangdau");
//				} else if(currentRoute.indexOf('model/6thangcuoi')>=0){
//					Model.set("loaikybaocao",3);
//					Model.set("kybaocao",2);
//					elementView.find("#kydanhgia").val("6 tháng cuối năm");
//					self.data(baocao + "_loaibaocao_route","6thangcuoi");
//				} else if(currentRoute.indexOf('model/nam')>=0){
//					Model.set("loaikybaocao",4);
//					Model.set("kybaocao",1);
//					elementView.find("#kydanhgia").val("Tổng kết năm");
//					self.data(baocao + "_loaibaocao_route","nam");
//				}
//			},
			
			getMapKyBaoCao: function() {
				return {
					"quy1": {
						"loaikybaocao": 2,
						"kybaocao": 1,
						"text": "Qúy I",
					},
					"quy2": {
						"loaikybaocao": 2,
						"kybaocao": 2,
						"text": "Qúy II",
					},
					"quy3": {
						"loaikybaocao": 2,
						"kybaocao": 3,
						"text": "Qúy III",
					},
					"quy4": {
						"loaikybaocao": 2,
						"kybaocao": 4,
						"text": "Qúy IV",
					},
					"6thangdau": {
						"loaikybaocao": 3,
						"kybaocao": 1,
						"text": "6 tháng đầu năm",
					},
					"6thangcuoi": {
						"loaikybaocao": 3,
						"kybaocao": 2,
						"text": "6 tháng cuối năm",
					},
					"nam": {
						"loaikybaocao": 4,
						"kybaocao": 1,
						"text": "Tổng kết năm",
					}
				};
			}
		});
		Backbone.history.start();

		var iScrollPos = 0;

		$(window).scroll(function () {
			var iCurScrollPos = $(this).scrollTop();
			if (iCurScrollPos > (iScrollPos + 30)) {
				iScrollPos = iCurScrollPos;
				Backbone.trigger('window:scroll', {
					direction: "down"
				});

			} else if (iCurScrollPos < (iScrollPos - 30)) {
				iScrollPos = iCurScrollPos;
				Backbone.trigger('window:scroll', {
					direction: "up"
				});
			}

		});

	});