define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinhHoGiaDinh/CapXa/tpl/model.html'),
		schema = require('json!schema/VSCapXaSchema.json');


	var tongischema = require('json!app/view/VeSinhHoGiaDinh/CapXa/view/TongiSchema.json');
	var tongitemplate = require('text!app/view/VeSinhHoGiaDinh/CapXa/tpl/tongcongi.html');
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
						var id = this.getApp().getRouter().getParam("id");
						var nambaocao = self.model.get("nambaocao");
						var tinhthanh = self.model.get("tinhthanh");
						var quanhuyen = self.model.get("quanhuyen");
						var xaphuong = self.model.get("xaphuong");
						if(nambaocao === null || nambaocao === ""){
							self.getApp().notify({message: "Chưa chọn năm báo cáo"},{type: "danger"});
							return;
						}else if(tinhthanh === null){
							self.getApp().notify({message: "Chưa chọn thông tin Tỉnh/Thành"},{type: "danger"});
							return;
						}else if(quanhuyen === null){
							self.getApp().notify({message: "Chưa chọn thông tin Quận/Huyện"},{type: "danger"});
							return;
						}else if(xaphuong === null){
							self.getApp().notify({message: "Chưa chọn thông tin Xã/Phương"},{type: "danger"});
							return;
						}
						self.model.set("tenxa",self.model.get("xaphuong").ten);
						var check_donvi = true;
						if (id !== null && id.length>0){
							if (self.getApp().currentUser !== null 
									&& self.getApp().currentUser.donvi_id !== self.model.get("donvi_id")){
								check_donvi = false;
							}
						}
						if(check_donvi === true){
							self.model.unset("danhsachbaocao");
							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().notify("Lưu thông tin thành công");
									self.getApp().getRouter().navigate(
										self.collectionName + "/collection");
								},
								error: function (xhr, status, error) {
									try {
										self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
									}
									catch (err) {
										self.getApp().notify({ message: xhr.responseText }, { type: "danger", delay: 1000 });
									}
								}
							});
						}else{
							self.getApp().notify("Tài khoản hiện tại không có quyền sửa báo cáo này,\n Chỉ có đơn vị tạo báo cáo mới được phép sửa báo cáo này")
						}
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
						self.model.unset("danhsachbaocao");
						self.model.save(null, {
							success: function (model, respose, options) {
								self.getApp().notify("Lưu thông tin thành công");
							},
							error: function (xhr, status, error) {
								try {
									self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
								}
								catch (err) {
									self.getApp().notify({ message: xhr.responseText }, { type: "danger", delay: 1000 });
								}
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
						self.$el.find("#nambaocao").attr({"disabled":true});
						self.applyBindings();
						var danhsachbaocao = data.attributes.danhsachbaocao;
	
						var total_chuholanu = 0;
						var total_sohongheo = 0;
						var total_dtts = 0;
						var total_soNam = 0;
						var total_soNu = 0;
						var total_danso = 0;
						var total_soho = 0;
						danhsachbaocao.forEach(element => {
							console.log("element======",element);
							total_chuholanu += toInt(element.tong_chuholanu);
							total_sohongheo += toInt(element.tong_sohongheo);
							total_dtts += toInt(element.tong_sohodtts);
							total_soNam += toInt(element.tong_nam);
							total_soNu += toInt(element.tong_nu);
							total_soho += toInt(element.tong_soho);
							total_danso += toInt(element.tong_danso);
							var tr = $('<tr id="danhsachdonvi">').attr({
								"id": element.id
							});
							tr.append("<td>" + element.tenthon + "</td>");
							tr.append("<td>" + element.tong_chuholanu + "</td>");
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
							self.model.set("tong_tuhoai", (toInt(self.model.get("tong_tuhoai"))+toInt(element.tong_tuhoai)));
							self.model.set("tong_thamdoi", (toInt(self.model.get("tong_thamdoi"))+toInt(element.tong_thamdoi)));
							self.model.set("tong_2ngan", (toInt(self.model.get("tong_2ngan"))+toInt(element.tong_2ngan)));
							self.model.set("tong_ongthonghoi", (toInt(self.model.get("tong_ongthonghoi"))+toInt(element.tong_ongthonghoi)));
							self.model.set("tong_loaikhac", (toInt(self.model.get("tong_loaikhac"))+toInt(element.tong_loaikhac)));
							self.model.set("tong_khongnhatieu", (toInt(self.model.get("tong_khongnhatieu"))+toInt(element.tong_khongnhatieu)));
							self.model.set("tong_hopvs", (toInt(self.model.get("tong_hopvs"))+toInt(element.tong_hopvs)));
							self.model.set("tong_khonghopvs", (toInt(self.model.get("tong_khonghopvs"))+toInt(element.tong_khonghopvs)));
							self.model.set("tong_caithien", (toInt(self.model.get("tong_caithien"))+toInt(element.tong_caithien)));
							self.model.set("tong_diemruatay", (toInt(self.model.get("tong_diemruatay"))+toInt(element.tong_diemruatay)));

							
							
							self.$el.find("#danhsachdonvi").append(tr);
							tr.unbind('click').bind('click', function () {
								var id = $(this).attr('id');
								var path = 'vscapthon/model?id=' + id;
								self.getApp().getRouter().navigate(path);
							});

						});
						self.model.set("tong_chuholanu", total_chuholanu);
						self.model.set("tong_sohongheo", total_sohongheo);
						self.model.set("tong_sohodtts", total_dtts);
						self.model.set("tong_nam", total_soNam);
						self.model.set("tong_nu", total_soNu);
						self.model.set("tong_danso", total_danso);
						self.model.set("tong_soho", total_soho);
						self.model.set("tong_sothon", danhsachbaocao.length);
						self.renderTinhTongI(danhsachbaocao);
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
		renderTinhTongI: function (danhsachbaocao) {
			var self = this;
			if (!self.tongViewi) {
				self.tongViewi = new TongViewI({
					el: self.$el.find("#tongcongi")
				});
				self.tongViewi.render();
			}

			var data = Gonrin.getDefaultModel(tongischema);
			for (var j = 0; j < danhsachbaocao.length; j++) {
				var chitiet = danhsachbaocao[j];
				_.each(tongischema, function (props, key) {
					data[key] = toInt(data[key]) + toInt(danhsachbaocao[j][key]);

				});
			}
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
		},

	});

});