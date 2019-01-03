define(function (require) {
    "use strict";
    var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

    var template = require('text!app/view/PhuLuc/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/tpl/model.html'),
        schema = require('json!schema/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuocSchema.json');
    var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
    var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
    var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
    var Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTeView = require('app/view/PhuLuc/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTe/view/ModelDialogView');

    return Gonrin.ModelView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
        uiControl: {
            fields: [
                {
                    field: "tinhthanh",
                    uicontrol: "ref",
                    textField: "ten",
                    foreignRemoteField: "id",
                    foreignField: "tinhthanh_id",
                    dataSource: TinhThanhSelectView
                },
                {
                    field: "quanhuyen",
                    uicontrol: "ref",
                    textField: "ten",
                    foreignRemoteField: "id",
                    foreignField: "quanhuyen_id",
                    dataSource: QuanHuyenSelectView
                },
                {
                    field: "xaphuong",
                    uicontrol: "ref",
                    textField: "ten",
                    foreignRemoteField: "id",
                    foreignField: "xaphuong_id",
                    dataSource: XaPhuongSelectView
                },
                {
                    field: "loai_truong_tramyte",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: '1',
                        text: "Trường mẫu giáo",
                    },
                    {
                        value: '2',
                        text: "Trường tiểu học",

                    },
                    {
                        value: '3',
                        text: "Trường trung học cơ sở",

                    },
                    {
                        value: '4',
                        text: "Trường trung học phổ thông",

                    },
                    {
                        value: '5',
                        text: "Trường trung học dạy nghề",

                    },
                    {
                        value: '6',
                        text: "Trường nội trú",

                    },
                    {
                        value: '7',
                        text: "Trạm y tế",

                    }]
                },
                {
                    field: "loaidiem_truong",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Điểm trường chính",
                    },
                    {
                        value: 2,
                        text: "Điểm trường phụ",

                    }]
                },
                {
                    field: "nguonnuocchinh",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Nước máy chảy đến bể, sân",
                    },
                    {
                        value: 2,
                        text: "Giếng khoan",

                    },
                    {
                        value: 3,
                        text: "Giếng đào được bảo vệ",

                    },
                    {
                        value: 4,
                        text: "Giếng đào không được bảo vệ",

                    },
                    {
                        value: 5,
                        text: "Nước mưa",

                    },
                    {
                        value: 6,
                        text: "Nước đóng chai",

                    },
                    {
                        value: 96,
                        text: "Nguồn nước khác (nêu rõ)",
                    },
                    ]
                },
                {
                    field: "phieuchitiet",
                    uicontrol: "grid",
                    refresh: true,
                    primaryField: "id",
                    fields: [
                        { field: "ten_truong_tramyte", label: "Tên trường học/trạm y tế", width:250 },
                        { field: "ma_truong_tramyte", label: "Mã trường học/trạm y tế", width:250 },
                        { field: "ten_khu_khaosat", label: "Khu khảo sát", width:250 },
                        { field: "ghichu", label: "Nhận xét bổ sung", width:250 },
                        {
                            field: "command",
                            label: " ",
                            width: "50px",
                            command: [
                                {
                                    "label": "Delete",
                                    "action": function (params, args) {
                                        var self = this;
                                        var fields = self.model.get("phieuchitiet");
//                                        console.log("arr field===", fields);
//                                        console.log("params===", params);
//                                        console.log("args===", args);
                                        var rowID = params.rowData.id;
//                                        console.log("Row ID", rowID);
                                        for (var i = 0; i < fields.length; i++) {
                                            if (fields[i].id === rowID) {
//                                                console.log("logid", fields[i].id);
                                                fields.splice(i, 1);
                                            }
                                        }
                                        self.applyBindings();

                                    },
                                    "class": "btn-danger btn-sm"
                                },
                            ],
                        },

                    ],

                    tools: [
                        {
                            name: "create",
                            buttonClass: "btn-success",
                            label: "Thêm Phiếu",
                            command: function () {
                                var self = this;
                                var view = new Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTeView({ "viewData": { "id": null, "phieuthuthap_id": self.model.get("id") } });
                                view.dialog({
                                    size: "large"
                                });
                                
                                view.$el.find("#quansat_khuvesinh_loaikhac").hide();
                                view.model.on("change:quansat_khuvesinh", function () {
                                	if (view.model.get("quansat_khuvesinh") == 96) {
                                		view.$el.find("#quansat_khuvesinh_loaikhac").show();
                                	} else{
                                		view.$el.find("#quansat_khuvesinh_loaikhac").hide();
                                	}
                    			});
                                
                                view.model.on("change:congtrinh_ruatay", function () {
                                	if (view.model.get("congtrinh_ruatay") == 2) {
                                		view.$el.find("#quansat_congtrinh_ruatay").hide();
                                	} else{
                                		view.$el.find("#quansat_congtrinh_ruatay").show();
                                	}
                    			});
                                
                                view.model.on("change:khu_ditieu", function () {
                                	if (view.model.get("khu_ditieu") == 2) {
                                		view.$el.find("#thongtinkhuditieu").hide();
                                	} else{
                                		view.$el.find("#thongtinkhuditieu").show();
                                	}
                    			});

                                var tentruongtram = self.model.get("ten_truong_tramyte");
                                view.model.set("ten_truong_tramyte", tentruongtram);
                                var tentruongtram = self.model.get("ma_truong_tramyte");
                                view.model.set("ma_truong_tramyte", tentruongtram);

                                view.on('close', function (data) {

                                    var phieuchitiet = self.model.get('phieuchitiet');
                                    if (phieuchitiet == null) {
                                        phieuchitiet = [];
                                    }
                                    view.model.set("id", gonrin.uuid());
                                    phieuchitiet.push(view.model.toJSON());
                                    self.model.set("phieuchitiet", phieuchitiet);
                                    self.applyBindings();
                                });

                            }
                        },

                    ],
                    onRowClick: function (event) {
                        var self = this;
                        
                        if (event.rowId) {
                            var view = new Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTeView();
                            
                            view.$el.find("#quansat_khuvesinh_loaikhac").hide();
                            view.model.on("change:quansat_khuvesinh", function () {
                            	if (view.model.get("quansat_khuvesinh") == 96) {
                            		view.$el.find("#quansat_khuvesinh_loaikhac").show();
                            	} else{
                            		view.$el.find("#quansat_khuvesinh_loaikhac").hide();
                            	}
                			});
                            
                            view.model.on("change:congtrinh_ruatay", function () {
                            	if (view.model.get("congtrinh_ruatay") == 2) {
                            		view.$el.find("#quansat_congtrinh_ruatay").hide();
                            	} else{
                            		view.$el.find("#quansat_congtrinh_ruatay").show();
                            	}
                			});
                            
                            view.model.on("change:khu_ditieu", function () {
                            	if (view.model.get("khu_ditieu") == 2) {
                            		view.$el.find("#thongtinkhuditieu").hide();
                            	} else{
                            		view.$el.find("#thongtinkhuditieu").show();
                            	}
                			});
                            
                            view.model.set(event.rowData);
                            view.dialog({
                                size: "large"
                            });

                            view.on("delete", function (event) {
//                                console.log("event=====", event);
                                var fields = self.model.get("phieuchitiet");
//                                console.log("ROWID=======", event.id);
//                                console.log("phieu chi tiet", fields);
                                for (var i = 0; i < fields.length; i++) {
                                    if (fields[i].id === event.id) {
                                        fields.splice(i, 1);
                                    }
                                    self.model.set("phieuchitiet", fields);
                                    self.applyBindings();
                                }
                            });
                            view.on('close', function (data) {
                                var phieuchitiet = self.model.get("phieuchitiet");
//                                console.log("data==========", data);
//                                console.log("phieuchitiet", phieuchitiet);
                                for (var i = 0; i < phieuchitiet.length; i++) {
//                                    console.log(phieuchitiet[i].id);
                                    if (phieuchitiet[i].id == data.id) {
                                        phieuchitiet[i] = data;
                                    }
                                }
                                self.model.set("phieuchitiet", phieuchitiet);
                                self.applyBindings();
                            });
                        }
                    },


                },
            ],
        },
        tools: [
            {
                name: "defaultgr",
                type: "group",
                groupClass: "toolbar-group",
                buttons: [
                    {
                        name: "back",
                        type: "button",
                        buttonClass: "btn-default btn-sm",
                        label: "TRANSLATE:BACK",
                        command: function () {
                            var self = this;

                            Backbone.history.history.back();
                        }
                    },
                    {
                        name: "save",
                        type: "button",
                        buttonClass: "btn-success btn-sm",
                        label: "TRANSLATE:SAVE",
                        command: function () {
                            var self = this;
                            var tentruongtram = self.model.get("ten_truong_tramyte");
    						var matruongtram = self.model.get("ma_truong_tramyte");
    						
    						if(tentruongtram === null || tentruongtram === ""){
    							self.getApp().notify({message: "Chưa nhập tên trường học/trạm y tế!"},{type: "danger"});
    						}else if(matruongtram === null || matruongtram === ""){
    							self.getApp().notify({message: "Chưa nhập mã trường học/trạm y tế"},{type: "danger"});
    						} else {
                            self.model.save(null,
                                {
                                    success: function (model, respose, options) {
                                        self.getApp().notify("Lưu thông tin thành công");
                                        self.getApp().getRouter().navigate(
                                            self.collectionName + "/collection");

                                    },
                                    error: function (model, xhr, options) {
                                        self.getApp().notify('Lưu thông tin không thành công!');
                                    }
                                });
    						}
                        }
                    },
                    {
                        name: "delete",
                        type: "button",
                        buttonClass: "btn-danger btn-sm",
                        label: "TRANSLATE:DELETE",
                        visible: function () {
                            return this.getApp().getRouter().getParam("id") !== null;
                        },
                        command: function () {
                            var self = this;
                            self.model.destroy({
                                success: function (model, response) {
                                    self.getApp().notify('Xoá dữ liệu thành công');
                                    self.getApp().getRouter().navigate(self.collectionName + "/collection");
                                },
                                error: function (model, xhr, options) {
                                    self.getApp().notify('Xoá dữ liệu không thành công!');

                                }
                            });
                        }
                    },
                ],
            }
        ],

        render: function () {
            var self = this;
            self.$el.find("#nguonnuocchinh_loaikhac").hide();
            var id = this.getApp().getRouter().getParam("id");
            self.model.on("change:loai_truong_tramyte", function () {
                if (self.model.get("loai_truong_tramyte") == 7) {
                    self.$el.find("#buoihoc").hide();
                    self.$el.find("#loaidiemtruong").hide();
                } else {
                    self.$el.find("#buoihoc").show();
                    self.$el.find("#loaidiemtruong").show();
                }
            });
            
            self.model.on("change:nguonnuocchinh", function () {
            	if (self.model.get("nguonnuocchinh") == 96) {
            		self.$el.find("#nguonnuocchinh_loaikhac").show();
            	} else{
            		self.$el.find("#nguonnuocchinh_loaikhac").hide();
            	}
			});
            var viewData = self.viewData;
            if (viewData !== null && viewData !== undefined) {
                id = null;
            }
            if (id) {
                this.model.set('id', id);
                this.model.fetch({
                    success: function (data) {
                        self.applyBindings();
                    },
                    error: function () {
                        self.getApp().notify("Lỗi lấy dữ liệu");
                    },
                });
            } else {
                self.applyBindings();
            }

        },
    });
});