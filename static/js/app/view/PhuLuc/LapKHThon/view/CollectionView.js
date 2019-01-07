define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!../tpl/collection.html'),
		schema = require('json!schema/TienDoKeHoachBCCSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tiendo_kehoach_bcc",
		uiControl: {
			fields: [
				{
					field: "thonxom",
					label: "Thôn"
				},{
					field: "nganh",
					label: "Ngành",
					template: function (rowData) {
						if (rowData.nganh === 1) {
							return "NGÀNH Y TẾ";
						} else {
							return "NGÀNH GIÁO DỤC";
						}
					},
				},
				{
					field: "tiendo_xaydung",
					label: "TĐ xây dựng"
				},
				{
					field: "tiendo_rasoat",
					label: "TĐ rà soát"
				},
				{
					field: "tiendo_pheduyet",
					label: "TĐ phê duyệt"
				}
			],
			onRowClick: function (event) {
				if (event.rowId) {
					var path = 'hoatdongbcc/capthon/model/quy1?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
				}
			}
		},
		tools: [{
			name: "defaultgr",
			type: "group",
			groupClass: "toolbar-group",
			buttons: [{
					name: "create",
					type: "button",
					buttonClass: "btn-success btn-sm",
					label: "TRANSLATE:CREATE",
					command: function () {
						var self = this;
						var path = 'hoatdongbcc/capthon/model/quy1';
						this.getApp().getRouter().navigate(path);
					}
				}
			]
		}],
		render: function () {
			this.applyBindings();
			return this;
		},
	});

});