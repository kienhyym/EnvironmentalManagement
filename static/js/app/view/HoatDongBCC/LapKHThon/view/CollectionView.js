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
					field: "nambaocao",
					label: "Năm báo cáo"
				},
				{
					field: "thonxom",
					label: "Thôn",
					template: function (rowData) {
						if (rowData.thonxom) {
							return rowData.thonxom.ten
						}
						return "";
					},
				},
				{
					field: "tiendo_xaydung",
					label: "Tiến độ xây dựng"
				},
				{
					field: "tiendo_rasoat",
					label: "Tiến độ rà soát"
				},
				{
					field: "tiendo_pheduyet",
					label: "Tiến độ phê duyệt"
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
						var loaikybaocao = this.getApp().getRouter().getParam("loaikybaocao");
						var path = 'hoatdongbcc/capthon/model/' + loaikybaocao;
						this.getApp().getRouter().navigate(path);
					}
				}
			]
		}],
		render: function () {
			var self = this;
			var loaibaocao = this.getApp().getRouter().getParam("loaikybaocao");
			var itemkybaocao = self.getApp().mapKyBaoCao[loaibaocao];
			if (itemkybaocao === null || itemkybaocao ==="undefined"){
				self.getApp().notify("Đường dẫn không hợp lệ, vui lòng thử lại sau");
				return;
			}else{
				var txt_header = "Danh sách báo cáo cấp Thôn - "+itemkybaocao.text;
				self.$el.find(".panel-heading h3").html(txt_header);
				self.uiControl.filters = {"$and":[{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
					{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
					{"tuyendonvi": {"$eq": "thon"}},
					{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
				self.uiControl.orderBy = [{"field": "nambaocao", "direction": "desc"}];
				this.applyBindings();
				return this;
			}
			
			
//			var loaikybaocao = this.getApp().getRouter().getParam("loaikybaocao");
//			this.uiControl.filters = {
//				"$and": [
//					{
//						"tuyendonvi": {"$eq": "thon"}
//					}
//				]
//			};
//			if (loaikybaocao) {
//				this.uiControl.filters['$and'].push({
//					"loaikybaocao": {"$eq": self.getApp().mapKyBaoCao[loaikybaocao].loaikybaocao}
//				});
//				this.uiControl.filters['$and'].push({
//					"kybaocao": {"$eq": self.getApp().mapKyBaoCao[loaikybaocao].kybaocao}
//				});
//			}
//			this.applyBindings();
//			return this;
		},
	});

});