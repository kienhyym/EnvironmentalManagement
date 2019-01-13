define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!./model.html'),
		schema = require('json!schema/TienDoKeHoachBCCSchema.json');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var NganhSelectView = require('app/view/DanhMuc/Nganh/SelectView');
	var DMHoatDongSelectView = require('app/view/DanhMuc/DanhMucHoatDong/view/SelectView');
	var HoatDongItemView = require('app/view/HoatDongBCC/HoatDong/HoatDongItemView');

	var params = {
		"filters": {
			"$and": [
				{"loai_hoatdong": {"$eq": "thon"}}
			]
		}
	};

	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		filterParams: null,
		onInit: true,
		collectionName: "tiendo_kehoach_bcc",
		uiControl: {
			fields: []
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
			}]
		}],

		render: function () {
			var self = this;
			self.setDefaultData();
			self.onChangeEvents();
		},
		
		/**
		 * SET AUTO FIELD BASE ON CURRENT USER & FORM
		 */
		setDefaultData: function() {
			var self = this;
			var currentUser = self.getApp().currentUser;
			if(!!currentUser && !!currentUser.donvi) {
				if (!!currentUser.donvi.tinhthanh_id) {
					self.model.set("tinhthanh_id", currentUser.donvi.tinhthanh_id);
					self.model.set("tinhthanh", currentUser.donvi.tinhthanh);
				}
				if (!!currentUser.donvi.quanhuyen_id){
					self.model.set("quanhuyen_id", currentUser.donvi.quanhuyen_id);
					self.model.set("quanhuyen", currentUser.donvi.quanhuyen);
				}
				if (!!currentUser.donvi.xaphuong_id){
					self.model.set("xaphuong_id", currentUser.donvi.xaphuong_id);
					self.model.set("xaphuong", currentUser.donvi.xaphuong);
				}
			}
			self.model.set("tuyendonvi", "thon");
			
			self.$el.find('#kydanhgia').combobox({
            	textField: "text",
                valueField: "value",
                dataSource: [
                    { text: "Qúy I", value: "quy1" },
                    { text: "Qúy II", value: "quy2" },
                    { text: "Qúy III", value: "quy3" },
                    { text: "Qúy IV", value: "quy4" },
                    { text: "6 tháng đầu năm", value: "6thangdau" },
                    { text: "6 tháng cuối năm", value: "6thangcuoi" },
                    { text: "Tổng kết năm", value: "nam" }
                ],
			});
		},
		
		onChangeEvents: function() {
			var self = this;
			self.$el.find("#search").unbind("click").bind("click", function(event) {
				if (!self.$el.find("#namdanhgia").val()) {
					self.getApp().notify({message: "Vui lòng nhập năm báo cáo"}, {type: "danger"});
					return;
				}
				
				if (!self.$el.find("#kydanhgia").val()) {
					self.getApp().notify({message: "Vui lòng chọn kỳ báo cáo"}, {type: "danger"});
					return;
				}
				
				var kybaocaoObject = self.getApp().mapKyBaoCao[self.$el.find("#kydanhgia").val()];
				
				$.ajax({
					url: self.getApp().serviceURL + "/api/v1/hoatdongbcc/baocao",
					data: "nambaocao=" + self.$el.find("#namdanhgia").val() + "&kydanhgia=" + kybaocaoObject.kybaocao + "&loaikybaocao=" + kybaocaoObject.loaikybaocao,
					type: "GET",
					success: function(response) {
						if (response) {
//							self.model.set('songuoithamgia', response.tongsonguoithamgia);
//							self.model.set('songuoithamgia_nu', response.tongsonguoithamgia_nu);
//							self.model.set('songuoithamgia_dtts', response.tongsonguoithamgia_dtts);
							self.renderKetQua(response.danhsachnganh);
						}
					},
					error: function(xhr) {
						self.getApp().notify({message: xhr.responseJSON.error_message}, {type: "danger"});
					}
				});
			});
		},
		
		renderKetQua: function(data) {
			var self = this;
			self.$el.find("#danhsachhoatdong_list").empty();
			
			self.$el.find("#danhsachhoatdong_list").append(`
			<tr>
                <td class="top text-center">(1)</td>
                <td class="top text-center">(2)</td>
                <td class="top text-center">(3)</td>
                <td class="top" colspan="3"></td>
                <td class="top"></td>
            </tr>
            <tr class="custom" style="background: #F0F0F0;;">
                <td colspan="3">
					<p>DLI 1.1 Kế hoạch Truyền thông Thay đổi Hành vi đã phê duyệt được thực hiện ở tỉnh:</p>
                    <p>Liệt kê các hoạt động được thực hiện theo kế hoạch BCC</p>
                </td>
                <td>Tổng số người tham gia</td>
                <td>Số người tham gia là nữ</td>
                <td>Số người tham gia là DTTS</td>
                <td></td>
            </tr>`);

			if (!data) {
				return;
			}
			
			data.forEach(function(nganh, idx) {
				if (nganh && (nganh.manganh || nganh.tennganh)) {
					self.$el.find("#danhsachhoatdong_list").append(`<tr>
		                <td colspan="3" class="text-left" style="color: #e30303; font-weight: bold; font-size: 14px;">${nganh.tennganh.toLocaleUpperCase()}</td>
		                <td class="text-center"></td>
		                <td class="text-center"></td>
		                <td class="text-center"></td>
					</tr>`);
				
					if (nganh && nganh.tuyendonvis) {
						nganh.tuyendonvis.forEach(function(tuyen, idx) {							
							self.$el.find("#danhsachhoatdong_list").append(`<tr>
									<td colspan="3" class="text-left" style="color: #e30303; font-weight: bold;">&nbsp;&nbsp;${tuyen.tuyen}</td>
									<td class="text-center"></td>
									<td class="text-center"></td>
									<td class="text-center"></td>
							</tr>`);
							
							if (tuyen && tuyen.hoatdong) {
								tuyen.hoatdong.forEach(function(hoatdong, idx) {
									self.$el.find("#danhsachhoatdong_list").append(`<tr>
											<td class="text-left">&nbsp;&nbsp; - ${hoatdong.tenhoatdong}</td>
											<td>${hoatdong.muctieu}</td>
											<td>${hoatdong.tiendo ? hoatdong.tiendo : ''}</td>
											<td class="text-center">${hoatdong.songuoithamgia}</td>
											<td class="text-center">${hoatdong.songuoithamgia_nu}</td>
											<td class="text-center">${hoatdong.songuoithamgia_dtts}</td>
									</tr>`);
								});
							}
							
						})
					}
				}
			});
		}
	});

});