define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/tpl/item.html'),
		schema = require('json!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/view/KetQuaNoiKiemChatLuongNuocSachItemSchema.json');
	
	var mautemplate = require('text!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/tpl/mauitem.html');
	var mauschema = {
		    "vitrimau": {
		        "type": "number",
		        "primary": true
		    },
		    "ketqua": {
		        "type": "number"
		    },
		    "danhgia": {
		        "type": "number"
		    }
		};
	var MauViTriItemView = Gonrin.ModelView.extend({
		idAttribtue: "vitrimau",
		tagName: "td",
		template: mautemplate,
		modelSchema: mauschema,
		urlPrefix: "/api/v1/",
		bindings: "mau-data",
		collectionName: "ketqua_noikiem_chatluong_nuocsach_mau_itemview",
		uiControl: {
			fields: []
		},
		tools: null,
		render: function () {
			var self = this;
			self.$el.addClass("text-center");
			self.applyBindings();
		},
	});
	
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		bindings: "bind-item-data",
		collectionName: "ketqua_noikiem_chatluong_nuocsach_itemview",
		uiControl: {
			fields: [{
					field: "thoigiankiemtra",
					textFormat: "DD/MM/YYYY",
					extraFormats: ["DDMMYYYY"],
				},
				{
					field: "danhgia",
					template: function (rowObj) {
						console.log("rowObj: ", rowObj);
						if (rowObj.danhgia == 1){
							return "Đạt";
						}
						
						return "Không Đạt";
					}
				}
			],
		},
		tools: null,
		
		render: function () {
			var self = this;
			self.applyBindings();
			this.setElement(this.el.innerHTML);
//			console.log("button remove item", self.$el.find("#itemRemove"));
//    		self.$el.find("#itemRemove").unbind("click").bind("click", function () {
//				console.log("========item view clicked==========");
//				console.log(self.model);
//				self.remove(true);
//			});
			
			$.each(self.model.get("ketquakiemtra"), function(idx, obj){
				var view = new MauViTriItemView();
				view.model.set(obj);
				view.render();
				self.$el.find("#gioihan").before(view.$el);
				view.model.on("change:ketqua", function(){
					self.updateKetQua(view.model.toJSON());
				})
			});
		},
		updateKetQua: function(obj){
			var self = this;
			for(var i = 0; i < self.model.get("ketquakiemtra").length; i++){
				if (self.model.get("ketquakiemtra")[i].vitrimau == obj.vitrimau){
					self.model.get("ketquakiemtra")[i].ketqua = obj.ketqua;
					//danh gia
				}
			}
			//console.log(self.model.toJSON());
			self.trigger("ketquachange", self.model.toJSON());
		}
	});

});