define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/tpl/model.html'),
        schema = require('json!schema/BaoCaoNuocSachHuyenTinhSchema.json');

    function toInt(x) {
        return parseInt(x) ? parseInt(x) : 0;
    }

    return Gonrin.ModelView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "baocao_nuocsach_huyentinh",
        uiControl: {
            fields: [
            	{
        			field: "kinhphi_ngoaikiem_sovoinamtruoc",
        			uicontrol: "combobox",
        			textField: "text",
        			valueField: "value",
        			dataSource: [
        				{text: "Tăng", value: 2},
        				{text: "Giảm", value: 1},
        				{text: "Bằng", value: 0}
        			]
        		},
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
                    var loaibaocao = self.getApp().get_currentRoute_loaibaocao();
                    var currentRoute = self.getApp().getRouter().currentRoute().fragment;
					var path ="";
                    if(currentRoute.indexOf('baocao_nuocsach_huyen')>=0){
						path = 'baocao_nuocsach_huyen/collection?loaikybaocao='+loaibaocao;
					}else if(currentRoute.indexOf('baocao_nuocsach_tinh')>=0){
						path = 'baocao_nuocsach_tinh/collection?loaikybaocao='+loaibaocao;
					}
                    self.getApp().getRouter().navigate(path);
//                    Backbone.history.history.back();
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
                                
                                var loaibaocao = self.getApp().get_currentRoute_loaibaocao();
                                var currentRoute = self.getApp().getRouter().currentRoute().fragment;
            					var path ="";
                                if(currentRoute.indexOf('baocao_nuocsach_huyen')>=0){
            						path = 'baocao_nuocsach_huyen/collection?loaikybaocao='+loaibaocao;
            					}else if(currentRoute.indexOf('baocao_nuocsach_tinh')>=0){
            						path = 'baocao_nuocsach_tinh/collection?loaikybaocao='+loaibaocao;
            					}
            					self.getApp().getRouter().navigate(path);

                            },
                            error: function (xhr, status, error) {
                            	try {
                                    self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
                                }
                                catch (err) {
                                    self.getApp().notify({ message: error.xhr.responseText }, { type: "danger", delay: 1000 });
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
                            self.getApp().notify("Lưu thông tin thành công");
                            self.applyBindings();
                            self.render_thongso_khongdat(self.model.get("thongso_khongdat_ngoaikiem_trungtam"),"thongso_khongdat_ngoaikiem_trungtam");
                            self.render_thongso_khongdat(self.model.get("thongso_khongdat_noikiem"),"thongso_khongdat_noikiem");
                            self.render_thongso_khongdat(self.model.get("thongso_khongdat_ngoaikiem_baocao"),"thongso_khongdat_ngoaikiem_baocao");
                            self.render_hoso_quanly_noikiem(self.model.get("hoso_quanly_noikiem"));
                            self.render_hoso_quanly_ngoaikiem_baocao(self.model.get("hoso_quanly_ngoaikiem_baocao"));
                            self.render_donvi_ngoaikiem();
                            self.apply_tyle();
                        },
                        error: function (xhr, status, error) {
                            try {
                                self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
                            }
                            catch (err) {
                                self.getApp().notify({ message: error.xhr.responseText }, { type: "danger", delay: 1000 });
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
                            var loaibaocao = self.getApp().get_currentRoute_loaibaocao();
                            var currentRoute = self.getApp().getRouter().currentRoute().fragment;
        					var path ="";
                            if(currentRoute.indexOf('baocao_nuocsach_huyen')>=0){
        						path = 'baocao_nuocsach_huyen/collection?loaikybaocao='+loaibaocao;
        					}else if(currentRoute.indexOf('baocao_nuocsach_tinh')>=0){
        						path = 'baocao_nuocsach_tinh/collection?loaikybaocao='+loaibaocao;
        					}
        					self.getApp().getRouter().navigate(path);
                        },
                        error: function (model, xhr, options) {
                            self.getApp().notify('Xoá dữ liệu không thành công!');

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
                	var txt_header = "Báo cáo dành cho Trung tâm y tế Huyện - "+itemkybaocao.text;
    				if(self.getApp().currentUser.donvi.tuyendonvi_id === 3){
    					txt_header = "Báo cáo dành cho Trung tâm y tế Huyện - "+itemkybaocao.text;
    					self.$el.find("#title_ngoaikiem_B").html("B. Kết quản ngoại kiểm của Trung tâm y tế Huyện");
    					self.$el.find("#tong_hogiadinh_diaban_txt").html("Tổng số HGĐ trên địa bàn huyện");

    					
    				}else{
    					txt_header = "Báo cáo dành cho Trung tâm kiểm soát bệnh tật Tỉnh - "+itemkybaocao.text;
    					self.$el.find("#title_ngoaikiem_B").html("B. Kết quản ngoại kiểm của Trung tâm kiểm soát bệnh tật Tỉnh");
    					self.$el.find("#tong_hogiadinh_diaban_txt").html("Tổng số HGĐ trên địa bàn tỉnh");
    				}
    				self.$el.find(".panel-heading h3").html(txt_header);
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
                        self.render_thongso_khongdat(self.model.get("thongso_khongdat_ngoaikiem_trungtam"),"thongso_khongdat_ngoaikiem_trungtam");
                        self.render_thongso_khongdat(self.model.get("thongso_khongdat_noikiem"),"thongso_khongdat_noikiem");
                        self.render_thongso_khongdat(self.model.get("thongso_khongdat_ngoaikiem_baocao"),"thongso_khongdat_ngoaikiem_baocao");
                        self.render_hoso_quanly_noikiem(self.model.get("hoso_quanly_noikiem"));
                        self.render_hoso_quanly_ngoaikiem_baocao(self.model.get("hoso_quanly_ngoaikiem_baocao"));
                        self.render_donvi_ngoaikiem();
                        self.apply_tyle();
                    },
                    error: function () {
                        self.getApp().notify("Lỗi không lấy được dữ liệu");
                    },
                });
            } else {
                self.applyBindings();
            }

        },
        render_hoso_quanly_noikiem:function(hoso_quanly_noikiem){
        	var self = this;
        	self.$el.find("#body_hoso_quanly_noikiem").html("");
        	if(!!hoso_quanly_noikiem && hoso_quanly_noikiem.length>0){
        		$.each(hoso_quanly_noikiem, function(idx,hoso){
        			var tr = $("<tr>");
        			tr.append('<td>'+(idx+1)+'</td>');
        			tr.append('<td>'+hoso.tendonvicapnuoc+'</td>');
        			tr.append('<td>'+hoso.congsuat_thietke+'</td>');
        			tr.append('<td>'+hoso.tong_laphoso_theoquydinh_noikiem+'</td>');
        			tr.append('<td>'+hoso.tong_hoso_daydu_theoquydinh_noikiem+'</td>');
        			tr.append('<td>'+hoso.tong_somau_thunghiem_dungquydinh_noikiem+'</td>');
        			tr.append('<td>'+hoso.tong_tansuat_thuchien_noikiem_dungquydinh_noikiem+'</td>');
        			tr.append('<td>'+hoso.tong_thuchien_baocao_daydu_noikiem+'</td>');
        			
        			tr.append('<td>'+hoso.tong_thuchien_congkhai_thongtin_noikiem+'</td>');
        			tr.append('<td>'+hoso.tong_thuchien_bienphap_khacphuc_dat_noikiem+'</td>');
        			self.$el.find("#body_hoso_quanly_noikiem").append(tr);
        		});
        	}
        },
        render_hoso_quanly_ngoaikiem_baocao:function(hoso_quanly_ngoaikiem_baocao){
        	var self = this;
        	self.$el.find("#body_hoso_quanly_ngoaikiem_baocao").html("");
        	if(!!hoso_quanly_ngoaikiem_baocao && hoso_quanly_ngoaikiem_baocao.length>0){
        		$.each(hoso_quanly_ngoaikiem_baocao, function(idx,hoso){
        			var tr = $("<tr>");
        			tr.append('<td>'+(idx+1)+'</td>');
        			tr.append('<td>'+hoso.tendonvicapnuoc+'</td>');
        			tr.append('<td>'+hoso.congsuat_thietke+'</td>');
        			tr.append('<td>'+hoso.tong_laphoso_theoquydinh_ngoaikiem+'</td>');
        			tr.append('<td>'+hoso.tong_hoso_daydu_theoquydinh_ngoaikiem+'</td>');
        			tr.append('<td>'+hoso.tong_somau_thunghiem_dungquydinh_ngoaikiem+'</td>');
        			tr.append('<td>'+hoso.tong_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem+'</td>');
        			tr.append('<td>'+hoso.tong_thuchien_baocao_daydu_ngoaikiem+'</td>');
        			
        			tr.append('<td>'+hoso.tong_thuchien_congkhai_thongtin_ngoaikiem+'</td>');
        			tr.append('<td>'+hoso.tong_thuchien_bienphap_khacphuc_dat_ngoaikiem+'</td>');
        			self.$el.find("#body_hoso_quanly_ngoaikiem_baocao").append(tr);
        		});
        	}
        },
        render_donvi_ngoaikiem:function(){
        	var self = this;
        	var donvi_ngoaikiems = self.model.get("danhsach_donvi_ngoaikiem");
        	self.$el.find("#danhsach_donvi_ngoaikiem").html("");
        	if(!!donvi_ngoaikiems && donvi_ngoaikiems.length>0){
        		$.each(donvi_ngoaikiems, function(idx,donvi){
        			
        			var tr = $("<tr>");
//        			tr.append('<td>'+(idx+1)+'</td>');
        			tr.append('<td>'+donvi.tendonvicapnuoc+'</td>');
        			tr.append('<td>'+donvi.tendonvi+'</td>');
        			tr.append('<td>'+donvi.noidung_ngoaikiem+'</td>');
        			tr.append('<td>'+self.getApp().template_helper.datetimeFormat(donvi.ngaykiemtra, "DD/MM/YYYY")+'</td>');
        			self.$el.find("#danhsach_donvi_ngoaikiem").append(tr);
        		});
        	}
        	
        },
        render_thongso_khongdat:function(thongso_khongdat, elementID){
        	var self = this;
        	if(!!thongso_khongdat && thongso_khongdat.length>0){
        		self.$el.find("#body_"+elementID).html("");
        		$.each(thongso_khongdat, function(idx,thongso){
        			
        			var tr = $("<tr>");
        			if(elementID === "thongso_khongdat_ngoaikiem_baocao"){
        				var tendonvingoaikiem = "";
        				if (thongso.tendonvingoaikiem!==null && thongso.tendonvingoaikiem !== undefined){
        					tendonvingoaikiem = thongso.tendonvingoaikiem;
        				}
        				tr.append('<td>'+tendonvingoaikiem+'</td>');
        			}
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
        	
        	//ty le ket qua noi kiem
        	var tong_donvi_capnuoc_thuchien_ngoaikiem = self.getApp().toInt(self.model.get("tong_donvi_capnuoc_thuchien_ngoaikiem"));
        	
        	var tongdat_laphoso_theoquydinh_ngoaikiem = self.getApp().toInt(self.model.get("tongdat_laphoso_theoquydinh_ngoaikiem"));
        	var tyle_tongdat_laphoso_theoquydinh_ngoaikiem = tong_donvi_capnuoc_thuchien_ngoaikiem >0 ? 
        			(tongdat_laphoso_theoquydinh_ngoaikiem*100/tong_donvi_capnuoc_thuchien_ngoaikiem).toFixed(2): 0;
        	self.$el.find("#tongdat_laphoso_theoquydinh_ngoaikiem").val(tyle_tongdat_laphoso_theoquydinh_ngoaikiem+"%");
        			
    		var tongdat_hoso_daydu_theoquydinh_ngoaikiem = self.getApp().toInt(self.model.get("tongdat_hoso_daydu_theoquydinh_ngoaikiem"));
        	var tyle_hoso_daydu_ngoaikiem = tong_donvi_capnuoc_thuchien_ngoaikiem >0 ? 
        			(tongdat_hoso_daydu_theoquydinh_ngoaikiem*100/tong_donvi_capnuoc_thuchien_ngoaikiem).toFixed(2): 0;
        	self.$el.find("#tongdat_hoso_daydu_theoquydinh_ngoaikiem").val(tyle_hoso_daydu_ngoaikiem+"%");
        	
        	var tongdat_somau_thunghiem_dungquydinh_ngoaikiem = self.getApp().toInt(self.model.get("tongdat_somau_thunghiem_dungquydinh_ngoaikiem"));
        	var tyle_somau_thunghiem_dungquydinh_ngoaikiem = tong_donvi_capnuoc_thuchien_ngoaikiem >0 ? 
        			(tongdat_somau_thunghiem_dungquydinh_ngoaikiem*100/tong_donvi_capnuoc_thuchien_ngoaikiem).toFixed(2): 0;
        	self.$el.find("#tongdat_somau_thunghiem_dungquydinh_ngoaikiem").val(tyle_somau_thunghiem_dungquydinh_ngoaikiem+"%");
        		
        	var tongdat_thunghiem_daydu_thongso_ngoaikiem = self.getApp().toInt(self.model.get("tongdat_thunghiem_daydu_thongso_ngoaikiem"));
        	var tyle_tongdat_thunghiem_daydu_thongso_ngoaikiem = tong_donvi_capnuoc_thuchien_ngoaikiem >0 ? 
        			(tongdat_thunghiem_daydu_thongso_ngoaikiem*100/tong_donvi_capnuoc_thuchien_ngoaikiem).toFixed(2): 0;
        	self.$el.find("#tongdat_thunghiem_daydu_thongso_ngoaikiem").val(tyle_tongdat_thunghiem_daydu_thongso_ngoaikiem+"%");
        	
        	
        	var tongdat_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem = self.getApp().toInt(self.model.get("tongdat_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem"));
        	var tyle_tongdat_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem = tong_donvi_capnuoc_thuchien_ngoaikiem >0 ? 
        			(tongdat_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem*100/tong_donvi_capnuoc_thuchien_ngoaikiem).toFixed(2): 0;
        	self.$el.find("#tongdat_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem").val(tyle_tongdat_tansuat_thuchien_noikiem_dungquydinh_ngoaikiem+"%");
        		
        	var tongdat_thuchien_baocao_daydu_ngoaikiem = self.getApp().toInt(self.model.get("tongdat_thuchien_baocao_daydu_ngoaikiem"));
        	var tyle_tongdat_thuchien_baocao_daydu_ngoaikiem = tong_donvi_capnuoc_thuchien_ngoaikiem >0 ? 
        			(tongdat_thuchien_baocao_daydu_ngoaikiem*100/tong_donvi_capnuoc_thuchien_ngoaikiem).toFixed(2): 0;
        	self.$el.find("#tongdat_thuchien_baocao_daydu_ngoaikiem").val(tyle_tongdat_thuchien_baocao_daydu_ngoaikiem+"%");
        	
        	var tongdat_thuchien_congkhai_thongtin_ngoaikiem = self.getApp().toInt(self.model.get("tongdat_thuchien_congkhai_thongtin_ngoaikiem"));
        	var tyle_tongdat_thuchien_congkhai_thongtin_ngoaikiem = tong_donvi_capnuoc_thuchien_ngoaikiem >0 ? 
        			(tongdat_thuchien_congkhai_thongtin_ngoaikiem*100/tong_donvi_capnuoc_thuchien_ngoaikiem).toFixed(2): 0;
        	self.$el.find("#tongdat_thuchien_congkhai_thongtin_ngoaikiem").val(tyle_tongdat_thuchien_congkhai_thongtin_ngoaikiem+"%");
        	
        	var tongdat_thuchien_bienphap_khacphuc_ngoaikiem = self.getApp().toInt(self.model.get("tongdat_thuchien_bienphap_khacphuc_ngoaikiem"));
        	var tyle_tongdat_thuchien_bienphap_khacphuc_ngoaikiem = tong_donvi_capnuoc_thuchien_ngoaikiem >0 ? 
        			(tongdat_thuchien_bienphap_khacphuc_ngoaikiem*100/tong_donvi_capnuoc_thuchien_ngoaikiem).toFixed(2): 0;
        	self.$el.find("#tongdat_thuchien_bienphap_khacphuc_ngoaikiem").val(tyle_tongdat_thuchien_bienphap_khacphuc_ngoaikiem+"%");
        	
        	var tongdat_thuchien_bienphap_khacphuc_ngoaikiem = self.getApp().toInt(self.model.get("tongdat_thuchien_bienphap_khacphuc_ngoaikiem"));
        	var tyle_tongdat_thuchien_bienphap_khacphuc_ngoaikiem = tong_donvi_capnuoc_thuchien_ngoaikiem >0 ? 
        			(tongdat_thuchien_bienphap_khacphuc_ngoaikiem*100/tong_donvi_capnuoc_thuchien_ngoaikiem).toFixed(2): 0;
        	self.$el.find("#tongdat_thuchien_bienphap_khacphuc_ngoaikiem").val(tyle_tongdat_thuchien_bienphap_khacphuc_ngoaikiem+"%");
        	
        	
        	
        	var tong_maunuoc_thunghiem_ngoaikiem_trungtam = self.getApp().toInt(self.model.get("tong_maunuoc_thunghiem_ngoaikiem_trungtam"));

        	var tong_mau_dat_quychuan_ngoaikiem_trungtam = self.getApp().toInt(self.model.get("tong_mau_dat_quychuan_ngoaikiem_trungtam"));
        	var tyle_tong_mau_dat_quychuan_ngoaikiem_trungtam = tong_maunuoc_thunghiem_ngoaikiem_trungtam >0 ? 
        			(tong_mau_dat_quychuan_ngoaikiem_trungtam*100/tong_maunuoc_thunghiem_ngoaikiem_trungtam).toFixed(2): 0;
        	self.$el.find("#tong_mau_dat_quychuan_ngoaikiem_trungtam").val(tyle_tong_mau_dat_quychuan_ngoaikiem_trungtam+"%");
        	
        	var tong_mau_khongdat_quychuan_ngoaikiem_trungtam = self.getApp().toInt(self.model.get("tong_mau_khongdat_quychuan_ngoaikiem_trungtam"));
        	var tyle_tong_mau_khongdat_quychuan_ngoaikiem_trungtam = tong_maunuoc_thunghiem_ngoaikiem_trungtam >0 ? 
        			(tong_mau_khongdat_quychuan_ngoaikiem_trungtam*100/tong_maunuoc_thunghiem_ngoaikiem_trungtam).toFixed(2): 0;
        	self.$el.find("#tong_mau_khongdat_quychuan_ngoaikiem_trungtam").val(tyle_tong_mau_khongdat_quychuan_ngoaikiem_trungtam+"%");
        	
        	
        	var tong_maunuoc_thunghiem_ngoaikiem_baocao = self.getApp().toInt(self.model.get("tong_maunuoc_thunghiem_ngoaikiem_baocao"));
        	
        	var tong_mau_dat_quychuan_ngoaikiem_baocao = self.getApp().toInt(self.model.get("tong_mau_dat_quychuan_ngoaikiem_baocao"));
        	var tyle_tong_mau_dat_quychuan_ngoaikiem_baocao = tong_maunuoc_thunghiem_ngoaikiem_baocao >0 ? 
        			(tong_mau_dat_quychuan_ngoaikiem_baocao*100/tong_maunuoc_thunghiem_ngoaikiem_baocao).toFixed(2): 0;
        	self.$el.find("#tong_mau_dat_quychuan_ngoaikiem_baocao").val(tyle_tong_mau_dat_quychuan_ngoaikiem_baocao+"%");
        	
        	
        	var tong_mau_khongdat_quychuan_ngoaikiem_baocao = self.getApp().toInt(self.model.get("tong_mau_khongdat_quychuan_ngoaikiem_baocao"));
        	var tyle_tong_mau_khongdat_quychuan_ngoaikiem_baocao = tong_maunuoc_thunghiem_ngoaikiem_baocao >0 ? 
        			(tong_mau_khongdat_quychuan_ngoaikiem_baocao*100/tong_maunuoc_thunghiem_ngoaikiem_baocao).toFixed(2): 0;
        	self.$el.find("#tong_mau_khongdat_quychuan_ngoaikiem_baocao").val(tyle_tong_mau_khongdat_quychuan_ngoaikiem_baocao+"%");
        	
        	
        	var tong_maunuoc_thunghiem_noikiem = self.getApp().toInt(self.model.get("tong_maunuoc_thunghiem_noikiem"));
        	
        	var tong_mau_dat_quychuan_noikiem = self.getApp().toInt(self.model.get("tong_mau_dat_quychuan_noikiem"));
        	var tyle_tong_mau_dat_quychuan_noikiem = tong_maunuoc_thunghiem_noikiem >0 ? 
        			(tong_mau_dat_quychuan_noikiem*100/tong_maunuoc_thunghiem_noikiem).toFixed(2): 0;
        	self.$el.find("#tong_mau_dat_quychuan_noikiem").val(tyle_tong_mau_dat_quychuan_noikiem+"%");
        	
        	var tong_mau_khongdat_quychuan_noikiem = self.getApp().toInt(self.model.get("tong_mau_khongdat_quychuan_noikiem"));
        	var tyle_tong_mau_khongdat_quychuan_noikiem = tong_maunuoc_thunghiem_noikiem >0 ? 
        			(tong_mau_khongdat_quychuan_noikiem*100/tong_maunuoc_thunghiem_noikiem).toFixed(2): 0;
        	self.$el.find("#tong_mau_khongdat_quychuan_noikiem").val(tyle_tong_mau_khongdat_quychuan_noikiem+"%");
        	
        }
    });
});
