define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/HeThong/CaiDatBaoCaoVienChuyenNganh/tpl/model.html'),
        schema = require('json!schema/MapVienChuyenNganhNuocVaTinhSchema.json');

    var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');

    return Gonrin.ModelView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        selectedDonvi: null,
        collectionName: "map_vienchuyennganhnuoc_tinh",
        tools: [
            {
                name: "defaultgr",
                type: "group",
                groupClass: "toolbar-group",
                buttons: [
                    // {
                    //     name: "back",
                    //     type: "button",
                    //     buttonClass: "btn-default btn-sm",
                    //     label: "TRANSLATE:BACK",
                    //     command: function () {
                    //         var self = this;
                    //         Backbone.history.history.back();
                    //     }
                    // },
                    {
                        name: "save",
                        type: "button",
                        buttonClass: "btn-success btn-sm",
                        label: "Lưu Cài Đặt",
                        command: function () {
                            var self = this;

                            self.model.save(null, {
                                success: function (model, respose, options) {
                                    self.getApp().notify("Lưu cài đặt thành công");
                                    self.getApp().getRouter().refresh();
                                    //                                    self.getApp().getRouter().navigate(self.collectionName + "/collection");
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
                                      self.getApp().notify({ message: "Lưu cài đặt không thành công"}, { type: "danger", delay: 1000 });
                                    }
                                }
                            });
                        }
                    }],
            },
        ],
        uiControl: [],
        render: function () {
            // console.log("render cai dat bao cao");
            var self = this;
            self.renderCombobox();
            //            self.loadTinhThanh();
            self.themTinhThanh();
        },

        loadTinhThanh: function (donvi_id) {
            var self = this;
            if (!donvi_id) {
                self.renderDanhSachTinhThanh();
                return;
            }
            var filters = { "donvi_id": { "$eq": donvi_id } };
            var url = '/api/v1/map_vienchuyennganhnuoc_tinh';
            $.ajax({
                url: self.getApp().serviceURL + url,
                data: { "q": JSON.stringify({ "filters": filters }) },
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    //                	console.log("data====", data);
                    var donvi = (data.objects && data.objects.length > 0) ? data.objects[0] : null;
                    //                	console.log("donvi: ", donvi);
                    if (donvi) {
                        self.model.set(donvi);
                    } else {
                        self.model.set("id", null);
                        self.model.set("donvi_id", donvi_id);
                        self.model.set("danhsachtinhthanh", []);
                    }
                    self.renderDanhSachTinhThanh();
                },
                error: function (xhr, status, error) {
                    try {
                        self.model.set("danhsachtinhthanh", []);
                        self.renderDanhSachTinhThanh();
                        if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED"){
                            self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
                            self.getApp().getRouter().navigate("login");
                        } else {
                          self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
                        }
                    }
                    catch (err) {
                      self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
                    }
                }
            });
        },

        renderDanhSachTinhThanh: function () {
            var self = this;
            var danhsachtinhthanh = self.model.get("danhsachtinhthanh");
            var html_content = $("#dsTinh");
            html_content.empty();
            if (danhsachtinhthanh && Array.isArray(danhsachtinhthanh)) {
                danhsachtinhthanh.forEach(function (tinh, idx) {
                    html_content.append('<tr id="' + tinh.id + '">' +
                        '<td>' + tinh.tentinh + '</td>' +
                        '<td style="width: 50px; line-height: 30px;text-align: center">\
        					<button type="button" class="btn btn-sm btn-danger" id="itemRemove">\
        			        <span class="fa fa-times"></span></button></td>'+
                        '</tr>');
                    self.$el.find("tr[id='" + tinh.id + "']").find("#itemRemove").unbind("click").bind("click", function (data) {
                        var item_id = tinh.id;
                        for (var k = 0; k < danhsachtinhthanh.length; k++) {
                            if (danhsachtinhthanh[k].id == item_id) {
                                //        						console.log(danhsachtinhthanh[k].id);
                                danhsachtinhthanh.splice(k, 1);
                                self.model.set("danhsachtinhthanh", danhsachtinhthanh);
                                //        						console.log(self.model.get("danhsachtinhthanh"));
                                self.renderDanhSachTinhThanh();
                            }
                        }
                    });
                });
            }
        },
        renderCombobox: function () {
            var self = this;
            var donvi_id = this.getApp().getRouter().getParam("donvi_id");
            //            console.log("donvi_id: ", donvi_id);
            var url = '/api/v1/donvi/';
            var filters = { "tuyendonvi_id": { "$eq": 10 } };
            $.ajax({
                url: self.getApp().serviceURL + url,
                data: { "q": JSON.stringify({ "filters": filters }) },
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    console.log(data);
                    if (data) {
                        var $comboboxEl = self.$el.find("#donvi");
                        $comboboxEl.combobox({
                            textField: "ten",
                            valueField: "id",
                            dataSource: data.objects
                        });
                        if (data.objects.length == 0) {
                            self.getApp().notify({ "message": "Không tìm thấy đơn vị cấp Viện nào trong hệ thống. Vui lòng tạo thêm đơn vị trước khi cài đặt!" }, { "type": "danger" });
                            self.$el.find("#dstinhthanh").hide();
                        } 
                        // else {
                        //     $comboboxEl.data('gonrin').setValue((data.objects && data.objects.length > 0) ? data.objects[0].id : null);
                        // }
                    }
                    $comboboxEl.on('change.gonrin', function (e) {
                        //                        var path = self.collectionName + '/model?donvi_id=' + e.value;
                        //                        self.getApp().getRouter().navigate(path);
                        //                    	console.log(".....", e);
                        self.loadTinhThanh(e.value);
                    });
                    $comboboxEl.data('gonrin').setValue((data.objects && data.objects.length > 0) ? data.objects[0].id : null);
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
                      self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
                    }
                }
            });
        },

        themTinhThanh: function () {
            var self = this;
            self.$el.find("#addTinh").unbind("click").bind("click", function () {
                var tinhthanhView = new TinhThanhSelectView();
                tinhthanhView.dialog();
                tinhthanhView.on("onSelected", function (event) {
                    var danhsachtinhthanh = self.model.get("danhsachtinhthanh") ? self.model.get("danhsachtinhthanh") : [];
                    var tinhthanh = {
                        "id": event.id,
                        "tentinh": event.ten
                    };
                    var flag = false;
                    for (var i = 0; i < danhsachtinhthanh.length; i++) {
                        var ds = danhsachtinhthanh[i];
                        if (ds.id == event.id) {
                            flag = true;
                        }
                    }
                    if (flag == true) {
                        self.getApp().notify("Tỉnh thành đã tồn tại!!!");
                        return;
                    }
                    danhsachtinhthanh.push(tinhthanh);
                    self.model.set("danhsachtinhthanh", danhsachtinhthanh);
                    self.renderDanhSachTinhThanh();
                });
            });
        }
    });
});