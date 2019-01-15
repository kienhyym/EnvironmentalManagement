define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCao/NguonNuocGiengDao/tpl/model.html'), 
	schema = require('json!schema/NguonNuocGiengDaoSchema.json');

	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "nguonnuocgiengdao",
			bindings:"data-giengdao-bind",
	

			render: function () {
				var self = this;
				self.applyBindings();			
			},
		});

});