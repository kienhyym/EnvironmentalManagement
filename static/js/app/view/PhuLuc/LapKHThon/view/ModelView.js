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
				{
					field: "nganh",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "NGÀNH Y TẾ"
						},
						{
							"value": 0,
							"text": "NGÀNH GIÁO DỤC"
						},
					],
				},
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
			self.process_loaikybaocao();
			var id = this.getApp().getRouter().getParam("id");
			if(!!currentUser && !!currentUser.donvi){
				if (!!currentUser.donvi.tinhthanh_id){
					self.model.set("tinhthanh_id",currentUser.donvi.tinhthanh_id);
					self.model.set("tinhthanh",currentUser.donvi.tinhthanh);
				}
				if (!!currentUser.donvi.quanhuyen_id){
					self.model.set("quanhuyen_id",currentUser.donvi.quanhuyen_id);
					self.model.set("quanhuyen",currentUser.donvi.quanhuyen);
				}
				if (!!currentUser.donvi.xaphuong_id){
					self.model.set("xaphuong_id",currentUser.donvi.xaphuong_id);
					self.model.set("xaphuong",currentUser.donvi.xaphuong);
				}
			}
			
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
				//self.$el.find("#addItem button").click();
			}

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
		}
	});

});