define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/itemThongSoNgoaiKiem.html'),
        schema = require('json!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/KetQuaNgoaiKiemChatLuongNuocSachItemSchema.json');

    var mautemplate = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/itemViTriLayMau.html');
    var mauschema = {
        "mavitrimau": {
            "type": "number",
            "primary": true
        },
        "tenvitrimau": {
            "type": "string"
        },
        "ngaykiemtra": {
            "type": "datetime"
        },
        "ketqua": {
            "type": "number"
        },
        "danhgia": {
            "type": "number"
        }
    };
    var MauViTriItemView = Gonrin.ModelView.extend({
        idAttribtue: "vitrimau",
        tagName: "td",
        template: mautemplate,
        modelSchema: mauschema,
        urlPrefix: "/api/v1/",
        bindings: "mau-data",
        collectionName: "ketqua_ngoaikiem_chatluong_nuocsach_mau_itemview",
        uiControl: {
            fields: []
        },
        tools: null,
        render: function () {
            var self = this;

            self.$el.addClass("text-center");
            self.applyBindings();

            //			self.getApp().on("ketquangoaikiemchatluongnuoc:changesomau", function(){
            //				self.$el.remove();
            //				self.destroy();
            //			})
        },
    });

    return Gonrin.ModelView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        bindings: "bind-item-data",
        collectionName: "ketqua_ngoaikiem_chatluong_nuocsach_itemview",
        uiControl: {
            fields: [],
        },
        tools: null,

        render: function () {
            var self = this;
            self.applyBindings();
            this.setElement(this.el.innerHTML);
            if (self.model.get("danhgia") == 1) {
                self.$el.find("[id=danhgiathongso]").text("Đạt");
            } else {
                self.$el.find("[id=danhgiathongso]").text("Không Đạt");
            }
            $.each(self.model.get("ketquakiemtra"), function (idx, obj) {
                var view = new MauViTriItemView();
                view.model.set(obj);
                view.render();
                self.$el.find("#gioihan").before(view.$el);
                view.model.on("change:ketqua", function () {
                    self.updateKetQua(view.model.toJSON());
                })
            });
        },
        updateKetQua: function (obj) {
            var self = this;
            for (var i = 0; i < self.model.get("ketquakiemtra").length; i++) {
                if (self.model.get("ketquakiemtra")[i].vitrimau == obj.vitrimau) {
                    self.model.get("ketquakiemtra")[i].ketqua = obj.ketqua;
                    //danh gia
                }
            }
            //console.log(self.model.toJSON());
            self.trigger("ketquachange", self.model.toJSON());
        }
    });

});