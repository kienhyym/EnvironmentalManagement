define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/CapXa/tpl/model.html'),
		schema = require('json!schema/CapXaSchema.json');


//	var capthonItemView = require('app/view/PhuLuc/capthon/view/ModelItemView');
	var tongischema = require('json!app/view/PhuLuc/CapXa/view/TongiSchema.json');
	var tongitemplate = require('text!app/view/PhuLuc/CapXa/tpl/tongcongi.html');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');

	var CapThonModelView = require('app/view/PhuLuc/CapThon/view/ModelView');



	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	var TongViewI = Gonrin.ModelView.extend({
		template: tongitemplate,
		modelSchema: tongischema,
		bindings: 'tongi-bind',
		urlPrefix: "/api/v1/",
		collectionName: "tong",
		uiControl: [],
		render: function () {
			this.applyBindings();
		}
	});
	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,

		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "capxa",

		uiControl: {
			fields: [{
					field: "danhgianam",
					textFormat: "YYYY",
					extraFormats: ["YYYY"],
					maxDate: currentDate,
				},
				{
					field: "tenxa",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tenxa_id",
					dataSource: XaPhuongSelectView
				},
//				{
//					field: "tenthon",
//					uicontrol: "ref",
//					textField: "ten",
//					foreignRemoteField: "id",
//					foreignField: "tenthon_id",
//					dataSource: ThonXomSelectView
//				},
				{
					field: "tentinh",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tentinh_id",
					dataSource: TinhThanhSelectView
				},
				{
					field: "tenhuyen",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tenhuyen_id",
					dataSource: QuanHuyenSelectView
				},
//				{
//					field: "capthon",
//					uicontrol: false,
//					itemView: capthonItemView,
//					tools: [{
//						name: "create",
//						type: "button",
//						buttonClass: "btn btn-success btn-sm",
//						label: "<span class='fa fa-plus'>Thêm</span>",
//						command: "create"
//					}, ],
//					toolEl: "#addItem"
//				},
				{
    				field: "suprsws",
    				uicontrol: "combobox",
    				textField: "text",
    				valueField: "value",
    				dataSource: [
    					{ "value": 1, "text": "Có" },
    					{ "value": 0, "text": "Không" },
					],
    			},
    			{
					field: "capthon",
					uicontrol: "grid",
					refresh: true,
					primaryField: "id",
					fields: [
						{
							field: "tenthon",
							label: "Tên Thôn"
						},
						{
							label: "Tổng số hộ là Nữ",
							field: "chuholanu"
						},
						{
							field: "sohodtts",
							label: "Số hộ DTTS"
						},
						{
							field: "sohongheo",
							label: "Tổng số hộ nghèo"
						},

					],
					tools: [{
						name: "create",
						buttonClass: "btn-success",
						label: "Thêm Thôn",
						command: function () {
							this.addcapthon();
						}
					}],
					onRowClick: function (event) {
						if (event.rowId) {
							var path = 'capthon/model?id=' + event.rowId;
							this.getApp().getRouter().navigate(path);
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
								self.getApp().getRouter().navigate(
									self.collectionName + "/collection");

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
		addcapthon: function () {
			var self = this;
			var viewData = {
					"tentinh_id":self.model.get("tentinh_id"),
					"tentinh":self.model.get("tentinh"),
					"tenhuyen_id":self.model.get("tenhuyen_id"),
					"tenhuyen":self.model.get("tenhuyen"),
					"tenxa_id":self.model.get("tenxa_id"),
					"tenxa":self.model.get("tenxa"),
					"capxa_id":self.model.get("id"),
					"danhgianam":self.model.get("danhgianam")
			}
			var viewCapThon = new CapThonModelView({el: self.getApp().$content, viewData:viewData});
			viewCapThon.render();
		},
		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {

						self.applyBindings();
						self.renderTinhTongI();
						self.registerTinhTong();
						
						//console.log("capthon ", self.model.get("capthon").length);
//						if (self.model.get("capthon").length === 0) {
//							self.$el.find("#addItem button").click();
//						}
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				self.model.set("capthon", []);
				self.renderTinhTongI();
				self.registerTinhTong();			
				self.$el.find("#addItem button").click();

			}

		},

		registerTinhTong: function () {
			var self = this;
//			self.model.on("change:capthon", function () {
//				//console.log("capthon ", self.model.get('capthon'));
//				self.renderTinhTongI();
//				
//			});


		},
		renderTinhTongI: function () {
			var self = this;
			if (!self.tongViewi) {
				self.tongViewi = new TongViewI({
					el: self.$el.find("#tongcongi")
				});
				self.tongViewi.render();
			}

			var data = Gonrin.getDefaultModel(tongischema);
			console.log(self.model.get('capthon'));
			for (var j = 0; j < self.model.get('capthon').length; j++) {
				var chitiet = self.model.get('capthon')[j];
				_.each(tongischema, function (props, key) {
					data[key] = toInt(data[key]) + toInt(self.model.get('capthon')[j][key]);

					//data[key] = !data[key] ? self.model.get('capthon')[j][key] : self.model.get('capthon')[j][key] + data[key];

				});
			}

			//console.log("data : ", data);
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
			var sohongheo = self.tongViewi.model.get("hongheo");
			self.model.set("sohongheo", sohongheo);

				var soNu = self.tongViewi.model.get("gioitinh");	
				var tongSoDan = self.model.get("capthon").length;
				var result = tongSoDan - soNu;
				self.model.set("chuholanu", result);

				
		},

	});

});