define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/HoatDongBCC/BaoCaoTongHop/tpl/model.html'),
		schema = {};


	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');


	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tiendokehoachbcc",
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
				var donvi = currentUser.donvi;
				if (donvi.tuyendonvi_id === 1) {//tuyen TW
					var tinhthanh = self.$el.find("#tinhthanh");
					tinhthanh.show()
					tinhthanh.find("input").ref({
						textField: "ten",
						valueField: "id",
						dataSource: TinhThanhSelectView,
					});
					self.$el.find("#search").attr({ "style": "margin-top: 23px;" });
				}



				self.$el.find("#search").unbind("click").bind("click", function () {
					self.$el.find("#danhsachdonvi").html("");
					var nambaocao = self.$el.find("#namdanhgia").val();
					var kybaocao = $("#kydanhgia").data('gonrin').getValue();
					var tinhthanh_id = "";
					if (currentUser.donvi.tuyendonvi_id === 1) {
						tinhthanh_id = self.$el.find("#tinhthanh input").data('gonrin').getValue();
					}

					if (toInt(nambaocao) < 2000 || toInt(nambaocao) > 3000) {
						self.getApp().notify({ message: "Năm không hợp lệ, vui lòng kiểm tra lại" }, { type: "danger" });
						return;
					}
					var itemKybaocao = self.getApp().mapKyBaoCao[kybaocao];
					if (itemKybaocao === null || itemKybaocao === undefined) {
						self.getApp().notify({ message: "Chọn kỳ báo cáo cần xem" }, { type: "danger" });
						return;
					}

					var url = self.getApp().serviceURL + "/api/v1/thongkebcc?nambaocao="
						+ nambaocao + "&loaikybaocao="
						+ itemKybaocao.loaikybaocao + "&kybaocao="
						+ itemKybaocao.kybaocao + "&tinhthanh_id=" + tinhthanh_id;
					$.ajax({
						url: url,
						method: "GET",
						contentType: "application/json",
						success: function (obj) {
							self.$el.find("#danhsachdonvi").html("");
							if (obj) {
								console.log("obj_tinh ====", obj);
								if (obj.tuyendonvi == 'tinh') {
									self.$el.find("#danhsachdonvi").append(`<tr>
										<td colspan="8" class="text-left" style="color: #e30303; font-weight: bold; font-size: 16px; text-align: left"><h3>Cấp Tỉnh</h3></td>
										</tr>`);
									obj.danhsach_hoatdong.forEach(function (hoatdong_tinh, idx) {
										self.$el.find("#danhsachdonvi").append(`<tr>
											<td class="text-center">${idx + 1}</td>
											<td class="text-center" style="min-width: 25%">${hoatdong_tinh.tenhoatdong}</td>
											<td class="text-center" style="min-width: 25%">${hoatdong_tinh.muctieu}</td>
											<td class="text-center">${hoatdong_tinh.tiendo}</td>
											<td class="text-center">${hoatdong_tinh.nganh.tennganh}</td>
											<td class="text-center">${hoatdong_tinh.songuoithamgia}</td>
											<td class="text-center">${hoatdong_tinh.songuoithamgia_nu}</td>
											<td class="text-center">${hoatdong_tinh.songuoithamgia_dtts}</td>
											</tr>`);
										if (obj.huyen) {
											self.$el.find("#danhsachdonvi").append(`<tr>
													<td colspan="8" class="text-left" style="color: #e30303; font-weight: bold; font-size: 16px; text-align: left"><h3>Cấp Huyện</h3></td>
													</tr>`);
											obj.huyen.forEach(function (obj_huyen, idx) {
												self.$el.find("#danhsachdonvi").append(`<tr>
														<td colspan="8" class="text-left" style="color: #e30303; font-weight: bold; font-size: 16px; text-align: left">${obj_huyen.quanhuyen.ten}</td>
														</tr>`);
												if (obj_huyen.tuyendonvi == 'huyen') {
													obj_huyen.danhsach_hoatdong.forEach(function (hoatdong_huyen, idx) {
														self.$el.find("#danhsachdonvi").append(`<tr>
															<td class="text-center">${idx + 1}</td>
															<td class="text-center" style="min-width: 25%">${hoatdong_huyen.tenhoatdong}</td>
															<td class="text-center" style="min-width: 25%">${hoatdong_huyen.muctieu}</td>
															<td class="text-center">${hoatdong_huyen.tiendo}</td>
															<td class="text-center">${hoatdong_huyen.nganh.tennganh}</td>
															<td class="text-center">${hoatdong_huyen.songuoithamgia}</td>
															<td class="text-center">${hoatdong_huyen.songuoithamgia_nu}</td>
															<td class="text-center">${hoatdong_huyen.songuoithamgia_dtts}</td>
															</tr>`);
													})
												}
											})
											self.$el.find("#danhsachdonvi").append(`<tr>
													<td colspan="8" class="text-left" style="color: #e30303; font-weight: bold; font-size: 16px; text-align: left"><h3>Cấp Xã</h3></td>
													</tr>`);
											obj.huyen.forEach(function (obj_huyen_xa, idx) {
												obj_huyen_xa.xa.forEach(function (obj_xa, idx) {
													self.$el.find("#danhsachdonvi").append(`<tr>
														<td colspan="8" class="text-left" style="color: #e30303; font-weight: bold; font-size: 16px; text-align: left">${obj_xa.xaphuong.ten}</td>
														</tr>`);
													obj_xa.danhsach_hoatdong.forEach(function (hoatdong_xa, idx) {
														self.$el.find("#danhsachdonvi").append(`<tr>
															<td class="text-center">${idx + 1}</td>
															<td class="text-center" style="min-width: 25%">${hoatdong_xa.tenhoatdong}</td>
															<td class="text-center" style="min-width: 25%">${hoatdong_xa.muctieu}</td>
															<td class="text-center">${hoatdong_xa.tiendo}</td>
															<td class="text-center">${hoatdong_xa.nganh.tennganh}</td>
															<td class="text-center">${hoatdong_xa.songuoithamgia}</td>
															<td class="text-center">${hoatdong_xa.songuoithamgia_nu}</td>
															<td class="text-center">${hoatdong_xa.songuoithamgia_dtts}</td>
															</tr>`);
													})
												})
											})
											self.$el.find("#danhsachdonvi").append(`<tr>
													<td colspan="8" class="text-left" style="color: #e30303; font-weight: bold; font-size: 16px; text-align: left"><h3>Cấp Thôn</h3></td>
													</tr>`);
											obj.huyen.forEach(function (obj_huyen_xa, idx) {
												obj_huyen_xa.xa.forEach(function (obj_xa, idx) {
													obj_xa.thon.forEach(function (obj_thon, idx) {
														self.$el.find("#danhsachdonvi").append(`<tr>
															<td colspan="8" class="text-left" style="color: #e30303; font-weight: bold; font-size: 16px; text-align: left">${obj_thon.thonxom.ten}</td>
															</tr>`);
														obj_thon.danhsach_hoatdong.forEach(function (hoatdong_thon, idx) {
															self.$el.find("#danhsachdonvi").append(`<tr>
																	<td class="text-center">${idx + 1}</td>
																	<td class="text-center" style="min-width: 25%">${hoatdong_thon.tenhoatdong}</td>
																	<td class="text-center" style="min-width: 25%">${hoatdong_thon.muctieu}</td>
																	<td class="text-center">${hoatdong_thon.tiendo}</td>
																	<td class="text-center">${hoatdong_thon.nganh.tennganh}</td>
																	<td class="text-center">${hoatdong_thon.songuoithamgia}</td>
																	<td class="text-center">${hoatdong_thon.songuoithamgia_nu}</td>
																	<td class="text-center">${hoatdong_thon.songuoithamgia_dtts}</td>
																	</tr>`);
														})
													})
												})
											})
										}
									})
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
							//	 	 			    	var donvi = self.getApp().currentUser.donvi;
							//							if (donvi.tuyendonvi_id ===1 || donvi.tuyendonvi_id ===2){
							//								self.$el.find(".quanhuyen").hide();
							//								self.$el.find(".xaphuong").hide();
							//							}else if(donvi.tuyendonvi_id ===3){
							//								self.$el.find(".xaphuong").hide();
							//							}
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