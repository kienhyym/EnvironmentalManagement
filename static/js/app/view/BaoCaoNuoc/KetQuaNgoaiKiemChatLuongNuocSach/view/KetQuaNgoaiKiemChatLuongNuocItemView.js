define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/itemThongSoNgoaiKiem.html'),
        schema = require('json!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/KetQuaNgoaiKiemChatLuongNuocSachItemSchema.json');

    var mautemplate = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/itemViTriLayMau.html');
    var vitrimau_schema = require('json!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/ViTriMauSchema.json');

//    var mauschema = {
//        "mavitrimau": {
//            "type": "number",
//            "primary": true
//        },
//        "tenvitrimau": {
//            "type": "string"
//        },
//        "ngaykiemtra": {
//            "type": "datetime"
//        },
//        "ketqua": {
//            "type": "number"
//        },
//        "danhgia": {
//            "type": "number"
//        }
//    };
    var MauViTriItemView = Gonrin.ModelView.extend({
        idAttribtue: "vitrimau",
        tagName: "td",
        template: mautemplate,
        modelSchema: vitrimau_schema,
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
//            $.each(self.model.get("ketquakiemtra"), function (idx, obj) {
//                var view = new MauViTriItemView();
//                view.model.set(obj);
//                view.render();
//                self.$el.find("#gioihan").before(view.$el);
//                view.model.on("change:ketqua", function () {
//                    self.updateKetQua(view.model.toJSON());
//                })
//            });
            var ketquakiemtra = self.model.get("ketquakiemtra");
            $.each(ketquakiemtra, function (idx, obj) {
                var view = new MauViTriItemView();
                view.model.set(obj);
                view.render();
                self.$el.find("#gioihan").before(view.$el);
                view.model.on("change:ketqua", function () {
                	
                	var danhsachketqua = self.model.get("ketquakiemtra");
                	var viewData = view.model.toJSON();
                	var danhgiaThongSo = 1;
                	var thongso_data = self.model.toJSON();
                	
                	for(var i=0; i< danhsachketqua.length; i++){
                		if (!!danhsachketqua[i] && danhsachketqua[i].id === viewData.id){
                			danhsachketqua[i].ketqua = viewData.ketqua;
                		}
                		var ketqua_danhgia = self.check_thongso(thongso_data, danhsachketqua[i].ketqua);
                		danhsachketqua[i].danhgia = ketqua_danhgia;
                		danhgiaThongSo *= ketqua_danhgia ? ketqua_danhgia : 0;
                	}
                    self.model.set("danhgia",danhgiaThongSo);
                    self.model.set("ketquakiemtra",danhsachketqua);
                	self.applyBindings();
                	
                	var data_thongso = self.model.toJSON();
                	self.trigger("ketquachange", data_thongso);
                });
            });
        },
        check_thongso: function(objthongso, ketquathongso){
        	var result = 0;
        	if (objthongso !== null && objthongso.gioihan_toithieu !== null && objthongso.gioihan_toida == null && ketquathongso >= objthongso.gioihan_toithieu){ 
        		result = 1;
        	}else if (objthongso !== null && objthongso.gioihan_toithieu == null && objthongso.gioihan_toida !== null && ketquathongso <= objthongso.gioihan_toida){
        		result = 1;
        	} else if (objthongso !== null && objthongso.gioihan_toithieu !== null && objthongso.gioihan_toida !== null && ketquathongso <= objthongso.gioihan_toida && ketquathongso >= objthongso.gioihan_toithieu){
        		result = 1;
        	}
        	return result;
        },
    });

});