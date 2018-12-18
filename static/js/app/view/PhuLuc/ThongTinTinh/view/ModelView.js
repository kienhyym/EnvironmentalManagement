define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/ThongTinTinh/tpl/model.html'), 
	schema = require('json!schema/ThongTinTinhSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-tinh-bind",
			collectionName: "thongtintinh",										

			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});