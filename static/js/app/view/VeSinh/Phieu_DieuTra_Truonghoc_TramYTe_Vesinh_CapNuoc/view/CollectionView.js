define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/tpl/collection.html'),
        schema = require('json!schema/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuocSchema.json');
    
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
        tools: [{
			name: "defaultgr",
			type: "group",
			groupClass: "toolbar-group",
			buttons: [{
					name: "CREATE",
					type: "button",
					buttonClass: "btn-success btn-sm",
					label: "TRANSLATE:CREATE",
					command: function () {
						var self = this;
						var loaibaocao = self.getApp().getRouter().getParam("loaikybaocao");
						var path = this.collectionName + '/model/'+loaibaocao;
						this.getApp().getRouter().navigate(path);
					}
				}]
		}],
        uiControl: {
            fields: [
                {
					field: "nambaocao",
                    label: "Năm báo cáo",
                    width: 120
				},
                {
                    field: "tinhthanh",
                    textField: "ten",
                    label: "Tên Tỉnh",
                    foreignRemoteField: "id",
                    foreignField: "tinhthanh_id",
                },
                {
                    field: "quanhuyen",
                    textField: "ten",
                    label: "Tên Huyện",
                    foreignRemoteField: "id",
                    foreignField: "quanhuyen_id",
                },
                {
                    field: "xaphuong",
                    textField: "ten",
                    label: "Tên Xã",
                    foreignRemoteField: "id",
                    foreignField: "xaphuong_id",
                },
                { field: "ten_truong_tramyte", label: "Tên trường học/trạm y tế" },
                {
                    field: "loai_truong_tramyte",
                    label: "Loại trường học/trạm y tế",
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
                { field: "ketluan", label: "Kết Luận", template:function(rowData){
                	if(rowData.ketluan ===1){
                		return "Hợp vệ sinh";
                	}else{
                		return "không hợp vệ sinh";
                	}
                }
                },

            ],
            pagination: {
            	page: 1,
            	pageSize: 100
            },
            onRowClick: function (event) {
                if (event.rowId) {
                	var loaibaocao = this.getApp().getRouter().getParam("loaikybaocao");
					var path = this.collectionName + '/model/'+loaibaocao+ '?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
                }
            }
        },
        render: function () {
        	var self = this;
        	var loaibaocao = this.getApp().getRouter().getParam("loaikybaocao");
			var itemkybaocao = self.getApp().mapKyBaoCao[loaibaocao];
			if (itemkybaocao === null || itemkybaocao ==="undefined"){
				self.getApp().notify("Đường dẫn không hợp lệ, vui lòng thử lại sau");
				return;
			}else{
				var txt_header = "Danh sách phiếu thu thập trường học/ trạm y tế - "+itemkybaocao.text;
				self.$el.find(".panel-heading h3").html(txt_header);
				self.uiControl.filters = {"$and":[{"loaikybaocao":{"$eq":itemkybaocao.loaikybaocao}}, 
					{"kybaocao":{"$eq":itemkybaocao.kybaocao}},
					{"donvi_id":{"$eq":self.getApp().currentUser.donvi_id}}]};
				self.uiControl.orderBy = [{"field": "nambaocao", "direction": "desc"}];
				this.applyBindings();
				return this;
			}
        },
    });

});
