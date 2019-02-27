define(function(require) {
  "use strict";
  var $ = require('jquery'),
    _ = require('underscore'),
    Gonrin = require('gonrin');

  var template = require('text!app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/tpl/model.html'),
    schema = require('json!schema/TongHopKetQuaKiemTraChatLuongNuocSachSchema.json');
  var DonViCapNuocSelectView = require('app/view/DanhMuc/DonViCapNuoc/view/SelectView');

  var maxDate = new Date();

  function toInt(x) {
    return parseInt(x) ? parseInt(x) : 0;
  }


  return Gonrin.ModelView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    collectionName: "tonghop_ketqua_chatluong_nuocsach",
    uiControl: {
      fields: [{
          field: "ngaybaocao",
          textFormat: "DD/MM/YYYY",
          extraFormats: ["DDMMYYYY"],
          maxDate: maxDate
        },
        {
            field: "donvicapnuoc",
            uicontrol: "ref",
            textField: "ten",
            foreignRemoteField: "id",
            foreignField: "donvicapnuoc_id",
            dataSource: DonViCapNuocSelectView
        },
        {
			field: "nguonnuoc_nguyenlieu",
			uicontrol: "combobox",
			textField: "text",
			valueField: "value",
			dataSource: [
				{text: "Nước mặt", value: 3},
				{text: "Nước nguồn", value: 2},
				{text: "Cả nước mặt và nước nguồn", value: 1},
				{text: "Loại khác", value: 0}
			]
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
          command: function() {
            var self = this;

            Backbone.history.history.back();
          }
        },
        {
          name: "save",
          type: "button",
          buttonClass: "btn-success btn-sm",
          label: "TRANSLATE:SAVE",
          command: function() {
				var self = this;
				var id = this.getApp().getRouter().getParam("id");
				var nambaocao = self.model.get("nambaocao");
				if(nambaocao === null || nambaocao === ""){
					self.getApp().notify({message: "Chưa chọn năm báo cáo"},{type: "danger"});
					return;
				}else if(!self.model.get("donvicapnuoc")){
                	self.getApp().notify({message: "Chưa chọn tên đơn vị cấp nước"},{type: "warning"});
                	return;
                }
				var check_donvi = true;
				if (id !== null && id.length>0){
					if (self.getApp().currentUser !== null 
							&& self.getApp().currentUser.donvi_id !== self.model.get("donvi_id")){
						check_donvi = false;
					}
				}
				if(check_donvi === true){
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
//			visible: function () {
//				return this.getApp().getRouter().getParam("id") !== null;
//			},
			command: function () {
				var self = this;
				var nambaocao = self.model.get("nambaocao");
				if(nambaocao === null || nambaocao === ""){
					self.getApp().notify({message: "Chưa chọn năm báo cáo"},{type: "danger"});
					return;
				}else if(!self.model.get("donvicapnuoc")){
                	self.getApp().notify({message: "Chưa chọn tên đơn vị cấp nước"},{type: "warning"});
                	return;
                }
				self.model.save(null, {
					success: function (model, respose, options) {
						self.getApp().notify("Cộng dồn thông tin thành công");
						self.applyBindings();
						self.render_thongso_khongdat(self.model.get("thongso_khongdat_noikiem"), "thongso_khongdat_noikiem");
						self.render_thongso_khongdat(self.model.get("thongso_khongdat_ngoaikiem"), "thongso_khongdat_ngoaikiem");
						self.render_donvi_ngoaikiem();
						self.apply_tyle();
						
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
          visible: function() {
            return this.getApp().getRouter().getParam("id") !== null;
          },
          command: function() {
            var self = this;
            self.model.destroy({
              success: function(model, response) {
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
    render: function() {
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
			if (!!currentUser.donvi.tinhthanh_id){
				self.model.set("tinhthanh_id",currentUser.donvi.tinhthanh_id);
				self.model.set("tinhthanh",currentUser.donvi.tinhthanh);
			}
			if (!!currentUser.donvi.quanhuyen_id){
				self.model.set("quanhuyen_id",currentUser.donvi.quanhuyen_id);
				self.model.set("quanhuyen",currentUser.donvi.quanhuyen);
			}
		}
		self.getApp().on("DonViCapNuoc_onSelected", function (data) {
			self.model.set("tendonvicapnuoc",data.ten)
            self.model.set("congsuat_thietke", data.congsuat);
            self.model.set("tansuat_noikiem", data.tansuat_noikiem);
            self.model.set("tongso_hogiadinh", data.tongso_hogiadinh);
            self.model.set("nguonnuoc_nguyenlieu", toInt(data.nguonnuoc_nguyenlieu));
            self.model.set("diachi_donvicapnuoc", data.diachi);
        });
		if (id) {
			this.model.set('id', id);
			this.model.fetch({
				success: function (data) {
					self.applyBindings();
					self.render_thongso_khongdat(self.model.get("thongso_khongdat_noikiem"), "thongso_khongdat_noikiem");
					self.render_thongso_khongdat(self.model.get("thongso_khongdat_ngoaikiem"), "thongso_khongdat_ngoaikiem");
					self.render_donvi_ngoaikiem();
					self.apply_tyle();
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
			self.applyBindings();
		}
    },
    render_thongso_khongdat:function(thongso_khongdat, elementID){
    	var self = this;
    	if(!!thongso_khongdat && thongso_khongdat.length>0){
    		self.$el.find("#body_"+elementID).html("");
    		$.each(thongso_khongdat, function(idx,thongso){
    			
					var tr = $("<tr>");
					var thongso_gioihan_toida_txt = thongso.gioihan_toida_txt ? thongso.gioihan_toida_txt : "";
					var thongso_ketqua = thongso.ketqua;
					if (thongso_ketqua === null || thongso_ketqua === ""){
						thongso_ketqua = "";
					}
    			tr.append('<td>'+thongso.tenthongso+'</td>');
    			tr.append('<td>'+thongso_ketqua+'</td>');
    			tr.append('<td>'+thongso_gioihan_toida_txt+'</td>');
    			tr.append('<td>'+thongso.tenvitri+'</td>');
    			tr.append('<td>'+self.getApp().template_helper.datetimeFormat(thongso.ngaykiemtra, "DD/MM/YYYY")+'</td>');
    			self.$el.find("#body_"+elementID).append(tr);
    		});
    		self.$el.find("#"+elementID+"_value").text(thongso_khongdat.length);
    	}else{
    		self.$el.find("#"+elementID).hide();
    		self.$el.find("#"+elementID+"_value").text("không có");
    	}
    },
    render_donvi_ngoaikiem:function(){
    	var self = this;
    	var donvi_ngoaikiems = self.model.get("donvi_thuchien_ngoaikiem");
    	if(!!donvi_ngoaikiems && donvi_ngoaikiems.length>0){
    		self.$el.find("#danhsach_donvi_ngoaikiem").html("");
    		$.each(donvi_ngoaikiems, function(idx,donvi){
    			
					var tr = $("<tr>");
					var donvi_noidung_ngoaikiem = donvi.noidung_ngoaikiem ? donvi.noidung_ngoaikiem : "";
    			tr.append('<td>'+(idx+1)+'</td>');
    			tr.append('<td>'+donvi.tendonvi+'</td>');
    			tr.append('<td>'+ donvi_noidung_ngoaikiem +'</td>');
    			tr.append('<td>'+self.getApp().template_helper.datetimeFormat(donvi.ngaykiemtra, "DD/MM/YYYY")+'</td>');
    			self.$el.find("#danhsach_donvi_ngoaikiem").append(tr);
    		});
    	}
    	
    },
    apply_tyle: function(){
    	var self = this;
    	
    	//ty le ket qua noi kiem
    	var tansuat_noikiem = self.getApp().toInt(self.model.get("tansuat_noikiem"));
    	var tong_laphoso_theoquydinh_noikiem = self.getApp().toInt(self.model.get("tong_laphoso_theoquydinh_noikiem"));
    	var tyle_laphoso_noikiem = tansuat_noikiem >0 ? 
    			(tong_laphoso_theoquydinh_noikiem*100/(3*tansuat_noikiem)).toFixed(2): 0;
    	self.$el.find("#tong_laphoso_theoquydinh_noikiem").val(tyle_laphoso_noikiem+"%");
    			
		var tong_hoso_daydu_theoquydinh_noikiem = self.getApp().toInt(self.model.get("tong_hoso_daydu_theoquydinh_noikiem"));
    	var tyle_hoso_daydu_noikiem = tansuat_noikiem >0 ? 
    			(tong_hoso_daydu_theoquydinh_noikiem*100/(3*tansuat_noikiem)).toFixed(2): 0;
    	self.$el.find("#tong_hoso_daydu_theoquydinh_noikiem").val(tyle_hoso_daydu_noikiem+"%");
    			
		var tong_somau_thunghiem_dungquydinh_noikiem = self.getApp().toInt(self.model.get("tong_somau_thunghiem_dungquydinh_noikiem"));
		var tyle_somau_thunghiem_noikiem = tansuat_noikiem >0 ? 
				(tong_somau_thunghiem_dungquydinh_noikiem*100/(3*tansuat_noikiem)).toFixed(2): 0;
		self.$el.find("#tong_somau_thunghiem_dungquydinh_noikiem").val(tyle_somau_thunghiem_noikiem+"%");
				
				
		var tong_thunghiem_daydu_thongso_noikiem = self.getApp().toInt(self.model.get("tong_thunghiem_daydu_thongso_noikiem"));
		var tyle_thunghiem__daydu_noikiem = tansuat_noikiem >0 ? 
				(tong_thunghiem_daydu_thongso_noikiem*100/(3*tansuat_noikiem)).toFixed(2): 0;
		self.$el.find("#tong_thunghiem_daydu_thongso_noikiem").val(tyle_thunghiem__daydu_noikiem+"%");
						
		var tong_tansuat_thuchien_noikiem_dungquydinh_noikiem = self.getApp().toInt(self.model.get("tong_tansuat_thuchien_noikiem_dungquydinh_noikiem"));
		var tyle_tansuat_noikiem_noikiem = tansuat_noikiem >0 ? 
				(tong_tansuat_thuchien_noikiem_dungquydinh_noikiem*100/(3*tansuat_noikiem)).toFixed(2): 0;
		self.$el.find("#tong_tansuat_thuchien_noikiem_dungquydinh_noikiem").val(tyle_tansuat_noikiem_noikiem+"%");
				
		var tong_thuchien_baocao_daydu_noikiem = self.getApp().toInt(self.model.get("tong_thuchien_baocao_daydu_noikiem"));
		var tyle_baocao_daydu_noikiem = tansuat_noikiem >0 ? 
				(tong_thuchien_baocao_daydu_noikiem*100/(3*tansuat_noikiem)).toFixed(2): 0;
		self.$el.find("#tong_thuchien_baocao_daydu_noikiem").val(tyle_baocao_daydu_noikiem+"%");

		var tong_thuchien_congkhai_thongtin_noikiem = self.getApp().toInt(self.model.get("tong_thuchien_congkhai_thongtin_noikiem"));
		var tyle_congkhai_thongtin_noikiem = tansuat_noikiem >0 ? 
				(tong_thuchien_congkhai_thongtin_noikiem*100/(3*tansuat_noikiem)).toFixed(2): 0;
		self.$el.find("#tong_thuchien_congkhai_thongtin_noikiem").val(tyle_congkhai_thongtin_noikiem+"%");   
				
		var tong_thuchien_bienphap_khacphuc_dat_noikiem = self.getApp().toInt(self.model.get("tong_thuchien_bienphap_khacphuc_dat_noikiem"));
		var tong_thuchien_bienphap_khacphuc_khongdat_noikiem = self.getApp().toInt(self.model.get("tong_thuchien_bienphap_khacphuc_khongdat_noikiem"));
		var tyle_bienphap_khacphuc_dat_noikiem = (tong_thuchien_bienphap_khacphuc_dat_noikiem + tong_thuchien_bienphap_khacphuc_khongdat_noikiem) >0 ? 
				(tong_thuchien_bienphap_khacphuc_dat_noikiem*100/(tong_thuchien_bienphap_khacphuc_dat_noikiem + tong_thuchien_bienphap_khacphuc_khongdat_noikiem)).toFixed(2): 0;
		self.$el.find("#tong_thuchien_bienphap_khacphuc_dat_noikiem").val(tyle_bienphap_khacphuc_dat_noikiem+"%");   
		
		var tong_maunuoc_thunghiem_noikiem = self.getApp().toInt(self.model.get("tong_maunuoc_thunghiem_noikiem"));
		var tong_mau_dat_quychuan_noikiem = self.getApp().toInt(self.model.get("tong_mau_dat_quychuan_noikiem"));
		var tyle_maudatchuan_noikiem = tong_maunuoc_thunghiem_noikiem > 0 ? (tong_mau_dat_quychuan_noikiem*100/tong_maunuoc_thunghiem_noikiem).toFixed(2) : 0;
		self.$el.find("#tyle_maudatchuan_noikiem").val(tyle_maudatchuan_noikiem+"%");
		
		
		var tong_mau_khongdat_quychuan_noikiem = self.getApp().toInt(self.model.get("tong_mau_khongdat_quychuan_noikiem"));
		var tyle_mau_khongdatchuan_noikiem = tong_maunuoc_thunghiem_noikiem > 0 ? (tong_mau_khongdat_quychuan_noikiem*100/tong_maunuoc_thunghiem_noikiem).toFixed(2) : 0;
		self.$el.find("#tyle_mau_khongdatchuan_noikiem").val(tyle_mau_khongdatchuan_noikiem+"%");
		
		
		//ty le ngoai kiem
    	var solan_ngoaikiem = self.getApp().toInt(self.model.get("tong_solan_ngoaikiem"));
    	var tong_laphoso_theoquydinh_ngoaikiem = self.getApp().toInt(self.model.get("tong_laphoso_theoquydinh_ngoaikiem"));
    	var tyle_laphoso_ngoaikiem = solan_ngoaikiem >0 ? 
    			(tong_laphoso_theoquydinh_ngoaikiem*100/solan_ngoaikiem).toFixed(2): 0;
    	self.$el.find("#tong_laphoso_theoquydinh_ngoaikiem").val(tyle_laphoso_ngoaikiem+"%");
    			
		var tong_hoso_daydu_theoquydinh_ngoaikiem = self.getApp().toInt(self.model.get("tong_hoso_daydu_theoquydinh_ngoaikiem"));
    	var tyle_hoso_daydu_ngoaikiem = solan_ngoaikiem >0 ? 
    			(tong_hoso_daydu_theoquydinh_ngoaikiem*100/solan_ngoaikiem).toFixed(2): 0;
    	self.$el.find("#tong_hoso_daydu_theoquydinh_ngoaikiem").val(tyle_hoso_daydu_ngoaikiem+"%");
    			
		var tong_somau_thunghiem_dungquydinh_ngoaikiem = self.getApp().toInt(self.model.get("tong_somau_thunghiem_dungquydinh_ngoaikiem"));
		var tyle_somau_thunghiem_ngoaikiem = solan_ngoaikiem >0 ? 
				(tong_somau_thunghiem_dungquydinh_ngoaikiem*100/solan_ngoaikiem).toFixed(2): 0;
		self.$el.find("#tong_somau_thunghiem_dungquydinh_ngoaikiem").val(tyle_somau_thunghiem_ngoaikiem+"%");
				
				
		var tong_thunghiem_daydu_thongso_ngoaikiem = self.getApp().toInt(self.model.get("tong_thunghiem_daydu_thongso_ngoaikiem"));
		var tyle_thunghiem__daydu_ngoaikiem = solan_ngoaikiem >0 ? 
				(tong_thunghiem_daydu_thongso_ngoaikiem*100/solan_ngoaikiem).toFixed(2): 0;
		self.$el.find("#tong_thunghiem_daydu_thongso_ngoaikiem").val(tyle_thunghiem__daydu_ngoaikiem+"%");
						
		var tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem = self.getApp().toInt(self.model.get("tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem"));
		var tyle_tansuat_noikiem_ngoaikiem = solan_ngoaikiem >0 ? 
				(tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem*100/solan_ngoaikiem).toFixed(2): 0;
		self.$el.find("#tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem").val(tyle_tansuat_noikiem_ngoaikiem+"%");
				
		var tong_thuchien_baocao_daydu_ngoaikiem = self.getApp().toInt(self.model.get("tong_thuchien_baocao_daydu_ngoaikiem"));
		var tyle_baocao_daydu_ngoaikiem = solan_ngoaikiem >0 ? 
				(tong_thuchien_baocao_daydu_ngoaikiem*100/solan_ngoaikiem).toFixed(2): 0;
		self.$el.find("#tong_thuchien_baocao_daydu_ngoaikiem").val(tyle_baocao_daydu_ngoaikiem+"%");

		var tong_thuchien_congkhai_thongtin_ngoaikiem = self.getApp().toInt(self.model.get("tong_thuchien_congkhai_thongtin_ngoaikiem"));
		var tyle_congkhai_thongtin_ngoaikiem = solan_ngoaikiem >0 ? 
				(tong_thuchien_congkhai_thongtin_ngoaikiem*100/solan_ngoaikiem).toFixed(2): 0;
		self.$el.find("#tong_thuchien_congkhai_thongtin_ngoaikiem").val(tyle_congkhai_thongtin_ngoaikiem+"%");   
				
		var tong_thuchien_bienphap_khacphuc_dat_ngoaikiem = self.getApp().toInt(self.model.get("tong_thuchien_bienphap_khacphuc_dat_ngoaikiem"));
		var tong_thuchien_bienphap_khacphuc_khongdat_ngoaikiem = self.getApp().toInt(self.model.get("tong_thuchien_bienphap_khacphuc_khongdat_ngoaikiem"));
		var tyle_bienphap_khacphuc_dat_ngoaikiem = (tong_thuchien_bienphap_khacphuc_dat_ngoaikiem + tong_thuchien_bienphap_khacphuc_khongdat_ngoaikiem) >0 ? 
				(tong_thuchien_bienphap_khacphuc_dat_ngoaikiem*100/(tong_thuchien_bienphap_khacphuc_dat_ngoaikiem + tong_thuchien_bienphap_khacphuc_khongdat_ngoaikiem)).toFixed(2): 0;
		self.$el.find("#tong_thuchien_bienphap_khacphuc_dat_ngoaikiem").val(tyle_bienphap_khacphuc_dat_ngoaikiem+"%");   
		
		var tong_maunuoc_thunghiem_ngoaikiem = self.getApp().toInt(self.model.get("tong_maunuoc_thunghiem_ngoaikiem"));
		var tong_mau_dat_quychuan_ngoaikiem = self.getApp().toInt(self.model.get("tong_mau_dat_quychuan_ngoaikiem"));
		var tyle_maudatchuan_ngoaikiem = tong_maunuoc_thunghiem_ngoaikiem > 0 ? (tong_mau_dat_quychuan_ngoaikiem*100/tong_maunuoc_thunghiem_ngoaikiem).toFixed(2) : 0;
		self.$el.find("#tyle_maudatchuan_ngoaikiem").val(tyle_maudatchuan_ngoaikiem+"%");
		
		
		var tong_mau_khongdat_quychuan_ngoaikiem = self.getApp().toInt(self.model.get("tong_mau_khongdat_quychuan_ngoaikiem"));
		var tyle_mau_khongdatchuan_ngoaikiem = tong_maunuoc_thunghiem_ngoaikiem > 0 ? (tong_mau_khongdat_quychuan_ngoaikiem*100/tong_maunuoc_thunghiem_ngoaikiem).toFixed(2) : 0;
		self.$el.find("#tyle_mau_khongdatchuan_ngoaikiem").val(tyle_mau_khongdatchuan_ngoaikiem+"%");
		
		
		
    }

  });

});
