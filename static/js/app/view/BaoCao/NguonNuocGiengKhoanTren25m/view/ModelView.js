define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCao/NguonNuocGiengKhoanTren25m/tpl/model.html'), 
	schema = require('json!schema/NguonNuocGiengKhoanTren25mSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-tren25m-bind",
			collectionName: "nguonnuocgiengkhoantren25m",

			

			render: function () {
				var self = this;
					self.applyBindings();				
			},
		});

});