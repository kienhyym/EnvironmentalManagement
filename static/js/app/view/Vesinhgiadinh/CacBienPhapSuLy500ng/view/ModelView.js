define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/Vesinhgiadinh/CacBienPhapSuLy500ng/tpl/model.html'), 
	schema = require('json!schema/CacBienPhapSuLy500ngSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-bind-suly",
			collectionName: "cacbienphapsuly500ng",										

			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});