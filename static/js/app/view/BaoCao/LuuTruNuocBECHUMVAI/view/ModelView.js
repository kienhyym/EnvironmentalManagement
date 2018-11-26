define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCao/LuuTruNuocBECHUMVAI/tpl/model.html'), 
	schema = require('json!schema/LuuTruNuocBECHUMVAISchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-chum-bind",
			collectionName: "luutrunuocbechumvai",										

			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});