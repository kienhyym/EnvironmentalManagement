define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/LapKHTinh/tpl/itemView.html'),
		schema = require('json!schema/LapKHTinhSchema.json');


	var currentDate = new Date();
	return Gonrin.ItemView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		collectionName: "lapkhtinh",
		bindings: "bind-item-data",
		uiControl: {
			fields: [
				{
    				field: "tiendo",
    				uicontrol: "combobox",
    				textField: "text",
    				valueField: "value",
    				dataSource: [
    					{ "value": "chualap", "text": "Chưa lập kế hoạch BCC" },
    					{ "value": "danglap", "text": "Đang lập kế hoach" },
					],
    			},
    			{
    				field: "vihema",
    				uicontrol: "combobox",
    				textField: "text",
    				valueField: "value",
    				dataSource: [
    					{ "value": "chuars", "text": "Chưa rà soát" },
    					{ "value": "dangrs", "text": "Đang rà soát" },
    					{ "value": "dachapthuan", "text": "Đã chấp thuận" },
					],
    			},
    			{
    				field: "khpheduyet",
    				uicontrol: "combobox",
    				textField: "text",
    				valueField: "value",
    				dataSource: [
    					{ "value": "chua", "text": "Chưa" },
    					{ "value": "roi", "text": "Rồi" },
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