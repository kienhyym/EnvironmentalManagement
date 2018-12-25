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
					field: "kybaocao",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": "1",
							"text": "6 tháng đầu năm"
						},
						{
							"value": "2",
							"text": "6 tháng cuối năm"
						},
					],
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
					field: "suprsws",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Có"
						},
						{
							"value": 0,
							"text": "Không"
						},
					],
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
								var msgJson = $.parseJSON(xhr.responseText);
								if (msgJson) {
									self.getApp().notify({
										message: msgJson.error_message
									}, {
										type: "danger"
									});
								}
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
				"tentinh_id": self.model.get("tentinh_id"),
				"tentinh": self.model.get("tentinh"),
				"tenhuyen_id": self.model.get("tenhuyen_id"),
				"tenhuyen": self.model.get("tenhuyen"),
				"tenxa_id": self.model.get("tenxa_id"),
				"tenxa": self.model.get("tenxa"),
				"capxa_id": self.model.get("id"),
				"danhgianam": self.model.get("danhgianam")
			}
			var viewCapThon = new CapThonModelView({
				el: self.getApp().$content,
				viewData: viewData
			});
			viewCapThon.render();
		},

		render: function () {
			var self = this;
			self.$el.find('#addThon').unbind("click").bind('click', function () {
				self.addcapthon();
			});		
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();

						var dataSourceCapThon = data.attributes.capthon;
						self.model.set("sothon", dataSourceCapThon.length);
						
	
						var total_hoconualachu = 0;
						var total_sohongheo = 0;
						var total_dtts = 0;
						var total_soNam = 0;
						var total_soNu = 0;
						var total_hotrongthon = 0;
						dataSourceCapThon.forEach(element => {
							console.log("element======",element);
							total_hoconualachu += toInt(element.chuholanu);
							total_sohongheo += toInt(element.sohongheo);
							total_dtts += toInt(element.sohodtts);
							total_soNam += toInt(element.sonam);
							total_soNu += toInt(element.sonu);
							total_hotrongthon += toInt(element.hotrongthon);
							var tr = $('<tr id="idThon">').attr({
								"id": element.id
							});
							tr.append("<td>" + element.tenthon + "</td>");
							tr.append("<td id='c'>" + element.chuholanu + "</td>");
							tr.append("<td>" + element.sohodtts + "</td>");
							tr.append("<td>" + element.sohongheo + "</td>");
							tr.append("<td>" + element.tong_tuhoai + "</td>");
							tr.append("<td>" + element.tong_thamdoi + "</td>");
							tr.append("<td>" + element.tong_2ngan + "</td>");
							tr.append("<td>" + element.tong_ongthonghoi + "</td>");
							tr.append("<td>" + toInt(element.tong_loaikhac) + "</td>");
							tr.append("<td>" + element.tong_khongnhatieu + "</td>");
							tr.append("<td>" + element.tong_hopvs + "</td>");
							tr.append("<td>" + element.tong_khonghopvs + "</td>");
							tr.append("<td>" + element.tong_dccaithien + "</td>");
							tr.append("<td>" + element.tong_diemruatay + "</td>");
							self.$el.find("#itemThon").append(tr);
							tr.unbind('click').bind('click', function () {
								var id = $(this).attr('id');
								var path = 'capthon/model?id=' + id;
								self.getApp().getRouter().navigate(path);
							});

						});
						self.model.set("chuholanu", total_hoconualachu);
						self.model.set("sohongheo", total_sohongheo);
						self.model.set("sohodtts", total_dtts);
						self.model.set("sonam", total_soNam);
						self.model.set("sonu", total_soNu);
						var total_sodan = total_soNam + total_soNu;
						self.model.set("dantrongxa", total_sodan);
						self.model.set("hotrongxa", total_hotrongthon);

						self.renderTinhTongI(dataSourceCapThon);
						self.model.trigger("change");
					},
					error: function () {
						self.getApp().notify("Lỗi không lấy được dữ liệu");
					},
				});
			} else {
				self.applyBindings();
			}

		},
		renderTinhTongI: function (dataSourceCapThon) {
			var self = this;
			if (!self.tongViewi) {
				self.tongViewi = new TongViewI({
					el: self.$el.find("#tongcongi")
				});
				self.tongViewi.render();
			}

			var data = Gonrin.getDefaultModel(tongischema);
			for (var j = 0; j < dataSourceCapThon.length; j++) {
				var chitiet = dataSourceCapThon[j];
				_.each(tongischema, function (props, key) {
					data[key] = toInt(data[key]) + toInt(dataSourceCapThon[j][key]);

				});
			}
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
			self.changeTable();
		},

		changeTable: function () {
			var self = this;

		},

	});

});