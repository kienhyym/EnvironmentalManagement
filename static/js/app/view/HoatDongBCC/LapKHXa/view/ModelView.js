define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!../tpl/model.html'),
		schema = require('json!schema/TienDoKeHoachBCCSchema.json');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var NganhSelectView = require('app/view/DanhMuc/Nganh/SelectView');
	var DMHoatDongSelectView = require('app/view/DanhMuc/DanhMucHoatDong/view/SelectView');
	var HoatDongItemView = require('app/view/HoatDongBCC/HoatDong/HoatDongItemView');

	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	var params = {
		"filters": {
			"$and": [
				{"loai_hoatdong": {"$eq": "xa"}}
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
					field: "nganh",
					uicontrol: "ref",
					textField: "tennganh",
					foreignRemoteField: "id",
					foreignField: "nganh_id",
					dataSource: NganhSelectView
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
					]
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
					]
				},
				{
					field: "tiendo_pheduyet",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "Đã phê duyệt", value: 1},
						{text: "Chưa phê duyệt", value: 0}
					]
				},
				{
					field: "ngay_pheduyet",
					uicontrol: "datetimepicker",
					textFormat: "DD/MM/YYYY"
				}
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
				},
				{
					name: "save",
					type: "button",
					buttonClass: "btn-success btn-sm",
					label: "TRANSLATE:SAVE",
					command: function () {
						var self = this;
						var currentPeriod = self.getApp().get_currentRoute_loaibaocao();
						if (!self.validate()) {
							return;
						}

						var giangvien = self.model.get("giangvien");
						var giangvien_nu = self.model.get("giangvien_nu");
						if (toInt(giangvien) < toInt(giangvien_nu)) {
							self.getApp().notify({message: "Tổng số giảng viên là nữ không hợp lệ!"}, {type: "danger"});
						}
						else {
							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().notify({message:"Lưu thông tin thành công"}, {type:"success"});
									self.getApp().getRouter().navigate("hoatdongbcc/capxa/collection?loaikybaocao=" + currentPeriod);
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
									  self.getApp().notify({ message: "Lưu thông tin không thành công"}, { type: "danger", delay: 1000 });
									}
								}
							});
						}
					}
				},
				{
					name: "delete",
					type: "button",
					buttonClass: "btn-danger btn-sm",
					label: "TRANSLATE:DELETE",
					visible: function () {
						return this.getApp().getRouter().getParam("id") !== null;
					},
					command: function () {
						var self = this;
						var currentPeriod = self.getApp().get_currentRoute_loaibaocao();
						self.model.destroy({
							success: function (model, response) {
								self.getApp().notify({message: "Xoá dữ liệu thành công"}, {type: "success"});
								self.getApp().getRouter().navigate("hoatdongbcc/capxa/collection?loaikybaocao=" + currentPeriod);
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
								  self.getApp().notify({ message: "Xóa dữ liệu không thành công"}, { type: "danger", delay: 1000 });
								}
							}
						});
					}
				},
			],
		}],
		render: function () {
			var self = this;
			var currentPeriod = self.getApp().get_currentRoute_loaibaocao();
			self.model.set("loaikybaocao", self.getApp().mapKyBaoCao[currentPeriod].loaikybaocao);
			self.model.set("kybaocao", self.getApp().mapKyBaoCao[currentPeriod].kybaocao);
			self.$el.find("#kydanhgia").val(self.getApp().mapKyBaoCao[currentPeriod].text);
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.$el.find("#tinhthanh").prop('disabled', true);
						self.$el.find("#quanhuyen").prop('disabled', true);
						self.$el.find("#xaphuong").prop('disabled', true);
						self.applyBindings();
						self.search_HoatDong();
						self.onChangeEvents();
						self.renderDanhSach(data.attributes.danhsach_hoatdong);
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
			} else {
				self.setDefaultData();
				self.applyBindings();
				self.onChangeEvents();
				self.renderDanhSach(null);
			}
			self.$el.find("#add_dmhoatdong").unbind("click").bind("click", function(event) {
				var dmHoatDongDialog = new DMHoatDongSelectView({"viewData":{"loai_hoatdong":"xa"}});
				dmHoatDongDialog.dialog();
				dmHoatDongDialog.on("onSelected", function(data) {
					var danhsachhoatdong = self.model.get("danhsach_hoatdong") ? self.model.get("danhsach_hoatdong") : [];
	                for(var i=0; i< danhsachhoatdong.length; i++){
	                	var item = danhsachhoatdong[i];
	                	if(item.id === data.id){
	                		self.getApp().notify("Hoạt động đã tồn tại trong báo cáo");
	                		return;
	                	}
	                }
					self.model.get("danhsach_hoatdong").push(data);
					self.renderHoatDongView(data);
				});
			});
		},
		
		/**
		 * SET AUTO FIELD BASE ON CURRENT USER & FORM
		 */
		setDefaultData: function() {
			var self = this;
			var currentUser = self.getApp().currentUser;
			if(!!currentUser && !!currentUser.donvi) {
				if (!!currentUser.donvi.tinhthanh_id && currentUser.donvi.tuyendonvi_id >= 2) {
					self.model.set("tinhthanh_id", currentUser.donvi.tinhthanh_id);
					self.model.set("tinhthanh", currentUser.donvi.tinhthanh);
					self.$el.find("#tinhthanh").prop('disabled', true);
				}
				if (!!currentUser.donvi.quanhuyen_id && currentUser.donvi.tuyendonvi_id >= 3){
					self.model.set("quanhuyen_id", currentUser.donvi.quanhuyen_id);
					self.model.set("quanhuyen", currentUser.donvi.quanhuyen);
					self.$el.find("#quanhuyen").prop('disabled', true);
				}
				if (!!currentUser.donvi.xaphuong_id && currentUser.donvi.tuyendonvi_id === 4){
					self.model.set("xaphuong_id", currentUser.donvi.xaphuong_id);
					self.model.set("xaphuong", currentUser.donvi.xaphuong);
					self.$el.find("#xaphuong").prop('disabled', true);
				}
			}
			self.model.set("tuyendonvi", "xa");
		},
		onChangeEvents: function() {
			var self = this;
			self.model.on("change:tiendo_pheduyet", function(model) {
				if (self.model.get("tiendo_pheduyet") == 1) {
					if (self.$el.find("#pheduyet_extra").hasClass("hide")) {
						self.$el.find("#pheduyet_extra").removeClass("hide");
					}
				} else {
					if (!self.$el.find("#pheduyet_extra").hasClass("hide")) {
						self.$el.find("#pheduyet_extra").addClass("hide");
					}
				}
			});
			if (self.model.get("tiendo_pheduyet") == 1) {
				if (self.$el.find("#pheduyet_extra").hasClass("hide")) {
					self.$el.find("#pheduyet_extra").removeClass("hide");
				}
			}
		},
		renderHoatDongView:function(data){
			var self = this;
			var hoatDongItemView = new HoatDongItemView();
			hoatDongItemView.model.set(JSON.parse(JSON.stringify(data)));
			hoatDongItemView.render();
			hoatDongItemView.$el.find("#itemRemove").unbind('click').bind('click',{obj:data}, function(e){
            	var fields = self.model.get("danhsach_hoatdong");
            	var data = e.data.obj;
                for( var i = 0; i < fields.length; i++){ 
                	   if ( fields[i].id === data.id) {
                		   fields.splice(i, 1); 
                	   }
                	}
                self.model.set("danhsach_hoatdong", fields);
                self.model.trigger("change");
                hoatDongItemView.destroy();
                hoatDongItemView.remove();
            });
			hoatDongItemView.on("change", function(data) {
				var dshoatdong = self.model.get("danhsach_hoatdong");
				dshoatdong.forEach(function(item, idx) {
					if (item.id == data.id) {
						dshoatdong[idx] = data;
					}
				});
				self.model.set("danhsach_hoatdong", JSON.parse(JSON.stringify((dshoatdong))));
				self.model.trigger("change");
			});
			self.$el.find("#danhsachhoatdong_list").append(hoatDongItemView.$el);
		},
		renderDanhSach: function(danhsachhoatdong) {
			var self = this;
			self.$el.find("#danhsachhoatdong_list").empty();
			self.$el.find("#danhsachhoatdong_list").append(`
			<tr class="background-colorTH">
                <td colspan="2">(1)</td>
                <td>(2)</td>
                <td>(3)</td>
                <td></td>
                <td colspan="3"></td>
            </tr>
            <tr class="custom" style="background: #F0F0F0;;">
                <td colspan="5">
                    <p>Liệt kê các hoạt động được thực hiện theo kế hoạch BCC</p>
                </td>
                <td>Tổng số người tham gia</td>
                <td>Số người tham gia là nữ</td>
                <td>Số người tham gia là DTTS</td>
            </tr>
            <tr>
                <td colspan="5" class="text-left" style="color: red; font-weight: bold;">Hoạt động cấp xã/phường</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>`);
			
			if(danhsachhoatdong === null){
				$.ajax({
					url: self.getApp().serviceURL + "/api/v1/danhmuchoatdong",
		    		data: {"q": JSON.stringify({"filters": {"loai_hoatdong":{"$eq":"xa"}}, "order_by":[{"field": "nganh_id", "direction": "asc"}]})},
					type: "GET",
					success: function(data) {
						self.model.set("danhsach_hoatdong",[]);
						$.each(data.objects, function(idx, obj){
							if(!!obj && obj.id !==null && obj.id.length>0){
								self.model.get("danhsach_hoatdong").push(obj);
				                self.renderHoatDongView(obj);
							}
						});
					},
					error: function (xhr, status, error) {
						try {
							if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED"){
								self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
								self.getApp().getRouter().navigate("login");
							} else {
							  self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
							}
						}
						catch (err) {
						  self.getApp().notify({ message: "Không lấy được danh sách họat động, vui lòng thử lại sau"}, { type: "danger", delay: 1000 });
						}
					}
				});
			}else{
				for(var i=0; i< danhsachhoatdong.length; i++){
					self.renderHoatDongView(danhsachhoatdong[i]);
				}
			}
		},
		validate : function() {
			const self = this;
			var nambaocao = self.model.get("nambaocao");
			var danhsach_hoatdong = self.model.get("danhsach_hoatdong");
			if (nambaocao === null || nambaocao === ""){
				self.getApp().notify({message: "Năm đánh giá không được để trống!"},{type: "danger"});
				return;
			}
			if (toInt(nambaocao)<1900 || toInt(nambaocao)>3000) {
				self.getApp().notify({message: "Năm không hợp lệ, vui lòng kiểm tra lại!"},{type: "danger"});
				return;
			}
			if (!self.model.get("tinhthanh")) {
				self.getApp().notify({message: "Chưa chọn tỉnh thành!"},{type: "danger"});
				return;
			}
			if (!self.model.get("quanhuyen")) {
				self.getApp().notify({message: "Chưa chọn quận huyện!"},{type: "danger"});
				return;
			}
			if (!self.model.get("xaphuong")) {
				self.getApp().notify({message: "Chưa chọn xã phường!"},{type: "danger"});
				return;
			}
			// if (self.model.get("tiendo_xaydung") === null || self.model.get("tiendo_xaydung") === "") {
			// 	self.getApp().notify({message: "Tiến độ xây dựng không hợp lệ!"},{type: "danger"});
			// 	return;
			// }
			// if (self.model.get("tiendo_rasoat") === null || self.model.get("tiendo_rasoat") === "") {
			// 	self.getApp().notify({message: "Tiến độ rà soát không hợp lệ!"},{type: "danger"});
			// 	return;
			// }
			// var tiendo_pheduyet = self.model.get("tiendo_pheduyet");
			// if (tiendo_pheduyet === null || tiendo_pheduyet=== undefined) {
			// 	self.getApp().notify({message: "Tiến độ phê duyệt không hợp lệ!"},{type: "danger"});
			// 	return;
			// }else if(tiendo_pheduyet ===1){
			// 	if (!self.model.get("ngay_pheduyet")) {
			// 		self.getApp().notify({message: "Chưa chọn ngày phê duyệt kế hoạch BCC!"},{type: "danger"});
			// 		return;
			// 	}
			// 	if (toInt(self.model.get("sohoatdong_cotloi_pheduyet")) < 0 || 
			// 		Number.isInteger(self.model.get("sohoatdong_cotloi_pheduyet")) === false ||
			// 		self.model.get("sohoatdong_cotloi_pheduyet") === null || self.model.get("sohoatdong_cotloi_pheduyet") === "") {
			// 		self.getApp().notify({message: "Số hoạt động BBC cốt lõi trong kế hoạch phê duyệt không hợp lệ!"},{type: "danger"});
			// 		return;
			// 	}
			// }
			if (toInt(self.model.get("sohoatdong_cotloi_hoanthanh")) < 0 || 
				Number.isInteger(self.model.get("sohoatdong_cotloi_hoanthanh")) === false ||
				self.model.get("sohoatdong_cotloi_hoanthanh") === null || self.model.get("sohoatdong_cotloi_hoanthanh") === "") {
				self.getApp().notify({message: "Số hoạt động BBC cốt lõi đã hoàn thành không hợp lệ!"},{type: "danger"});
				return;
			}
			if (toInt(self.model.get("giangvien")) < 0 ||
				Number.isInteger(self.model.get("giangvien")) === false ||
				self.model.get("giangvien") === null || self.model.get("giangvien") === "") {
				self.getApp().notify({message: "Tổng số giảng viên của đơn vị không hợp lệ!"},{type: "danger"});
				return;
			}
			if (toInt(self.model.get("giangvien_nu")) < 0 ||
				Number.isInteger(self.model.get("giangvien_nu")) === false ||
				self.model.get("giangvien_nu") === null || self.model.get("giangvien_nu") === "") {
				self.getApp().notify({message: "Tổng số giảng viên nữ của đơn vị không hợp lệ!"},{type: "danger"});
				return;
			}
			for (var i = 0; i < danhsach_hoatdong.length; i++){
				if(danhsach_hoatdong[i].songuoithamgia === null || danhsach_hoatdong[i].songuoithamgia === ""){
					self.getApp().notify({message: "Tổng số người tham gia không được để trống!"},{type: "danger"});
					return;
				}
				if(toInt(danhsach_hoatdong[i].songuoithamgia) < 0 || Number.isInteger(danhsach_hoatdong[i].songuoithamgia) === false){
					self.getApp().notify({message: "Tổng số người tham gia không hợp lệ!"},{type: "danger"});
					return;
				}
				if(danhsach_hoatdong[i].songuoithamgia_nu === null || danhsach_hoatdong[i].songuoithamgia_nu === ""){
					self.getApp().notify({message: "Số người tham gia là nữ không được để trống!"},{type: "danger"});
					return;
				}
				if(toInt(danhsach_hoatdong[i].songuoithamgia_nu) < 0 || Number.isInteger(danhsach_hoatdong[i].songuoithamgia_nu) === false){
					self.getApp().notify({message: "Số người tham gia là nữ không hợp lệ!"},{type: "danger"});
					return;
				}
				if(danhsach_hoatdong[i].songuoithamgia_dtts === null || danhsach_hoatdong[i].songuoithamgia_dtts === ""){
					self.getApp().notify({message: "Số người tham gia là DTTS không được để trống!"},{type: "danger"});
					return;
				}
				if(toInt(danhsach_hoatdong[i].songuoithamgia_dtts) < 0 || Number.isInteger(danhsach_hoatdong[i].songuoithamgia_dtts) === false){
					self.getApp().notify({message: "Số người tham gia là DTTS không hợp lệ!"},{type: "danger"});
					return;
				}
			}
			return true;
		},
		search_HoatDong: function() {
			var self = this;
			var search_data = self.$el.find("#search_data");
			search_data.unbind("keyup").bind("keyup", function () {
				var search_data = self.$el.find("#search_data").val().trim();
				var arr = self.model.get("danhsach_hoatdong");
				var filterObj = gonrin.query(arr, {tenhoatdong: {$likeI: search_data}});
				if (filterObj.length == 0){
					// self.getApp().notify({message: "Không tìm thấy hoạt động!"},{type: "danger"});
				} else{
					for(var i=0; i< filterObj.length; i++){
						self.renderHoatDongView(filterObj[i]);
						self.renderDanhSach(filterObj);
					}
				}
			});
		}
	});
});