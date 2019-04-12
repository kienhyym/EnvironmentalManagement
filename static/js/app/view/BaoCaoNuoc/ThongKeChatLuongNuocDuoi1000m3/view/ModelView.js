define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/ThongKeChatLuongNuocDuoi1000m3/tpl/model.html'),
		schema = {};



	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "thongkechatluongnuocduoi1000m3",
		uiControl: {
			fields: [
			],
		},

		tools: [{
			name: "defaultgr",
			type: "group",
			groupClass: "toolbar-group",
			buttons: [{
				name: "back",
				type: "button",
				buttonClass: "btn-default btn-sm",
				label: "TRANSLATE:BACK",
				command: function () {
					var self = this;
					Backbone.history.history.back();
				}
			},
			],
		}],

		render: function () {
			var self = this;
			$('#kydanhgia').combobox({
				textField: "text",
				valueField: "value",
				dataSource: [
					{ text: "Qúy I", value: "quy1" },
					{ text: "Qúy II", value: "quy2" },
					{ text: "Qúy III", value: "quy3" },
					{ text: "Qúy IV", value: "quy4" },
					{ text: "6 tháng đầu năm", value: "6thangdau" },
					{ text: "6 tháng cuối năm", value: "6thangcuoi" },
					{ text: "Báo cáo năm", value: "nam" }
				],
			});
			var currentUser = self.getApp().currentUser;
			if (!!currentUser && !!currentUser.donvi) {
				// if(currentUser.donvi.tuyendonvi_id === 1){//tuyen TW
				// 	var tinhthanh = self.$el.find("#tinhthanh");
				// 	tinhthanh.show()
				// 	tinhthanh.find("input").ref({
				// 		textField: "ten",
				// 		valueField: "id",
				// 		dataSource: TinhThanhSelectView,
				// 	});
				// 	self.$el.find("#search").attr({"style":"margin-top: 23px;"});
				// }

				self.$el.find("#search").unbind("click").bind("click", function () {
					var nambaocao = self.$el.find("#namdanhgia").val();
					var kybaocao = $("#kydanhgia").data('gonrin').getValue();

					if (toInt(nambaocao) < 2000 || toInt(nambaocao) > 3000) {
						self.getApp().notify({ message: "Năm không hợp lệ, vui lòng kiểm tra lại" }, { type: "danger" });
						return;
					}
					var itemKybaocao = self.getApp().mapKyBaoCao[kybaocao];
					if (itemKybaocao === null || itemKybaocao === undefined) {
						self.getApp().notify({ message: "Chọn kỳ báo cáo cần xem" }, { type: "danger" });
						return;
					}

					var url = self.getApp().serviceURL + "/api/v1/thongkenuocsach_duoi1000m3?nambaocao="
						+ nambaocao + "&loaikybaocao="
						+ itemKybaocao.loaikybaocao + "&kybaocao="
						+ itemKybaocao.kybaocao;
					$.ajax({
						url: url,
						method: "GET",
						contentType: "application/json",
						success: function (response) {
							self.$el.find("#danhsachdonvi").html("");
							// console.log("response", response);
							if (response) {
								for (var i = 0; i < response.length; i++) {
									var tr = $('<tr id="danhsachdonvi">');
									tr.append('<td>' + (i + 1) + '</td>');
									tr.append('<td>' + response[i].tentinhthanh + '</td>');
									tr.append('<td>' + response[i].tong_donvicapnuoc + '</td>');
									tr.append('<td>' + response[i].tong_donvicapnuoc_kiemtra + "</td>");
									tr.append('<td>' + response[i].tyle_donvicapnuoc + "%" + "</td>");
									tr.append("<td>" + response[i].tong_mauthunghiem_ngoaikiem + "</td>");
									tr.append("<td>" + response[i].tong_maudat_qc_ngoaikiem + "</td>");
									tr.append("<td>" + response[i].tyle_mauthunghiem_ngoaikiem + "%" + "</td>");
								
									var danhsach_thongso_khongdat = response[i].tong_thongso_khongdat;
									var tenthongso = "";
									if (danhsach_thongso_khongdat && danhsach_thongso_khongdat.length){
										for (var j = 0; j < danhsach_thongso_khongdat.length; j++){
											tenthongso +=  danhsach_thongso_khongdat[j].tenthongso + ", ";
										}
									}
									
									tr.append("<td>" + tenthongso.slice(0, -2) + "</td>");
									tr.append("<td>" + response[i].tong_mauthunghiem_noikiem + "</td>");
									tr.append("<td>" + response[i].tong_maudat_qc_noikiem + "</td>");
									tr.append("<td>" + response[i].tyle_mauthunghiem_noikiem + "%" + "</td>");

									tr.append("<td>" + response[i].tongdat_hoso_daydu_theoquydinh + "</td>");
									tr.append("<td>" + response[i].tyle_hoso_daydu_theoquydinh + "%" + "</td>");

									tr.append("<td>" + response[i].tongdat_somau_thunghiem_dungquydinh + "</td>");
									tr.append("<td>" + response[i].tyle_somau_thunghiem_dungquydinh + "%" + "</td>");

									tr.append("<td>" + response[i].tongdat_thunghiem_daydu_thongso + "</td>");
									tr.append("<td>" + response[i].tyle_thunghiem_daydu_thongso + "%" + "</td>");

									tr.append("<td>" + response[i].tongdat_tansuat_thuchien_noikiem_dungquydinh + "</td>");
									tr.append("<td>" + response[i].tyle_tansuat_thuchien_noikiem_dungquydinh + "%" + "</td>");

									tr.append("<td>" + response[i].tongdat_thuchien_baocao_daydu + "</td>");
									tr.append("<td>" + response[i].tyle_thuchien_baocao_daydu + "%" + "</td>");

									tr.append("<td>" + response[i].tongdat_thuchien_congkhai_thongtin + "</td>");
									tr.append("<td>" + response[i].tyle_thuchien_congkhai_thongtin + "%" + "</td>");

									self.$el.find("#danhsachdonvi").append(tr);
								}
							} else {
								self.getApp().notify("Không tìm thấy báo cáo trên hệ thống");
								return;
							}

						},
						error: function (xhr, status, error) {
							try {
								if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED") {
									self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
									self.getApp().getRouter().navigate("login");
								} else {
									self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
								}
							}
							catch (err) {
								self.getApp().notify({ message: "Lỗi truy cập dữ liệu, vui lòng thử lại sau" }, { type: "danger", delay: 1000 });
							}
						},
						complete: function () {
						}
					});


				});


			} else {
				self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại");
				self.getApp().getRouter().navigate("login");
			}
		},

	});

});