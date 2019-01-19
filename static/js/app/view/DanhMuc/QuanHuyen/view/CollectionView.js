define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/tpl/DanhMuc/QuanHuyen/collection.html'),
        schema = require('json!schema/QuanHuyenSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "quanhuyen",
        uiControl: {
            fields: [
                { field: "ma", label: "Mã", width: 250 },
                { field: "ten", label: "Tên", width: 250 },
                {
                    field: "tinhthanh_id",
                    label: "Tỉnh thành",
                    foreign: "tinhthanh",
                    foreignValueField: "id",
                    foreignTextField: "ten",
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
            if (this.getApp().data("tinhthanh_id") !== null) {
                this.uiControl.filters = { "tinhthanh_id": { "$eq": this.getApp().data("tinhthanh_id") } };
            }
            this.applyBindings();
            return this;
        }
    });
});