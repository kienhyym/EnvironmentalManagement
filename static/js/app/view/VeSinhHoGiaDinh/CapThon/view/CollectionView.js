define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinhHoGiaDinh/CapThon/tpl/collection.html'),
		schema = require('json!schema/VSCapThonSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "vscapthon",
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
						console.log("loaibaocao=",loaibaocao);
						console.log("path====",path);
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
					field: "thonxom_id",
					label: "Thôn",
					foreign: "thonxom",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "tong_soho",
					label: "Tổng số hộ"
				},
				{
					field: "tong_chuholanu",
					label: "Số hộ nữ là chủ hộ"
				},
				{
					field: "tong_sohongheo",
					label: "Số hộ nghèo"
				},

				{
					field: "tong_sohodtts",
					label: "Số hộ là DTTS"
				},
				{
					field: "tong_danso",
					label: "Tổng số dân"
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
			var loaikybaocao = 2;//quy
			var kybaocao = 1;
			if (loaibaocao === "quy1"){
				loaikybaocao = 2;
				kybaocao = 1;
				self.$el.find(".panel-heading h3").html("Danh sách báo cáo cấp Thôn - Quý I");
			} else if (loaibaocao === "quy2"){
				loaikybaocao = 2;
				kybaocao = 2;
				self.$el.find(".panel-heading h3").html("Danh sách báo cáo cấp Thôn - Quý II");
			} else if (loaibaocao === "quy3"){
				loaikybaocao = 2;
				kybaocao = 3;
				self.$el.find(".panel-heading h3").html("Danh sách báo cáo cấp Thôn - Quý III");
			} else if (loaibaocao === "quy4"){
				loaikybaocao = 2;
				kybaocao = 4;
				self.$el.find(".panel-heading h3").html("Danh sách báo cáo cấp Thôn - Quý IV");
			} else if (loaibaocao === "6thangdau"){
				loaikybaocao = 3;
				kybaocao = 1;
				self.$el.find(".panel-heading h3").html("Danh sách báo cáo cấp Thôn - 6 tháng đầu năm");
			} else if (loaibaocao === "6thangcuoi"){
				loaikybaocao = 3;
				kybaocao = 2;
				self.$el.find(".panel-heading h3").html("Danh sách báo cáo cấp Thôn - 6 tháng cuối năm");

			} else if (loaibaocao === "nam"){
				loaikybaocao = 4;
				kybaocao = 1;
				self.$el.find(".panel-heading h3").html("Danh sách báo cáo cấp Thôn - tổng kết năm");
			}else{
				self.getApp().notify("Lỗi tham số, vui lòng thực hiện lại sau");
				return;
			}
			self.uiControl.filters = {"$and":[{"loaikybaocao":{"$eq":loaikybaocao}}, {"kybaocao":{"$eq":kybaocao}}]};
			self.uiControl.orderBy = [{"field": "nambaocao", "direction": "desc"}];
			this.applyBindings();
			return this;
		},
	});

});