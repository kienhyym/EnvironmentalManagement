define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/CapThon/tpl/collection.html'),
		schema = require('json!schema/VSCapThonSchema.json');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "vscapthon",
		tools: [{
			name: "defaultgr",
			type: "group",
			groupClass: "toolbar-group",
			buttons: [{
				name: "CREATE",
				type: "button",
				buttonClass: "btn-success btn-sm",
				label: "TRANSLATE:CREATE",
				command: function () {
					var self = this;
					var loaibaocao = self.getApp().getRouter().getParam("loaikybaocao");
					var path = this.collectionName + '/model/' + loaibaocao;
					this.getApp().getRouter().navigate(path);
				}
			}]
		}],
		uiControl: {
			fields: [
				{
					field: "nambaocao",
					label: "Năm báo cáo"
				},
				{
					field: "tinhthanh_id",
					label: "Tỉnh",
					foreign: "tinhthanh",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "quanhuyen_id",
					label: "Huyện",
					foreign: "quanhuyen",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "xaphuong_id",
					label: "Xã",
					foreign: "xaphuong",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "thonxom_id",
					label: "Thôn",
					foreign: "thonxom",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "tong_soho",
					label: "Tổng số hộ"
				},
				//				{
				//					field: "tong_chuholanu",
				//					label: "Số hộ nữ là chủ hộ"
				//				},
				{
					field: "tong_sohongheo",
					label: "Số hộ nghèo"
				},

				{
					field: "tong_sohodtts",
					label: "Số hộ là DTTS"
				},
				{
					field: "tong_danso",
					label: "Tổng số dân"
				},

			],
			pagination: {
				page: 1,
				pageSize: 100
			},
			onRowClick: function (event) {
				if (event.rowId) {
					var loaibaocao = this.getApp().getRouter().getParam("loaikybaocao");
					var path = this.collectionName + '/model/' + loaibaocao + '?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
				}
			}
		},
		render: function () {
			var self = this;
			// self.$el.find("thead tr").css("vertical-align", top);
			var loaibaocao = this.getApp().getRouter().getParam("loaikybaocao");
			var itemkybaocao = self.getApp().mapKyBaoCao[loaibaocao];
			if (itemkybaocao === null || itemkybaocao === "undefined") {
				self.getApp().notify("Đường dẫn không hợp lệ, vui lòng thử lại sau");
				return;
			} else {
				var txt_header = "Danh sách báo cáo cấp Thôn - " + itemkybaocao.text;
				self.$el.find(".panel-heading h3").html(txt_header);
				self.uiControl.filters = {
					"$and": [{ "loaikybaocao": { "$eq": itemkybaocao.loaikybaocao } },
					{ "kybaocao": { "$eq": itemkybaocao.kybaocao } },
					{ "donvi_id": { "$eq": self.getApp().currentUser.donvi_id } }]
				};
				self.uiControl.orderBy = [{ "field": "nambaocao", "direction": "desc" }];
				this.applyBindings();

				self.$el.find("#filterBtn").attr({ "style": "margin-top: 26px;" });
				self.$el.find("#clear").attr({ "style": "margin-top: 26px;" });
				var filter_thon = self.$el.find("#filter_thon");
				filter_thon.find("input").ref({
					textField: "ten",
					valueField: "id",
					dataSource: ThonXomSelectView,
				});

				var filterBtn = self.$el.find("#filterBtn");
				filterBtn.unbind("click").bind("click", function () {
					var filter_nam = self.$el.find("#filter_nam").val();
					var filter_thon_data = self.$el.find("#filter_thon_data").val();
					var $col = self.getCollectionElement();
					if (!!filter_nam && !!filter_thon_data) {
						var filters = {
							"$and": [
								{
									"nambaocao": {
										"$eq": filter_nam
									}
								},
								{
									"thonxom_id": {
										"$eq": filter_thon_data
									}
								}
							]
						}
						$col.data('gonrin').filter(filters);
					} else {
						self.getApp().notify({ message: "Mời bạn nhập đầy đủ thông tin vào bộ lọc!" }, { type: "danger" });
					}
				});
				self.$el.find("#clear").unbind("click").bind("click", function () {
					var $col = self.getCollectionElement();
					$col.data('gonrin').filter(null);
				});
				self.applyBindings();
				return this;
			}
		},
	});

});