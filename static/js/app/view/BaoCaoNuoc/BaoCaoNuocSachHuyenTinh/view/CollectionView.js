define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/tpl/collection.html'),
		schema = require('json!schema/BaoCaoNuocSachHuyenTinhSchema.json');
	var CustomFilterView      = require('app/bases/views/CustomFilterView');


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
							var currentRoute = self.getApp().getRouter().currentRoute().fragment;
							if(currentRoute.indexOf('baocao_nuocsach_huyen')>=0){
								path = 'baocao_nuocsach_huyen/model/'+loaibaocao;
							}else if(currentRoute.indexOf('baocao_nuocsach_tinh')>=0){
								path = 'baocao_nuocsach_tinh/model/'+loaibaocao;
							}
//							if (currentUser.donvi.tuyendonvi_id ===2){
//								path = 'baocao_nuocsach_tinh/model/'+loaibaocao;
//							}else if (currentUser.donvi.tuyendonvi_id ===3){
//								path = 'baocao_nuocsach_huyen/model/'+loaibaocao;
//							}
						}
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
                    field: "tong_donvi_capnuoc",
                    label: "Tổng số đơn vị cấp nước",

                },
                {
                    field: "tong_hogiadinh_duoccungcapnuoc",
                    label: "Tổng số HGĐ được cung cấp nước",

                },
                {
                    field: "tong_hogiadinh_diaban",
                    label: "Tổng số HGĐ trên địa bàn",

                },
            ],
            pagination: {
            	page: 1,
            	pageSize: 100
            },
			onRowClick: function (event) {
				if (event.rowId) {
					var path = "";
					var loaibaocao = this.getApp().getRouter().getParam("loaikybaocao");
					var currentRoute = this.getApp().getRouter().currentRoute().fragment;
					if(currentRoute.indexOf('baocao_nuocsach_huyen')>=0){
						path = 'baocao_nuocsach_huyen/model/'+loaibaocao;
					}else if(currentRoute.indexOf('baocao_nuocsach_tinh')>=0){
						path = 'baocao_nuocsach_tinh/model/'+loaibaocao;
					}
					path += '?id=' + event.rowId;
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
				// console.log("self.getApp().currentUser.tuyendonvi_id===",self.getApp().currentUser.donvi.tuyendonvi_id);
				if(self.getApp().currentUser.donvi.tuyendonvi_id === 3){
					txt_header = "Danh sách báo cáo dành cho Trung tâm y tế Huyện - "+itemkybaocao.text;
				}else{
					txt_header = "Danh sách báo cáo dành cho Trung tâm kiểm soát bệnh tật Tỉnh - "+itemkybaocao.text;
				}
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
