define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/NguocNcCongTrinh/tpl/model.html'), 
	schema = require('json!schema/NguocNcCongTrinhSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "nguonnccongtrinh",
			uiControl: {
				fields: [
					{
						field: "ncchinh",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Nước máy chảy đến bể, sân",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Giếng khoan",
							
						},
						{
							value: 3,
							text: "Giếng đào được bảo vệ",
							
						},
						{
							value: 4,
							text: "Giếng đào không được bảo vệ",
							
						},
						{
							value: 5,
							text: "Nước mưa",
							
						},
						{
							value: 6,
							text: "Nước đóng chai",
							
						},],
					},
						
			
			]
		},
			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});