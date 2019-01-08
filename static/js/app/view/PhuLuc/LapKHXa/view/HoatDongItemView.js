define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!../tpl/hoatdongitem.html'),
		schema = require('json!schema/DanhMucHoatDongSchema.json');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "danhmuchoatdong",
		uiControl: {
			fields: []
		},
		tools: null,
		render: function () {
			var self = this;
			this.model.on("change", function() {
				console.log("changed, ", self.model.toJSON());
				self.trigger("change", self.model.toJSON());
			});
			
			this.applyBindings();
			this.setElement(this.el.innerHTML);
			
		},
	});
});