define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCao/NguonNuocTuChay/tpl/model.html'), 
	schema = require('json!schema/NguonNuocTuChaySchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "nguonnuoctuchay",
			bindings:"data-ngonnguoc-bind",
			uiControl: {
				fields: [				
				

				],
			},
			render: function () {
				var self = this;
				self.applyBindings();

			},
		});

});