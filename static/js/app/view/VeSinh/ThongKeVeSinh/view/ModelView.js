define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/ThongKeVeSinh/tpl/model.html'),
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
		collectionName: "thongkevesinh",
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
				
				var donvi = currentUser.donvi;
				if (donvi.tuyendonvi_id ===1 || donvi.tuyendonvi_id ===2){
					self.$el.find(".quanhuyen").hide();
					self.$el.find(".xaphuong").hide();
				}else if(donvi.tuyendonvi_id ===3){
					self.$el.find(".xaphuong").hide();
				}
				
				self.$el.find("#search").unbind("click").bind("click", function(){
					var nambaocao = self.$el.find("#namdanhgia").val();
					var kybaocao = $("#kydanhgia").data('gonrin').getValue();
					// var tinhthanh_id = "";
					// if(currentUser.donvi.tuyendonvi_id === 1){
					// 	tinhthanh_id = self.$el.find("#tinhthanh input").data('gonrin').getValue();
					// }
					
					if(toInt(nambaocao)<2000 || toInt(nambaocao)>3000){
						self.getApp().notify("Năm không hợp lệ, vui lòng kiểm tra lại");
						return;
					}
					var itemKybaocao = self.getApp().mapKyBaoCao[kybaocao];
					if(itemKybaocao === null || itemKybaocao === undefined){
						self.getApp().notify("Chọn kỳ báo cáo cần xem");
						return;
					}
					
					var url = self.getApp().serviceURL + "/api/v1/thongkevesinh?nambaocao="
						+ nambaocao+"&loaikybaocao="
						+ itemKybaocao.loaikybaocao+"&kybaocao="
						+ itemKybaocao.kybaocao;
					$.ajax({
						url: url,
						method: "GET",
						contentType: "application/json",
						success: function (obj) {
							self.$el.find("#danhsachdonvi").html("");
							if (obj){
								for (var i = 0; i < obj.length; i ++){
									var tr = $('<tr id="danhsachdonvi">');
									tr.append('<td class="tinhthanh text-left">' + obj[i].tentinhthanh + '</td>');
									tr.append('<td class="quanhuyen text-left">' + obj[i].tenquanhuyen + '</td>');
									tr.append('<td class="xaphuong text-left">' + obj[i].tenxaphuong + "</td>");
									tr.append('<td>' + obj[i].tyle_conhatieu + "</td>");
									tr.append("<td>" + obj[i].tyle_conhatieu_hvs + "</td>");
									tr.append("<td>" + obj[i].tyle_tuhoai_hvs + "</td>");
									tr.append("<td>" + obj[i].tyle_thamdoi_hvs + "</td>");
									tr.append("<td>" + obj[i].tyle_2ngan_hvs + "</td>");
									tr.append("<td>" + obj[i].tyle_ongthonghoi_hvs + "</td>");
									tr.append("<td>" + obj[i].tyle_nhatieu_caithien_hvs + "</td>");
									tr.append("<td>" + obj[i].tyle_caithien_hongheo_hvs + "</td>");
									tr.append("<td>" + obj[i].tyle_diemruatay + "</td>");
									self.$el.find("#danhsachdonvi").append(tr);
								}
							}else{
								self.$el.find("#danhsachdonvi").html("");
	 	 			    		self.getApp().notify("Không tìm thấy báo cáo trên hệ thống");
	 	 			    		return;
							}
							
						},
						error: function (xhr, status, error) {
							try {
								if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED"){
									self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
									self.getApp().getRouter().navigate("login");
								} else {
									self.$el.find("#danhsachdonvi").html("");
									self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
								}
							}
							catch (err) {
							  self.getApp().notify({ message: "Lỗi truy cập dữ liệu, vui lòng thử lại sau"}, { type: "danger", delay: 1000 });
							}
						},
	 	 			    complete:function(){
	 	 			    	var donvi = self.getApp().currentUser.donvi;
							if (donvi.tuyendonvi_id ===1 || donvi.tuyendonvi_id ===2){
								self.$el.find(".quanhuyen").hide();
								self.$el.find(".xaphuong").hide();
							}else if(donvi.tuyendonvi_id ===3){
								self.$el.find(".xaphuong").hide();
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