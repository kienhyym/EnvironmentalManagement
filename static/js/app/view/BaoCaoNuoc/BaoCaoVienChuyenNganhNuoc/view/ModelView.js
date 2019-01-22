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
                                    self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
                                }
                                catch (err) {
                                    self.getApp().notify({ message: xhr.responseText }, { type: "danger", delay: 1000 });
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
                        },
                        error: function (xhr, status, error) {
                            try {
                                self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
                            }
                            catch (err) {
                                self.getApp().notify({ message: xhr.responseText }, { type: "danger", delay: 1000 });
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
                    },
                    error: function () {
                        self.getApp().notify("Lỗi không lấy được dữ liệu");
                    },
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
    });
});
