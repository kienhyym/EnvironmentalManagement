define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/ItemXa/tpl/itemView.html'),
		schema = require('json!schema/ItemXaSchema.json');
	var DanTocSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	

	var currentDate = new Date();
	return Gonrin.ItemView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		collectionName: "itemxa",
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
			// this.setElement(this.el.innerHTML);
			// self.model.get("dantoc_id");
			
			self.$el.find("#itemRemove").unbind("click").bind("click", function () {
				self.remove(true);
			});
			self.applyBindings();

			// self.model.on("change",function(event) {
			// 	console.log("toJSON ", self.model.toJSON());
			// });
		},
	});

});