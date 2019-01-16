define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/itemThongSoKhongDat.html'),
		schema = require('json!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/ThongSoKhongDatSchema.json');
	
	return Gonrin.ItemView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		collectionName: "danhsachthongsokhongdat",
		bindings: "dskhongdat-bind",
		uiControl: {
			fields: [
				{
	                field: "ngaylaymau",
	                textFormat: "DD/MM/YYYY",
	                extraFormats: ["DDMMYYYY"],
	            },
			]
		},

		render: function () {
			var self = this;
			
//			self.$el.find("#xoa_thongso_khongdat").unbind("click").bind("click", function () {
//				self.remove(true);
//			});
//			
			self.model.on("change", function () {
				self.trigger("change", {
					"thongsoKhongDat": self.model.toJSON()
				});
			});
			self.applyBindings();
		},
	});

});