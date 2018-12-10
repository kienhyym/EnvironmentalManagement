define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/Vesinhgiadinh/XetNghiemNuoc500ng/tpl/model.html'), 
	schema = require('json!schema/XetNghiemNuoc500ngSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-duoi1000m-bind",
			collectionName: "xetnghiemnuoc500ng",										

			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});