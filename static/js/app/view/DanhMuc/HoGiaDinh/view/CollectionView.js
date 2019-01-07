define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/HoGiaDinh/tpl/collection.html'),
		schema = require('json!schema/HoGiaDinhSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "hogiadinh",
		uiControl: {
			fields: [{
					field: "id",
					label: "Mã Hộ",
					readonly: true,
				},
				{
					field: "tenchuho",
					label: "Tên chủ hộ"
				},
				{
					field: "gioitinh",
					label: "Giới tính",
					template: function (dataRow) {
						if (dataRow.gioitinh === 1) {
							return "Nữ"
						} else{
							return "Nam";
						}
					},
				},
				{
					field: "dantoc_id",
					label: "Dân tộc",
					foreign: "dantoc",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
			],
			onRowClick: function (event) {
				if (event.rowId) {
					var path = this.collectionName + '/model?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
				}

			}
		},
		render: function () {
			this.applyBindings();
			return this;
		},
	});

});