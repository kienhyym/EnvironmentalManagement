define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/CapHuyen/tpl/model.html'),
		schema = require('json!schema/CapHuyenSchema.json');


	var nhatieuhuyenhvsItemView = require('app/view/PhuLuc/NhaTieuHuyenHVS/view/ModelItemView');
	var tongischema = require('json!app/view/PhuLuc/CapHuyen/view/TongiSchema.json');
	var tongitemplate = require('text!app/view/PhuLuc/CapHuyen/tpl/tongcongi.html');
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
		collectionName: "caphuyen",

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
					field: "nhatieuhuyenhvs",
					uicontrol: false,
					itemView: nhatieuhuyenhvsItemView,
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
						
						//console.log("nhatieuhuyenhvs ", self.model.get("nhatieuhuyenhvs").length);
						if (self.model.get("nhatieuhuyenhvs").length === 0) {
							self.$el.find("#addItem button").click();
						}
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				self.model.set("nhatieuhuyenhvs", []);
				self.renderTinhTongI();
				self.registerTinhTong();			
				self.$el.find("#addItem button").click();

			}

		},

		registerTinhTong: function () {
			var self = this;
			self.model.on("change:nhatieuhuyenhvs", function () {
				//console.log("nhatieuhuyenhvs ", self.model.get('nhatieuhuyenhvs'));
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
			console.log(self.model.get('nhatieuhuyenhvs'));
			for (var j = 0; j < self.model.get('nhatieuhuyenhvs').length; j++) {
				var chitiet = self.model.get('nhatieuhuyenhvs')[j];
				_.each(tongischema, function (props, key) {
					data[key] = toInt(data[key]) + toInt(self.model.get('nhatieuhuyenhvs')[j][key]);

					//data[key] = !data[key] ? self.model.get('nhatieuhuyenhvs')[j][key] : self.model.get('nhatieuhuyenhvs')[j][key] + data[key];

				});
			}

			//console.log("data : ", data);
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
			var sohongheo = self.tongViewi.model.get("hongheo");
			self.model.set("sohongheo", sohongheo);

				var soNu = self.tongViewi.model.get("gioitinh");	
				var tongSoDan = self.model.get("nhatieuhuyenhvs").length;
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
		// 	var $nhatieuhuyenhvs = this.$el.find('#nhatieuhuyenhvs');
		// 	$nhatieuhuyenhvs.empty();
		// 	self.model.set("nhatieuhuyenhvs", []);
		// 	for (var i = 0; i < data.nhatieuhuyenhvs.length; i++) {
		// 		if (id) {
		// 			data.nhatieuhuyenhvs[i]["capxa_id"] = id;
		// 		} else {
		// 			data.nhatieuhuyenhvs[i]["capxa_id"] = null;
		// 		}
		// 		data.nhatieuhuyenhvs[i]["stt"] = i + 1;
		// 		data.nhatieuhuyenhvs[i]["id"] = null;
		// 		self.model.get("nhatieuhuyenhvs").push(data.nhatieuhuyenhvs[i])
		// 	}
		// 	var $nhatieuhuyenhvs = this.$el.find('#nhatieuhuyenhvs');
		// 	$nhatieuhuyenhvs.empty();
		// 	self.model.set("nhatieuhuyenhvs", []);
		// 	self.applyBindings();
		// 	self.renderTinhTongI();

		// }

	});

});