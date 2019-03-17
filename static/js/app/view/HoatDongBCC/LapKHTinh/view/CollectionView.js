define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!../tpl/collection.html'),
		schema = require('json!schema/TienDoKeHoachBCCSchema.json');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');

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
					field: "tinhthanh",
					label: "Tỉnh",
					template: function (rowData) {
						if (rowData.tinhthanh) {
							return rowData.tinhthanh.ten
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
//				if (event.rowId) {
//					var path = 'hoatdongbcc/captinh/model/quy1?id=' + event.rowId;
//					this.getApp().getRouter().navigate(path);
//				}
				if (event.rowId) {
					var loaibaocao = this.getApp().getRouter().getParam("loaikybaocao");
					var path = 'hoatdongbcc/captinh/model/'+event.loaikybaocao+ '?id=' + event.rowId;
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
						var path = 'hoatdongbcc/captinh/model/' + loaikybaocao;
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
				var txt_header = "Danh sách báo cáo cấp Tỉnh - "+itemkybaocao.text;
				self.$el.find(".panel-heading h3").html(txt_header);
				self.uiControl.filters = {"$and":[{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
					{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
					{"tuyendonvi": {"$eq": "tinh"}},
					{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
				self.uiControl.orderBy = [{"field": "nambaocao", "direction": "desc"}];
				this.applyBindings();
				
				var filter = new CustomFilterView({
					el: self.$el.find("#grid_search"),
					sessionKey: self.collectionName +"_filter"
				});
				filter.render();
				 
				if(!filter.isEmptyFilter()) {
					var $col = self.getCollectionElement();
					var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
					var filters = {"$and":[
							{"nambaocao": {"$eq": text}},
							{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
							{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
							{"tuyendonvi": {"$eq": "tinh"}},
							{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
					$col.data('gonrin').filter(filters);
				}
				self.applyBindings();
	
				filter.on('filterChanged', function(evt) {
					var $col = self.getCollectionElement();
					var text = !!evt.data.text ? evt.data.text.trim() : "";
					if ($col) {
						if (text){
							var filters = {"$and":[
								{"nambaocao": {"$eq": text}},
								{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
								{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
								{"tuyendonvi": {"$eq": "tinh"}},
								{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
							$col.data('gonrin').filter(filters);
						} else {

							var filters = {"$and":[{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
							{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
							{"tuyendonvi": {"$eq": "tinh"}},
							{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
							$col.data('gonrin').filter(filters);
						}
					}
					self.applyBindings();
				});
				 return this;
			}
		},
	});

});