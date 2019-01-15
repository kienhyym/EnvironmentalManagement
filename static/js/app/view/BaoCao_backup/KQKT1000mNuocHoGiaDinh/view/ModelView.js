define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCao/KQKT1000mNuocHoGiaDinh/tpl/model.html'), 
	schema = require('json!schema/KQKT1000mNuocHoGiaDinhSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-1000m-bind",
			collectionName: "kqkt1000mnuochogiadinh",										

			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});