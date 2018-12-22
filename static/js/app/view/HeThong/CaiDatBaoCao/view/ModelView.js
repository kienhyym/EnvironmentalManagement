define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/HeThong/CaiDatBaoCao/tpl/model.html'),
		schema = require('json!schema/BaoCaoTuyenDonViSchema.json');

	var TuyenDonViSelectView = require('app/view/DanhMuc/TuyenDonVi/view/SelectView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "bctuyendonvi",


		uiControl: {
			filters: [{
				field: "tuyendonvi",
				uicontrol: "ref",
				textField: "ten",
				foreignRemoteField: "id",
				foreignField: "tuyendonvi_id",
				dataSource: TuyenDonViSelectView

			}, ],
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
						// self.getApp().getRouter().navigate(self.collectionName
						// + "/collection");
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
								self.getApp().notify("Save successfully");
								self.getApp().getRouter().refresh();
							},
							error: function (model, xhr, options) {
								self.getApp().notify($.parseJSON(xhr.responseText).message);

							}
						});
					}
				}
			],
		}],


		renderContentTable: function (arrayCollectionName) {
			var self = this;
			var html_content = $("#content_table");
			html_content.html("");
			var isCheckedBC1 = "";
			if (arrayCollectionName.indexOf("bckhamchuabenh") >= 0) {
				isCheckedBC1 = "checked";
			}
			html_content.append('<tr>' +
				'<td><input id="bckhamchuabenh" ' + isCheckedBC1 + ' type="checkbox"></input></td>' +
				'<td>bckhamchuabenh</td>' +
				'<td>01: Khám chữa bệnh</td>' +
				'</tr>');

			//self.applyBindings();
		},
		// renderCombobox: function () {
		// 	var self = this;
		// 	var tuyendonvi_id = this.getApp().getRouter().getParam("tuyendonvi_id");
		// 	var url = '/api/v1/tuyendonvi';
		// 	$.ajax({
		// 		url: self.getApp().serviceURL + url,
		// 		dataType: "json",
		// 		contentType: "application/json",
		// 		success: function (data) {
		// 			if (!!data && !!data.id) {
		// 				var $comboboxEl = self.$el.find("#tuyendonvi_combobox");
		// 				$comboboxEl.val(JSON.stringify({
		// 					"id": data.id,
		// 					"ten": data.ten
		// 				}));

		// 				$comboboxEl.ref({
		// 					textField: "ten",
		// 					foreignRemoteField: "id",
		// 					foreignField: "tuyendonvi_id",
		// 					value: "currentUser.donvi.tuyendonvi",
		// 					dataSource: TuyenDonViSelectView,
		// 				});
		// 				console.log($comboboxEl);

		// 				$comboboxEl.on('change.gonrin', function (e) {
		// 					var path = self.collectionName + '/model?tuyendonvi_id=' + e.value.id;
		// 					self.getApp().getRouter().navigate(path);
		// 				});

		// 			}
		// 		},
		// 		error: function (xhr, status, error) {
		// 			self.getApp().notify({
		// 				message: "Get tuyendonvi Error"
		// 			}, {
		// 				type: "danger"
		// 			});
		// 		},

		// 	});
		// },
		render: function () {
			var self = this;
			var tuyendonvi_id = this.getApp().getRouter().getParam("tuyendonvi_id");
			//self.renderCombobox();
			var url = '/api/v1/bctuyendonvi';
			// progresbar quay quay
			var filters = {
				"tuyendonvi_id": {
					"$eq": 1
				}
			};
			$.ajax({
				url: self.getApp().serviceURL + url,
				data: {
					"q": JSON.stringify({
						"filters": filters,
						"single": true
					})
				},
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
					} catch (e) {
						// error
					}
				},
			});
		}
	});

});