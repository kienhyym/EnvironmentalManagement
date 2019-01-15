define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCao/KQKT1000mNuocHoGiaDinhKoDat/tpl/model.html'), 
	schema = require('json!schema/KQKT1000mNuocHoGiaDinhKoDatSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-duoi1000m-bind",
			collectionName: "kqkt1000mnuochogiadinhkodat",										

			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});