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
                    field: "tinhthanh",
                    textField: "ten",
                    label: "Tên Tỉnh",
                    foreignRemoteField: "id",
                    foreignField: "tinhthanh_id",
                    width:250
                },
                {
                    field: "quanhuyen",
                    textField: "ten",
                    label: "Tên Huyện",
                    foreignRemoteField: "id",
                    foreignField: "quanhuyen_id",
                    width:250
                },
                {
                    field: "xaphuong",
                    textField: "ten",
                    label: "Tên Xã",
                    foreignRemoteField: "id",
                    foreignField: "xaphuong_id",
                    width:250
                },
                { field: "ten_truong_tramyte", label: "Tên trường học/trạm y tế", width:250 },
                { field: "ma_truong_tramyte", label: "Mã trường học/trạm y tế", width:250 },
                {
                    field: "loai_truong_tramyte",
                    label: "Loại trường học/trạm y tế",
                    width:250,
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
