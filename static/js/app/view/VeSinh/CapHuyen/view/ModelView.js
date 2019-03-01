define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/CapHuyen/tpl/model.html'),
		schema = require('json!schema/VSCapHuyenSchema.json');


	var schema_tong = require('json!app/view/VeSinh/CapHuyen/view/TongiSchema.json');
	var template_tong = require('text!app/view/VeSinh/CapHuyen/tpl/tongcongi.html');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');


	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}
	var TongViewI = Gonrin.ModelView.extend({
		template: template_tong,
		modelSchema: schema_tong,
		bindings: 'tongi-bind',
		urlPrefix: "/api/v1/",
		collectionName: "tong",
		uiControl: [],
		render: function () {
			this.applyBindings();
		}
	});
	
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "vscaphuyen",

		uiControl: {
			fields: [
				{
					field: "quanhuyen",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "quanhuyen_id",
					dataSource: QuanHuyenSelectView
				},
				{
					field: "tinhthanh",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tinhthanh_id",
					dataSource: TinhThanhSelectView
				},
				{
					field: "thuocsuprsws",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Có"
						},
						{
							"value": 0,
							"text": "Không"
						},
					],
					value:1
				},
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
				{
					name: "save",
					type: "button",
					buttonClass: "btn-success btn-sm",
					label: "TRANSLATE:SAVE",
					command: function () {
						var self = this;
						var id = this.getApp().getRouter().getParam("id");
						if (!self.validate()){
							return;
						}
						self.model.set("tenhuyen",self.model.get("quanhuyen").ten);
						var check_donvi = true;
						if (id !== null && id.length>0){
							if (self.getApp().currentUser !== null 
									&& self.getApp().currentUser.donvi_id !== self.model.get("donvi_id")){
								check_donvi = false;
							}
						}
						if(check_donvi === true){
//							self.model.unset("danhsachbaocao");
							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().notify("Lưu thông tin thành công");
									var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
									self.getApp().getRouter().navigate(self.collectionName 
											+ "/collection?loaikybaocao="+routeloaibaocao);
	
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
						}else{
							self.getApp().notify("Tài khoản hiện tại không có quyền sửa báo cáo này,\n Chỉ có đơn vị tạo báo cáo mới được phép sửa báo cáo này")
						}
					}
				},
				{
					name: "count",
					type: "button",
					buttonClass: "btn-primary btn-sm",
					label: "Cộng dồn",
					visible: function () {
						return true;
						// return this.getApp().getRouter().getParam("id") !== null;
					},
					command: function () {
						var self = this;
						if (!self.validate()){
							return;
						}
						self.model.set("tenhuyen",self.model.get("quanhuyen").ten);
						self.model.save(null, {
							success: function (model, respose, options) {
								self.getApp().notify("Cộng dồn thông tin thành công");
								self.compute_baocao();
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
								  self.getApp().notify({ message: "Cộng dồn thông tin không thành công"}, { type: "danger", delay: 1000 });
								}
							}
						});
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
						self.model.destroy({
							success: function (model, response) {
								self.getApp().notify('Xoá dữ liệu thành công');
								var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
								self.getApp().getRouter().navigate(self.collectionName 
										+ "/collection?loaikybaocao="+routeloaibaocao);

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
			var id = this.getApp().getRouter().getParam("id");
			var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
			if (routeloaibaocao!==null){
				var itemkybaocao = self.getApp().mapKyBaoCao[routeloaibaocao];
				if (itemkybaocao === null || itemkybaocao ==="undefined"){
					self.getApp().notify("Đường dẫn không hợp lệ, vui lòng thử lại sau");
					return;
				}else{
					self.model.set("loaikybaocao",itemkybaocao.loaikybaocao);
					self.model.set("kybaocao",itemkybaocao.kybaocao);
					self.$el.find("#kydanhgia").val(itemkybaocao.text);
				}
			}
			var currentUser = self.getApp().currentUser;
			if(!!currentUser && !!currentUser.donvi){
				if (!!currentUser.donvi.tinhthanh_id && currentUser.donvi.tuyendonvi_id >= 2){
					self.model.set("tinhthanh_id",currentUser.donvi.tinhthanh_id);
					self.getApp().data("tinhthanh_id",currentUser.donvi.tinhthanh_id);
					self.model.set("tinhthanh",currentUser.donvi.tinhthanh);
					self.$el.find("#tinhthanh").prop('disabled', true);
				}
				if (!!currentUser.donvi.quanhuyen_id && currentUser.donvi.tuyendonvi_id >= 3){
					self.model.set("quanhuyen_id",currentUser.donvi.quanhuyen_id);
					self.getApp().data("quanhuyen_id",currentUser.donvi.quanhuyen_id);
					self.model.set("quanhuyen",currentUser.donvi.quanhuyen);
					self.$el.find("#quanhuyen").prop('disabled', true);
				}
//				if (!!currentUser.donvi.xaphuong_id){
//					self.getApp().data("xaphuong_id",currentUser.donvi.xaphuong_id);
//					self.model.set("xaphuong_id",currentUser.donvi.xaphuong_id);
//					self.model.set("xaphuong",currentUser.donvi.xaphuong);
//				}
			}
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.$el.find("#nambaocao").attr({"disabled":true});
						self.applyBindings();
						var danhsachbaocao = data.attributes.danhsachbaocao;
						self.model.set("danhsachbaocao",danhsachbaocao);
						self.compute_baocao();
						if (self.getApp().currentUser !== null 
									&& self.getApp().currentUser.donvi_id !== self.model.get("donvi_id")){
								self.$el.find(".toolbar .btn-group [btn-name='save']").hide();
								self.$el.find(".toolbar .btn-group [btn-name='delete']").hide();
								self.$el.find(".toolbar .btn-group [btn-name='count']").hide();
						}
						if (self.getApp().currentUser !== null 
									&& self.getApp().currentUser.donvi_id == self.model.get("donvi_id")){
								self.$el.find(".toolbar .btn-group [btn-name='save']").hide();
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
//					complete:function(){
//						self.getApp().check_chuongtrinhSUP(self.model.get("thuocsuprsws"), self.$el);
//						self.model.on("change:thuocsuprsws", function(){
//							self.getApp().check_chuongtrinhSUP(self.model.get("thuocsuprsws"), self.$el);
//						});
//					}
				});
			} else {
				self.applyBindings();
				//cap huyen/tinh ko can check
//				self.getApp().check_chuongtrinhSUP(self.model.get("thuocsuprsws"), self.$el);
//				self.model.on("change:thuocsuprsws", function(){
//					self.getApp().check_chuongtrinhSUP(self.model.get("thuocsuprsws"), self.$el);
//				});
			}

		},
		compute_baocao:function(){
			var self = this;
			var danhsachbaocao = self.model.get("danhsachbaocao");
			if (danhsachbaocao.length == 0) {
				self.$el.find("#danhsachdonvi").hide();
			}
			var total_chuholanu = 0;
			var total_sohongheo = 0;
			var total_dtts = 0;
			var total_soNam = 0;
			var total_soNu = 0;
			var total_danso = 0;
			var total_soho = 0;
			
			self.model.set("tong_tuhoai", 0);
			self.model.set("tong_tuhoai_hvs", 0);
			self.model.set("tong_thamdoi", 0);
			self.model.set("tong_thamdoi_hvs", 0);
			self.model.set("tong_2ngan", 0);
			self.model.set("tong_2ngan_hvs", 0);
			self.model.set("tong_ongthonghoi", 0);
			self.model.set("tong_ongthonghoi_hvs", 0);
			self.model.set("tong_loaikhac", 0);
			self.model.set("tong_khongnhatieu", 0);
			self.model.set("tong_hopvs", 0);
			self.model.set("tong_khonghopvs", 0);
			self.model.set("tong_caithien", 0);
			self.model.set("tong_caithien_hvs", 0);
			self.model.set("tong_caithien_hongheo", 0);
			self.model.set("tong_caithien_hongheo_hvs", 0);
			self.model.set("tong_diemruatay", 0);
			
			self.model.set("tong_sothon",0);
			self.$el.find("#danhsachdonvi").html("");
			danhsachbaocao.forEach(element => {
				total_chuholanu += toInt(element.tong_chuholanu);
				total_sohongheo += toInt(element.tong_sohongheo);
				total_dtts += toInt(element.tong_sohodtts);
				total_soNam += toInt(element.tong_nam);
				total_soNu += toInt(element.tong_nu);
				total_soho += toInt(element.tong_soho);
				total_danso += toInt(element.tong_danso);
				var tr = $('<tr id="danhsachdonvi">').attr({
					"id": element.id
				});
				tr.append("<td>" + element.tenxa + "</td>");
				tr.append("<td>" + element.tong_chuholanu + "</td>");
				tr.append('<td class="chuongtrinhsup">' + element.tong_sohodtts + "</td>");
				tr.append('<td class="chuongtrinhsup">' + element.tong_sohongheo + "</td>");
				tr.append("<td>" + element.tong_tuhoai + "</td>");
				tr.append("<td>" + element.tong_thamdoi + "</td>");
				tr.append("<td>" + element.tong_2ngan + "</td>");
				tr.append("<td>" + element.tong_ongthonghoi + "</td>");
				tr.append("<td>" + toInt(element.tong_loaikhac) + "</td>");
				tr.append("<td>" + element.tong_khongnhatieu + "</td>");
				tr.append("<td>" + element.tong_hopvs + "</td>");
				tr.append("<td>" + element.tong_khonghopvs + "</td>");
				tr.append('<td class="chuongtrinhsup">' + element.tong_caithien + "</td>");
				tr.append('<td class="chuongtrinhsup">' + element.tong_diemruatay + "</td>");
				self.$el.find("#danhsachdonvi").append(tr);
				tr.unbind('click').bind('click', function () {
					var id = $(this).attr('id');
					var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
					var path = 'vscapxa/model?id=' + id;
					if (routeloaibaocao!==null){
						path = 'vscapxa/model/'+routeloaibaocao+'?id=' + id;
					}
					console.log("path", path);
					self.getApp().getRouter().navigate(path);
				});
				
				
				self.model.set("tong_tuhoai", (toInt(self.model.get("tong_tuhoai"))+toInt(element.tong_tuhoai)));
				self.model.set("tong_tuhoai_hvs", (toInt(self.model.get("tong_tuhoai_hvs"))+toInt(element.tong_tuhoai_hvs)));

				self.model.set("tong_thamdoi", (toInt(self.model.get("tong_thamdoi"))+toInt(element.tong_thamdoi)));
				self.model.set("tong_thamdoi_hvs", (toInt(self.model.get("tong_thamdoi_hvs"))+toInt(element.tong_thamdoi_hvs)));

				self.model.set("tong_2ngan", (toInt(self.model.get("tong_2ngan"))+toInt(element.tong_2ngan)));
				self.model.set("tong_2ngan_hvs", (toInt(self.model.get("tong_2ngan_hvs"))+toInt(element.tong_2ngan_hvs)));
				
				self.model.set("tong_ongthonghoi", (toInt(self.model.get("tong_ongthonghoi"))+toInt(element.tong_ongthonghoi)));
				self.model.set("tong_ongthonghoi_hvs", (toInt(self.model.get("tong_ongthonghoi_hvs"))+toInt(element.tong_ongthonghoi)));
				
				self.model.set("tong_loaikhac", (toInt(self.model.get("tong_loaikhac"))+toInt(element.tong_loaikhac)));
				self.model.set("tong_khongnhatieu", (toInt(self.model.get("tong_khongnhatieu"))+toInt(element.tong_khongnhatieu)));
				self.model.set("tong_hopvs", (toInt(self.model.get("tong_hopvs"))+toInt(element.tong_hopvs)));
				self.model.set("tong_khonghopvs", (toInt(self.model.get("tong_khonghopvs"))+toInt(element.tong_khonghopvs)));
				self.model.set("tong_caithien", (toInt(self.model.get("tong_caithien"))+toInt(element.tong_caithien)));
				self.model.set("tong_caithien_hvs", (toInt(self.model.get("tong_caithien_hvs"))+toInt(element.tong_caithien)));
				self.model.set("tong_caithien_hongheo", (toInt(self.model.get("tong_caithien_hongheo"))+toInt(element.tong_caithien_hongheo)));
				self.model.set("tong_caithien_hongheo_hvs", (toInt(self.model.get("tong_caithien_hongheo_hvs"))+toInt(element.tong_caithien_hongheo_hvs)));
				self.model.set("tong_diemruatay", (toInt(self.model.get("tong_diemruatay"))+toInt(element.tong_diemruatay)));

				self.model.set("tong_sothon", (toInt(self.model.get("tong_sothon"))+toInt(element.tong_sothon)));
			});
			self.model.set("tong_chuholanu", total_chuholanu);
			self.model.set("tong_sohongheo", total_sohongheo);
			self.model.set("tong_sohodtts", total_dtts);
			self.model.set("tong_nam", total_soNam);
			self.model.set("tong_nu", total_soNu);
			self.model.set("tong_danso", total_danso);
			self.model.set("tong_soho", total_soho);
			self.model.set("tong_soxa", danhsachbaocao.length);
			self.renderTinhTongI(danhsachbaocao);
			self.model.trigger("change");
		},
		renderTinhTongI: function (danhsachbaocao) {
			var self = this;
			if (!self.tongViewi) {
				self.tongViewi = new TongViewI({
					el: self.$el.find("#tongcongi")
				});
				self.tongViewi.render();
			}

			var data = Gonrin.getDefaultModel(schema_tong);
			for (var j = 0; j < danhsachbaocao.length; j++) {
				var chitiet = danhsachbaocao[j];
				_.each(schema_tong, function (props, key) {
					data[key] = toInt(data[key]) + toInt(danhsachbaocao[j][key]);

				});
			}
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
		},
		validate: function() {
			const self = this;
			var nambaocao = self.model.get("nambaocao");
			var tinhthanh = self.model.get("tinhthanh");
			var quanhuyen = self.model.get("quanhuyen");
			if(nambaocao === null || nambaocao === ""){
				self.getApp().notify({message: "Năm đánh giá không được để trống!"},{type: "danger"});
				return;
			}
			if(toInt(nambaocao)<1900 || toInt(nambaocao)>3000){
				self.getApp().notify({message: "Năm không hợp lệ, vui lòng kiểm tra lại!"},{type: "danger"});
				return;
			}
			if(tinhthanh === null || tinhthanh === undefined){
				self.getApp().notify({message: "Chưa chọn thông tin Tỉnh/Thành!"},{type: "danger"});
				return;
			}
			if(quanhuyen === null || tinhthanh === undefined){
				self.getApp().notify({message: "Chưa chọn thông tin Quận/Huyện!"},{type: "danger"});
				return;
			}
			return true;
		}
	});

});