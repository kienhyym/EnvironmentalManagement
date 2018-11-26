define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCao/NguonNuocGiengKhoanDuoi25m/tpl/model.html'), 
	schema = require('json!schema/NguonNuocGiengKhoanDuoi25mSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-25m-bind",
			collectionName: "nguonnuocgiengkhoanduoi25m",

			

			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});