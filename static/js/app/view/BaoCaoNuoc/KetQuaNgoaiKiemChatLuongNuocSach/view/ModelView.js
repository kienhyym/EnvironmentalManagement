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
			
			self.$el.find("#addItem").unbind("click").bind("click", function () {
				console.log("them thong so active");
                var view = new ThongSoBaoCaoChatLuongNuocView();
                view.dialog();
                console.log( "view====",view);
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
					//console.log(evt);
					self.updateKetqua(evt);
					
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
			
		}
	});

});