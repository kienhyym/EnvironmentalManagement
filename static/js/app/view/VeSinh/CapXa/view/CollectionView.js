define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/CapXa/tpl/collection.html'),
		schema = require('json!schema/VSCapXaSchema.json');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	

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
				
				self.$el.find("#filterBtn").attr({ "style": "margin-top: 26px;" });
				self.$el.find("#clear").attr({ "style": "margin-top: 26px;" });
				var filter_xa = self.$el.find("#filter_xa");
				filter_xa.find("input").ref({
					textField: "ten",
					valueField: "id",
					dataSource: XaPhuongSelectView,
				});

				var filterBtn = self.$el.find("#filterBtn");
				filterBtn.unbind("click").bind("click", function () {
					var filter_nam = self.$el.find("#filter_nam").val();
					var filter_xa_data = self.$el.find("#filter_xa_data").val();
					var $col = self.getCollectionElement();
					if (!!filter_nam && !!filter_xa_data) {
						var filters = {
							"$and": [
								{
									"nambaocao": {
										"$eq": filter_nam
									}
								},
								{
									"xaphuong_id": {
										"$eq": filter_xa_data
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
					var filters = {"$and":[{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
					{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
					{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
					$col.data('gonrin').filter(filters);
				});
				self.applyBindings();
				return this;
			}
		},
	});

});