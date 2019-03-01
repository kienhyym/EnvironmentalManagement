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

	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		onInit: true,
		collectionName: "tiendo_kehoach_bcc",
		uiControl: {
			fields: [
				{
					field: "tinhthanh",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tinhthanh_id",
					dataSource: TinhThanhSelectView
				},
				{
					field: "xaphuong",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "xaphuong_id",
					dataSource: XaPhuongSelectView
				},
				{
					field: "quanhuyen",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "quanhuyen_id",
					dataSource: QuanHuyenSelectView
				},
				{
					field: "thonxom",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "thonxom_id",
					dataSource: ThonXomSelectView
				},
				{
					field: "tiendo_xaydung",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "Đã hoàn thành dự thảo", value: 2},
						{text: "Đang xây dựng", value: 1},
						{text: "Chưa xây dựng", value: 0}
					],
					readonly:true
				},
				{
					field: "tiendo_rasoat",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "VIHEMA đã chấp thuận", value: 2},
						{text: "Đang rà soát", value: 1},
						{text: "Chưa chấp thuận", value: 0}
					],
					readonly:true
				},
				{
					field: "tiendo_pheduyet",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "Đã phê duyệt", value: 1},
						{text: "Chưa phê duyệt", value: 0}
					],
					readonly:true
				},
				{
					field: "ngay_pheduyet",
					textFormat:"DD/MM/YYYY",
					extraFormats:["DDMMYYYY"],
					readonly:true
				},
				
			]
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
			// self.applyBindings();
			self.$el.find("table.table input").attr({"disabled":true});
		},
		
		/**
		 * SET AUTO FIELD BASE ON CURRENT USER & FORM
		 */
		setDefaultData: function() {
			var self = this;
			var currentUser = self.getApp().currentUser;
			if(!!currentUser && !!currentUser.donvi) {
				if (!!currentUser.donvi.tinhthanh_id && currentUser.donvi.tuyendonvi_id >=2) {
					self.model.set("tinhthanh_id", currentUser.donvi.tinhthanh_id);
					self.model.set("tinhthanh", currentUser.donvi.tinhthanh);
					self.$el.find("#tinhthanh").hide();
				}
				if (!!currentUser.donvi.quanhuyen_id  && currentUser.donvi.tuyendonvi_id >=3){
					self.model.set("quanhuyen_id", currentUser.donvi.quanhuyen_id);
					self.model.set("quanhuyen", currentUser.donvi.quanhuyen);
					self.$el.find("#tinhthanh").hide();
					self.$el.find("#quanhuyen").hide();
				}
				if (!!currentUser.donvi.xaphuong_id  && currentUser.donvi.tuyendonvi_id ===4){
					self.model.set("xaphuong_id", currentUser.donvi.xaphuong_id);
					self.model.set("xaphuong", currentUser.donvi.xaphuong);
					self.$el.find("#tinhthanh").hide();
					self.$el.find("#quanhuyen").hide();
					self.$el.find("#xaphuong").hide();
				}
			}
			
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
                    { text: "Báo cáo năm", value: "nam" }
                ],
			});
		},
		
		onChangeEvents: function() {
			var self = this;
			self.$el.find("#search").unbind("click").bind("click", function(event) {
				var query = "";
				if (!self.$el.find("#namdanhgia").val()) {
					self.getApp().notify({message: "Vui lòng nhập năm báo cáo"}, {type: "danger"});
					return;
				} else {
					query += "nambaocao=" + self.$el.find("#namdanhgia").val();
				}
				
				if (!self.$el.find("#kydanhgia").val()) {
					self.getApp().notify({message: "Vui lòng chọn kỳ báo cáo"}, {type: "danger"});
					return;
				} else {
					var kybaocaoObject = self.getApp().mapKyBaoCao[self.$el.find("#kydanhgia").val()];
					query += "&kydanhgia=" + kybaocaoObject.kybaocao + "&loaikybaocao=" + kybaocaoObject.loaikybaocao;
				}
				
				if (self.model.get("tinhthanh")) {
					query += "&tinhthanh=" + self.model.get("tinhthanh").id;
				}
				
				if (self.model.get("quanhuyen")) {
					query += "&quanhuyen=" + self.model.get("quanhuyen").id;
				}
				
				if (self.model.get("xaphuong")) {
					query += "&xaphuong=" + self.model.get("xaphuong").id;
				}
				
				if (self.model.get("thonxom")) {
					query += "&thonxom=" + self.model.get("thonxom").id;
				}
				
				$.ajax({
					url: self.getApp().serviceURL + "/api/v1/hoatdongbcc/baocao",
					data: query,
					type: "GET",
					success: function(response) {
						if (response) {
							console.log(response);
							self.model.set(response);
							self.applyBindings();
							if (self.model.get("tiendo_pheduyet") == 1) {
								if (self.$el.find("#pheduyet_extra").hasClass("hide")) {
									self.$el.find("#pheduyet_extra").removeClass("hide");
								}
							} else {
								if (!self.$el.find("#pheduyet_extra").hasClass("hide")) {
									self.$el.find("#pheduyet_extra").addClass("hide");
								}
							}
							
//							self.model.set('songuoithamgia', response.tongsonguoithamgia);
//							self.model.set('songuoithamgia_nu', response.tongsonguoithamgia_nu);
//							self.model.set('songuoithamgia_dtts', response.tongsonguoithamgia_dtts);
							self.renderKetQua(response.danhsachnganh);
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
		},
		
		renderKetQua: function(data) {
			var self = this;
			self.$el.find("#danhsachhoatdong_list").empty();
			
			self.$el.find("#danhsachhoatdong_list").append(`
			<tr>
                <td class="background-colorTH text-center">(1)</td>
                <td class="background-colorTH text-center">(2)</td>
                <td class="background-colorTH text-center">(3)</td>
                <td class="background-colorTH" colspan="3"></td>
            </tr>
            <tr class="custom" style="background: #F0F0F0;;">
                <td colspan="3" style="text-align: left;">
					<p>DLI 1.1 Kế hoạch Truyền thông Thay đổi Hành vi đã phê duyệt được thực hiện ở tỉnh:</p>
                    <p>Liệt kê các hoạt động được thực hiện theo kế hoạch BCC</p>
                </td>
                <td>Tổng số người tham gia</td>
                <td>Số người tham gia là nữ</td>
                <td>Số người tham gia là DTTS</td>
            </tr>`);

			if (!data) {
				return;
			}
			
			data.forEach(function(nganh, idx) {
				if (nganh && (nganh.manganh || nganh.tennganh)) {
					self.$el.find("#danhsachhoatdong_list").append(`<tr>
		                <td colspan="3" class="text-left" style="color: #e30303; font-weight: bold; font-size: 14px; text-align: left">${nganh.tennganh.toLocaleUpperCase()}</td>
		                <td class="text-center"></td>
		                <td class="text-center"></td>
		                <td class="text-center"></td>
					</tr>`);
				
					if (nganh && nganh.tuyendonvis) {
						nganh.tuyendonvis.forEach(function(tuyen, idx) {							
							self.$el.find("#danhsachhoatdong_list").append(`<tr>
									<td colspan="3" class="text-left" style="color: #e30303; font-weight: bold; text-align: left;">&nbsp;&nbsp;${tuyen.tuyen}</td>
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
											<td class="text-center">${hoatdong.songuoithamgia ? hoatdong.songuoithamgia : ''}</td>
											<td class="text-center">${hoatdong.songuoithamgia_nu ? hoatdong.songuoithamgia_nu : '' }</td>
											<td class="text-center">${hoatdong.songuoithamgia_dtts ? hoatdong.songuoithamgia_dtts : ''}</td>
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