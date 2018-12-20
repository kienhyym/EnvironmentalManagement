define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/CapThon/tpl/model.html'),
		schema = require('json!schema/CapThonSchema.json');


	var NhaTieuThonHVSItemView = require('app/view/PhuLuc/NhaTieuThonHVS/view/ModelItemView');
	var tongischema = require('json!app/view/PhuLuc/CapThon/view/TongiSchema.json');
	var tongitemplate = require('text!app/view/PhuLuc/CapThon/tpl/tongcongi.html');
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
		collectionName: "capthon",

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
					field: "nhatieuthonhvs",
					uicontrol: false,
					itemView: NhaTieuThonHVSItemView,
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
						
						console.log("nhatieuthonhvs ", self.model.get("nhatieuthonhvs").length);
						if (self.model.get("nhatieuthonhvs").length === 0) {
							self.$el.find("#addItem button").click();
						}
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				
				//self.$el.find("#itemRemove").attr('disabled', 'disabled');
				//self.model.set("nhatieuthonhvs", []);
				self.renderTinhTongI();
				self.registerTinhTong();
				
				self.$el.find("#addItem button").click();

			}

		},

		registerTinhTong: function () {
			var self = this;
			self.model.on("change:nhatieuthonhvs", function () {
				console.log("nhatieuthonhvs ", self.model.get('nhatieuthonhvs'));
				self.renderTinhTongI();
				
			});


		},
		renderTinhTongI: function () {
			var self = this;
			if (!self.tongViewi) {
				console.log("init tong view======================");
				self.tongViewi = new TongViewI({
					el: self.$el.find("#tongcongi")
				});
				self.tongViewi.render();
			}

			var data = Gonrin.getDefaultModel(tongischema);
			console.log(self.model.get('nhatieuthonhvs'));
			for (var j = 0; j < self.model.get('nhatieuthonhvs').length; j++) {
				var chitiet = self.model.get('nhatieuthonhvs')[j];
				_.each(tongischema, function (props, key) {
					//console.log("j",typeof data[key], data[key]);
					//console.log(typeof self.model.get('nhatieuthonhvs')[j][key] , self.model.get('nhatieuthonhvs')[j][key]);
					//var nhatieuthonhvs = parseInt();
					data[key] = toInt(data[key]) + toInt(self.model.get('nhatieuthonhvs')[j][key]);

					//data[key] = !data[key] ? self.model.get('nhatieuthonhvs')[j][key] : self.model.get('nhatieuthonhvs')[j][key] + data[key];

				});
			}

			console.log("data : ", data);
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
			var sohongheo = self.tongViewi.model.get("hongheo");
			self.model.set("sohongheo", sohongheo);
				// var sohodtts = self.tongViewi.model.get("danso");
				// self.model.set("sohodtts", sohodtts);



				var giotinhnu = 0;
				var giotinhnam = 0;
			    var nu = self.tongViewi.model.get("gioitinh");
				// if (nu == 0) {
				// 	giotinhnu++;
				// 	self.model.set("sonu", giotinhnu);
				// 	console.log("Nu : ", giotinhnu);
				// } else if (nu == 1) {
				// 	giotinhnam++;
				// 	self.model.set("sonam", giotinhnam);
				// 	console.log("Nam : ", giotinhnam);
				// }
				
		},
		renderCongDon: function (data) {
			console.log(data);
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			var $nhatieuthonhvs = this.$el.find('#nhatieuthonhvs');
			$nhatieuthonhvs.empty();
			self.model.set("nhatieuthonhvs", []);
			for (var i = 0; i < data.nhatieuthonhvs.length; i++) {
				if (id) {
					data.nhatieuthonhvs[i]["capthon_id"] = id;
				} else {
					data.nhatieuthonhvs[i]["capthon_id"] = null;
				}
				data.nhatieuthonhvs[i]["stt"] = i + 1;
				data.nhatieuthonhvs[i]["id"] = null;
				self.model.get("nhatieuthonhvs").push(data.nhatieuthonhvs[i])
			}
			var $nhatieuthonhvs = this.$el.find('#nhatieuthonhvs');
			$nhatieuthonhvs.empty();
			self.model.set("nhatieuthonhvs", []);


			self.applyBindings();
			self.renderTinhTongI();

		}

	});

});