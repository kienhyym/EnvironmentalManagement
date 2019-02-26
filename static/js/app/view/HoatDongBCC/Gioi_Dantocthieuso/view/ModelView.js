define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/HoatDongBCC/Gioi_Dantocthieuso/tpl/model.html'),
		schema = {};


	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');

	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	};

	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "gioi_dantocthieuso",
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
					
					var url = self.getApp().serviceURL + "/api/v1/gioi_dantocthieuso?nambaocao="
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
								self.$el.find("#danhsachdonvi").html("");
								
								var th = self.$el.find("#header_report").html('');
								th.append('<th  class="background-colorTH sd2" >Kết quả mong đợi</th>');
								th.append('<th  class="background-colorTH sd2" >Chỉ số</th>');
								
								var tr = $('<tr>');
								tr.append('<td rowspan="6">NÂNG CAO NĂNG LỰC</td>');
								tr.append("<td>Số người được đào tạo</td>");
								var tr2 = $('<tr>');
								tr2.append("<td>Số người tham gia là nữ</td>");
								var tr3 = $('<tr>');
								tr3.append("<td>% người tham gia là nữ</td>");
								var tr4 = $('<tr>');
								tr4.append("<td>Số người tham gia là DTTS</td>");
								var tr5 = $('<tr>');
								tr5.append("<td>% người tham gia là DTTS</td>");
								var tr6 = $('<tr>');
								tr6.append("<td>Phụ nữ là giảng viên, tuyên truyền viên</td>");
								console.log("data======", data);
								for(var i=0; i<data.danhsachnganh.length; i++){
									var data_nganh = data.danhsachnganh[i];
									th.append('<th  class="background-colorTH" >Ngành '+data_nganh.tennganh+'</th>')
									tr.append('<td>' + data_nganh.tongnguoi_duocdaotao + "</td>");
									tr2.append('<td>' + data_nganh.tongnguoi_thamgia_nu + "</td>");
									var tyle_nguoithamgia_nu = 0;
									if(data.tongnguoi_duocdaotao >0){
										tyle_nguoithamgia_nu = (data_nganh.tongnguoi_thamgia_nu/data.tongnguoi_duocdaotao);
									}
									tr3.append('<td>' + tyle_nguoithamgia_nu.toFixed(2) + "</td>");
									tr4.append('<td>' + data_nganh.tongnguoi_dantocthieuso + "</td>");
									var tyle_dantocthieuso = 0;
									if(data.tongnguoi_dantocthieuso>0){
										tyle_dantocthieuso = (data_nganh.tongnguoi_dantocthieuso/data.tongnguoi_duocdaotao);
									}
									tr5.append('<td>' + tyle_dantocthieuso.toFixed(2) + "</td>");
									tr6.append('<td></td>"');
								}
								th.append('<th  class="background-colorTH" >Tổng số</th>');
								
//								tr.append('<td>' + data.tongnguoi_duocdaotao_yte + "</td>");
//								tr.append('<td>' + data.tongnguoi_duocdaotao_giaoduc + "</td>");
								tr.append("<td>" + data.tongnguoi_duocdaotao + "</td>");
								self.$el.find("#danhsachdonvi").append(tr);
								
								
//								tr2.append('<td>' + data.tongnguoi_thamgia_nu_yte + "</td>");
//								tr2.append('<td>' + data.tongnguoi_thamgia_nu_giaoduc + "</td>");
								tr2.append("<td>" + data.tongnguoi_thamgia_nu + "</td>");
								self.$el.find("#danhsachdonvi").append(tr2);
								
//								var tyle_nguoithamgia_nu_yte = 0;
//								if(data.tongnguoi_duocdaotao_yte >0){
//									tyle_nguoithamgia_nu_yte = (data.tongnguoi_thamgia_nu_yte/data.tongnguoi_duocdaotao_yte)
//								}
//								var tyle_nguoithamgia_nu_giaoduc = 0;
//								if(data.tongnguoi_duocdaotao_giaoduc >0){
//									tyle_nguoithamgia_nu_giaoduc = (data.tongnguoi_thamgia_nu_giaoduc/data.tongnguoi_duocdaotao_giaoduc);
//								}
								var tyle_nguoithamgia_nu = 0;
								if(data.tongnguoi_thamgia>0){
									tyle_nguoithamgia_nu = (data.tongnguoi_thamgia_nu/data.tongnguoi_thamgia);
								}
								
//								tr3.append('<td>' + tyle_nguoithamgia_nu_yte + "</td>");
//								tr3.append('<td>' + tyle_nguoithamgia_nu_giaoduc + "</td>");
								tr3.append("<td>" + tyle_nguoithamgia_nu.toFixed(2) + "</td>");
								self.$el.find("#danhsachdonvi").append(tr3);
								
								
//								tr4.append('<td>' + data.tongnguoi_dantocthieuso_yte + "</td>");
//								tr4.append('<td>' + data.tongnguoi_dantocthieuso_giaoduc + "</td>");
								tr4.append("<td>" + data.tongnguoi_dantocthieuso + "</td>");
								self.$el.find("#danhsachdonvi").append(tr4);
								
//								var tyle_dantocthieuso_yte = 0;
//								var tyle_dantocthieuso_giaoduc = 0;
								var tyle_dantocthieuso = 0;
//								if(data.tongnguoi_dantocthieuso>0){
//									tyle_dantocthieuso_yte = (data.tongnguoi_dantocthieuso_yte/data.tongnguoi_dantocthieuso);
//									tyle_dantocthieuso_giaoduc = (data.tongnguoi_dantocthieuso_giaoduc/data.tongnguoi_dantocthieuso);
//								}
								if(data.tongnguoi_thamgia>0){
									tyle_dantocthieuso = (data.tongnguoi_dantocthieuso/data.tongnguoi_thamgia);
								}
								
//								tr5.append('<td>' + tyle_dantocthieuso_yte + "</td>");
//								tr5.append('<td>' + tyle_dantocthieuso_giaoduc + "</td>");
								tr5.append("<td>" + tyle_dantocthieuso.toFixed(2) + "</td>");
								self.$el.find("#danhsachdonvi").append(tr5);
								
								
//								tr6.append('<td>' + data.tong_giangvien_nu_yte + "</td>");
//								tr6.append('<td>' + data.tong_giangvien_nu_giaoduc + "</td>");
								tr6.append("<td>" + data.tong_giangvien_nu + "</td>");
								self.$el.find("#danhsachdonvi").append(tr6);
								
							}
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