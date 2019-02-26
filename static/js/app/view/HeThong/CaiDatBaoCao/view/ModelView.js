define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/HeThong/CaiDatBaoCao/tpl/model.html'),
		schema = require('json!schema/BaoCaoTuyenDonViSchema.json');

	var TuyenDonViSelectView = require('app/view/DanhMuc/TuyenDonVi/view/SelectView');
	var DanhMucCollectionName = require('json!app/view/HeThong/CaiDatBaoCao/danhmucbaocao.json');
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "bctuyendonvi",
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
							var selectedCollectionNames = "";
							$('#content_table input:checked').each(function () {
								selectedCollectionNames += $(this).attr('id') + ",";
							});
							//TODO: set collectionsNam to model
							self.model.set("collectionNames", selectedCollectionNames);

							var tuyendonvi_id = this.getApp().getRouter().getParam("tuyendonvi_id");
							self.model.set("tuyendonvi_id", tuyendonvi_id);

							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().notify("Lưu cài đặt thành công");
									self.getApp().getRouter().refresh();
								},
								error: function (xhr, status, error) {
									try {
										if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
											self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
											self.getApp().getRouter().navigate("login");
										} else {
											self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
										}
									}
									catch (err) {
										self.getApp().notify({ message: "Lưu cài đặt không thành công"}, { type: "danger", delay: 1000 });
									}
								}
							});
						}
					}],
			}],
		uiControl: [],
		renderContentTable: function (arrayCollectionName) {
			var self = this;
			var html_content = $("#content_table");
			html_content.html("");
			for (var i = 0; i < DanhMucCollectionName.length; i++) {
				var dm = DanhMucCollectionName[i];
				var isChecked = "";
				if (arrayCollectionName.indexOf(dm.collection) >= 0) {
					isChecked = "checked";
				}
				html_content.append('<tr>' +
					'<td><input id="' + dm.collection + '" ' + isChecked + ' type="checkbox"></input></td>' +
					'<td>' + dm.collection + '</td>' +
					'<td>' + dm.text + '</td>' +
					'</tr>');
			}
			//self.applyBindings();
		},
		renderCombobox: function () {
			var self = this;
			var tuyendonvi_id = this.getApp().getRouter().getParam("tuyendonvi_id");
			var url = '/api/v1/tuyendonvi/' + tuyendonvi_id;
			$.ajax({
				url: self.getApp().serviceURL + url,
				//data: {"q": JSON.stringify({"filters": filters,"single":true})},
				dataType: "json",
				contentType: "application/json",
				success: function (data) {
					if (!!data && !!data.id) {
						var $comboboxEl = self.$el.find("#tuyendonvi_combobox");
						$comboboxEl.val(JSON.stringify({ "id": data.id, "ten": data.ten }));

						$comboboxEl.ref({
							textField: "ten",
							foreignRemoteField: "id",
							foreignField: "tuyendonvi_id",
							dataSource: TuyenDonViSelectView,
						});

						$comboboxEl.on('change.gonrin', function (e) {
							var path = self.collectionName + '/model?tuyendonvi_id=' + e.value.id;
							self.getApp().getRouter().navigate(path);
						});

					}
				},
				error: function (xhr, status, error) {
					try {
						if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
							self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
							self.getApp().getRouter().navigate("login");
						} else {
							self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
						}
					}
					catch (err) {
						self.getApp().notify({ message: "Lỗi tải tuyến đơn vị"}, { type: "danger", delay: 1000 });
					}
				}

			});
		},
		render: function () {
			// console.log("render cai dat bao cao");
			var self = this;
			var tuyendonvi_id = this.getApp().getRouter().getParam("tuyendonvi_id");

			//    		var tuyendonvi_id = self.getApp().currentUser.donvi.tuyendonvi_id;
			self.renderCombobox();
			var url = '/api/v1/bctuyendonvi';
			var filters = { "tuyendonvi_id": { "$eq": tuyendonvi_id } };
			$.ajax({
				url: self.getApp().serviceURL + url,
				data: { "q": JSON.stringify({ "filters": filters, "single": true }) },
				dataType: "json",
				contentType: "application/json",
				success: function (data) {
					if (!!data && !!data.id) {
						self.model.set("id", data.id);
						var arrayCollectionName = data.collectionNames.split(',');
						self.renderContentTable(arrayCollectionName);
					}
				},
				error: function (xhr, status, error) {
					try {
						var arrayCollectionName = "";
						self.renderContentTable(arrayCollectionName);
						if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
							self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
							self.getApp().getRouter().navigate("login");
						} else {
							self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
						}
					} catch (e) {
						self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
					}
				},
			});
		}
	});

});