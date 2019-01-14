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
					label: "Tiến độ xây dựng",
					template: function (rowData) {
						if (rowData.tiendo_xaydung == 2){
							return "Đã hoàn thành";
						} else if (rowData.tiendo_xaydung == 1){
							return "Đang xây dựng";
						}
						return "Chưa xây dựng";
					}
				},
				{
					field: "tiendo_rasoat",
					label: "Tiến độ rà soát",
					template: function (rowData) {
						if (rowData.tiendo_rasoat == 2){
							return "Đã chấp thuận";
						} else if (rowData.tiendo_rasoat == 1){
							return "Đang rà soát";
						}
						return "Chưa chấp thuận";
					}
				},
				{
					field: "tiendo_pheduyet",
					label: "Tiến độ phê duyệt",
					template: function (rowData) {
						if (rowData.tiendo_pheduyet == 1){
							return "Đã phê duyệt";
						}
						return "Chưa phê duyệt";
					}
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
		},
	});
});