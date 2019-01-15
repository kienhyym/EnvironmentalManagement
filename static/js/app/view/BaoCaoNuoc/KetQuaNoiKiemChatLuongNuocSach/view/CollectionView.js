define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/tpl/collection.html'),
        schema = require('json!schema/KetQuaNoiKiemChatLuongNuocSachSchema.json');


    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "ketqua_noikiem_chatluong_nuocsach",
        uiControl: {
            fields: [
            {
                field: "donvicapnuoc_id",
                label: "Tên đơn vị cấp nước",
                foreign: "donvicapnuoc",
                foreignValueField: "id",
                foreignTextField: "ten",
            },
            {
                field: "nambaocao",
                label: "Năm báo cáo",
            },
            {
                field: "ngaybaocao",
                label: "Ngày báo cáo",
            },
            {
                field: "diachi_donvicapnuoc",
                label: "Địa chỉ",
            },
            {
                field: "nguoikiemtra",
                label: "Người kiểm tra",
            },
            {
                field: "thoigiankiemtra",
                label: "Thời gian kiểm tra",
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
//        formatDate: function () {
//        	console.log("formatDate function");
//        },
    });

});