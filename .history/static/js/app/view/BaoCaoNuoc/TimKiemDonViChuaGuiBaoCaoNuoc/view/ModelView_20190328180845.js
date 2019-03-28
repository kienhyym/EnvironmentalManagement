define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/TimKiemDonViChuaGuiBaoCaoNuoc/tpl/model.html'),
		schema = {};


	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
  

	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "timkiem_donvi_chua_gui_baocao",
		uiControl: {
			fields: [
			],
		},


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
                    { text: "Báo cáo năm", value: "nam" }
                ],
			});
			var currentUser = self.getApp().currentUser;
			if(!!currentUser && !!currentUser.donvi){
				var tinhthanh = self.$el.find("#tinhthanh");
				tinhthanh.find("input").ref({
					textField: "ten",
					valueField: "id",
					dataSource: TinhThanhSelectView,
				});
				var quanhuyen = self.$el.find("#quanhuyen");
				quanhuyen.find("input").ref({
					textField: "ten",
					valueField: "id",
					dataSource: QuanHuyenSelectView,
				});
				var donvi = currentUser.donvi;
				if(donvi.tuyendonvi_id === 3){
					quanhuyen.hide();
					tinhthanh.hide();
				}else if(donvi.tuyendonvi_id ===2){
					tinhthanh.hide();
				}
				self.$el.find("#remove_filter").unbind("click").bind("click", function(){
					var donvi_currentUser = currentUser.donvi;
					self.$el.find("#content_baocao").html("");
					// self.$el.find("#quanhuyen").html("");
					var nambaocao = self.$el.find("#namdanhgia").val("");
					var kybaocao = $("#kydanhgia").data('gonrin').setValue(null);
					var tinhthanh_id = self.$el.find("#tinhthanh input").data('gonrin').setValue("");
					var quanhuyen_id = self.$el.find("#quanhuyen input").data('gonrin').setValue("");

				});
				self.$el.find("#search").unbind("click").bind("click", function(){
					var nambaocao = self.$el.find("#namdanhgia").val();
					var kybaocao = $("#kydanhgia").data('gonrin').getValue();
					var tinhthanh_id = self.$el.find("#tinhthanh input").data('gonrin').getValue();
					var quanhuyen_id = self.$el.find("#quanhuyen input").data('gonrin').getValue();

					if(currentUser.donvi.tuyendonvi_id === 3){
						tinhthanh_id = "";
						quanhuyen_id = "";
					}else if(currentUser.donvi.tuyendonvi_id === 2){
						tinhthanh_id = "";
					}
					
					if(toInt(nambaocao)<1900 || toInt(nambaocao)>3000){
						self.getApp().notify("Năm không hợp lệ, vui lòng kiểm tra lại");
						return;
					}
					var itemKybaocao = self.getApp().mapKyBaoCao[kybaocao];
					if(itemKybaocao === null || itemKybaocao === undefined){
						self.getApp().notify("Chọn kỳ báo cáo cần tìm kiếm");
						return;
					}
					if(tinhthanh_id === null || tinhthanh_id === undefined){
						tinhthanh_id = "";
					}
					if(quanhuyen_id === null || quanhuyen_id === undefined){
						quanhuyen_id = "";
					}
					
					var url = self.getApp().serviceURL + "/api/v1/timkiemdonvi_chualambaocao?nambaocao="
						+ nambaocao+"&loaikybaocao="
						+ itemKybaocao.loaikybaocao+"&kybaocao="
						+ itemKybaocao.kybaocao+"&tinhthanh_id="+tinhthanh_id+"&quanhuyen_id="+quanhuyen_id;
					$.ajax({
						url: url,
						method: "GET",
						contentType: "application/json",
						success: function (response) {
							// console.log(response);
							if (response && !!response){
								var html_header_tuyendonvi = `<table class="table-align is-table">
													<thead>
														<tr>
															<th class="background-colorTH" style="width:100px;">STT</th>
															<th class="background-colorTH">Mã Đơn Vị</th>
															<th class="background-colorTH">Tên Đơn Vị</th>
														</tr>
													</thead>
													<tbody id="danhsachdonvi"></tbody>
												</table>`;
								var html_header_donvicapnuoc = `<table class="table-align is-table">
									<thead>
										<tr>
											<th class="background-colorTH" style="width:100px;">STT</th>
											<th class="background-colorTH">Mã Đơn Vị</th>
											<th class="background-colorTH">Tên Đơn Vị</th>
											<th class="background-colorTH">Tỉnh/Thành Phố</th>
											<th class="background-colorTH">Quận/Huyện</th>
										</tr>
									</thead>
									<tbody id="danhsachdonvi"></tbody>
								</table>`;
								if(response.type === "donvicapnuoc"){
									self.$el.find("#content_baocao").html(html_header_donvicapnuoc);
								}else{
									self.$el.find("#content_baocao").html(html_header_tuyendonvi);
								}
								var $content = self.$el.find("#danhsachdonvi");
								$.each(response.data, function(idx, data){
									if(data.type === "donvicapnuoc"){
										$content.append(`<tr>
											<td style="width:100px;">${(idx+1)}</td>
											<td>${data.ma === null ? "": data.ma}</td>
											<td>${data.ten === null ? "": data.ten}</td>
											<td>${data.tinhthanh === null ? "": data.tinhthanh.ten}</td>
											<td>${data.quanhuyen === null ? "": data.quanhuyen.ten}</td>
										</tr>`);
									}else{
										$content.append(`<tr>
												<td style="width:100px;">${(idx+1)}</td>
												<td>${data.ma === null ? "": data.ma}</td>
												<td>${data.ten === null ? "": data.ten}</td>
											</tr>`);
									}
								});
								
							}else{
								self.$el.find("#content_baocao").html("");
	 	 			    		self.getApp().notify("Không tìm thấy báo cáo trên hệ thống");
	 	 			    		return;
							}
							
						},
						error: function (xhr, status, error) {
							self.$el.find("#content_baocao").html("");
							try {
								if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
									self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
									self.getApp().getRouter().navigate("login");
								} else {
								  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
								}
							}
							catch (err) {
							  self.getApp().notify({ message: "Lỗi truy cập dữ liệu, vui lòng thử lại sau!"}, { type: "danger", delay: 1000 });
							}
	 	 			    
	 	 			    },
					});
					
					
				});
				
				
			}else{
				self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại");
				self.getApp().getRouter().navigate("login");
			}
		},

	});

});