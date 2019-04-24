define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/HeThong/DangKyDonVi/tpl/collection.html'),
		schema = require('json!schema/UserDonviSchema.json');

	//	var TuyenDonViEnum = require('json!app/enum/TuyenDonViEnum.json');
	//var TuyenDonViSelectView = require('app/view/DanhMuc/TuyenDonVi/SelectView');
	var TrangThaiDangKyDonViEnum = require('json!app/enum/TrangThaiDangKyDonViEnum.json');
	var CustomFilterView = require('app/bases/views/CustomFilterView');

	//var DonViSelectView = require('app/view/HeThong/DonVi/view/TreeSelectView.js');

	var filterschema = {
		"trangthai": {
			"type": "number"
		},
	}
	var filtertemplate = require('text!app/view/tpl/Filter/dangkyfilter.html');

	var FilterView = Gonrin.ModelView.extend({
		template: filtertemplate,
		modelSchema: filterschema,
		urlPrefix: "/api/v1/",
		collectionName: "filter",
		uiControl: [{
				field: "trangthai",
				uicontrol: "combobox",
				dataSource: TrangThaiDangKyDonViEnum,
				textField: "text",
				valueField: "value",
			},

		],
		render: function () {
			var self = this;
			// //preg select
			//self.model.set("nambaocao", moment().year());
			this.applyBindings();
			var filterBtn = self.$el.find("#filterBtn");

			filterBtn.unbind("click").bind("click", function () {
				self.trigger('filterChanged', {
					data: {
						trangthai: self.model.get("trangthai")
					}
				});
			});
		},
	});

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "user_donvi",
		uiControl: {
			fields: [{
					field: "id",
					label: "ID",
					visible: false
				},
				{
					field: "donvi_ten",
					label: "Tên đơn vị"
				},
				{
					field: "captren_id",
					/*label: "Cấp trên",
					foreign: "captren",
					foreignValueField: "id",
					foreignTextField: "ten",*/
					visible: false
				},
				{
					field: "captren",
					label: "Cấp trên",
					textField: "ten"
				},
				{
					field: "email",
					label: "Email"
				},
				{
					field: "phone",
					label: "Số điện thoại"
				},
				{
					field: "donvi_tuyendonvi",
					label: "Tuyến đơn vị",
					//foreignValues: TuyenDonViSelectView,
					//foreignValueField: "id",
					textField: "ten"

				},
				{
					field: "trangthai",
					label: "Trạng thái",
					foreignValues: TrangThaiDangKyDonViEnum,
					foreignValueField: "value",
					foreignTextField: "text"
				},
				{
					"field": "donvi_tuyendonvi_id",
					"visible": false
				},
				{
					"field": "user_name",
					"visible": false
				},

				{
					"field": "donvi_coquanchuquan",
					"visible": false
				},
				{
					"field": "donvi_diachi",
					"visible": false
				},
				{
					"field": "donvi_sodienthoai",
					"visible": false
				},

				{
					"field": "donvi_id",
					"visible": false
				},
				{
					"field": "user_id",
					"visible": false
				}
			],
			onRowClick: function (event) {
				if (event.rowId) {
					var path = this.collectionName + '/model?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
				}
			}
		},
		render: function () {
			var self = this;
			var $filter = this.$el.find("#filter");
			var filterView = new FilterView({
				el: $filter
			});
			filterView.render();
			filterView.on('filterChanged', function (evt) {
				var $col = self.getCollectionElement();
				if ($col) {
					if ((evt.data.trangthai !== null)) {
						var filters = {
							"$and": []
						};
						if (evt.data.trangthai !== null) {
							filters["$and"].push({
								"trangthai": {
									"$eq": evt.data.trangthai
								}
							});
						}
						//var filters = {"$and":[{"nambaocao":{"$eq":evt.data.nambaocao}}, {"donvi_id":{"$eq":evt.data.donvi_id}}]}
						$col.data('gonrin').filter(filters);
					} else {
						$col.data('gonrin').filter(null);
					}
				}
			});

			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: self.collectionName +"_filter"
			});
			$("#search_input").attr("placeholder", "Nhập tên đơn vị...");
			filter.render();
			self.uiControl.orderBy = [{"field": "created_at", "direction": "desc"},{"field": "trangthai", "direction": "desc"}]
			this.applyBindings();

			filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var filters = {"donvi_ten": {"$likeI": text }};
						$col.data('gonrin').filter(filters);
						//self.uiControl.filters = filters;
					} else {
						self.uiControl.filters = null;
					}
				}
				self.applyBindings();
    		});
			return this;
		},

	});

});