define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinhHoGiaDinh/CapThon/NhaTieuThonHVS/tpl/itemView.html'),
		schema = require('json!app/view/VeSinhHoGiaDinh/CapThon/NhaTieuThonHVS/view/NhaTieuThonHVSSchema.json');
	var DanTocSelectView = require('app/view/DanhMuc/DanToc/view/SelectView');


	var currentDate = new Date();
	return Gonrin.ItemView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		collectionName: "vscapthon",
		bindings: "bind-item-data",
		uiControl: {
			fields: [{
					field: "gioitinh",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 0,
							"text": "Nam"
						},
						{
							"value": 1,
							"text": "Nữ"
						},
					],
				},
				{
					field: "loaikhac",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Dùng chung"
						},
						{
							"value": 2,
							"text": "Một ngăn"
						},
						{
							"value": 3,
							"text": " Chìm không OTH"
						},
						{
							"value": 0,
							"text": "Không có"
						}
					],
				},
				{
					field: "dantoc",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "dantoc_id",
				},

				{
					field: "hongheo",
					uicontrol: "checkbox",
					checkedField: "hongheo",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"hongheo": true
						},
						{
							"value": 0,
							"hongheo": false
						},
					],
				},
				{
					field: "tuhoai",
					uicontrol: "checkbox",
					checkedField: "tuhoai",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"tuhoai": true
						},
						{
							"value": 0,
							"tuhoai": false
						},
					],
				},

				{
					field: "thamdoi",
					uicontrol: "checkbox",
					checkedField: "thamdoi",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"thamdoi": true
						},
						{
							"value": 0,
							"thamdoi": false
						},
					],
				},

				{
					field: "haingan",
					uicontrol: "checkbox",
					checkedField: "haingan",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"haingan": true

						},
						{
							"value": 0,
							"haingan": false
						},
					],
				},

				{
					field: "thamdoi",
					uicontrol: "checkbox",
					checkedField: "thamdoi",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"thamdoi": true
						},
						{
							"value": 0,
							"thamdoi": false
						},
					],
				},

				{
					field: "chimco_oth",
					uicontrol: "checkbox",
					checkedField: "chimco_oth",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"chimco_oth": true
						},
						{
							"value": 0,
							"chimco_oth": false
						},
					],
				},

				{
					field: "khongconhatieu",
					uicontrol: "checkbox",
					checkedField: "khongconhatieu",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"khongconhatieu": true
						},
						{
							"value": 0,
							"khongconhatieu": false
						},
					],
				},

				{
					field: "hopvesinh",
					uicontrol: "checkbox",
					checkedField: "hopvesinh",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"hopvesinh": true
						},
						{
							"value": 0,
							"hopvesinh": false
						},
					],
				},

				{
					field: "khonghopvesinh",
					uicontrol: "checkbox",
					checkedField: "khonghopvesinh",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"khonghopvesinh": true
						},
						{
							"value": 0,
							"khonghopvesinh": false
						},
					],
				},

				{
					field: "caithien",
					uicontrol: "checkbox",
					checkedField: "caithien",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"caithien": true
						},
						{
							"value": 0,
							"caithien": false
						},
					],
				},
				{
					field: "diemruataycoxaphong",
					uicontrol: "checkbox",
					checkedField: "diemruataycoxaphong",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"diemruataycoxaphong": true
						},
						{
							"value": 0,
							"diemruataycoxaphong": false
						},
					],
				},
			]
		},
		render: function () {
			var self = this;
			// this.setElement(this.el.innerHTML)			
			self.$el.find("#itemRemove").unbind("click").bind("click", function () {
				self.remove(true);
			});
			self.applyBindings();
		},
	});

});