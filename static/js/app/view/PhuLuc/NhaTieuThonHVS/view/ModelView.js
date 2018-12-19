define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/NhaTieuThonHVS/tpl/model.html'), 
	schema = require('json!schema/NhaTieuThonHVSSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-thonhvs-bind",
			collectionName: "nhatieuthonhvs",										
			uiControl: {
				fields: [
					{
						field: "gioitinh",
						uicontrol: "combobox",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ "value": "Male", "text": "Nam" },
							{ "value": "Female", "text": "Nữ" },
							{ "value": "Other", "text": "Khác" },
						],
					},
					
					{
						field: "hongheo",
						uicontrol: "combobox",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ "value": "1", "text": "Là hộ nghèo" },
							{ "value": "0", "text": "Không là hộ nghèo" },
						],
					},
					
					{
						field: "tuhoai",
						uicontrol: "combobox",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ "value": true, "text": "Có" },
							{ "value": false, "text": "Không" },
						],
					},
					
					{
						field: "thamdoi",
						uicontrol: "combobox",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ "value": true, "text": "Có" },
							{ "value": false, "text": "Không" },
						],
					},
					
					{
						field: "haingan",
						uicontrol: "combobox",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ "value": true, "text": "Có" },
							{ "value": false, "text": "Không" },
						],
					},
					
					{
						field: "thamdoi",
						uicontrol: "combobox",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ "value": true, "text": "Có" },
							{ "value": false, "text": "Không" },
						],
					},
					
					{
						field: "coongthong",
						uicontrol: "combobox",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ "value": true, "text": "Có" },
							{ "value": false, "text": "Không" },
						],
					},
					
					{
						field: "kconhatieu",
						uicontrol: "combobox",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ "value": true, "text": "Có" },
							{ "value": false, "text": "Không" },
						],
					},
					
					{
						field: "hopvs",
						uicontrol: "combobox",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ "value": true, "text": "Có" },
							{ "value": false, "text": "Không" },
						],
					},
					
					{
						field: "khopvs",
						uicontrol: "combobox",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ "value": true, "text": "Có" },
							{ "value": false, "text": "Không" },
						],
					},
					
					{
						field: "caithien",
						uicontrol: "combobox",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ "value": true, "text": "Có" },
							{ "value": false, "text": "Không" },
						],
					},
				]
			},
			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});