define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/PhuLuc/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTe/tpl/model.html'),
        schema = require('json!app/view/PhuLuc/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTe/view/Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTeSchema.json');

    return Gonrin.ModelDialogView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
        uiControl: {
            fields: [
                {
                    field: "quansat_khuvesinh",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Nhà vệ sinh khô nổi một ngăn tách",
                    }, {
                        value: 2,
                        text: "Nhà vệ sinh khô nổi hai ngăn",

                    },
                    {
                        value: 3,
                        text: "Nhà vệ sinh khô chìm",

                    },
                    {
                        value: 4,
                        text: "Nhà vệ sinh tự hoại",

                    },
                    {
                        value: 5,
                        text: "Nhà vệ sinh thấm dội nước",

                    },
                    {
                        value: 6,
                        text: "Nhà vệ sinh dội nước + bể biogas",

                    },
                    {
                        value: 7,
                        text: "Nhà vệ sinh dội nước (nước thải không qua bể phốt, hố, hay biogas)",

                    },
                    {
                        value: 8,
                        text: "Nhà vệ sinh thùng hoặc cầu tõm",

                    },
                    {
                        value: 99,
                        text: "Không quan sát được",

                    },],
                },
                {
                    field: "sannha_rannut",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "coloditieu_daynapkin",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "bechua_rannut",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "khoangcach_nguonnuoc_bechua",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Cách nhiều hơn 10 mét",
                    }, {
                        value: 2,
                        text: "Cách ít hơn 10 mét",

                    },],
                },
                {
                    field: "hoatdong_binhthuong",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    }, {
                        value: 99,
                        text: "Không biết",

                    },],
                },
                {
                    field: "capnuocsach",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "congtrinh_ruatay",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "quansat_congtrinh_ruatay",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Chỉ có nước sạch",
                    }, {
                        value: 2,
                        text: "Chỉ có xà phòng",

                    }, {
                        value: 3,
                        text: "Có cả nước sạch và xà phòng",
                    },
                    {
                        value: 4,
                        text: "Không có cả nước sạch và xà phòng",
                    },
                    {
                        value: 99,
                        text: "Không quan sát được",
                    },],
                    value: 0
                },
                {
                    field: "mailop_nhavesinh",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có, đủ bảo vệ và kín đáo",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "phan_dinhdong_nhavesinh",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "vesinh_sachse",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "sannha_vesinh_kho_sach",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "nangmui",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },
                    {
                        value: 99,
                        text: "Không thể kết luận được",

                    },],
                },
                {
                    field: "nuocthai_chaydidau",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Nước thải chảy đến ống thoát nước hở hoặc cống hở ",
                    }, {
                        value: 2,
                        text: "Nước thải chảy vào các chỗ trữ nước (ví dụ: ao, hồ)",

                    },
                    {
                        value: 3,
                        text: "hoặc các công trình hở",

                    },
                    {
                        value: 4,
                        text: "Nước thải chảy đến hố thấm hoặc cống kín",

                    },
                    {
                        value: 99,
                        text: "Không quan sát được",

                    },],
                },
                {
                    field: "bexi_docao",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "ngaplut_khi_mualon",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },
                    {
                        value: 99,
                        text: "Không biết",

                    },],
                },

                {
                    field: "khu_ditieu",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    }, {
                        value: 99,
                        text: "Không biết",

                    },],
                },
            ]
        },

        tools: [
            {
                name: "defaultgr",
                type: "group",
                groupClass: "toolbar-group",
                buttons: [
                    {
                        name: "back",
                        type: "button",
                        buttonClass: "btn-default btn-sm",
                        label: "TRANSLATE:BACK",
                        command: function () {
                            var self = this;
                            self.close();
                        }
                    },
                    {
                        name: "save",
                        type: "button",
                        buttonClass: "btn-success btn-sm",
                        label: "TRANSLATE:SAVE",
                        command: function () {
                            var self = this;
                            self.getApp().notify("Lưu thông tin thành công");
                            self.trigger("close", self.model.toJSON());
                            self.close();
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
                            self.getApp().notify('Xoá dữ liệu thành công');
                            self.trigger("delete", self.model.toJSON());
                            self.close();
                        }
                    },
                ],
            }],

        render: function () {
            var self = this;
            var id = null;
            if (self.viewData !== null) {
                id = self.viewData.id;
                var phieuthuthap_id = self.viewData.phieuthuthap_id;
                self.model.set("phieu_chitiet_vesinh_capnuoc_truong_tramyte_id", phieuthuthap_id);
            }
            if (id) {
                this.model.set('id', id);
                this.model.fetch({
                    success: function (data) {
                        self.applyBindings();
                    },
                    error: function () {
                        self.getApp().notify("Lỗi lấy dữ liệu");
                    },
                });
            } else {
                self.applyBindings();
            }

        },
    });
});
