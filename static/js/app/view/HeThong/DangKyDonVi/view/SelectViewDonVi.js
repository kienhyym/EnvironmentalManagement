define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/tpl/HeThong/DonVi/collection.html'),
		schema = require('json!schema/DonViSchema.json');

	var TuyenDonViSelectView = require('app/view/DanhMuc/TuyenDonVi/view/SelectView');

	return Gonrin.CollectionDialogView.extend({

		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "donvi",
		textField: "ten",
		//    	valueField: "id",
		uiControl: {
			fields: [


				{
					field: "ten",
					label: "Tên cấp trên"
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