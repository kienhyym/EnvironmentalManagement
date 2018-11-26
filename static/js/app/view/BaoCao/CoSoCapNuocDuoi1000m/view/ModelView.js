define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCao/CoSoCapNuocDuoi1000m/tpl/model.html'), 
	schema = require('json!schema/CoSoCapNuocDuoi1000mSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-1000m-bind",
			collectionName: "cosocapnuocduoi1000m",										

			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});