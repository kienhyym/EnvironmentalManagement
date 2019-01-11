define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/tpl/model.html'),
        schema = require('json!schema/KetQuaNoiKiemChatLuongNuocSachSchema.json');
    
    var somauvavitritemplate = require('text!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/tpl/itemSoMauVaViTriLayMau.html');
    var somauvavitrischema = require('json!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/view/ViTriLayMauItemSchema.json');
    
    var KetQuaNoiKiemChatLuongNuocItemView = require('app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/view/KetQuaNoiKiemChatLuongNuocItemView');
    var ThongSoBaoCaoChatLuongNuocView = require('app/view/DanhMuc/ThongSoBaoCaoChatLuongNuoc/view/SelectView');
    var DonViCapNuocSelectView = require('app/view/DanhMuc/DonViCapNuoc/view/SelectView');
    
    function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}
    
    var SoMauVaViTriLayMauView = Gonrin.ModelView.extend({
    	template : somauvavitritemplate,
    	modelSchema	: somauvavitrischema,
    	bindings: "danhsachmau-bind",
    	urlPrefix: "/api/v1/",
    	collectionName: "somau_va_vitri_laymau",
    	uiControl:[],
    	render:function(){
    		var self = this;
    		
    		self.model.on("change:tenvitrilaymau", function(){
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
        collectionName: "ketqua_noikiem_chatluong_nuocsach",
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
                    var nguoikiemtra = self.model.get("nguoikiemtra");
                    if(!(toInt(nambaocao) >= 2000 && toInt(nambaocao) <= 3000)){
                    	self.getApp().notify({message: "Chưa chọn năm báo cáo hoặc năm báo cáo không hợp lệ"},{type: "danger"});
                    } else if(ngaybaocao === null || ngaybaocao === ""){
                    	self.getApp().notify({message: "Chưa chọn ngày báo cáo"},{type: "danger"});
                    } else if(donvicapnuoc === null || donvicapnuoc === ""){
                    	self.getApp().notify({message: "Chưa chọn tên đơn vị cấp nước"},{type: "danger"});
                    } else if(thoigiankiemtra === null || thoigiankiemtra === ""){
                    	self.getApp().notify({message: "Chưa chọn thời gian kiểm tra"},{type: "danger"});
                    } else if(nguoikiemtra === null || nguoikiemtra === ""){
                    	self.getApp().notify({message: "Chưa chọn người kiểm tra"},{type: "danger"});
                    } else {
                    self.model.save(null, {
                        success: function (model, respose, options) {
                            self.getApp().notify("Lưu thông tin thành công");
                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
                        },
                        error: function (model, xhr, options) {
                            self.getApp().notify('Lưu thông tin không thành công!');
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
            
            var ketquanoikiemchatluongnuoc = self.model.get("ketquanoikiemchatluongnuoc");
//            console.log("ketquanoikiemchatluongnuoc", ketquanoikiemchatluongnuoc);
            if (ketquanoikiemchatluongnuoc == null){
//            	self.$el.find("[id=mauvitri_header]").hide();
            	self.$el.find("[id=removeButton]").hide();
            } else {
//            	self.$el.find("[id=mauvitri_header]").show();
            	self.$el.find("[id=removeButton]").show();
            }

            self.getApp().on("DonViCapNuoc_onSelected", function (data) {
                self.model.set("diachi_donvicapnuoc", data.diachi);
                self.model.set("diachi_donvicapnuoc", data.diachi);
                self.model.set("congxuat", data.congsuat);
                self.model.set("tongso_hogiadinh", data.tongso_hogiadinh);
                self.model.set("nguonnuoc", data.nguonnuoc);

                self.model.on("change:donvicapnuoc", function () {
                    self.model.set("diachi_donvicapnuoc", data.diachi);
                    self.model.set("diachi_donvicapnuoc", data.diachi);
                    self.model.set("congxuat", data.congsuat);
                    self.model.set("tongso_hogiadinh", data.tongso_hogiadinh);
                    self.model.set("nguonnuoc", data.nguonnuoc);
                });

            });

            self.$el.find("#addItem").unbind("click").bind("click", function () {
                var view = new ThongSoBaoCaoChatLuongNuocView();
                view.dialog();
                var ketquanoikiemchatluongnuoc = self.model.get('ketquanoikiemchatluongnuoc');
                view.on("onSelected", function (data) {
                    for (var i = 0; i < ketquanoikiemchatluongnuoc.length; i++) {
                        if (ketquanoikiemchatluongnuoc[i].id === data.id) {
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
                    ketquanoikiemchatluongnuoc.push(item);
                    self.model.set("ketquanoikiemchatluongnuoc", ketquanoikiemchatluongnuoc);
                    self.applyBindings();
                    self.changeSoMau();
                });
            });
//            self.model.on("change:somauvavitri", function () {
//                if (self.model.get("somauvavitri") > 10) {
//                    self.getApp().notify({ message: "Số lấy mẫu phải nhỏ hơn 10" }, { type: "danger" });
//                }
//            });
            var id = this.getApp().getRouter().getParam("id");
            if (id) {
                this.model.set('id', id);
                this.model.fetch({
                    success: function (data) {
                        self.applyBindings();
                        self.model.on("change:somauvavitri", function () {
                            self.changeSoMau(true);
                        });
                        self.changeSoMau();
                    },
                    error: function () {
                        self.getApp().notify("Lỗi lấy dữ liệu");
                    },
                });
            } else {
                self.prepareBaocao();
            }
        },
        changeSoMau: function () {
            var self = this;
            var somau = self.model.get("somauvavitri");
            self.$el.find("[id=mauvitri_header]").remove();
            self.$el.find("#ketquanoikiemchatluongnuoc").empty();

            if (!!somau & (somau > 0)) {
                $.each(self.model.get("ketquanoikiemchatluongnuoc"), function (idx, obj) {

                    if (self.model.get("ketquanoikiemchatluongnuoc")[idx]["ketquakiemtra"].length < somau) {
                        for (var i = self.model.get("ketquanoikiemchatluongnuoc")[idx]["ketquakiemtra"].length; i < somau; i++) {
                            self.model.get("ketquanoikiemchatluongnuoc")[idx]["ketquakiemtra"].push({
                                "vitrimau": i + 1,
                                "ketqua": null,
                                "danhgia": 0
                            })
                        }
                    } else if (self.model.get("ketquanoikiemchatluongnuoc")[idx]["ketquakiemtra"].length > somau) {
                        self.model.get("ketquanoikiemchatluongnuoc")[idx]["ketquakiemtra"].length = somau;
                    }

                });

                for (var j = 0; j < somau; j++) {
                    var el = $("<th>").attr("id", "mauvitri_header").css({ "text-align": "center" }).html(j + 1);
                    self.$el.find("#mauvitri_header_before").before(el);
                    self.$el.find("#id_ketquanoikiem").attr("colspan", j + 1);
                }
            }
            self.renderKetQua();
            
            var somauvavitri = self.model.get("somauvavitri");
        	self.$el.find("#somauvavitri_input").empty();
//        	console.log("somauvavitri===",somauvavitri);
        	var danhsachvitrilaymau = self.model.get("danhsachvitrilaymau");
    		if (danhsachvitrilaymau == null){
    			danhsachvitrilaymau = []
    		}
    		var danhsachvitri_new = [];
//    		console.log("danhsachvitrilaymau======",danhsachvitrilaymau);
        	for (var i = 0; i < somauvavitri; i++){
        		var somauvavitri_view = new SoMauVaViTriLayMauView();
        		somauvavitri_view.model.set("id", i + 1);
        		if(danhsachvitrilaymau && danhsachvitrilaymau.length>i){
        			var data_mau = danhsachvitrilaymau[i];
//        			console.log("ssss",data_mau);
        			data_mau.id = i+1;
        			somauvavitri_view.model.set(data_mau);
        		}
        		somauvavitri_view.render();
        		danhsachvitri_new.push(somauvavitri_view.model.toJSON());
        		self.$el.find("#somauvavitri_input").append(somauvavitri_view.$el);
        		somauvavitri_view.on("change", function(data){
//        			console.log("=====data====",data)
        			var ds = self.model.get("danhsachvitrilaymau");
        			for(var j=0; j<ds.length;j++){
//        				console.log("id1===",data.data.id,"====id2===",ds[j].id)
        				if(data.data.id === ds[j].id){
//        					console.log(j.vitrilaymau);
//        					ds.splice(j,1);
//        					console.log("data vitrilaymau", data.data.tenvitrilaymau);
//        					console.log("ds vitrilaymau", ds[j].tenvitrilaymau);
        					ds[j].tenvitrilaymau = data.data.tenvitrilaymau;
//        					console.log("jjjjjj===",ds);
//        					ds.push(data.data);
        					break;
        				}
        			}
//        			console.log("danhsachvitrilaymau=====",ds);
        				self.model.set("danhsachvitrilaymau", ds);
        				self.applyBindings();
        		});
        	}
        	self.model.set("danhsachvitrilaymau", danhsachvitri_new);
        	self.applyBindings();
            
            
        },
        renderKetQua: function () {
            //prepare Itemview
            //self.getApp().get()
            var self = this;
            //    			self.getApp().trigger("ketquanoikiemchatluongnuoc:changesomau");
            $.each(self.model.get("ketquanoikiemchatluongnuoc"), function (idx, obj) {
                var view = new KetQuaNoiKiemChatLuongNuocItemView();
                obj["sothutu"] = idx + 1;
                view.model.set(obj);
                view.render();
                self.$el.find("#ketquanoikiemchatluongnuoc").append(view.$el);
                view.on("ketquachange", function (evt) {
                    var danhgiaThongSo = 1;
                    evt.ketquakiemtra.forEach(function (data) {
//                    	console.log(data);
//                    	console.log("evt", evt);
                        	if (data.ketqua && evt.gioihan_toithieu !== null && evt.gioihan_toida == null && data.ketqua >= evt.gioihan_toithieu){ 
                        		data.danhgia = 1;
//                        		console.log("danhgia can duoi", data);
                        	}else if (data.ketqua && evt.gioihan_toithieu == null && evt.gioihan_toida !== null && data.ketqua <= evt.gioihan_toida){
                        		data.danhgia = 1;
//                        		console.log("danhgia can tren", data);
                        	} else if (data.ketqua && evt.gioihan_toithieu && evt.gioihan_toida && data.ketqua <= evt.gioihan_toida && data.ketqua >= evt.gioihan_toithieu){
                        		data.danhgia = 1;
//                        		console.log("data 2 khoang gia tri", data);
                        	} else {
                        		data.danhgia = 0;
                        	}

                        danhgiaThongSo *= data.danhgia ? data.danhgia : 0;
                    });
                    evt.danhgia = danhgiaThongSo;
                    self.updateKetqua(evt);
                    var itemNoiKiem = self.model.get("ketquanoikiemchatluongnuoc");
                    var danhgiaTong = 1;
                    self.changeSoMau();
                    itemNoiKiem.forEach(function (data) {
                        danhgiaTong *= data.danhgia;
                        if (danhgiaTong == 1) {
                            self.model.set("ketquanoikiem", "Đạt");
                        } else {
                            self.model.set("ketquanoikiem", "Không Đạt");
                        }
                    });
                    self.applyBindings();
                });
                view.$el.find("#itemRemove").unbind("click").bind("click", function () {
                    var itemketquanoikiem = self.model.get("ketquanoikiemchatluongnuoc");
                    for (var i = 0; i < itemketquanoikiem.length; i++) {
                        if (itemketquanoikiem[i].id === obj.id) {
                        	itemketquanoikiem.splice(i, 1);
                        }
                    }
                    self.model.set("ketquanoikiemchatluongnuoc", itemketquanoikiem);
                    view.destroy();
                    view.remove();
                    self.applyBindings();
                });
            });
        },
        updateKetqua: function (obj) {
            var self = this;
            for (var i = 0; i < self.model.get("ketquanoikiemchatluongnuoc").length; i++) {
                if (self.model.get("ketquanoikiemchatluongnuoc")[i].id === obj.id) {
                    self.model.get("ketquanoikiemchatluongnuoc")[i] = obj;
                }
            }
        },
        prepareBaocao: function () {
            //get all thong so
            var self = this;
            self.model.set("ketquanoikiemchatluongnuoc", []);
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
                                (self.model.get("ketquanoikiemchatluongnuoc")).push(item);
                            };
                        });

                        self.model.set("somauvavitri", 1);
                    }
                },
                error: function (xhr, status, error) {
                    self.getApp().notify("Không tìm thấy thông số");
                },
            });
            self.applyBindings();
            self.model.on("change:somauvavitri", function () {
                self.changeSoMau();
            });
        },
    });
});