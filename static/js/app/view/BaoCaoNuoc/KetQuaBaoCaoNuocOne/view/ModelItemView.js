define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/KetQuaBaoCaoNuocOne/tpl/itemView.html'),
		schema = require('json!schema/KetQuaBaoCaoNuocOneSchema.json');
	//var DanTocSelectView = require('app/view/DanhMuc/DanToc/view/SelectView');


	var currentDate = new Date();
	return Gonrin.ItemView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		collectionName: "ketquabaocaonuocone",
		bindings: "bind-item-data",
		uiControl: {
			fields: [
				{
					field: "danhgia",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							value: 1,
							text: "đạt"
						},
						{
							value: 0,
							text: "không đạt",

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
