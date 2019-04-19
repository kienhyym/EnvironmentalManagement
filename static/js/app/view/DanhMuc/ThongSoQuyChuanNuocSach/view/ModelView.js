define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/ThongSoQuyChuanNuocSach/tpl/model.html'),
		schema = require('json!schema/ThongSoQuyChuanNuocSachSchema.json');

	var DanhSachThongSo_MacDinh = require('json!app/enum/danhsach_thongso_macdinh.json');
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "thongsoquychuannuocsach",
		tools: [
			{
				name: "defaultgr",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
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
						label: "Lưu Cài Đặt",
						command: function () {
							var self = this;
							console.log("log====", self.model.toJSON());
							// var selectedCollectionNames = "";
							// $('#content_table input:checked').each(function () {
							// 	selectedCollectionNames += $(this).attr('id') + ",";
							// });
							//TODO: set collectionsNam to model
							// self.model.set("collectionNames", selectedCollectionNames);
							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().notify("Lưu cài đặt thành công");
									self.getApp().getRouter().refresh();
								},
								error: function (xhr, status, error) {
									try {
										if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
											self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
											self.getApp().getRouter().navigate("login");
										} else {
											self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
										}
									}
									catch (err) {
										self.getApp().notify({ message: "Lưu cài đặt không thành công" }, { type: "danger", delay: 1000 });
									}
								}
							});
						}
					}],
			}],
		uiControl: [],
		renderThongSoTable: function (arrayCollectionName) {
			var self = this;
			var html_content = $("#content_table");
			html_content.html("");
			for (var i = 0; i < DanhSachThongSo_MacDinh.length; i++) {
				var item_thongso = DanhSachThongSo_MacDinh[i];
				var isChecked = "";
				// if (arrayCollectionName.indexOf(dm.collection) >= 0) {
				// 	isChecked = "checked";
				// }
				html_content.append('<tr>' +
					'<td>' + item_thongso.stt + '</td>' +
					'<td>' + item_thongso.tenthongso + '</td>' +
					'<td class="nuocmat" style="text-align: center;"><input id="' + item_thongso.stt + '" ' + isChecked + ' type="checkbox"></input></td>' +
					'<td class="nuocngam" style="text-align: center;"><input id="' + item_thongso.stt + '" ' + isChecked + ' type="checkbox"></input></td>' +
					'<td class="nuocmat_nuocngam" style="text-align: center;"><input id="' + item_thongso.stt + '" ' + isChecked + ' type="checkbox"></input></td>' +
					'</tr>');
			}
		},
		renderSettingPrevious: function () {
			var self = this;
			var url = 'api/v1/setting_thongsoquychuannuocsach';
			$.ajax({
				url: self.getApp().serviceURL + url,
				data: { "q": JSON.stringify({ "filters": filters, "single": true }) },
				dataType: "json",
				contentType: "application/json",
				success: function (data) {
					console.log("data===", data);
					// if (!!data && !!data.id) {
					// 	self.model.set("id", data.id);
					// 	var arrayCollectionName = data.collectionNames.split(',');
					// 	self.renderContentTable(arrayCollectionName);
					// }
				},
				error: function (xhr, status, error) {
					try {
						var arrayCollectionName = "";
						self.renderContentTable(arrayCollectionName);
						if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED") {
							self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
							self.getApp().getRouter().navigate("login");
						} else {
							self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
						}
					} catch (e) {
						self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
					}
				},
			});
		},
		render: function () {
			var self = this;
			// var html_content = $("#content_table");
			// html_content.html("");
			// for (var i = 0; i < DanhSachThongSo_MacDinh.length; i++) {
			// 	var item_thongso = DanhSachThongSo_MacDinh[i];
			// 	var isChecked = "";
			// 	// if (arrayCollectionName.indexOf(dm.collection) >= 0) {
			// 	// 	isChecked = "checked";
			// 	// }
			// 	html_content.append('<tr>' +
			// 		'<td>' + item_thongso.stt + '</td>' +
			// 		'<td>' + item_thongso.tenthongso + '</td>' +
			// 		'<td class="nuocmat" style="text-align: center;"><input id="' + item_thongso.stt + '" ' + isChecked + ' type="checkbox"></input></td>' +
			// 		'<td class="nuocngam" style="text-align: center;"><input id="' + item_thongso.stt + '" ' + isChecked + ' type="checkbox"></input></td>' +
			// 		'<td class="nuocmat_nuocngam" style="text-align: center;"><input id="' + item_thongso.stt + '" ' + isChecked + ' type="checkbox"></input></td>' +
			// 		'</tr>');
			// }
			var url = 'api/v1/setting_thongsoquychuannuocsach';
			console.log("api", url);
			$.ajax({
				url: self.getApp().serviceURL + url,
				dataType: "json",
				contentType: "application/json",
				success: function (data) {
					console.log("data====", data);
					// if (!!data && !!data.id) {
					// 	// self.model.set("id", data.id);
					// 	var arrayCollectionName = data.collectionNames.split(',');
					// 	self.renderThongSoTable(arrayCollectionName);
					// }
				},
				// error: function (xhr, status, error) {
				// 	try {
				// 		var arrayCollectionName = "";
				// 		self.renderContentTable(arrayCollectionName);
				// 		if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED") {
				// 			self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
				// 			self.getApp().getRouter().navigate("login");
				// 		} else {
				// 			self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
				// 		}
				// 	} catch (e) {
				// 		self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
				// 	}
				// },
			});
		},
	});

});