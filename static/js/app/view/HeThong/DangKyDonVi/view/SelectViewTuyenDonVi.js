define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/tpl/DanhMuc/TuyenDonVi/collection.html'),
		schema = require('json!schema/TuyenDonViSchema.json');

	return Gonrin.CollectionDialogView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tuyendonvi",
		textField: "ten",
		tools: [{
			name: "defaultgr",
			type: "group",
			groupClass: "toolbar-group",
			buttons: [{
				name: "select",
				type: "button",
				buttonClass: "btn-success btn-sm",
				label: "TRANSLATE:SELECT",
				command: function () {
					var self = this;
					self.trigger("onSelected");
					self.close();
				}
			}, ]
		}, ],
		uiControl: {
			fields: [

				{
					field: "ten",
					label: "Tên cơ quan",
					width: 250
				},
				{
					field: "mota",
					label: "Mô tả",
					width: 250
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