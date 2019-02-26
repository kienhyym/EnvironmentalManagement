define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/BaoCaoNuoc/BaoCaoVienChuyenNganhNuoc/tpl/model.html'),
        schema = require('json!schema/BaoCaoVienChuyenNganhNuocSchema.json');

    function toInt(x) {
        return parseInt(x) ? parseInt(x) : 0;
    }

    return Gonrin.ModelView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "baocao_vienchuyennganh_nuoc",
        uiControl: {
            fields: [
//                {
//                    field: "thoigiankiemtra",
//                    textFormat: "DD/MM/YYYY",
//                    extraFormats: ["DDMMYYYY"],
//                },
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
                    var nambaocao = self.model.get("nambaocao");
                    if (nambaocao === null || nambaocao === "") {
                        self.getApp().notify({ message: "Chưa chọn năm báo cáo" }, { type: "danger" });
                        return;
                    }
                    var check_donvi = true;
                    if (id !== null && id.length > 0) {
                        if (self.getApp().currentUser !== null
                            && self.getApp().currentUser.donvi_id !== self.model.get("donvi_id")) {
                            check_donvi = false;
                        }
                    }
                    if (check_donvi === true) {
                        self.model.save(null, {
                            success: function (model, respose, options) {
                                self.getApp().notify("Lưu thông tin thành công");
                                var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
                                self.getApp().getRouter().navigate(self.collectionName
                                    + "/collection?loaikybaocao=" + routeloaibaocao);

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
                    } else {
                        self.getApp().notify("Tài khoản hiện tại không có quyền sửa báo cáo này,\n Chỉ có đơn vị tạo báo cáo mới được phép sửa báo cáo này")
                    }
                }
            },
            {
                name: "count",
                type: "button",
                buttonClass: "btn-primary btn-sm",
                label: "Cộng dồn",
                command: function () {
                    var self = this;
                    var nambaocao = self.model.get("nambaocao");
                    if (nambaocao === null || nambaocao === "") {
                        self.getApp().notify({ message: "Chưa chọn năm báo cáo" }, { type: "danger" });
                        return;
                    }
                    self.model.save(null, {
                        success: function (model, respose, options) {
                            self.getApp().notify("Cộng dồn thành công");
                            self.render_thongso_khongdat(self.model.get("thongso_khongdat_ngoaikiem_vien"),"thongso_khongdat_ngoaikiem_vien");
                            self.apply_tyle();
                            self.render_ketqua_noikiem_tinhthanh(self.model.get("ketqua_kiemtra_noikiem_tinh"));
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
                              self.getApp().notify({ message: "Cộng dồn không thành công"}, { type: "danger", delay: 1000 });
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
                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
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
            if (routeloaibaocao !== null) {
                var itemkybaocao = self.getApp().mapKyBaoCao[routeloaibaocao];
                if (itemkybaocao === null || itemkybaocao === "undefined") {
                    self.getApp().notify("Đường dẫn không hợp lệ, vui lòng thử lại sau");
                    return;
                } else {
                    self.model.set("loaikybaocao", itemkybaocao.loaikybaocao);
                    self.model.set("kybaocao", itemkybaocao.kybaocao);
                    self.$el.find("#kydanhgia").val(itemkybaocao.text);
                }
            }
            if (id) {
                this.model.set('id', id);
                this.model.fetch({
                    success: function (data) {
                        self.applyBindings();
                        self.render_thongso_khongdat(self.model.get("thongso_khongdat_ngoaikiem_vien"),"thongso_khongdat_ngoaikiem_vien");
                        self.render_ketqua_noikiem_tinhthanh(self.model.get("ketqua_kiemtra_noikiem_tinh"));
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
            	var currentUser = self.getApp().currentUser;
				if(!!currentUser){
					if(currentUser.donvi.tuyendonvi_id !==10){
						self.getApp().notify("Tài khoản hiện tại không có chức năng làm báo cáo cấp Viện");
						return;
					}
				}
                self.applyBindings();
            }

        },
        render_ketqua_noikiem_tinhthanh: function(tinhthanhs){
        	var self = this;
    		var header_tinhthanh = self.$el.find("#danhsach_tinh");
    		header_tinhthanh.html("");
    		var body_tinhthanh = self.$el.find("#body_ketqua_noikiem_tinhthanh");
    		body_tinhthanh.html("");
        	if(!!tinhthanhs && tinhthanhs.length>0){
        		var tr_tong_donvicapnuoc = $("<tr>");
    			tr_tong_donvicapnuoc.append('<td>Tổng số đơn vị cấp nước</td>');
    			
    			var tr_somau_lamthunghiem = $("<tr>");
    			tr_somau_lamthunghiem.append('<td>Tổng số mẫu nước làm thử nghiệm</td>');
    			
    			var tr_datquychuan = $("<tr>");
    			tr_datquychuan.append('<td>Tổng số mẫu nước đạt quy chuẩn</td>');
    			
    			var tr_tyle_maudat = $("<tr>");
    			tr_tyle_maudat.append('<td>Tỷ lệ mẫu đạt quy chuẩn</td>');
    			
    			var tr_khongdatquychuan = $("<tr>");
    			tr_khongdatquychuan.append('<td>Tổng số mẫu nước không đạt quy chuẩn</td>');
    			
    			var tr_tyle_khongdat = $("<tr>");
    			tr_tyle_khongdat.append('<td>Tỷ lệ mẫu không đạt quy chuẩn</td>');
    			
    			var tr_thongsokhongdat = $("<tr>");
    			tr_thongsokhongdat.append('<td>Các thông số không đạt</td>');
    			
    			var danhsach_thongso = $("<div>");
        		$.each(tinhthanhs, function(idx,objdata){
        			header_tinhthanh.append('<td>'+objdata.tentinhthanh+'</td>');
        				
    				tr_tong_donvicapnuoc.append('<td>'+self.getApp().toInt(objdata.tong_donvi_capnuoc)+'</td>');
    				tr_somau_lamthunghiem.append('<td>'+self.getApp().toInt(objdata.tong_maunuoc_thunghiem_noikiem)+'</td>');
    				tr_datquychuan.append('<td>'+self.getApp().toInt(objdata.tong_mau_dat_quychuan_noikiem)+'</td>');
    				var tyle_maudat = 0;
    				var tyle_khongdat = 0;
    				if(self.getApp().toInt(objdata.tong_maunuoc_thunghiem_noikiem)>0){
    					tyle_maudat = (self.getApp().toInt(objdata.tong_mau_dat_quychuan_noikiem)*100/self.getApp().toInt(objdata.tong_maunuoc_thunghiem_noikiem)).toFixed(2);
    					tyle_khongdat = (self.getApp().toInt(objdata.tong_mau_khongdat_quychuan_noikiem)*100/self.getApp().toInt(objdata.tong_maunuoc_thunghiem_noikiem)).toFixed(2);
    				}
    				tr_tyle_maudat.append('<td>'+tyle_maudat+'%</td>');
    				tr_khongdatquychuan.append('<td>'+self.getApp().toInt(objdata.tong_mau_khongdat_quychuan_noikiem)+'</td>');
    				tr_tyle_khongdat.append('<td>'+tyle_khongdat+'%</td>');
    				tr_thongsokhongdat.append('<td></td>');
        			
    				var thongso_tinhthanh = objdata.thongso_khongdat_noikiem;
    				$.each(thongso_tinhthanh, function(j, data_thongso){
    					var tr_thongso = $('<tr>');
    					tr_thongso.append('<td>'+data_thongso.tenthongso+'</td>');
    					$.each(tinhthanhs, function(i,data_tinh){
        					tr_thongso.append('<td>'+data_tinh.thongso_khongdat_noikiem[j].solan_khongdat+'</td>');
        				});
    					danhsach_thongso.append(tr_thongso);
    				});
    				
        		});
        		body_tinhthanh.append(tr_tong_donvicapnuoc);
    			body_tinhthanh.append(tr_somau_lamthunghiem);
    			body_tinhthanh.append(tr_datquychuan);
    			body_tinhthanh.append(tr_tyle_maudat);
    			body_tinhthanh.append(tr_khongdatquychuan);
    			body_tinhthanh.append(tr_tyle_khongdat);
    			body_tinhthanh.append(tr_thongsokhongdat);
    			body_tinhthanh.append(danhsach_thongso.html());
        	}
        },
        render_thongso_khongdat:function(thongso_khongdat, elementID){
        	var self = this;
        	if(!!thongso_khongdat && thongso_khongdat.length>0){
        		self.$el.find("#body_"+elementID).html("");
        		$.each(thongso_khongdat, function(idx,thongso){
        			
        			var tr = $("<tr>");
        			tr.append('<td>'+thongso.tendonvicapnuoc+'</td>');
        			tr.append('<td>'+thongso.tenthongso+'</td>');
        			tr.append('<td>'+thongso.ketqua+'</td>');
        			tr.append('<td>'+thongso.gioihan_toida_txt+'</td>');
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
        apply_tyle: function(){
        	var self = this;
        	var tong_hogiadinh_diaban = self.getApp().toInt(self.model.get("tong_hogiadinh_diaban"));
        	var tyle_hogiadinh_capnuocsach_diaban = tong_hogiadinh_diaban >0 ? (self.getApp().toInt(self.model.get("tong_hogiadinh_duoccungcapnuoc"))*100/tong_hogiadinh_diaban).toFixed(2) :0;
        	self.$el.find("#tyle_hogiadinh_capnuocsach_diaban").val(tyle_hogiadinh_capnuocsach_diaban+"%");
        	
        	self.model.on("change:tong_hogiadinh_diaban", function(){
        		var tong_hogiadinh_diaban = self.getApp().toInt(self.model.get("tong_hogiadinh_diaban"));
            	var tyle_hogiadinh_capnuocsach_diaban = tong_hogiadinh_diaban >0 ? (self.getApp().toInt(self.model.get("tong_hogiadinh_duoccungcapnuoc"))*100/tong_hogiadinh_diaban).toFixed(2) :0;
            	self.$el.find("#tyle_hogiadinh_capnuocsach_diaban").val(tyle_hogiadinh_capnuocsach_diaban+"%");
            	
        	});
        	
        	var tong_maunuoc_thunghiem_ngoaikiem_vien = self.getApp().toInt(self.model.get("tong_maunuoc_thunghiem_ngoaikiem_vien"));

        	var tong_mau_dat_quychuan_ngoaikiem_vien = self.getApp().toInt(self.model.get("tong_mau_dat_quychuan_ngoaikiem_vien"));
        	var tyle_tong_mau_dat_quychuan_ngoaikiem_vien = tong_maunuoc_thunghiem_ngoaikiem_vien >0 ? 
        			(tong_mau_dat_quychuan_ngoaikiem_vien*100/tong_maunuoc_thunghiem_ngoaikiem_vien).toFixed(2): 0;
        	self.$el.find("#tong_mau_dat_quychuan_ngoaikiem_vien").val(tyle_tong_mau_dat_quychuan_ngoaikiem_vien+"%");
        	
        	var tong_mau_khongdat_quychuan_ngoaikiem_vien = self.getApp().toInt(self.model.get("tong_mau_khongdat_quychuan_ngoaikiem_vien"));
        	var tyle_tong_mau_khongdat_quychuan_ngoaikiem_vien = tong_maunuoc_thunghiem_ngoaikiem_vien >0 ? 
        			(tong_mau_khongdat_quychuan_ngoaikiem_vien*100/tong_maunuoc_thunghiem_ngoaikiem_vien).toFixed(2): 0;
        	self.$el.find("#tong_mau_khongdat_quychuan_ngoaikiem_vien").val(tyle_tong_mau_khongdat_quychuan_ngoaikiem_vien+"%");
        	
        }
    });
});
