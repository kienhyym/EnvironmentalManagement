define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!./tpl/hoatdongitem.html');
	var NganhSelectView = require('app/view/DanhMuc/Nganh/SelectView');

	var schema = {
		"id": {
	        "type": "number",
	        "primary": true
	    },
		"mahoatdong": {
			"type": "string"
		},
		"tenhoatdong": {
			"type": "string"
		},
		"muctieu": {
			"type": "string"
		},
		"tiendo": {
			"type": "string"
		},
		"nganh_id": {
			"type": "string"
		},
		"nganh": {
			"type": "dict"
		},
		"songuoithamgia": {
			"type": "number"
		},
		"songuoithamgia_nu": {
			"type": "number"
		},
		"songuoithamgia_dtts": {
			"type": "number"
		}
	};
	
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: "tr",
		collectionName: "danhmuchoatdong",
		uiControl: {
			fields: [{
				field: "nganh",
				uicontrol: "ref",
				textField: "tennganh",
				foreignRemoteField: "id",
				foreignField: "nganh_id",
				dataSource: NganhSelectView
			}]
		},
		tools: null,
		render: function () {
			var self = this;
			this.model.on("change", function() {
				self.trigger("change", self.model.toJSON());
			});
			
			this.applyBindings();
		},
	});
});