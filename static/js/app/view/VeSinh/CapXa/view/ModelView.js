define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/CapXa/tpl/model.html'),
		schema = require('json!schema/VSCapXaSchema.json');


	var tongischema = require('json!app/view/VeSinh/CapXa/view/TongiSchema.json');
	var tongitemplate = require('text!app/view/VeSinh/CapXa/tpl/tongcongi.html');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');

	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	var TongViewI = Gonrin.ModelView.extend({
		template: tongitemplate,
		modelSchema: tongischema,
		bindings: 'tongi-bind',
		urlPrefix: "/api/v1/",
		collectionName: "tong",
		uiControl: [],
		render: function () {
			this.applyBindings();
		}
	});
	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "vscapxa",

		uiControl: {
			fields: [
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
					field: "tinhthanh",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tinhthanh_id",
					dataSource: TinhThanhSelectView
				},
				
//				{
//					field: "thuocsuprsws",
//					uicontrol: "combobox",
//					textField: "text",
//					valueField: "value",
//					dataSource: [{
//							"value": 1,
//							"text": "Có"
//						},
//						{
//							"value": 0,
//							"text": "Không"
//						},
//					],
//					value:1
//				},

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
						// var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
						// self.getApp().getRouter().navigate(self.collectionName 
						// 		+ "/collection?loaikybaocao="+routeloaibaocao);
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
						self.model.set("tenxa",self.model.get("xaphuong").ten);
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
									// self.compute_baocao();
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
//						return this.getApp().getRouter().getParam("id") !== null;
					},
					command: function () {
						var self = this;
//						self.model.unset("danhsachbaocao");
						if (!self.validate()){
							return;
						}
						self.model.set("tenxa",self.model.get("xaphuong").ten);
						self.model.save(null, {
							success: function (model, respose, options) {
								self.getApp().notify("Cộng dồn thông tin thành công");
								self.compute_baocao();
								self.check_chuongtrinhSUP();
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
					name: "export_pdf",
					type: "button",
					buttonClass: "btn-warning btn-sm",
					label: "TRANSLATE:EXPORT_PDF",
					visible: function () {
						return this.getApp().getRouter().getParam("id") !== null;
					},
					command: function () {
						var self = this;
						var filename = "baocao_"+self.model.get("tenxa")+"_"+self.model.get("nambaocao")+"_"+self.model.get("kybaocao");
						self.getApp().exportPDF_HTML2PDF("content",filename);
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
					if (!!currentUser.donvi.xaphuong_id && currentUser.donvi.tuyendonvi_id === 4){
						self.getApp().data("xaphuong_id",currentUser.donvi.xaphuong_id);
						self.model.set("xaphuong_id",currentUser.donvi.xaphuong_id);
						self.model.set("xaphuong",currentUser.donvi.xaphuong);
						self.$el.find("#xaphuong").prop('disabled', true);
					}
				}
			
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						var danhsachbaocao = data.attributes.danhsachbaocao;
						self.model.set("danhsachbaocao",danhsachbaocao);
						self.compute_baocao();
						self.applyBindings();
						self.search_dshogiadinh();
						if (self.getApp().currentUser !== null 
									&& self.getApp().currentUser.donvi_id !== self.model.get("donvi_id")){
								self.$el.find(".toolbar .btn-group [btn-name='save']").hide();
								self.$el.find(".toolbar .btn-group [btn-name='delete']").hide();
								self.$el.find(".toolbar .btn-group [btn-name='count']").hide();
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
					},
					complete:function(){
						if(currentUser!==null && !!currentUser.check_SUP){
							self.model.set("thuocsuprsws",currentUser.check_SUP);
						}else{
							self.model.set("thuocsuprsws",0);
						}
						self.check_chuongtrinhSUP();
//						self.model.on("change:thuocsuprsws", function(){
//							self.check_chuongtrinhSUP();
//						});
					}
				});
			} else {
				if(currentUser!==null && !!currentUser.check_SUP){
					self.model.set("thuocsuprsws",currentUser.check_SUP);
				}else{
					self.model.set("thuocsuprsws",0);
				}
				self.applyBindings();
				self.check_chuongtrinhSUP();
				self.search_dshogiadinh();
//				self.model.on("change:thuocsuprsws", function(){
//					self.check_chuongtrinhSUP();
//				});
			}

		},
		compute_baocao: function(){
			var self = this;
			var danhsachbaocao = self.model.get("danhsachbaocao");
			if (!danhsachbaocao || danhsachbaocao.length == 0){
				self.$el.find("#danhsachdonvi").hide();
			}
			self.$el.find("#danhsachdonvi").html("");
			danhsachbaocao.forEach(element => {
				self.renderItemView(element);
			});
			self.renderTinhTongI(danhsachbaocao);
			self.model.trigger("change");
		},
		renderItemView: function(element){
			var self = this;
			var tr = $('<tr id="danhsachdonvi">').attr({
				"id": element.id
			});
			var tenthon = "";
			if (element.tenthon!== null){
				tenthon = element.tenthon;
			}
			var tyle_tong_sohodtts = 0;
			var tyle_tong_sohongheo = 0;
			var tyle_tong_tuhoai = 0;
			var tyle_tong_thamdoi = 0;
			var tyle_tong_2ngan = 0;
			var tyle_tong_ongthonghoi = 0;
			var tyle_tong_loaikhac = 0;
			var tyle_tong_khongnhatieu = 0;
			var tyle_tong_hopvs = 0;
			var tyle_tong_khonghopvs = 0;
			var tyle_tong_caithien = 0;
			var tyle_tong_diemruatay = 0;
			var tong_soho = toInt(element.tong_soho);
			var tong_soho_conhatieu = toInt(element.tong_soho_conhatieu);
			if (tong_soho>0){
				tyle_tong_sohodtts = toInt(element.tong_sohodtts)/toInt(element.tong_soho)*100;
				tyle_tong_sohongheo = toInt(element.tong_sohongheo)/toInt(element.tong_soho)*100;
				tyle_tong_khongnhatieu = toInt(element.tong_khongnhatieu)/toInt(element.tong_soho)*100;
				tyle_tong_hopvs = toInt(element.tong_hopvs)/toInt(element.tong_soho)*100;
				tyle_tong_khonghopvs = toInt(element.tong_khonghopvs)/toInt(element.tong_soho)*100;
				tyle_tong_caithien = toInt(element.tong_caithien)/toInt(element.tong_soho)*100;
				tyle_tong_diemruatay = toInt(element.tong_diemruatay)/toInt(element.tong_soho)*100;
			}
			if (tong_soho_conhatieu>0){
				tyle_tong_tuhoai = toInt(element.tong_tuhoai)/toInt(element.tong_soho_conhatieu)*100;
				tyle_tong_thamdoi = toInt(element.tong_thamdoi)/toInt(element.tong_soho_conhatieu)*100;
				tyle_tong_2ngan = toInt(element.tong_2ngan)/toInt(element.tong_soho_conhatieu)*100;
				tyle_tong_ongthonghoi = toInt(element.tong_ongthonghoi)/toInt(element.tong_soho_conhatieu)*100;
				tyle_tong_loaikhac = toInt(element.tong_loaikhac)/toInt(element.tong_soho_conhatieu)*100;
			}
			tr.append("<td>" + element.tenthon + "</td>");
//			tr.append("<td>" + element.tong_chuholanu + "</td>");
			
			tr.append('<td class="chuongtrinhsup">' + toInt(element.tong_sohodtts) + " <br>("+tyle_tong_sohodtts.toFixed(2)+"%)</td>");
			tr.append('<td class="chuongtrinhsup">' + toInt(element.tong_sohongheo) + " <br>("+tyle_tong_sohongheo.toFixed(2)+"%)</td>");
			tr.append("<td>" + toInt(element.tong_tuhoai) + " <br>("+tyle_tong_tuhoai.toFixed(2)+"%)</td>");
			tr.append("<td>" + toInt(element.tong_thamdoi) + " <br>("+tyle_tong_thamdoi.toFixed(2)+"%)</td>");
			tr.append("<td>" + toInt(element.tong_2ngan) + " <br>("+tyle_tong_2ngan.toFixed(2)+"%)</td>");
			tr.append("<td>" + toInt(element.tong_ongthonghoi) + " <br>("+tyle_tong_ongthonghoi.toFixed(2)+"%)</td>");
			tr.append("<td>" + toInt(element.tong_loaikhac) + " <br>("+tyle_tong_loaikhac.toFixed(2)+"%)</td>");
			tr.append("<td>" + toInt(element.tong_khongnhatieu) + " <br>("+tyle_tong_khongnhatieu.toFixed(2)+"%)</td>");
			tr.append("<td>" + toInt(element.tong_hopvs) + " <br>("+tyle_tong_hopvs.toFixed(2)+"%)</td>");
			tr.append("<td>" + toInt(element.tong_khonghopvs) + " <br>("+tyle_tong_khonghopvs.toFixed(2)+"%)</td>");
			tr.append('<td class="chuongtrinhsup">' + toInt(element.tong_caithien) + " <br>("+tyle_tong_caithien.toFixed(2)+"%)</td>");
			tr.append('<td class="chuongtrinhsup">' + toInt(element.tong_diemruatay) + " <br>("+tyle_tong_diemruatay.toFixed(2)+"%)</td>");
			self.$el.find("#danhsachdonvi").append(tr);

			
			var id_record = this.getApp().getRouter().getParam("id");
			tr.unbind('click').bind('click', function () {
				if (id_record == null){
					self.getApp().notify({message: "Vui lòng nhấn lưu trước khi xem báo cáo chi tiết!"}, {type: "danger"});
					return;
				}
				var id = $(this).attr('id');
				var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
				var path = 'vscapthon/model?id=' + id;
				if (routeloaibaocao!==null){
					path = 'vscapthon/model/'+routeloaibaocao+'?id=' + id;
				}
				self.getApp().getRouter().navigate(path);
			});
		},
		check_chuongtrinhSUP:function(){
			var self = this;
			var check_thuoc_sup = self.model.get("thuocsuprsws");
			if (check_thuoc_sup === 0 || check_thuoc_sup === "0"){
				self.$el.find(".chuongtrinhsup").hide();
				self.$el.find("#header_table_notsup").show();
				self.$el.find("#header_table_sup").hide();
				
			} else{
				self.$el.find(".chuongtrinhsup").show();
				self.$el.find("#header_table_notsup").hide();
				self.$el.find("#header_table_sup").show();
			}
			
		},
		renderTinhTongI: function (danhsachbaocao) {
			var self = this;
			if (!self.tongViewi) {
				self.tongViewi = new TongViewI({
					el: self.$el.find("#tongcongi")
				});
				self.tongViewi.render();
			}

			var data = Gonrin.getDefaultModel(tongischema);
			for (var j = 0; j < danhsachbaocao.length; j++) {
				var chitiet = danhsachbaocao[j];
				_.each(tongischema, function (props, key) {
					data[key] = toInt(data[key]) + toInt(danhsachbaocao[j][key]);
				});
			}
			var tyle_tong_sohodtts = 0;
			var tyle_tong_sohongheo = 0;
			var tyle_tong_tuhoai = 0;
			var tyle_tong_thamdoi = 0;
			var tyle_tong_2ngan = 0;
			var tyle_tong_ongthonghoi = 0;
			var tyle_tong_loaikhac = 0;
			var tyle_tong_khongnhatieu = 0;
			var tyle_tong_hopvs = 0;
			var tyle_tong_khonghopvs = 0;
			var tyle_tong_caithien = 0;
			var tyle_tong_diemruatay = 0;
			var tong_soho = toInt(data['tong_soho']);
			var tong_soho_conhatieu = toInt(data['tong_soho_conhatieu']);
			var array_key_tong_soho = ["tong_sohodtts","tong_sohongheo","tong_khongnhatieu","tong_hopvs","tong_khonghopvs","tong_caithien","tong_diemruatay"];
			var array_key_tong_soho_conhatieu = ["tong_tuhoai","tong_thamdoi","tong_2ngan","tong_ongthonghoi","tong_loaikhac"];
			_.each(data, function (props, key) {
				
				if (array_key_tong_soho.indexOf(key)>=0){
					if (tong_soho>0){
						data[key] = data[key] + " ("+(toInt(data[key])/toInt(tong_soho)*100).toFixed(2)+"%)";
					}else{
						data[key] = data[key] +  " (0.00%)";

					}
				}
				
				if (array_key_tong_soho_conhatieu.indexOf(key)>=0){
					if (tong_soho_conhatieu>0){
						data[key] = data[key] +  " ("+(toInt(data[key])/toInt(tong_soho_conhatieu)*100).toFixed(2)+"%)";
					}else{
						data[key] = data[key] +  " (0.00%)";

					}
				}
			});
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
		},
		validate: function() {
			const self = this;
			var nambaocao = self.model.get("nambaocao");
			var tinhthanh = self.model.get("tinhthanh");
			var quanhuyen = self.model.get("quanhuyen");
			var xaphuong = self.model.get("xaphuong");
//			var thuocsuprsws = self.model.get("thuocsuprsws");
			if (nambaocao === null || nambaocao === ""){
				self.getApp().notify({message: "Năm đánh giá không được để trống!"},{type: "danger"});
				return;
			}
			if(toInt(nambaocao)<1900 || toInt(nambaocao)>3000){
				self.getApp().notify({message: "Năm không hợp lệ, vui lòng kiểm tra lại!"},{type: "danger"});
				return;
			}
			if(tinhthanh === null){
				self.getApp().notify({message: "Chưa chọn thông tin Tỉnh/Thành"},{type: "danger"});
				return;
			} 
			if(quanhuyen === null){
				self.getApp().notify({message: "Chưa chọn thông tin Quận/Huyện"},{type: "danger"});
				return;
			}
			if(xaphuong === null){
				self.getApp().notify({message: "Chưa chọn thông tin Xã/Phường"},{type: "danger"});
				return;
			}
			return true;
		},
		search_dshogiadinh: function(){
			var self = this;
			var search_data = self.$el.find("#search_data");
			search_data.unbind("keyup").bind("keyup", function () {
				var search_data = self.$el.find("#search_data").val().trim();
				var arr = self.model.get("danhsachbaocao");
				var filterObj = gonrin.query(arr, {tenthon: {$likeI: search_data}});
				if (filterObj.length == 0){
					self.$el.find("#danhsachdonvi").hide();
				} else{
					self.$el.find("#danhsachdonvi").show();
					self.$el.find("#danhsachdonvi").html("");
					for(var i=0; i< filterObj.length; i++){
						self.renderItemView(filterObj[i]);
						self.check_chuongtrinhSUP();
					}
				}
			});
		},

	});

});