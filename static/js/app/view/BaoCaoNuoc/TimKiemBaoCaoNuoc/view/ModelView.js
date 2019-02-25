define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/TimKiemBaoCaoNuoc/tpl/model.html'),
		schema = {};


	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
  
	var DonViCapNuocSelectView = require('app/view/DanhMuc/DonViCapNuoc/view/SelectView');
	var BaoCaoTongHopDonViCapNuocView = require('app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/view/ModelView');
	var BaoCaoNuocSachHuyenTinhView = require('app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/ModelView');
	var VienNuocSachView = require('app/view/BaoCaoNuoc/BaoCaoVienChuyenNganhNuoc/view/ModelView');

	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "timkiembaocaonuoc",
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
				var donvicapnuoc = self.$el.find("#donvicapnuoc");
				donvicapnuoc.find("input").ref({
					textField: "ten",
					valueField: "id",
					dataSource: DonViCapNuocSelectView,
				});
				var donvi = currentUser.donvi;
				if(donvi.tuyendonvi_id === 3){
					quanhuyen.hide();
					tinhthanh.hide();
//					self.$el.find("#search").attr({"style":"margin-top: 23px;"});
				}else if(donvi.tuyendonvi_id ===2){
					tinhthanh.hide();
				}
				
				self.$el.find("#search").unbind("click").bind("click", function(){
					var nambaocao = self.$el.find("#namdanhgia").val();
					var kybaocao = $("#kydanhgia").data('gonrin').getValue();
					var tinhthanh_id = self.$el.find("#tinhthanh input").data('gonrin').getValue();
					var quanhuyen_id = self.$el.find("#quanhuyen input").data('gonrin').getValue();
					var donvicapnuoc_id = self.$el.find("#donvicapnuoc input").data('gonrin').getValue();

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
						self.getApp().notify("Chọn kỳ báo cáo cần xem");
						return;
					}
					if(tinhthanh_id === null || tinhthanh_id === undefined){
						tinhthanh_id = "";
					}
					if(quanhuyen_id === null || quanhuyen_id === undefined){
						quanhuyen_id = "";
					}
					
					if(donvicapnuoc_id === null || donvicapnuoc_id === undefined){
						donvicapnuoc_id = "";
					}
					
					var url = self.getApp().serviceURL + "/api/v1/timkiembaocao_nuoc?nambaocao="
						+ nambaocao+"&loaikybaocao="
						+ itemKybaocao.loaikybaocao+"&kybaocao="
						+ itemKybaocao.kybaocao+"&tinhthanh_id="+tinhthanh_id+"&quanhuyen_id="+quanhuyen_id+"&donvicapnuoc_id="+donvicapnuoc_id;
					$.ajax({
						url: url,
						method: "GET",
						contentType: "application/json",
						success: function (response) {
							// console.log(response);
							if (response && !!response){
								var view = null;
								if(response.tuyendonvi ==="donvicapnuoc"){
									view = new BaoCaoTongHopDonViCapNuocView();
									view.model.set(response.data);
									view.render_thongso_khongdat(view.model.get("thongso_khongdat_noikiem"), "thongso_khongdat_noikiem");
									view.render_thongso_khongdat(view.model.get("thongso_khongdat_ngoaikiem"), "thongso_khongdat_ngoaikiem");
									view.render_donvi_ngoaikiem();
									view.apply_tyle();
									
								}else if(response.tuyendonvi ==="viennuocsach"){
									view = new VienNuocSachView();
									view.model.set(response.data);
									view.render_thongso_khongdat(view.model.get("thongso_khongdat_ngoaikiem_vien"),"thongso_khongdat_ngoaikiem_vien");
									view.render_ketqua_noikiem_tinhthanh(view.model.get("ketqua_kiemtra_noikiem_tinh"));
									view.apply_tyle();
								}else  if(response.tuyendonvi ==="quanhuyen" || response.tuyendonvi ==="tinhthanh"){
									view = new BaoCaoNuocSachHuyenTinhView();
									view.model.set(response.data);
									view.render_thongso_khongdat(view.model.get("thongso_khongdat_ngoaikiem_trungtam"),"thongso_khongdat_ngoaikiem_trungtam");
									view.render_thongso_khongdat(view.model.get("thongso_khongdat_noikiem"),"thongso_khongdat_noikiem");
									view.render_thongso_khongdat(view.model.get("thongso_khongdat_ngoaikiem_baocao"),"thongso_khongdat_ngoaikiem_baocao");
									view.render_hoso_quanly_noikiem(view.model.get("hoso_quanly_noikiem"));
									view.render_hoso_quanly_ngoaikiem_baocao(view.model.get("hoso_quanly_ngoaikiem_baocao"));
									view.render_donvi_ngoaikiem();
									view.apply_tyle();
								}else{
									self.getApp().notify("Không tìm thấy báo cáo trên hệ thống!");
		 	 			    		return;
								}
								
								view.render();
								view.$el.find(".toolbar").hide();
								view.$el.find("#kydanhgia").val(itemKybaocao.text);
								self.$el.find("#content_baocao").html(view.$el);
							}else{
								self.$el.find("#content_baocao").html("");
	 	 			    		self.getApp().notify("Không tìm thấy báo cáo trên hệ thống");
	 	 			    		return;
							}
							
						},
						error: function (xhr, status, error) {
							self.$el.find("#content_baocao").html("");
							if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
								self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
								self.getApp().getRouter().navigate("login");
							}
	 	 			       try {
	 	 			    	    var msgJson = $.parseJSON(xhr.responseText); 
	 	 			    	    if(msgJson){
	 	 			    	    	self.getApp().notify(msgJson.error_message);
	 	 			    	    }
	 	 			    	} catch(err) {
	 	 			    		self.getApp().notify("Lỗi truy cập dữ liệu, vui lòng thử lại sau");
	 	 			    		
	 	 			    	
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