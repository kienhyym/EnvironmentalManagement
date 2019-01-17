define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/tpl/itemThongSoNoiKiem.html'),
        schema = require('json!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/view/KetQuaNoiKiemChatLuongNuocSachItemSchema.json');

    var mautemplate = require('text!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/tpl/itemViTriLayMau.html');

    var vitrimau_schema = require('json!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/view/ViTriMauSchema.json');
    
    var MauViTriItemView = Gonrin.ModelView.extend({
        idAttribtue: "vitrimau",
        tagName: "td",
        template: mautemplate,
        modelSchema: vitrimau_schema,
        urlPrefix: "/api/v1/",
        bindings: "mau-data",
        collectionName: "ketqua_noikiem_chatluong_nuocsach_mau_itemview",
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
        collectionName: "ketqua_noikiem_chatluong_nuocsach_itemview",
        uiControl: {
            fields: [
            	
            ],
        },
        tools: null,

        render: function () {
            var self = this;
           
            this.setElement(this.el.innerHTML);
            if (self.model.get("danhgia") == 1) {
                self.$el.find("[id=danhgiathongso]").text("Đạt");
            } else {
                self.$el.find("[id=danhgiathongso]").text("Không Đạt");
            }
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
//                    self.updateKetQua(view.model.toJSON());
                    
                });
            });
            self.applyBindings();
        },
        check_thongso: function(objthongso, ketquathongso){
        	var result = 0;
        	if (ketquathongso && objthongso.gioihan_toithieu !== null && objthongso.gioihan_toida == null && ketquathongso >= objthongso.gioihan_toithieu){ 
        		result = 1;
        	}else if (ketquathongso && objthongso.gioihan_toithieu == null && objthongso.gioihan_toida !== null && ketquathongso <= objthongso.gioihan_toida){
        		result = 1;
        	} else if (ketquathongso && !!objthongso.gioihan_toithieu && !!objthongso.gioihan_toida && ketquathongso <= objthongso.gioihan_toida && ketquathongso >= objthongso.gioihan_toithieu){
        		result = 1;
        	}
        	return result;
        },
//        updateKetQua: function (obj) {
//            var self = this;
//            for (var i = 0; i < self.model.get("ketquakiemtra").length; i++) {
//            	console.log('self.model.get("ketquakiemtra")[i]=====',self.model.get("ketquakiemtra")[i]);
//                if (self.model.get("ketquakiemtra")[i].id === obj.id) {
//                    self.model.get("ketquakiemtra")[i].ketqua = obj.ketqua;
//                    console.log("ket qua item view====",obj)
//                    break;
//                    //danh gia
//                }
//            }
//            //console.log(self.model.toJSON());
//            self.trigger("ketquachange", self.model.toJSON());
//        }
    });

});