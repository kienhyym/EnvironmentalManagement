define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/tpl/HeThong/Role/collection.html'),
		schema = require('json!schema/RoleSchema.json');


	return Gonrin.CollectionDialogView.extend({

		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "role",
		textField: "name",
		//    	valueField: "id",
		uiControl: {
			fields: [{
					field: "id",
					label: "ID",
					width: 50,
					readonly: true,
				},
				{
					field: "name",
					label: "Tên",
					width: 150
				},
				{
					field: "description",
					label: "Mô tả",
					width: 150
				},
			],
			onRowClick: function (event) {
				this.uiControl.selectedItems = event.selectedItems;
			},
		},
		render: function () {
			this.applyBindings();
			return this;
		},

	});

});