define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!../tpl/model.html'),
		schema = require('json!schema/TienDoKeHoachBCCSchema.json');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var DMHoatDongSelectView = require('app/view/DanhMuc/DanhMucHoatDong/view/SelectView');
	var HoatDongItemView = require('app/view/PhuLuc/LapKHXa/view/HoatDongItemView');

	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tiendo_kehoach_bcc",
		uiControl: {
			fields: [
				{
					field: "tinhthanh",
					uicontrol: "ref",
					textField: "ten",
					//chuyen sang thanh object
					foreignRemoteField: "id",
					foreignField: "tinhthanh_id",
					dataSource: TinhThanhSelectView
				},
				{
					field: "xaphuong",
					uicontrol: "ref",
					textField: "ten",
					//chuyen sang thanh object
					foreignRemoteField: "id",
					foreignField: "xaphuong_id",
					dataSource: XaPhuongSelectView
				},
				{
					field: "quanhuyen",
					uicontrol: "ref",
					textField: "ten",
					//chuyen sang thanh object
					foreignRemoteField: "id",
					foreignField: "quanhuyen_id",
					dataSource: QuanHuyenSelectView
				},
				{
					field: "thonxom",
					uicontrol: "ref",
					textField: "ten",
					//chuyen sang thanh object
					foreignRemoteField: "id",
					foreignField: "thonxom_id",
					dataSource: ThonXomSelectView
				},
//				{
//					field: "nganh",
//					uicontrol: "combobox",
//					textField: "text",
//					valueField: "value",
//					dataSource: [{
//							"value": 1,
//							"text": "NGÀNH Y TẾ"
//						},
//						{
//							"value": 0,
//							"text": "NGÀNH GIÁO DỤC"
//						},
//					],
//				},
				{
					field: "tiendo_xaydung",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "Đã hooàn thành dự thảo", value: 2},
						{text: "Đang xây dựng", value: 1},
						{text: "Chưa xây dựng", value: 0}
					]
				},
				{
					field: "tiendo_rasoat",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "VIHEMA đã chấp thuận", value: 2},
						{text: "Đang rà soát", value: 1},
						{text: "Chưa chấp thuận", value: 0}
					]
				},
				{
					field: "tiendo_pheduyet",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "Đã phê duyệt", value: 1},
						{text: "Chưa phê duyệt", value: 0}
					]
				},
				{
					field: "ngay_pheduyet",
					uicontrol: "datetimepicker",
					textFormat: "DD/MM/YYYY"
				}
			]
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
								self.getApp().getRouter().navigate("hoatdongbcc/capthon/collection");

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
			self.process_loaikybaocao();
			var id = this.getApp().getRouter().getParam("id");
			var currentUser = self.getApp().currentUser;
			if(!!currentUser && !!currentUser.donvi){
				if (!!currentUser.donvi.tinhthanh_id) {
					self.model.set("tinhthanh_id", currentUser.donvi.tinhthanh_id);
					self.model.set("tinhthanh", currentUser.donvi.tinhthanh);
				}
				if (!!currentUser.donvi.quanhuyen_id){
					self.model.set("quanhuyen_id", currentUser.donvi.quanhuyen_id);
					self.model.set("quanhuyen", currentUser.donvi.quanhuyen);
				}
				if (!!currentUser.donvi.xaphuong_id){
					self.model.set("xaphuong_id", currentUser.donvi.xaphuong_id);
					self.model.set("xaphuong", currentUser.donvi.xaphuong);
				}
			}
			
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
						self.onChangeEvents();
						self.renderDanhSach();
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				self.onChangeEvents();
				self.renderDanhSach();
			}
			
			self.$el.find("#add_dmhoatdong").unbind("click").bind("click", function(event) {
				var dmHoatDongDialog = new DMHoatDongSelectView();
				
				dmHoatDongDialog.dialog();
				
				dmHoatDongDialog.on("onSelected", function(event) {
					var danhsachhoatdong = self.model.get("danhsach_hoatdong") ? self.model.get("danhsach_hoatdong") : [];
					danhsachhoatdong = danhsachhoatdong.concat(dmHoatDongDialog.uiControl.selectedItems);
					self.model.set("danhsach_hoatdong", danhsachhoatdong);
					console.log("danhsach_hoatdong: ", danhsachhoatdong);
					self.renderDanhSach();
				});
			});
		},
		
		process_loaikybaocao:function() {
			var self = this;
			var currentRoute = self.getApp().router.currentRoute()['fragment'];
			console.log("currentRoute===",currentRoute);
			if (currentRoute.indexOf('model/quy1')>=0){
				self.model.set("loaikybaocao",2);
				self.model.set("kybaocao",1);
				self.$el.find("#kydanhgia").val("Qúy I");
				self.getApp().data("vsthon_loaibaocao_route","quy1");
			} else if(currentRoute.indexOf('model/quy2')>=0){
				self.model.set("loaikybaocao",2);
				self.model.set("kybaocao",2);
				self.$el.find("#kydanhgia").val("Qúy II");
				self.getApp().data("vsthon_loaibaocao_route","quy2");
			} else if(currentRoute.indexOf('model/quy3')>=0){
				self.model.set("loaikybaocao",2);
				self.model.set("kybaocao",3);
				self.$el.find("#kydanhgia").val("Qúy III");
				self.getApp().data("vsthon_loaibaocao_route","quy3");
			} else if(currentRoute.indexOf('model/quy4')>=0){
				self.model.set("loaikybaocao",2);
				self.model.set("kybaocao",4);
				self.$el.find("#kydanhgia").val("Qúy IV");
				self.getApp().data("vsthon_loaibaocao_route","quy4");
			} else if(currentRoute.indexOf('model/6thangdau')>=0){
				self.model.set("loaikybaocao",3);
				self.model.set("kybaocao",1);
				self.$el.find("#kydanhgia").val("6 tháng đầu năm");
				self.getApp().data("vsthon_loaibaocao_route","6thangdau");
			} else if(currentRoute.indexOf('model/6thangcuoi')>=0){
				self.model.set("loaikybaocao",3);
				self.model.set("kybaocao",2);
				self.$el.find("#kydanhgia").val("6 tháng cuối năm");
				self.getApp().data("vsthon_loaibaocao_route","6thangcuoi");
			} else if(currentRoute.indexOf('model/nam')>=0){
				self.model.set("loaikybaocao",4);
				self.model.set("kybaocao",1);
				self.$el.find("#kydanhgia").val("Tổng kết năm");
				self.getApp().data("vsthon_loaibaocao_route","nam");
			}
		},
		
		onChangeEvents: function() {
			var self = this;
			
			self.model.on("change:tiendo_pheduyet", function(model) {
				if (self.model.get("tiendo_pheduyet") == 1) {
					if (self.$el.find("#pheduyet_extra").hasClass("hide")) {
						self.$el.find("#pheduyet_extra").removeClass("hide");
					}
				} else {
					if (!self.$el.find("#pheduyet_extra").hasClass("hide")) {
						self.$el.find("#pheduyet_extra").addClass("hide");
					}
				}
			});

			if (self.model.get("tiendo_pheduyet") == 1) {
				if (self.$el.find("#pheduyet_extra").hasClass("hide")) {
					self.$el.find("#pheduyet_extra").removeClass("hide");
				}
			}
		},
		
		renderDanhSach: function() {
			var self = this;
			self.$el.find("#danhsachhoatdong_list").empty();
			self.$el.find("#danhsachhoatdong_list").append(`
			<tr class="top">
                <td>(1)</td>
                <td>(2)</td>
                <td>(3)</td>
                <td colspan="3"></td>
                <td></td>
            </tr>
            <tr class="custom" style="background: #F0F0F0;;">
                <td colspan="3">
                    <p>Liệt kê các hoạt động được thực hiện theo kế hoạch BCC</p>
                </td>
                <td>Tổng số người tham gia</td>
                <td>Số người tham gia là nữ</td>
                <td>Số người tham gia là DTTS</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="3" class="text-left" style="color: red; font-weight: bold;">Hoạt động cấp thôn</td>
                <td></td>
                <td></td>
            </tr>`);
			var danhsachhoatdong = self.model.get("danhsach_hoatdong") ? self.model.get("danhsach_hoatdong") : [];
			
			danhsachhoatdong.forEach(function(hoatdong, idx) {
				var hoatDongItemView = new HoatDongItemView();
				hoatDongItemView.model.set(JSON.parse(JSON.stringify(hoatdong)));
				hoatDongItemView.render();
				hoatDongItemView.on("change", function(model) {
					console.log("model: ", model);
				});
				self.$el.find("#danhsachhoatdong_list").append(hoatDongItemView.$el);
			});
		}
	});

});