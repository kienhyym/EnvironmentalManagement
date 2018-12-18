define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/ThongTinHuyen/tpl/model.html'), 
	schema = require('json!schema/ThongTinHuyenSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-huyen-bind",
			collectionName: "thongtinhuyen",										

			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});