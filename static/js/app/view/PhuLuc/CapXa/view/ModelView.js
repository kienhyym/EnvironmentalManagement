define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/CapXa/tpl/model.html'),
		schema = require('json!schema/CapXaSchema.json');


	var nhatieuxahvsItemView = require('app/view/PhuLuc/NhaTieuXaHVS/view/ModelItemView');
	var tongischema = require('json!app/view/PhuLuc/CapXa/view/TongiSchema.json');
	var tongitemplate = require('text!app/view/PhuLuc/CapXa/tpl/tongcongi.html');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');



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
				{
					field: "tenthon",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tenthon_id",
					dataSource: ThonXomSelectView
				},
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
				{
					field: "nhatieuxahvs",
					uicontrol: false,
					itemView: nhatieuxahvsItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-success btn-sm",
						label: "<span class='fa fa-plus'>Thêm</span>",
						command: "create"
					}, ],
					toolEl: "#addItem"
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
						
						//console.log("nhatieuxahvs ", self.model.get("nhatieuxahvs").length);
						if (self.model.get("nhatieuxahvs").length === 0) {
							self.$el.find("#addItem button").click();
						}
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				self.model.set("nhatieuxahvs", []);
				self.renderTinhTongI();
				self.registerTinhTong();			
				self.$el.find("#addItem button").click();

			}

		},

		registerTinhTong: function () {
			var self = this;
			self.model.on("change:nhatieuxahvs", function () {
				//console.log("nhatieuxahvs ", self.model.get('nhatieuxahvs'));
				self.renderTinhTongI();
				
			});


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
			console.log(self.model.get('nhatieuxahvs'));
			for (var j = 0; j < self.model.get('nhatieuxahvs').length; j++) {
				var chitiet = self.model.get('nhatieuxahvs')[j];
				_.each(tongischema, function (props, key) {
					data[key] = toInt(data[key]) + toInt(self.model.get('nhatieuxahvs')[j][key]);

					//data[key] = !data[key] ? self.model.get('nhatieuxahvs')[j][key] : self.model.get('nhatieuxahvs')[j][key] + data[key];

				});
			}

			//console.log("data : ", data);
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
			var sohongheo = self.tongViewi.model.get("hongheo");
			self.model.set("sohongheo", sohongheo);

				var soNu = self.tongViewi.model.get("gioitinh");	
				var tongSoDan = self.model.get("nhatieuxahvs").length;
				var result = tongSoDan - soNu;
				self.model.set("chuholanu", result);

				// self.model.on("click:addItem", function () {
				// 	alert("ac");
				// });
				// console.log("abc : ", stt);
				// self.tongViewi.model.set("stt",stt);
				
		},
		// renderCongDon: function (data) {
		// 	console.log(data);
		// 	var self = this;
		// 	var id = this.getApp().getRouter().getParam("id");
		// 	var $nhatieuxahvs = this.$el.find('#nhatieuxahvs');
		// 	$nhatieuxahvs.empty();
		// 	self.model.set("nhatieuxahvs", []);
		// 	for (var i = 0; i < data.nhatieuxahvs.length; i++) {
		// 		if (id) {
		// 			data.nhatieuxahvs[i]["capxa_id"] = id;
		// 		} else {
		// 			data.nhatieuxahvs[i]["capxa_id"] = null;
		// 		}
		// 		data.nhatieuxahvs[i]["stt"] = i + 1;
		// 		data.nhatieuxahvs[i]["id"] = null;
		// 		self.model.get("nhatieuxahvs").push(data.nhatieuxahvs[i])
		// 	}
		// 	var $nhatieuxahvs = this.$el.find('#nhatieuxahvs');
		// 	$nhatieuxahvs.empty();
		// 	self.model.set("nhatieuxahvs", []);
		// 	self.applyBindings();
		// 	self.renderTinhTongI();

		// }

	});

});