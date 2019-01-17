define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/BaoCaoVienChuyenNganhNuoc/tpl/collection.html'),
		schema = require('json!schema/BaoCaoVienChuyenNganhNuocSchema.json');


	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocao_vienchuyennganh_nuoc",
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
						var path = this.collectionName + '/model/'+loaibaocao;
						this.getApp().getRouter().navigate(path);
					}
				}]
		}],
		uiControl: {
			fields: [{
					field: "nambaocao",
					label: "Năm báo cáo",
				},
				{
					field: "tong_tinh_phutrach",
					label: "Tổng số tỉnh phụ trách",
				},
				{
					field: "tong_tinh_cobaocao",
					label: "Số tỉnh có báo cáo",
				},
				{
					field: "tong_donvi_capnuoc_phutrach",
					label: "Tổng số đơn vị cấp nước phụ trách",
				},

			],
			onRowClick: function (event) {
				if (event.rowId) {
					var loaibaocao = this.getApp().getRouter().getParam("loaikybaocao");
					var path = this.collectionName + '/model/'+loaibaocao+ '?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
				}

			}
		},
		render: function () {
			var self = this;
			var loaibaocao = this.getApp().getRouter().getParam("loaikybaocao");
			var itemkybaocao = self.getApp().mapKyBaoCao[loaibaocao];
			if (itemkybaocao === null || itemkybaocao ==="undefined"){
				self.getApp().notify("Đường dẫn không hợp lệ, vui lòng thử lại sau");
				return;
			}else{
				var txt_header = "Báo cáo dành cho Viện chuyên ngành - "+itemkybaocao.text;
				self.$el.find(".panel-heading h3").html(txt_header);
				self.uiControl.filters = {"$and":[{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
					{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
					{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
				self.uiControl.orderBy = [{"field": "nambaocao", "direction": "desc"}];
				this.applyBindings();
				return this;
			}
		},
	});

});
