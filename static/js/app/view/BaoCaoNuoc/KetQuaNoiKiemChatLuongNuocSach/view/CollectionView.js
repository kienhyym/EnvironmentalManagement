define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/tpl/collection.html'),
        schema = require('json!schema/KetQuaNoiKiemChatLuongNuocSachSchema.json');
    var TemplateHelper		= require('app/bases/TemplateHelper');


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
                template:function(rowData){
	    	    	 var template_helper = new TemplateHelper();
	    	    	 return template_helper.datetimeFormat(rowData.ngaybaocao, "DD/MM/YYYY");
	    	     }
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
                template:function(rowData){
	    	    	 var template_helper = new TemplateHelper();
	    	    	 return template_helper.datetimeFormat(rowData.thoigiankiemtra, "DD/MM/YYYY");
	    	     }
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
			self.uiControl.orderBy = [{"field": "nambaocao", "direction": "desc"}, 
				{"field": "tendonvicapnuoc", "direction": "desc"}, 
				{"field": "congsuat_thietke", "direction": "desc"},
				{"field": "ngaybaocao", "direction": "desc"}];
			this.applyBindings();
            return this;
        	
        },
    });

});