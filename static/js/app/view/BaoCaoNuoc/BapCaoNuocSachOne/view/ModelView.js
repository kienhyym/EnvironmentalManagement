define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/BapCaoNuocSachOne/tpl/model.html'),
		schema = require('json!schema/BapCaoNuocSachOneSchema.json');

	var maxDate = new Date();
	var KQNgoaiKiemChatLuong = require('app/view/BaoCaoNuoc/KQNgoaiKiemChatLuong/view/ModelItemView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocaonuocsachOne",
		uiControl: {
			fields: [{
					field: "thoigiankiemtra",
					textFormat: "DD/MM/YYYY",
					extraFormats: ["DDMMYYYY"],
					maxDate,
				},
				{
					field: "kqngoaikiemchatluong",
					uicontrol: "grid",
					refresh: true,
					primaryField: "id",
					fields: [{
							field: "vitrilaymau",
							label: "Vị trí lấy mẫu"
						},
						{
							field: "coliform_ten",
							label: "Coliform (CFU/100 mL)"
						},
						{
							field: "coli_ten",
							label: "E.Coli hoặc Coliform chịu nhiệt (CFU/100 mL)"
						},
						{
							field: "aresen_ten",
							label: "Arsenic (As)(*)mg/L"
						},
						{
							field: "clodu_ten",
							label: "Clo dư tự do (**) (mg/L)"
						},
						{
							field: "doduc_ten",
							label: "Độ đục( NTU)"
						},
						{
							field: "mausac_ten",
							label: "Màu sắc (TCU)"
						},
						{
							field: "muivi_ten",
							label: "Mùi,vị"
						},
						{
							field: "ph_ten",
							label: "PH"
						},
						{
							field: "tong_dat",
							label: "Đánh giá",
							template:function(rowData){
								if(rowData.ph_dat === 1){
									return "Dat";

								}else{
									return "Khong dat";
								}
							}
						},
						// {
						// 	field: "command",
						// 	label: "Thao tác",
						// 	width: "50px",
						// 	command: [{
						// 			"label": "Delete",
						// 			"action": "delete",
						// 			"class": "btn-sm",
						// 			"id": "itemRemove",
						// 		},
						// 		// {
						// 		// 	"label": "Delete",
						// 		// 	"action": function (params, args) {
						// 		// 		$("#grid").data('gonrin').deleteRow(params.el);
						// 		// 	},
						// 		// 	"class": "btn-danger btn-sm"
						// 		// },
						// 	],
						// },
					],
					tools: [{
						name: "create",
						buttonClass: "btn-success",
						label: "Thêm",
						command: function () {
							var self = this;
							var view = new KQNgoaiKiemChatLuong({
								"viewData": {
									"id": null,
									"baocao_id": self.model.get("id")
								}
							});
							view.dialog();
							view.on('close', function (data) {
								var kqngoaikiemchatluong = self.model.get('kqngoaikiemchatluong');
								kqngoaikiemchatluong.push(data);
								self.model.set("kqngoaikiemchatluong", kqngoaikiemchatluong);
								self.applyBindings();
							});
						}
					}],
					onRowClick: function (event) {
						var self = this;
						var coliform_dat = 0
						var coli_dat = 0;
						var doduc_dat = 0;
						var aresen_dat = 0;
						var clodu_dat = 0;
						var mausac_dat = 0;
						var muivi_dat = 0;
						var ph_dat = 0;
						self.model.get("kqngoaikiemchatluong").forEach(element => {
							coliform_dat = element.coliform_dat;
							coli_dat = element.coli_dat;
							doduc_dat = element.doduc_dat;
							aresen_dat = element.aresen_dat;
							clodu_dat = element.clodu_dat;
							mausac_dat = element.mausac_dat;
							muivi_dat = element.muivi_dat;
							ph_dat = element.ph_dat;
						});
						console.log(coliform_dat);
						console.log(coli_dat);
						console.log(doduc_dat);
						console.log(aresen_dat);
						console.log(clodu_dat);
						console.log(mausac_dat);
						console.log(muivi_dat);
						console.log(ph_dat);

						if (event.rowId) {
							var view = new KQNgoaiKiemChatLuong({
								"viewData": {
									"id": event.rowId,
									"baocao_id": self.model.get("id")
								}
							});
							view.dialog();
							view.on('close', function (data) {
								var str = self.model.get('kqngoaikiemchatluong');
								for (var i = 0; i < str.length; i++) {
									if (str[i].id == data.id) {
										str.splice(i, 1);
									}
								}
								str.push(data);
								self.applyBindings();
							});
						}
					}
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
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();

			}

		},
	});

});