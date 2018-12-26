define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinhHoGiaDinh/CapXa/tpl/model.html'),
		schema = require('json!schema/VSCapXaSchema.json');


	//	var capthonItemView = require('app/view/PhuLuc/capthon/view/ModelItemView');
	var tongischema = require('json!app/view/VeSinhHoGiaDinh/CapXa/view/TongiSchema.json');
	var tongitemplate = require('text!app/view/VeSinhHoGiaDinh/CapXa/tpl/tongcongi.html');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');

	var CapThonModelView = require('app/view/VeSinhHoGiaDinh/CapThon/view/ModelView');



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
		collectionName: "vscapxa",

		uiControl: {
			fields: [
				{
					field: "xaphuong",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "xaphuong_id",
					dataSource: XaPhuongSelectView
				},
				{
					field: "quanhuyen",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "quanhuyen_id",
					dataSource: QuanHuyenSelectView
				},
				{
					field: "tinhthanh",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tinhthanh_id",
					dataSource: TinhThanhSelectView
				},
				
				{
					field: "thuocsuprsws",
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
					value:1
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
					name: "count",
					type: "button",
					buttonClass: "btn-primary btn-sm",
					label: "Cộng dồn",
					visible: function () {
						return this.getApp().getRouter().getParam("id") !== null;
					},
					command: function () {
						var self = this;
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
						console.log("dataxa====",data);
						var danhsachbaocao = data.attributes.danhsachbaocao;
						
	
						var total_hoconualachu = 0;
						var total_sohongheo = 0;
						var total_dtts = 0;
						var total_soNam = 0;
						var total_soNu = 0;
						var total_sodan = 0;
						var total_hotrongthon = 0;
						danhsachbaocao.forEach(element => {
							console.log("element======",element);
							total_hoconualachu += toInt(element.tong_chuholanu);
							total_sohongheo += toInt(element.tong_sohongheo);
							total_dtts += toInt(element.tong_sohodtts);
							total_soNam += toInt(element.tong_nam);
							total_soNu += toInt(element.tong_nu);
							total_hotrongthon += toInt(element.tong_soho);
							total_sodan += toInt(element.total_sodan);
							var tr = $('<tr id="danhsachdonvi">').attr({
								"id": element.id
							});
							tr.append("<td>" + element.tenthon + "</td>");
							tr.append("<td id='c'>" + element.tong_chuholanu + "</td>");
							tr.append("<td>" + element.tong_sohodtts + "</td>");
							tr.append("<td>" + element.tong_sohongheo + "</td>");
							tr.append("<td>" + element.tong_tuhoai + "</td>");
							tr.append("<td>" + element.tong_thamdoi + "</td>");
							tr.append("<td>" + element.tong_2ngan + "</td>");
							tr.append("<td>" + element.tong_ongthonghoi + "</td>");
							tr.append("<td>" + toInt(element.tong_loaikhac) + "</td>");
							tr.append("<td>" + element.tong_khongnhatieu + "</td>");
							tr.append("<td>" + element.tong_hopvs + "</td>");
							tr.append("<td>" + element.tong_khonghopvs + "</td>");
							tr.append("<td>" + element.tong_caithien + "</td>");
							tr.append("<td>" + element.tong_diemruatay + "</td>");
							self.$el.find("#danhsachdonvi").append(tr);
							tr.unbind('click').bind('click', function () {
								var id = $(this).attr('id');
								var path = 'vscapthon/model?id=' + id;
								self.getApp().getRouter().navigate(path);
							});

						});
						self.model.set("tong_chuholanu", total_hoconualachu);
						self.model.set("tong_sohongheo", total_sohongheo);
						self.model.set("tong_sohodtts", total_dtts);
						self.model.set("tong_nam", total_soNam);
						self.model.set("tong_nu", total_soNu);
						self.model.set("tong_dantrongxa", total_sodan);
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