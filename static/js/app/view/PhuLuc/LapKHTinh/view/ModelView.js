define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/LapKHTinh/tpl/model.html'),
		schema = require('json!schema/KeHoachThucHienSchema.json');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	// var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	// var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	// var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');

	var ItemTinhView = require('app/view/PhuLuc/ItemTinh/view/ModelItemView');

	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "kehoachthuchien",
		uiControl: {
			fields: [{
					field: "ngay_pheduyet",
					textFormat: 'DD-MM-YYYY',
					extraFormats: ['DDMMYYYY'],
					maxDate: currentDate,
				},
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
				{
					field: "trangthai_tinhpheduyen",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Đã phê duyệt"
						},
						{
							"value": 0,
							"text": "Chưa phê duyệt"
						},
					],
				},
				{
					field: "vihema_chapthuan",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 0,
							"text": "Chưa rà soát"
						},
						{
							"value": 1,
							"text": "Đang rà soát"
						},
						{
							"value": 2,
							"text": "Đã chấp thuận"
						},
					],
				},
				{
					field: "xaydungduthao_bcc",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 2,
							"text": "Đã hooàn thành dự thảo"
						},
						{
							"value": 1,
							"text": "Đang xây dựng"
						},
						{
							"value": 0,
							"text": "Chưa xây dựng"
						},
					],
				},

				{
					field: "itemtinh",
					uicontrol: false,
					itemView: ItemTinhView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-success btn-sm",
						label: "<span class='fa fa-plus'>Thêm hoạt động</span>",
						command: "create"
					}, ],
					toolEl: "#addItem"
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
				self.$el.find("#addItem button").click();
			}

		},
	});

});