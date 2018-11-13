define(function(require) {
	"use strict";
	
	var $          = require("jquery"),
		_          = require("underscore"),
		Gonrin     = require("gonrin"),
		tpl        = require("text!tpl/base/index.html"),
		template   = _.template(tpl);
		
	return Gonrin.View.extend({
		render: function() {
			this.$el.html(template());
			return this;
		}
	})
})