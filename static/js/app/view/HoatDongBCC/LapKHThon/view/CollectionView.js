define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!../tpl/collection.html'),
		schema = require('json!schema/TienDoKeHoachBCCSchema.json');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');

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
					var loaibaocao = this.getApp().getRouter().getParam("loaikybaocao");
					var path = 'hoatdongbcc/capthon/model/'+loaibaocao+ '?id=' + event.rowId;
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
				

				self.$el.find("#filterBtn").attr({ "style": "margin-top: 26px;" });
				self.$el.find("#clear").attr({ "style": "margin-top: 26px;" });
				var filter_thon = self.$el.find("#filter_thon");
				filter_thon.find("input").ref({
					textField: "ten",
					valueField: "id",
					dataSource: ThonXomSelectView,
				});

				var filterBtn = self.$el.find("#filterBtn");
				filterBtn.unbind("click").bind("click", function () {
					var filter_nam = self.$el.find("#filter_nam").val().trim();
					const isNumeric = /^\d+$/;
					var filter_thon_data = self.$el.find("#filter_thon_data").val();
					var $col = self.getCollectionElement();
					if (!filter_nam && !filter_thon_data){
						self.getApp().notify({ message: "Mời bạn nhập thông tin cần tìm kiếm vào bộ lọc!" }, { type: "danger" });
						return;
					} else if (!filter_thon_data && filter_nam){
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
                                    "loaikybaocao": {
                                        "$eq": itemkybaocao.loaikybaocao
                                    }
                                },
                                {
                                    "kybaocao": {
                                        "$eq": itemkybaocao.kybaocao
                                    }
								},
								{
									"tuyendonvi": {
										"$eq": "thon"
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
					} else if (filter_thon_data && !filter_nam){
						var filters = {
                            "$and": [
                                {
                                    "thonxom_id": {
                                        "$eq": filter_thon_data
                                    }
                                },
                                {
                                    "loaikybaocao": {
                                        "$eq": itemkybaocao.loaikybaocao
                                    }
                                },
                                {
                                    "kybaocao": {
                                        "$eq": itemkybaocao.kybaocao
                                    }
								},
								{
									"tuyendonvi": {
										"$eq": "thon"
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
					} else if (filter_nam && filter_thon_data){
						var filters = {
                            "$and": [
                                {
                                    "nambaocao": {
                                        "$eq": filter_nam
                                    }
                                },
                                {
                                    "thonxom_id": {
                                        "$eq": filter_thon_data
                                    }
                                },
                                {
                                    "loaikybaocao": {
                                        "$eq": itemkybaocao.loaikybaocao
                                    }
                                },
                                {
                                    "kybaocao": {
                                        "$eq": itemkybaocao.kybaocao
                                    }
								},
								{
									"tuyendonvi": {
										"$eq": "thon"
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
					self.$el.find("#filter_thon input").data('gonrin').setValue(null);
					var filters = {"$and":[{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
					{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
					{"tuyendonvi": {"$eq": "thon"}},
					{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
					$col.data('gonrin').filter(filters);
				});
				self.applyBindings();
				return this;
			}
		},
	});
});