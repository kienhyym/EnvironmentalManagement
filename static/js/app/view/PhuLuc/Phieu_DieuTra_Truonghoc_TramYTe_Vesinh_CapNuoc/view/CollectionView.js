define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/PhuLuc/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/tpl/collection.html'),
        schema = require('json!schema/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuocSchema.json');
    
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
        uiControl: {
            fields: [

                {
                    field: "xaphuong",
                    textField: "ten",
                    label: "Tên xã",
                    foreignRemoteField: "id",
                    foreignField: "xaphuong_id",
                },
                { field: "ten_truong_tramyte", label: "Tên trường/trạm" },
                { field: "ma_truong_tramyte", label: "Mã trường/trạm" },
                {
                    field: "loai_truong_tramyte",
                    label: "Loại trường/trạm",
                    template: function (dataRow) {
                        if (dataRow.loai_truong_tramyte === 7) {
                            return "Trạm y tế"
                        } else if (dataRow.loai_truong_tramyte === 6) {
                            return "Trường nội trú";
                        } else if (dataRow.loai_truong_tramyte === 5) {
                            return "Trường trung học dạy nghề";
                        } else if (dataRow.loai_truong_tramyte === 4) {
                            return "Trường trung học phổ thông";
                        } else if (dataRow.loai_truong_tramyte === 3) {
                            return "Trường trung học cơ sở";
                        } else if (dataRow.loai_truong_tramyte === 2) {
                            return "Trường tiểu học";
                        } else {
                            return "Trường mẫu giáo";
                        }
                    },
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
