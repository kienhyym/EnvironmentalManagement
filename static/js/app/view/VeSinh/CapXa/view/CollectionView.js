define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/CapXa/tpl/collection.html'),
		schema = require('json!schema/VSCapXaSchema.json');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "vscapxa",
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
					field: "tong_sothon",
					label: "Tổng Số thôn"
				},
				{
					field: "tong_soho",
					label: "Tổng Số hộ"
				},
//				{
//					field: "tong_chuholanu",
//					label: "Hộ có nữ là chủ hộ"
//				},
				{
					field: "tong_sohongheo",
					label: "Tổng số hộ nghèo"
				},
				{
					field: "tong_sohodtts",
					label: "Số hộ là DTTS"
				},
				{
					field: "tong_danso",
					label: "Tổng dân số"
				},
//				{
//					field: "tong_nu",
//					label: "Số Nữ"
//				},
//				{
//					field: "tong_nam",
//					label: "Số Nam "
//				},

			],
			pagination: {
            	page: 1,
            	pageSize: 100
            },
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
				var txt_header = "Danh sách báo cáo cấp Xã - "+itemkybaocao.text;
				self.$el.find(".panel-heading h3").html(txt_header);
				self.uiControl.filters = {"$and":[{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
					{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
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
								{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
							$col.data('gonrin').filter(filters);
						} else {

							var filters = {"$and":[{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
							{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
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