define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/CapTinh/tpl/collection.html'),
		schema = require('json!schema/VSCapTinhSchema.json');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');


	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "vscaptinh",
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
					field: "tong_sohuyen",
					label: "Tổng số huyện"
				},
				{
					field: "tong_soxa",
					label: "Tổng số xã"
				},
				{
					field: "tong_soho",
					label: "Tổng số hộ trong tỉnh"
				},
				{
					field: "tong_danso",
					label: "Tổng số dân trong tỉnh"
				},
				{
					field: "tong_sohongheo",
					label: "Số hộ nghèo"
				},
				{
					field: "tong_sohodtts",
					label: "Số hộ DTTS"
				},

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
				var txt_header = "Danh sách báo cáo cấp Tỉnh - "+itemkybaocao.text;
				self.$el.find(".panel-heading h3").html(txt_header);
				self.uiControl.filters = {"$and":[{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
					{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
					{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
				self.uiControl.orderBy = [{"field": "nambaocao", "direction": "desc"}];
				this.applyBindings();
				

				var filter = new CustomFilterView({
					el: self.$el.find("#grid_search"),
					sessionKey: self.collectionName + loaibaocao +"_filter"
				});
				self.$el.find("#search_input").attr("placeholder", "Nhập năm báo cáo...");
				filter.render();
				 
				// if(!filter.isEmptyFilter()) {
				// 	var $col = self.getCollectionElement();
				// 	var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
				// 	var filters = {"$and":[
				// 			{"nambaocao": {"$eq": text}},
				// 			{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
				// 			{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
				// 			{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
				// 	$col.data('gonrin').filter(filters);
				// }
				self.applyBindings();
	
				filter.on('filterChanged', function(evt) {
					var $col = self.getCollectionElement();
					const isNumeric = /^\d+$/;
					var text = !!evt.data.text ? evt.data.text.trim() : "";
					if ($col) {
						if (isNumeric.test(text) === false && text.length>0){
							self.getApp().notify({ message: "Năm không hợp lệ, vui lòng kiểm tra lại!" }, { type: "danger" });
							return;
						} else if (text){
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