define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/CapNcTruongTram/tpl/model.html'), 
	schema = require('json!schema/CapNcTruongTramSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "capnctruongtram",	
			uiControl: {
				fields: [
					{
						field: "qskhuvs",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Nhà vệ sinh khô nổi một ngăn tách",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Nhà vệ sinh khô nổi hai ngăn",
							
						},
						{
							value: 3,
							text: "Nhà vệ sinh khô chìm",
							
						},
						{
							value: 4,
							text: "Nhà vệ sinh tự hoại",
							
						},
						{
							value: 5,
							text: "Nhà vệ sinh thấm dội nước",
							
						},
						{
							value: 6,
							text: "Nhà vệ sinh dội nước + bể biogas",
							
						},
						{
							value: 7,
							text: "Nhà vệ sinh dội nước (nước thải không qua bể phốt, hố, hay biogas)",
							
						},
						{
							value: 8,
							text: "Nhà vệ sinh thùng hoặc cầu tõm",
							
						},
						{
							value: 99,
							text: "Không quan sát được",
							
						},],
					},
					{
						field: "sannhanut",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},],
					},
					{
						field: "daykincua",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},],
					},
					{
						field: "bechuanut",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},],
					},
					{
						field: "kcbechua",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Cách nhiều hơn 10 mét",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Cách ít hơn 10 mét",
							
						},],
					},
					{
						field: "hoatdongbt",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},{
							value: 99,
							text: "Không biết",
							
						},],
					},
					{
						field: "nuocsach",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},],
					},
					{
						field: "ctruatay",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},],
					},
//					{
//						field: "qscongtrinh",
//						uicontrol: "radio",
//						textField: "text",
//						valueField: "value",
////						cssClassField: "cssClass",
//						dataSource: [{
//							value: 1,
//							text: "Chỉ có nước sạch",
////							cssClass: "yeallow"
//						}, {
//							value: 2,
//							text: "Chỉ có xà phòng",
//							
//						},{
//							value: 3,
//							text: "Có cả nước sạch và xà phòng",
////							cssClass: "yeallow"
//						},
//						{
//							value: 4,
//							text: "Không có cả nước sạch và xà phòng",
////							cssClass: "yeallow"
//						},
//						{
//							value: 99,
//							text: "Không quan sát được",
////							cssClass: "yeallow"
//						},],
//						value: 0
//					},
//					{
//						field: "qscongtrinh",
//						uicontrol: "checkbox",
//						checkedField: "name",
//						valueField: "id",
//						text:"text",
//						dataSource: [
//							{ text: "Không có cả nước sạch và xà phòng", name:true, id: 4 },
//							{ text: "Không quan sát được", name:true, id: 99 },
//						],
//					},
					{
						field: "mailop",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có, đủ bảo vệ và kín đáo",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},],
					},
					{
						field: "dinhdong",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},],
					},
					{
						field: "ctsachse",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},],
					},
					{
						field: "sansach",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},],
					},
					{
						field: "nangmui",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},
						{
							value: 99,
							text: "Không thể kết luận được",
							
						},],
					},
					{
						field: "nuocthaichay",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Nước thải chảy đến ống thoát nước hở hoặc cống hở ",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Nước thải chảy vào các chỗ trữ nước (ví dụ: ao, hồ)",
							
						},
						{
							value: 3,
							text: "hoặc các công trình hở",
							
						},
						{
							value: 4,
							text: "Nước thải chảy đến hố thấm hoặc cống kín",
							
						},
						{
							value: 99,
							text: "Không quan sát được",
							
						},],
					},
					{
						field: "bexicao",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},],
					},
					{
						field: "ngaplut",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},
						{
							value: 99,
							text: "Không biết",
							
						},],
					},
					
					{
						field: "khuditieu",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Có",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Không",
							
						},{
							value: 99,
							text: "Không biết",
							
						},],
					},
					
						
			
			]
		},

		render: function () {
			var self = this;
			self.applyBindings();

			self.$el.find('.qscongtrinh input').each(abc, function() {
				$(this).unbind('click').bind('click', function(event) {
					console.log(this);
					console.log(event);
				});
			})
		},
	});
});