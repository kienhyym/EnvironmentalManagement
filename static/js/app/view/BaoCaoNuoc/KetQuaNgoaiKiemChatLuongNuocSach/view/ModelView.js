    define(function (require) {
    	"use strict";
    	var $ = require('jquery'),
    		_ = require('underscore'),
    		Gonrin = require('gonrin');
    	var template = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/model.html'),
    		schema = require('json!schema/KetQuaNgoaiKiemChatLuongNuocSachSchema.json');
    	//var maxDate = new Date();
    	//var KQNgoaiKiemChatLuong = require('app/view/BaoCaoNuoc/KQNgoaiKiemChatLuong/view/ModelItemView');
    	var KetQuaNgoaiKiemChatLuongNuocItemView = require('app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/KetQuaNgoaiKiemChatLuongNuocItemView');
    	var ThongSoBaoCaoChatLuongNuocView = require('app/view/DanhMuc/ThongSoBaoCaoChatLuongNuoc/view/SelectView');
    	return Gonrin.ModelView.extend({
    		template: template,
    		modelSchema: schema,
    		urlPrefix: "/api/v1/",
    		collectionName: "ketqua_ngoaikiem_chatluong_nuocsach",
    		uiControl: {
    			fields: [{
    					field: "thoigiankiemtra",
    					textFormat: "DD/MM/YYYY",
    					extraFormats: ["DDMMYYYY"],
    				},
    			],
    		},
    		tools: [{
    			name: "defaultgr",
    			type: "group",
    			groupClass: "toolbar-group",
    			buttons: [{
    					name: "back",
    					type: "button",
    					buttonClass: "btn-default btn-sm",
    					label: "TRANSLATE:BACK",
    					command: function () {
    						var self = this;
    						Backbone.history.history.back();
    					}
    				},
    				{
    					name: "save",
    					type: "button",
    					buttonClass: "btn-success btn-sm",
    					label: "TRANSLATE:SAVE",
    					command: function () {
    						var self = this;
    						self.model.save(null, {
    							success: function (model, respose, options) {
    								self.getApp().notify("Lưu thông tin thành công");
    								self.getApp().getRouter().navigate(self.collectionName + "/collection");
    							},
    							error: function (model, xhr, options) {
    								self.getApp().notify('Lưu thông tin không thành công!');
    							}
    						});
    					}
    				},
    				{
    					name: "delete",
    					type: "button",
    					buttonClass: "btn-danger btn-sm",
    					label: "TRANSLATE:DELETE",
    					visible: function () {
    						return this.getApp().getRouter().getParam("id") !== null;
    					},
    					command: function () {
    						var self = this;
    						self.model.destroy({
    							success: function (model, response) {
    								self.getApp().notify('Xoá dữ liệu thành công');
    								self.getApp().getRouter().navigate(self.collectionName + "/collection");
    							},
    							error: function (model, xhr, options) {
    								self.getApp().notify('Xoá dữ liệu không thành công!');
    							}
    						});
    					}
    				},
    			],
    		}],
    		render: function () {
    			var self = this;
    			var view = new KetQuaNgoaiKiemChatLuongNuocItemView();
    			self.$el.find("#addItem").unbind("click").bind("click", function () {
                    var view = new ThongSoBaoCaoChatLuongNuocView();
                    view.dialog();
                    var ketquangoaikiemchatluongnuoc = self.model.get('ketquangoaikiemchatluongnuoc');
        			view.on("onSelected", function (data) {
//        				self.model.on("change:somauvavitri", function(){
//        					
//							self.changeSoMau();
//						});
//        				console.log("data===", data);
        				var item = {
                                "id": gonrin.uuid(),
                                "mathongso": data.mathongso,
                                "tenthongso": data.tenthongso,
                                "gioihan_toithieu": data.gioihan_toithieu,
                                "gioihan_toithieu_txt": data.gioihan_toithieu_txt,
                                "gioihan_toida": data.gioihan_toida,
                                "gioihan_toida_txt": data.gioihan_toida_txt,
                                "ketquakiemtra": [],
                                "danhgia": 0
                            };
        				ketquangoaikiemchatluongnuoc.push(item);
        				
//        				console.log("item===", item);
        				console.log("ketquangoaikiemchatluongnuoc", ketquangoaikiemchatluongnuoc);
                        self.model.set("ketquangoaikiemchatluongnuoc", ketquangoaikiemchatluongnuoc);
        				self.applyBindings();
        				self.changeSoMau();
                    });
                    
                });
    			self.$el.find("#itemRemove").unbind('click').bind('click', function(data){
                	var fields = self.model.get("ketquangoaikiemchatluongnuoc");
                	console.log("ketquangoaikiemchatluongnuoc==fields", fields);
                	console.log("data====== remove", data);
//                	var data = e.data.obj;
                    for( var i = 0; i < fields.length; i++){ 
                    	   if ( fields[i].id === data.id) {
                    		   fields.splice(i, 1); 
                    	   }
                    	}
                    self.model.set("ketquangoaikiemchatluongnuoc", fields);
//                    view.destroy();
//                    view.remove();
                });
    			
    			self.model.on("change:somauvavitri", function () {
    				if (self.model.get("somauvavitri") > 10){
    					self.getApp().notify({message: "Số lấy mẫu phải nhỏ hơn 10"},{type: "danger"});
    				}
    			});
    			var id = this.getApp().getRouter().getParam("id");
    			if (id) {
    				this.model.set('id', id);
    				this.model.fetch({
    					success: function (data) {
    						self.applyBindings();
    						self.model.on("change:somauvavitri", function(){
    							self.changeSoMau();
    						});
    						self.changeSoMau();
    					},
    					error: function () {
    						self.getApp().notify("Get data Eror");
    					},
    				});
    			} else {
    				self.prepareBaocao();
    			}
    			
    		},
    		changeSoMau: function(){
    			var self = this;
    			var somau = self.model.get("somauvavitri");
    			self.$el.find("[id=mauvitri_header]").remove();
    			self.$el.find("#ketquangoaikiemchatluongnuoc").empty();
    			
    			if(!!somau & (somau >0)){
    				$.each(self.model.get("ketquangoaikiemchatluongnuoc"), function(idx, obj){
    					
    					if (self.model.get("ketquangoaikiemchatluongnuoc")[idx]["ketquakiemtra"].length < somau){
    						for (var i = self.model.get("ketquangoaikiemchatluongnuoc")[idx]["ketquakiemtra"].length; i < somau; i++){
    							self.model.get("ketquangoaikiemchatluongnuoc")[idx]["ketquakiemtra"].push({
    								"vitrimau": i + 1,
    								"ketqua": null,
    								"danhgia": 0
    							})
    						}
    					}
    					
    				});
    				
    				for (var j = 0; j < somau; j++){
    					var el = $("<th>").attr("rowspan", 2).attr("id", "mauvitri_header").css({"text-align":"center"}).html(j+1);
    					self.$el.find("#mauvitri_header_before").before(el);
    				}
    				
    				
    			}
    			self.renderKetQua();
    			
    		},
    		renderKetQua: function(){
    			//prepare Itemview
    			var self = this;
    			
    			$.each(self.model.get("ketquangoaikiemchatluongnuoc"), function(idx, obj){
    				var view = new KetQuaNgoaiKiemChatLuongNuocItemView();
    				obj["sothutu"] = idx + 1;
    				view.model.set(obj);
    				view.render();
    				self.$el.find("#ketquangoaikiemchatluongnuoc").append(view.$el);
    				view.on("ketquachange", function(evt){
//    					console.log("evt======", evt);
//    					console.log("evt ketquaktra", evt.ketquakiemtra.length);
//    					console.log("evt ketquaktra", evt.ketquakiemtra);
//    					for( var i = 0; i < evt.ketquakiemtra.length; i++){
//    						console.log(evt.ketquakiemtra[i].ketqua);
//    						if (!evt.ketquakiemtra.ketqua){
//    							console.log(evt.ketquakiemtra.ketqua);
//    						}
//    					}
//    					console.log("ketquangoaikiemchatluongnuoc==", self.model.get("ketquangoaikiemchatluongnuoc"));
//    					console.log("danh gia value", self.model.get("danhgia"));
    					var danhgiaTo = 1;
    					evt.ketquakiemtra.forEach(function (data) {
//							console.log("value ket qua====", data.ketqua);
//							console.log("gioi han toi da value", evt.gioihan_toida);
//							console.log("gioi han toi thieu value", evt.gioihan_toithieu);
							if (data.ketqua && data.ketqua <= evt.gioihan_toida && data.ketqua > evt.gioihan_toithieu){
								data.danhgia = 1;
							} else {
								data.danhgia = 0;
							}
							
							danhgiaTo *= data.danhgia ? data.danhgia : 0;
							console.log("danhgiaTo: ", danhgiaTo);
						});
    					evt.danhgia = danhgiaTo;
    					console.log(evt.ketquakiemtra);
    					self.updateKetqua(evt);
//    					evt.ketquakiemtra.forEach(function (data) {
//							console.log("danh gia value", data.danhgia);
//							console.log("danh gia value", data);
//							if (data.danhgia === 1 && data.danhgia){
//								evt.danhgia = 1;
//							}
//							a = a * parseInt(data.danhgia);
//							console.log("aaaaaaa=====",a);
//						});
						self.changeSoMau();
						self.applyBindings();
    					
    					console.log(evt);
    					console.log("ketquangoaikiemchatluongnuoc", self.model.get("ketquangoaikiemchatluongnuoc"));
    					
    				});
    			});
    		},
    		updateKetqua: function(obj){
    			var self = this;
    			for(var i = 0; i < self.model.get("ketquangoaikiemchatluongnuoc").length; i++){
    				if (self.model.get("ketquangoaikiemchatluongnuoc")[i].id === obj.id){
    					self.model.get("ketquangoaikiemchatluongnuoc")[i] = obj;
    				}
    			}
    		},
    		prepareBaocao: function(){
    			//get all thong so
    			var self = this;
    			self.model.set("ketquangoaikiemchatluongnuoc", []);
    			var url = self.getApp().serviceURL + "/api/v1/thongsobaocaochatluongnuoc";
    			$.ajax({
    				url: url,
    				method: "GET",
    				contentType: "application/json",
    				success: function (data) {
    					if (!!data && !!data.objects && (data.objects.length > 0)){
    						$.each(data.objects, function(idx, obj){
    							var item = {
    	                                "id": gonrin.uuid(),
    	                                "mathongso": obj.mathongso,
    	                                "tenthongso": obj.tenthongso,
    	                                "gioihan_toithieu": obj.gioihan_toithieu,
    	                                "gioihan_toithieu_txt": obj.gioihan_toithieu_txt,
    	                                "gioihan_toida": obj.gioihan_toida,
    	                                "gioihan_toida_txt": obj.gioihan_toida_txt,
    	                                "ketquakiemtra": [],
    	                                "danhgia": 0
    	                            };
    							(self.model.get("ketquangoaikiemchatluongnuoc")).push(item);
    							
    						});
    						self.model.set("somauvavitri", 1);
    					}
    				},
    				error: function (xhr, status, error) {
    					self.getApp().notify("Không tìm thấy thông số");
    				},
    			});	
    			self.applyBindings();
    			self.model.on("change:somauvavitri", function(){
    				self.changeSoMau();
    			});
    		},
    	});
    });