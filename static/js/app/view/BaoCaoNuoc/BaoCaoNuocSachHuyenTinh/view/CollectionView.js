define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/tpl/collection.html'),
		schema = require('json!schema/BaoCaoNuocSachHuyenTinhSchema.json');


	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocao_nuocsach_huyentinh",
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
						var path ='baocao_nuocsach_tinh/model/'+loaibaocao;
						var currentUser = self.getApp().currentUser;
						if(currentUser !== null){
							if (currentUser.donvi.tuyendonvi_id ===2){
								path = 'baocao_nuocsach_tinh/model/'+loaibaocao;
							}else if (currentUser.donvi.tuyendonvi_id ===3){
								path = 'baocao_nuocsach_huyen/model/'+loaibaocao;
							}
						}
//						console.log("path===",path);
						this.getApp().getRouter().navigate(path);
					}
				}]
		}],
		uiControl: {
			fields: [
                {
                    field: "nambaocao",
                    label: "Năm báo cáo",

                },
                {
                    field: "ngaybaocao",
                    label: "Ngày báo cáo",

                },
                {
                    field: "tong_donvi_capnuoc",
                    label: "Tổng số đơn vị cấp nước",

                },
                {
                    field: "tong_hogiadinh_duoccungcapnuoc",
                    label: "Tổng số HGĐ được cung cấp nước",

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
				var txt_header = "Danh sách báo cáo dành cho Trung tâm y tế Huyện - "+itemkybaocao.text;
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
