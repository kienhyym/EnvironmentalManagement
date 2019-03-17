define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/collection.html'),
        schema = require('json!schema/KetQuaNgoaiKiemChatLuongNuocSachSchema.json');
    var TemplateHelper		= require('app/bases/TemplateHelper');


    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "ketqua_ngoaikiem_chatluong_nuocsach",
        uiControl: {
            fields: [
            {
                field: "nambaocao",
                label: "Năm báo cáo",
                
            },
            {
                field: "ngaybaocao",
                label: "Ngày báo cáo",
                template:function(rowData){
	    	    	 var template_helper = new TemplateHelper();
	    	    	 return template_helper.datetimeFormat(rowData.ngaybaocao, "DD/MM/YYYY");
	    	     }
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
                
            },
            {
                field: "tendonvi_ngoaikiem",
                label: "Đơn vị ngoại kiểm",
                
            },

            ],
            pagination: {
            	page: 1,
            	pageSize: 100
            },
            onRowClick: function (event) {
                if (event.rowId) {
                    var path = this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }

            }
        },
        render: function () {
        	var self = this;
        	self.uiControl.filters = {"$and":[{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
			self.uiControl.orderBy = [{"field": "nambaocao", "direction": "desc"}];
			this.applyBindings();
            
            self.$el.find("#filterBtn").attr({ "style": "margin-top: 26px;" });
            self.$el.find("#clear").attr({ "style": "margin-top: 26px;" });
            var filterBtn = self.$el.find("#filterBtn");
            filterBtn.unbind("click").bind("click", function () {
                var filter_nam = self.$el.find("#filter_nam").val().trim();
                const isNumeric = /^\d+$/;
                var filter_tendonvicapnuoc = self.$el.find("#filter_tendonvicapnuoc").val().trim();
                var $col = self.getCollectionElement();
                if (!filter_nam && !filter_tendonvicapnuoc){
                    self.getApp().notify({ message: "Mời bạn nhập thông tin cần tìm kiếm vào bộ lọc!" }, { type: "danger" });
                    return;
                } else if (!filter_tendonvicapnuoc && filter_nam){
                    if (isNumeric.test(filter_nam) === false){
                        self.getApp().notify({ message: "Năm không hợp lệ, vui lòng kiểm tra lại!" }, { type: "danger" });
                        return;
                    }
                    var filters = {
                        "$and": [
                            {
                                "nambaocao": {
                                    "$eq": filter_nam
                                }
                            },
                            {
                                "donvi_id": {
                                    "$eq": self.getApp().currentUser.donvi_id
                                }
                            }
                        ]
                    }
                    $col.data('gonrin').filter(filters);
                } else if (filter_tendonvicapnuoc && !filter_nam){
                    var filters = {
                        "$and": [
                            {
                                "tendonvicapnuoc": {
                                    "$likeI": filter_tendonvicapnuoc
                                }
                            },
                            {
                                "donvi_id": {
                                    "$eq": self.getApp().currentUser.donvi_id
                                }
                            }
                        ]
                    }
                    $col.data('gonrin').filter(filters);
                } else if (filter_nam && filter_tendonvicapnuoc){
                    var filters = {
                        "$and": [
                            {
                                "nambaocao": {
                                    "$eq": filter_nam
                                }
                            },
                            {
                                "tendonvicapnuoc": {
                                    "$likeI": filter_tendonvicapnuoc
                                }
                            },
                            {
                                "donvi_id": {
                                    "$eq": self.getApp().currentUser.donvi_id
                                }
                            }
                        ]
                    }
                    $col.data('gonrin').filter(filters);
                }
            });
            self.$el.find("#clear").unbind("click").bind("click", function () {
                var $col = self.getCollectionElement();
                self.$el.find("#filter_nam").val("");
                self.$el.find("#filter_tendonvicapnuoc").val("");
                var filters = {"$and":[{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
                $col.data('gonrin').filter(filters);
            });
            self.applyBindings();
            return this;
        },
    });

});