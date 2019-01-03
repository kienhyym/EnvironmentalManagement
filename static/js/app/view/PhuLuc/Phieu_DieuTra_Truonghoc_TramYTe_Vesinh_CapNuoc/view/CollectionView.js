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
                { field: "loai_truong_tramyte", label: "Loại trường/trạm", },

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
