define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/NhaTieuXaHVS/tpl/model.html'), 
	schema = require('json!schema/NhaTieuXaHVSSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-xahvs-bind",
			collectionName: "nhatieuxahvs",										

			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});