define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/model.html'),
        schema = require('json!schema/KetQuaNgoaiKiemChatLuongNuocSachSchema.json');
    var danhsachmautemplate = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/itemDanhSachMau.html');
    var danhsachmauschema = require('json!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/DanhSachMauItemSchema.json');
    var KetQuaNgoaiKiemChatLuongNuocItemView = require('app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/KetQuaNgoaiKiemChatLuongNuocItemView');
    var ThongSoBaoCaoChatLuongNuocView = require('app/view/DanhMuc/ThongSoBaoCaoChatLuongNuoc/view/SelectView');
    var DonViCapNuocSelectView = require('app/view/DanhMuc/DonViCapNuoc/view/SelectView');
    
    function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}
    var SoMauVaViTriLayMauView = Gonrin.ModelView.extend({
    	tagName: "tr",
    	template : danhsachmautemplate,
    	modelSchema	: danhsachmauschema,
    	bindings: "danhsachmau-bind",
    	urlPrefix: "/api/v1/",
    	collectionName: "somau_va_vitri_laymau",
    	uiControl:[],
    	render:function(){
    		var self = this;
    		
    		self.model.on("change", function(){
    			self.trigger("change", {
    				"data": self.model.toJSON()
    			});
    		});
    		
    		this.applyBindings();
    	}
    });
    
    return Gonrin.ModelView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "ketqua_ngoaikiem_chatluong_nuocsach",
        uiControl: {
            fields: [{
                field: "thoigiankiemtra",
                textFormat: "DD/MM/YYYY",
                extraFormats: ["DDMMYYYY"],
            },
            {
                field: "ngaybaocao",
                textFormat: "DD/MM/YYYY",
                extraFormats: ["DDMMYYYY"],
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
				field: "thunghiem_chatluong_nuoc",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Có", value: 1},
					{text: "Không", value: 0}
				]
			},
            {
				field: "loai_donvi_kiemtra",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Trung tâm y tế huyện", value: 2},
					{text: "Trung tâm kiểm soát bệnh tật tỉnh", value: 1},
					{text: "Loại khác", value: 0}
				]
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
			{
				field: "laphoso_theoquydinh",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 2}
				]
			},
			{
				field: "hoso_daydu_theoquydinh",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 2}
				]
			},
			{
				field: "somau_thunghiem_dungquydinh",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "thunghiem_daydu_thongso",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "tansuat_thuchien_noikiem_dungquydinh",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "thuchien_baocao_daydu",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "thuchien_congkhai_thongtin",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "thuchien_bienphap_khacphuc",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "ketquangoaikiem",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: "Đạt"},
					{text: "Không Đạt", value: "Không Đạt"}
				]
			},
			{
				field: "congbo_thongtin_chodonvicapnuoc",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Có", value: 1},
					{text: "Không", value: 0}
				]
			},
			{
				field: "congkhai_thongtin",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Có", value: 1},
					{text: "Không", value: 0}
				]
			},
			{
				field: "thongbao_coquan_thamquyen",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Có", value: 1},
					{text: "Không", value: 0}
				]
			},
			{
				field: "thongbao_donvi_chuquan",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Có", value: 1},
					{text: "Không", value: 0}
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
                    var nambaocao = self.model.get("nambaocao");
                    var ngaybaocao = self.model.get("ngaybaocao");
                    var donvicapnuoc = self.model.get("donvicapnuoc");
                    var thoigiankiemtra = self.model.get("thoigiankiemtra");
                    var thanhphan_doankiemtra = self.model.get("thanhphan_doankiemtra");
                    var somauvavitri = self.model.get("somauvavitri");
                    if(!(toInt(nambaocao) >= 2000 && toInt(nambaocao) <= 3000)){
                    	self.getApp().notify({message: "Chưa chọn năm báo cáo hoặc năm báo cáo không hợp lệ"},{type: "danger"});
                    } else if(ngaybaocao === null || ngaybaocao === ""){
                    	self.getApp().notify({message: "Chưa chọn ngày báo cáo"},{type: "danger"});
                    } else if(donvicapnuoc === null || donvicapnuoc === ""){
                    	self.getApp().notify({message: "Chưa chọn tên đơn vị cấp nước"},{type: "danger"});
                    } else if(thoigiankiemtra === null || thoigiankiemtra === ""){
                    	self.getApp().notify({message: "Chưa chọn thời gian kiểm tra"},{type: "danger"});
                    } else if(thanhphan_doankiemtra === null || thanhphan_doankiemtra === ""){
                    	self.getApp().notify({message: "Chưa chọn thành phần đoàn kiểm tra"},{type: "danger"});
                    } else if(somauvavitri > 10){
                    	self.getApp().notify({message: "Số vị trí lấy mẫu phải nhỏ hơn 10!!!"},{type: "danger"});
                    } else {
                    self.model.save(null, {
                        success: function (model, respose, options) {
                            self.getApp().notify("Lưu thông tin thành công");
                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
                        },
                        error: function (model, xhr, options) {
                        	try {
        						self.getApp().notify($.parseJSON(xhr.responseText).error_message, "danger");
        					} catch(err) {
            					self.getApp().notify('Lưu thông tin không thành công!');
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
                    self.model.destroy({
                        success: function (model, response) {
                            self.getApp().notify('Xoá dữ liệu thành công');
                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
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
            var ketquangoaikiemchatluongnuoc = self.model.get("ketquangoaikiemchatluongnuoc");
            if (ketquangoaikiemchatluongnuoc == null){
            	self.$el.find("[id=removeButton]").hide();
            } else {
            	self.$el.find("[id=removeButton]").show();
            }
            
            self.getApp().on("DonViCapNuoc_onSelected", function (data) {
                self.model.set("congsuat_thietke", data.congsuat);
                self.model.set("tansuat_noikiem", data.tansuat_noikiem);
                self.model.set("tongso_hogiadinh", data.tongso_hogiadinh);
                self.model.set("nguonnuoc_nguyenlieu", data.nguonnuoc_nguyenlieu);
                self.model.set("diachi_donvicapnuoc", data.diachi);
            });

            self.$el.find("#addItem").unbind("click").bind("click", function () {
                var view = new ThongSoBaoCaoChatLuongNuocView();
                view.dialog();
                var ketquangoaikiemchatluongnuoc = self.model.get('ketquangoaikiemchatluongnuoc');
                view.on("onSelected", function (data) {
                    for (var i = 0; i < ketquangoaikiemchatluongnuoc.length; i++) {
                        if (ketquangoaikiemchatluongnuoc[i].id === data.id) {
                            self.getApp().notify({ message: "Thông số này đã tồn tại!" }, { type: "danger" });
                            return;
                        }
                    }
                    var item = {
                        "id": data.id,
                        "mathongso": data.mathongso,
                        "tenthongso": data.tenthongso,
                        "gioihan_toithieu": data.gioihan_toithieu,
                        "gioihan_toithieu_txt": data.gioihan_toithieu_txt,
                        "gioihan_toida": data.gioihan_toida,
                        "gioihan_toida_txt": data.gioihan_toida_txt,
                        "ketquakiemtra": [],
                        "danhgia": 0
                    };
                    ketquangoaikiemchatluongnuoc.push(item);
                    self.model.set("ketquangoaikiemchatluongnuoc", ketquangoaikiemchatluongnuoc);
                    self.applyBindings();
                    self.changeSoMau();
                });
            });
            var id = this.getApp().getRouter().getParam("id");
            if (id) {
                this.model.set('id', id);
                this.model.fetch({
                    success: function (data) {
                        self.applyBindings();
                        self.model.on("change:somauvavitri", function () {
                            self.changeSoMau(true);
                        });
                        self.onChangeEvents();
                        self.changeSoMau();
                        self.applyBindings();
                    },
                    error: function () {
                        self.getApp().notify("Lỗi lấy dữ liệu");
                    },
                });
            } else {
                self.prepareBaocao();
                self.onChangeEvents();
                self.applyBindings();
            }
        },
        changeSoMau: function () {
            var self = this;
            var somau = self.model.get("somauvavitri");
            self.$el.find("[id=mauvitri_header]").remove();
            self.$el.find("[id=mauvitri_header_before]").hide();
            self.$el.find("#ketquangoaikiemchatluongnuoc").empty();
            if (!!somau & (somau > 0)) {
            	var ketquangoaikiemchatluongnuoc = self.model.get("ketquangoaikiemchatluongnuoc");
                if (ketquangoaikiemchatluongnuoc.length == 0){
                	self.$el.find("[id=removeButton]").hide();
                } else {
                	self.$el.find("[id=removeButton]").show();
                }
                $.each(self.model.get("ketquangoaikiemchatluongnuoc"), function (idx, obj) {
                	var danhsachvitrilaymau = self.model.get("danhsachvitrilaymau");
                	console.log("danhsachvitrilaymau", danhsachvitrilaymau);
                    if (self.model.get("ketquangoaikiemchatluongnuoc")[idx]["ketquakiemtra"].length < somau) {
                    	console.log("zzz", self.model.get("ketquangoaikiemchatluongnuoc")[idx]["ketquakiemtra"]);
                        for (var i = self.model.get("ketquangoaikiemchatluongnuoc")[idx]["ketquakiemtra"].length; i < somau; i++) {
                            self.model.get("ketquangoaikiemchatluongnuoc")[idx]["ketquakiemtra"].push({
                                "vitrimau": i + 1,
                                "ketqua": null,
                                "danhgia": 0
                            })
                        }
                    } else if (self.model.get("ketquangoaikiemchatluongnuoc")[idx]["ketquakiemtra"].length > somau) {
                        self.model.get("ketquangoaikiemchatluongnuoc")[idx]["ketquakiemtra"].length = somau;
                    }

                });
                for (var j = 0; j < somau; j++) {
	                    var el = $("<th>").attr("id", "mauvitri_header").css({ "text-align": "center" }).html(j + 1);
	                    self.$el.find("#mauvitri_header_before").before(el);
	                    self.$el.find("#ketquathunghiem").attr("colspan", j + 1);
                }
            }
            self.renderKetQua();
            self.danhsachViTriMau();
            
        },
        renderKetQua: function () {
            var self = this;
            $.each(self.model.get("ketquangoaikiemchatluongnuoc"), function (idx, obj) {
                var view = new KetQuaNgoaiKiemChatLuongNuocItemView();
                obj["sothutu"] = idx + 1;
                view.model.set(obj);
                view.render();
                self.$el.find("#ketquangoaikiemchatluongnuoc").append(view.$el);
                view.on("ketquachange", function (evt) {
                    var danhgiaThongSo = 1;
                    evt.ketquakiemtra.forEach(function (data) {
                        	if (data.ketqua && evt.gioihan_toithieu !== null && evt.gioihan_toida == null && data.ketqua >= evt.gioihan_toithieu){ 
                        		data.danhgia = 1;
                        	} else if (data.ketqua && evt.gioihan_toithieu == null && evt.gioihan_toida !== null && data.ketqua <= evt.gioihan_toida){
                        		data.danhgia = 1;
                        	} else if (data.ketqua && evt.gioihan_toithieu && evt.gioihan_toida && data.ketqua <= evt.gioihan_toida && data.ketqua >= evt.gioihan_toithieu){
                        		data.danhgia = 1;
                        	} else {
                        		data.danhgia = 0;
                        	}
                        danhgiaThongSo *= data.danhgia ? data.danhgia : 0;
                    });
                    evt.danhgia = danhgiaThongSo;
                    self.updateKetqua(evt);
//                    Đánh giá tổng (của toàn bộ bảng thông số)
//                    var itemNgoaiKiem = self.model.get("ketquangoaikiemchatluongnuoc");
//                    var danhgiaTong = 1;
//                    self.changeSoMau();
//                    itemNgoaiKiem.forEach(function (data) {
//                        danhgiaTong *= data.danhgia;
//                        
//                        if (danhgiaTong == 1) {
//                            self.model.set("ketquangoaikiem", "Đạt");
//                        } else {
//                            self.model.set("ketquangoaikiem", "Không Đạt");
//                        }
//                    });
                    self.applyBindings();
                });
                view.$el.find("#itemRemove").unbind("click").bind("click", function () {
                    var itemketquangoaikiem = self.model.get("ketquangoaikiemchatluongnuoc");
                    for (var i = 0; i < itemketquangoaikiem.length; i++) {
                        if (itemketquangoaikiem[i].id === obj.id) {
                            itemketquangoaikiem.splice(i, 1);
                        }
                    }
                    self.model.set("ketquangoaikiemchatluongnuoc", itemketquangoaikiem);
                    view.destroy();
                    view.remove();
                    self.applyBindings();
                });
            });
        },
        updateKetqua: function (obj) {
            var self = this;
            for (var i = 0; i < self.model.get("ketquangoaikiemchatluongnuoc").length; i++) {
                if (self.model.get("ketquangoaikiemchatluongnuoc")[i].id === obj.id) {
                    self.model.get("ketquangoaikiemchatluongnuoc")[i] = obj;
                }
            }
        },
        prepareBaocao: function () {
            var self = this;
            self.model.set("ketquangoaikiemchatluongnuoc", []);
            var url = self.getApp().serviceURL + "/api/v1/thongsobaocaochatluongnuoc";
            $.ajax({
                url: url,
                method: "GET",
                contentType: "application/json",
                success: function (data) {
                    if (!!data && !!data.objects && (data.objects.length > 0)) {
                        $.each(data.objects, function (idx, obj) {
                            if (obj.batbuoc == true) {
                                var item = {
                                    "id": obj.id,
                                    "mathongso": obj.mathongso,
                                    "tenthongso": obj.tenthongso,
                                    "gioihan_toithieu": obj.gioihan_toithieu,
                                    "gioihan_toithieu_txt": obj.gioihan_toithieu_txt,
                                    "gioihan_toida": obj.gioihan_toida,
                                    "gioihan_toida_txt": obj.gioihan_toida_txt,
                                    "ketquakiemtra": [],
                                    "danhgia": 0
                                };
                                (self.model.get("ketquangoaikiemchatluongnuoc")).push(item);
                            };
                        });
                        
                        self.model.set("somauvavitri", 1);
                    }
//                    self.applyBindings();
                },
                error: function (xhr, status, error) {
                    self.getApp().notify("Không tìm thấy thông số");
                    self.applyBindings();
                },
            });
            
            //self.applyBindings();
            self.model.on("change:somauvavitri", function () {
                self.changeSoMau(true);
            });
        },
        checkDate: function(dateInput){  
			var self = this;
			var re = /(2[0-9]{3})\b/g;
			var OK = re.exec(dateInput); 
			console.log(OK);
			if(!OK){
				self.getApp().notify({message: "Năm đánh giá không hợp lệ"},{type: "danger"})
			}
		},
		danhsachViTriMau: function () {
			var self = this;
            var somauvavitri = self.model.get("somauvavitri");
        	self.$el.find("#somauvavitri_input").empty();
        	var danhsachvitrilaymau = self.model.get("danhsachvitrilaymau");
    		if (danhsachvitrilaymau == null){
    			danhsachvitrilaymau = []
    		}
    		var danhsachvitri_new = [];
        	for (var i = 0; i < somauvavitri; i++){
        		var somauvavitri_view = new SoMauVaViTriLayMauView();
        		somauvavitri_view.model.set("masomau", i + 1);
        		if(danhsachvitrilaymau && danhsachvitrilaymau.length>i){
        			var data_mau = danhsachvitrilaymau[i];
        			data_mau.masomau = i+1;
        			somauvavitri_view.model.set(data_mau);
        		}
        		somauvavitri_view.render();
        		danhsachvitri_new.push(somauvavitri_view.model.toJSON());
        		self.$el.find("#danhsachvitrilaymau").append(somauvavitri_view.$el);
        		somauvavitri_view.on("change", function(data){
        			var ds = self.model.get("danhsachvitrilaymau");
        			for(var j=0; j<ds.length;j++){
        				if(data.data.masomau === ds[j].masomau){
        					ds[j].vitrilaymau = data.data.vitrilaymau;
        					break;
        				}
        			}
        			self.model.set("danhsachvitrilaymau", ds);
        				self.applyBindings();
        		});
        	}
        	self.model.set("danhsachvitrilaymau", danhsachvitri_new);
        	//self.applyBindings();
		},
		
//		Hàm lấy ra tất cả các thông số của 1 cột
		danhgiaViTriMau: function () {
			var self = this;
			var listvitri = {};
            var ketquangoaikiemchatluongnuoc = self.model.get("ketquangoaikiemchatluongnuoc");
            ketquangoaikiemchatluongnuoc.forEach(function (data) {
		        data.ketquakiemtra.forEach(function (data, index) {
		        	if (listvitri.hasOwnProperty(data.vitrimau) && listvitri[data.vitrimau]) {
		        		listvitri[data.vitrimau].ketqua.push(data.ketqua ? data.ketqua : 0);
		        	} else {
		        		listvitri[data.vitrimau] = {
		        			'ketqua': [data.ketqua ? data.ketqua : 0]
		        		}
		        	}
		        });
            });
            console.log(listvitri);
		},
		
		onChangeEvents: function () {
			var self = this;
		}
    });
});