define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/NhaTieuThonHVS/tpl/model.html'), 
	schema = require('json!schema/NhaTieuThonHVS.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-thonhvs-bind",
			collectionName: "nhatieuthonhvs",										

			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});