    define(function (require) {
    	"use strict";
    	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');
    	var template = require('text!app/view/BaoCaoNuoc/KQNgoaiKiem/tpl/model.html'), 
    	schema = require('json!schema/KQNgoaiKiemSchema.json');
    	var maxDate = new Date();
    	return Gonrin.ItemView
    		.extend({
    			template: template,
    			modelSchema: schema,
    			urlPrefix: "/api/v1/",
    			collectionName: "kqngoaikiem",										
    			render: function () {
    				var self = this;
    					self.applyBindings();
    			},
    		});
    });