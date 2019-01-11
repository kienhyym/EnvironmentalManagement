define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/tpl/model.html'),
        schema = require('json!schema/KetQuaNoiKiemChatLuongNuocSachSchema.json');
    var KetQuaNoiKiemChatLuongNuocItemView = require('app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/view/KetQuaNoiKiemChatLuongNuocItemView');
    var ThongSoBaoCaoChatLuongNuocView = require('app/view/DanhMuc/ThongSoBaoCaoChatLuongNuoc/view/SelectView');
    var DonViCapNuocSelectView = require('app/view/DanhMuc/DonViCapNuoc/view/SelectView');
    function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}
    
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
            self.model.on("change:somauvavitri", function () {
                if (self.model.get("somauvavitri") > 10) {
                    self.getApp().notify({ message: "Số lấy mẫu phải nhỏ hơn 10" }, { type: "danger" });
                }
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
                        self.changeSoMau();
                    },
                    error: function () {
                        self.getApp().notify("Get data Eror");
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
                    var el = $("<th>").attr("rowspan", 2).attr("id", "mauvitri_header").css({ "text-align": "center" }).html(j + 1);
                    self.$el.find("#mauvitri_header_before").before(el);
                }
            }
            self.renderKetQua();

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
                        if (data.ketqua && data.ketqua <= evt.gioihan_toida && data.ketqua >= evt.gioihan_toithieu) {
                            data.danhgia = 1;
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