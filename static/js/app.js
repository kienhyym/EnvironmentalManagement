define('jquery', [], function () {
	return jQuery;
});

require.config({
	// baseUrl: static_url + '/js/lib',
	   baseUrl: '/static/js/lib',
	paths: {
		app: '../app',
		tpl: '../tpl',
		schema: '../../schema',
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
		'app/bases/TemplateHelper'

	],
	function ($, Gonrin, Router, Nav, layout, lang, TemplateHelper) {
		$.ajaxSetup({
			headers: {
				'content-type': 'application/json'
			}
		});

		var app = new Gonrin.Application({
//			serviceURL: 'http://127.0.0.1:9070',
//			serviceURL: 'http://103.74.120.56:9070',
			serviceURL: location.protocol+'//'+location.hostname+(location.port ? ':'+location.port : ''),
			staticURL: static_url,
			router: new Router(),
			lang: lang,
			mapKyBaoCao: {},
			template_helper: new TemplateHelper(),
			//layout: layout,
			initialize: function () {
				var tpl = gonrin.template(layout)({});
				$('body').html(tpl);
				
				
				this.getCurrentUser();
				this.nav = new Nav();
				this.nav.render();
				this.mapKyBaoCao = this.getMapKyBaoCao();
			},
			getParameterUrl: function (parameter, url) {
				if (!url) url = window.location.href;
				var reg = new RegExp('[?&]' + parameter + '=([^&#]*)', 'i');
				var string = reg.exec(url);
				return string ? string[1] : undefined;
			},
			toInt: function(x) {
				return parseInt(x) ? parseInt(x) : 0;
			},
			showloading: function () {
				$("#loading").removeClass("hidden");
			},
			hideloading: function () {
				$("#loading").addClass("hidden");
			},
//			create_UUID: function () {
//				var dt = new Date().getTime();
//				var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//					var r = (dt + Math.random() * 16) % 16 | 0;
//					dt = Math.floor(dt / 16);
//					return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//				});
//				return uuid;
//			},
			getCurrentUser: function () {
				var self = this;
//				token = storejs.get('X-USER-TOKEN');
//				$.ajaxSetup({
//					headers: {
//						'X-USER-TOKEN': token
//					}
//				});
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
				var tpl = gonrin.template(layout)({});
				$('body').html(tpl);
//				$('body').html(layout);
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
				if($('body').hasClass('page-navbar-closed') == true){
					$('body').removeClass("page-navbar-closed");
				}
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
							// console.log("data : ", data);
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
				if (currentRoute.indexOf('quy1')>=0){
					return "quy1";
				}else if (currentRoute.indexOf('quy2')>=0){
					return "quy2";
				}else if (currentRoute.indexOf('quy3')>=0){
					return "quy3";
				}else if (currentRoute.indexOf('quy4')>=0){
					return "quy4";
				}else if (currentRoute.indexOf('6thangdau')>=0){
					return "6thangdau";
				}else if (currentRoute.indexOf('6thangcuoi')>=0){
					return "6thangcuoi";
				}else if (currentRoute.indexOf('nam')>=0){
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
						"text": "Báo cáo năm",
					}
				};
			},
			exportToPDF: function(elementID, filename){
				var specialElementHandlers = {
				  // element with id of "bypass" - jQuery style selector
				  '#ignorePDF': function(element, renderer) {
				    // true = "handled elsewhere, bypass text extraction"
				    return true;
				  }
				};
				
				  var pdf = new jsPDF('p', 'pt', 'a4');
//				  var pdf = new jsPDF('p', 'pt', 'letter');
				  //A4 - 595x842 pts
				  //https://www.gnu.org/software/gv/manual/html_node/Paper-Keywords-and-paper-size-in-points.html
				  var source = $("#"+elementID).html();
//				  //Html source 
				  
				  var margins = {
				    top: 10,
				    bottom: 10,
				    left: 10,
				    width: 595
				  };

				  pdf.fromHTML(
					source, // HTML string or DOM elem ref.
				    margins.left,
				    100, {
				      'width': margins.width,
				      'table_2'           : true,
			          'table_2_scaleBasis': 'font', // 'font' or 'width'
//			          'table_2_fontSize'  : 13,
//			          pagesplit: true
				    },
				    function(dispose) {
				      // dispose: object with X, Y of the last line add to the PDF 
				      //          this allow the insertion of new lines after html
				    	pdf.save(filename+'.pdf');
				    }, margins);
				  
			},
			exportPDF_HTML2PDF: function(elementID, filename){
				var element = document.getElementById('content');
				var opt = {
				  margin:       [20,5,5,10],
				  filename:     filename,
				  image:        { type: 'jpeg', quality: 0.98 },
				  pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
				  html2canvas:  {allowTaint:true, onclone: function(doc) 
					  {doc.querySelector('#content').style.transform = 'none'} },
				  jsPDF:{
					  orientation: 'p',
					  unit: 'mm',
					  format: 'ledger',
					  hotfixes: [] // an array of hotfix strings to enable
					 }
//				  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
				};
				html2pdf().set(opt).from(element).save();
			},
			exportToPDF_canvas: function(elementID, filename){
				var specialElementHandlers = {
						  // element with id of "bypass" - jQuery style selector
						  '#ignorePDF': function(element, renderer) {
						    // true = "handled elsewhere, bypass text extraction"
						    return true;
						  }
						};
				 // var pdf = new jsPDF('p', 'pt', 'a4');
				  var pdf = new jsPDF('p', 'pt', 'letter');
				  
				  var quotes = document.getElementById(elementID);
				  html2canvas(quotes, {
			            onrendered: function (canvas) {
			                for (var i = 0; i <= quotes.clientHeight / 980; i++) {
			                    //! This is all just html2canvas stuff
			                    var srcImg = canvas;
			                    var sX = 0;
			                    var sY = 1100 * i; // start 1100 pixels down for every new page
			                    var sWidth = 900;
			                    var sHeight = 1100;
			                    var dX = 0;
			                    var dY = 0;
			                    var dWidth = 900;
			                    var dHeight = 1100;

			                    window.onePageCanvas = document.createElement("canvas");
			                    onePageCanvas.setAttribute('width', 900);
			                    onePageCanvas.setAttribute('height', 1100);
			                    var ctx = onePageCanvas.getContext('2d');
			                    // details on this usage of this function: 
			                    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
			                    ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

			                    // document.body.appendChild(canvas);
			                    var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

			                    var width = onePageCanvas.width;
			                    var height = onePageCanvas.clientHeight;

			                    //! If we're on anything other than the first page,
			                    // add another page
			                    if (i > 0) {
			                        pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
			                    }
			                    //! now we declare that we're working on that page
			                    pdf.setPage(i + 1);
			                    //! now we add content to that page!
			                    pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62));

			                }
			            }
			        });
			        pdf.save(filename+'.pdf');
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