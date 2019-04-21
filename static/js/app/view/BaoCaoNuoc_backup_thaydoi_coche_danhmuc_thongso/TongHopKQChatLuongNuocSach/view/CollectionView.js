define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/tpl/collection.html'),
		schema = require('json!schema/TongHopKetQuaKiemTraChatLuongNuocSachSchema.json');


	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tonghop_ketqua_chatluong_nuocsach",
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
					field: "tendonvicapnuoc",
					label: "Tên đơn vị cấp nước",
				},
				{
					field: "congsuat_thietke",
					label: "Công suất thiết kế",
				},
				{
					field: "tongso_hogiadinh",
					label: "Tổng số HGĐ được cấp nước",
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
				var txt_header = "Danh sách báo cáo tổng hợp kết quả chất lượng nước sạch - "+itemkybaocao.text;
				self.$el.find(".panel-heading h3").html(txt_header);
				self.uiControl.filters = {"$and":[{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
					{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
					{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
				self.uiControl.orderBy = [{"field": "nambaocao", "direction": "desc"}];
				this.applyBindings();
				
				self.$el.find("#filterBtn").attr({ "style": "margin-top: 26px;" });
				self.$el.find("#clear").attr({ "style": "margin-top: 26px;" });
				var filterBtn = self.$el.find("#filterBtn");
				filterBtn.unbind("click").bind("click", function () {
					var filter_nam = self.$el.find("#filter_nam").val().trim();
					const isNumeric = /^\d+$/;
					var filter_tendonvicapnuoc = self.$el.find("#filter_tendonvicapnuoc").val().trim();
					var $col = self.getCollectionElement();
					if (!filter_nam && !filter_tendonvicapnuoc){
						self.getApp().notify({ message: "Mời bạn nhập thông tin cần tìm kiếm vào bộ lọc!" }, { type: "danger" });
						return;
					} else if (!filter_tendonvicapnuoc && filter_nam){
						if (isNumeric.test(filter_nam) === false){
							self.getApp().notify({ message: "Năm không hợp lệ, vui lòng kiểm tra lại!" }, { type: "danger" });
							return;
						}
						var filters = {
							"$and": [
								{
									"nambaocao": {
										"$eq": filter_nam
									}
								},
								{
									"donvi_id": {
										"$eq": self.getApp().currentUser.donvi_id
									}
								}
							]
						}
						$col.data('gonrin').filter(filters);
					} else if (filter_tendonvicapnuoc && !filter_nam){
						var filters = {
							"$and": [
								{
									"tendonvicapnuoc": {
										"$likeI": filter_tendonvicapnuoc
									}
								},
								{
									"donvi_id": {
										"$eq": self.getApp().currentUser.donvi_id
									}
								}
							]
						}
						$col.data('gonrin').filter(filters);
					} else if (filter_nam && filter_tendonvicapnuoc){
						var filters = {
							"$and": [
								{
									"nambaocao": {
										"$eq": filter_nam
									}
								},
								{
									"tendonvicapnuoc": {
										"$likeI": filter_tendonvicapnuoc
									}
								},
								{
									"donvi_id": {
										"$eq": self.getApp().currentUser.donvi_id
									}
								}
							]
						}
						$col.data('gonrin').filter(filters);
					}
				});
				self.$el.find("#clear").unbind("click").bind("click", function () {
					var $col = self.getCollectionElement();
					self.$el.find("#filter_nam").val("");
					self.$el.find("#filter_tendonvicapnuoc").val("");
					var filters = {"$and":[{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
					$col.data('gonrin').filter(filters);
				});
				self.applyBindings();
				return this;
			}
		},
	});

});
