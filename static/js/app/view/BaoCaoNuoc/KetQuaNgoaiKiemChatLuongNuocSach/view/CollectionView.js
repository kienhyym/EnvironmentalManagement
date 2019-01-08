define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/collection.html'),
        schema = require('json!schema/KetQuaNgoaiKiemChatLuongNuocSachSchema.json');


    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "ketqua_ngoaikiem_chatluong_nuocsach",
        uiControl: {
            fields: [{
                field: "thoigiankiemtra",
                label: "Thời gian kiểm tra",
                width: 250
            },
            {
                field: "donvicapnuoc_id",
                label: "Tên đơn vị cấp nước",
                foreign: "donvicapnuoc",
                foreignValueField: "id",
                foreignTextField: "ten",
            },
            {
                field: "diachi_donvicapnuoc",
                label: "Địa chỉ",
                width: 250
            },
            {
                field: "nguonnuoc",
                label: "Nguồn nước nguyên liệu",
                width: 250
            },
            {
                field: "somauvavitri",
                label: "Số mẫu vị trí lấy mẫu nước",
                width: 250
            },


            ],
            onRowClick: function (event) {
                if (event.rowId) {
                    var path = this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }

            }
        },
        render: function () {
            this.applyBindings();
            return this;
        },
    });

});