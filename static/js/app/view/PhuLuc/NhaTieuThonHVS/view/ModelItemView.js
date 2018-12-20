define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/NhaTieuThonHVS/tpl/itemView.html'),
		schema = require('json!schema/NhaTieuThonHVSSchema.json');
	var DanTocSelectView = require('app/view/DanhMuc/DanToc/view/SelectView');
	

	var currentDate = new Date();
	return Gonrin.ItemView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		collectionName: "nhatieuthonhvs",
		bindings: "bind-item-data",
		foreignRemoteField: "id",
    	foreignField: "capthon_id",
		uiControl: {
			fields: [{
					field: "gioitinh",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Nam"
						},
						{
							"value": 0,
							"text": "Nữ"
						},

					],
				},
				{
					field: "dantoc",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "dantoc_id",
					dataSource: DanTocSelectView
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
					field: "coongthong",
					uicontrol: "checkbox",
					checkedField: "coongthong",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"coongthong": true
						},
						{
							"value": 0,
							"coongthong": false
						},
					],
				},

				{
					field: "kconhatieu",
					uicontrol: "checkbox",
					checkedField: "kconhatieu",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"kconhatieu": true
						},
						{
							"value": 0,
							"kconhatieu": false
						},
					],
				},

				{
					field: "hopvs",
					uicontrol: "checkbox",
					checkedField: "hopvs",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"hopvs": true
						},
						{
							"value": 0,
							"hopvs": false
						},
					],
				},

				{
					field: "khopvs",
					uicontrol: "checkbox",
					checkedField: "khopvs",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"khopvs": true
						},
						{
							"value": 0,
							"khopvs": false
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
					field: "diemruatay",
					uicontrol: "checkbox",
					checkedField: "diemruatay",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"diemruatay": true
						},
						{
							"value": 0,
							"diemruatay": false
						},
					],
				},
			]
		},

		render: function () {
			var self = this;
			self.model.get("dantoc_id");
			console.log(self.model.get("dantoc"));
			self.$el.find("#itemRemove").unbind("click").bind("click", function () {
				self.remove(true);
			});
			self.applyBindings();

		},
	});

});