define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/TienDoVSTX/tpl/model.html'),
		schema = {};


	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');

	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tiendovstx",
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
			if(!!currentUser && !!currentUser.donvi){
				if(currentUser.donvi.tuyendonvi_id === 1){//tuyen TW
					var tinhthanh = self.$el.find("#tinhthanh");
					tinhthanh.show()
					tinhthanh.find("input").ref({
						textField: "ten",
						valueField: "id",
						dataSource: TinhThanhSelectView,
					});
					self.$el.find("#search").attr({"style":"margin-top: 23px;"});
				}
//				var filters = {
//						filters: {
//							"$and": [
//								{ "loaikybaocao": { "$eq": self.model.get("loaikybaocao") } },
//								{ "nambaocao": { "$eq": nambaocao_truoc } },
//								{ "kybaocao": { "$eq": kybaocao_truoc } },
//								{ "thonxom_id": { "$eq": self.model.get("thonxom_id") } }
//							]
//						}
//					}
				
				self.$el.find("#search").unbind("click").bind("click", function(){
					var nambaocao = self.$el.find("#namdanhgia").val();
					var kybaocao = $("#kydanhgia").data('gonrin').getValue();
					var tinhthanh_id = "";
					if(currentUser.donvi.tuyendonvi_id === 1){
						tinhthanh_id = self.$el.find("#tinhthanh input").data('gonrin').getValue();
					}
					
					if(toInt(nambaocao)<1900 || toInt(nambaocao)>3000){
						self.getApp().notify("Năm không hợp lệ, vui lòng kiểm tra lại");
						return;
					}
					var itemKybaocao = self.getApp().mapKyBaoCao[kybaocao];
					if(itemKybaocao === null || itemKybaocao === undefined){
						self.getApp().notify("Chọn kỳ báo cáo cần xem");
						return;
					}
					
					var url = self.getApp().serviceURL + "/api/v1/tiendovstx?nambaocao="
						+ nambaocao+"&loaikybaocao="
						+ itemKybaocao.loaikybaocao+"&kybaocao="
						+ itemKybaocao.kybaocao+"&tinhthanh_id="+tinhthanh_id;
					$.ajax({
						url: url,
						method: "GET",
//						data: "q=" + JSON.stringify(filters),
						contentType: "application/json",
						success: function (data) {
							if (data){
								var tong_hocsinh =0;
								var tong_soho = 0;
								var tong_danso = 0;
								self.$el.find("#danhsachdonvi").html("");
								$.each(data, function(idx,obj){
									tong_hocsinh += obj.tongso_hocsinh;
									tong_soho += obj.tong_soho;
									tong_danso += obj.tong_danso;
									var tr = $('<tr id="danhsachdonvi">').attr({
										"id": obj.id
									});
									tr.append("<td>" + obj.tentinhthanh + "</td>");
									tr.append("<td>" + obj.tenquanhuyen + "</td>");
									tr.append('<td>' + obj.tenxaphuong + "</td>");
									tr.append('<td>' + obj.tyle_nhatieu_caithien + "</td>");
									tr.append("<td>" + obj.tyle_diemruatay + "</td>");
									tr.append("<td>" + obj.tyle_truong_hvs + "</td>");
									tr.append("<td>" + obj.tongso_hocsinh + "</td>");
									tr.append("<td>" + obj.tyle_tramyte_hvs + "</td>");
									tr.append("<td>" + toInt(obj.tong_soho) + "</td>");
									tr.append("<td>" + obj.tong_danso + "</td>");
									tr.append("<td>" + obj.tyle_chuholanu + "</td>");
									tr.append("<td>" + obj.tyle_hodtts + "</td>");
									self.$el.find("#danhsachdonvi").append(tr);
								});
								var tr_tong = $('<tr id="tong">');
								tr_tong.append('<td colspan="2">Tổng</td>');
								tr_tong.append("<td>" + data.length + "</td>");
								tr_tong.append("<td></td>");
								tr_tong.append("<td></td>");
								tr_tong.append("<td></td>");
								tr_tong.append("<td>" + tong_hocsinh + "</td>");
								tr_tong.append("<td></td>");
								tr_tong.append("<td>" + tong_soho + "</td>");
								tr_tong.append("<td>" + tong_danso + "</td>");
								tr_tong.append("<td></td>");
								tr_tong.append("<td></td>");
								self.$el.find("#danhsachdonvi").append(tr_tong);
							}
							// console.log(data);
						},
						error: function (xhr, status, error) {
							try {
								if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
									self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
									self.getApp().getRouter().navigate("login");
								} else {
								  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
								}
							}
							catch (err) {
							  self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
							}
						}
					});
					
					
				});
				
				
			}else{
				self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại");
				self.getApp().getRouter().navigate("login");
			}
		},

	});

});