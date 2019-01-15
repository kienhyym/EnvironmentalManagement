define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/ItemTinh/tpl/itemView.html'),
		schema = require('json!schema/ItemTinhSchema.json');
	var DanTocSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	

	var currentDate = new Date();
	return Gonrin.ItemView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		collectionName: "itemtinh",
		bindings: "bind-item-data",
		uiControl: {
			fields: [
				{
					field: "ketqua_datduoc",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Đạt"
						},
						{
							"value": 0,
							"text": "Không đạt"
						},
					],
				},
			]
		},

		render: function () {
			var self = this;
			

			self.$el.find("#itemRemove").unbind("click").bind("click", function () {
				self.remove(true);
			});
			self.applyBindings();
		},
	});

});