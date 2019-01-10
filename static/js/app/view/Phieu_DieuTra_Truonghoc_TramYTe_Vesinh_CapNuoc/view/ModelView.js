define(function (require) {
    "use strict";
    var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

    var template = require('text!app/view/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/tpl/model.html'),
        schema = require('json!schema/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuocSchema.json');
    var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
    var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
    var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
    var Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTeView = require('app/view/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTe/view/ModelDialogView');

    return Gonrin.ModelView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
        uiControl: {
            fields: [
                {
                    field: "ketluan",
                    uicontrol: "combobox",
                    textField: "text",
                    valueField: "value",
                    dataSource: [
                    	{
	                        value: 1,
	                        text: "Hợp vệ sinh"
	                    }, {
	                        value: 0,
	                        text: "Không hợp vệ sinh"
	                    }
                    ]
                },
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
                        value: 1,
                        text: "Trường mẫu giáo",
                    },
                    {
                        value: 2,
                        text: "Trường tiểu học",
                    },
                    {
                        value: 3,
                        text: "Trường trung học cơ sở",
                    },
                    {
                        value: 4,
                        text: "Trường trung học phổ thông",
                    },
                    {
                        value: 5,
                        text: "Trường trung học dạy nghề",
                    },
                    {
                        value: 6,
                        text: "Trường nội trú",
                    },
                    {
                        value: 7,
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
                        { field: "ten_khu_khaosat", label: "Khu khảo sát" },
                        { field: "quansat_khuvesinh", label: "Loại nhà vệ sinh", template:function(rowData){
                        	if(rowData.quansat_khuvesinh === 1 || rowData.quansat_khuvesinh === "1"){
                        		return "Nhà vệ sinh khô nổi một ngăn tách";
                        	}else if(rowData.quansat_khuvesinh === 2 || rowData.quansat_khuvesinh === "2"){
                        		return "Nhà vệ sinh khô nổi hai ngăn";
                        	}else if(rowData.quansat_khuvesinh === 3 || rowData.quansat_khuvesinh === "3"){
                        		return "Nhà vệ sinh khô chìm";
                        	} else if(rowData.quansat_khuvesinh === 4 || rowData.quansat_khuvesinh === "4"){
                        		return "Nhà vệ sinh tự hoại";
                        	} else if(rowData.quansat_khuvesinh === 5 || rowData.quansat_khuvesinh === "5"){
                        		return "Nhà vệ sinh thấm dội nước";
                        	} else if(rowData.quansat_khuvesinh === 6 || rowData.quansat_khuvesinh === "6"){
                        		return "Nhà vệ sinh dội nước + bể biogas";
                        	} else if(rowData.quansat_khuvesinh === 7 || rowData.quansat_khuvesinh === "7"){
                        		return "Nhà vệ sinh dội nước (nước thải không qua bể phốt, hố, hay biogas)";
                        	} else if(rowData.quansat_khuvesinh === 8 || rowData.quansat_khuvesinh === "8"){
                        		return "Nhà vệ sinh thùng hoặc cầu tõm";
                        	} else if(rowData.quansat_khuvesinh === 99 || rowData.quansat_khuvesinh === "99"){
                        		return "Không quan sát được";
                        	} else if(rowData.quansat_khuvesinh === 96 || rowData.quansat_khuvesinh === "96"){
                        		return "Khác (Nêu rõ)";
                        	}else{
                        		return "";
                        	}
                        } },
                        { field: "ketluan", label: "Kết Luận", template:function(rowData){
                        	if(rowData.ketluan === 1 || rowData.ketluan === "1"){
                        		return "Hợp vệ sinh";
                        	}else{
                        		return "Không hợp vệ sinh";
                        	}
                        }},
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
                                        var rowID = params.rowData.id;
                                        for (var i = 0; i < fields.length; i++) {
                                            if (fields[i].id === rowID) {
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
                                var view = new Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTeView({ "viewData": self.model.toJSON() });
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
                                	if (view.model.get("khu_ditieu") == 1) {
                                		view.$el.find("#thongtinkhuditieu").show();
                                	} else{
                                		view.$el.find("#thongtinkhuditieu").hide();
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
                                    self.model.trigger("change:phieuchitiet");
                                    self.applyBindings();
                                });

                            }
                        },

                    ],
                    onRowClick: function (event) {
                        var self = this;
                        
                        if (event.rowId) {
                            var view = new Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTeView({ "viewData": self.model.toJSON() });

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
                            	if (view.model.get("khu_ditieu") === 1) {
                            		view.$el.find("#thongtinkhuditieu").show();
                            	} else{
                            		view.$el.find("#thongtinkhuditieu").hide();
                            	}
                			});
                            
                            view.model.set(event.rowData);
                            view.dialog({
                                size: "large"
                            });
                            view.on("delete", function (event) {
                                var fields = self.model.get("phieuchitiet");
                                for (var i = 0; i < fields.length; i++) {
                                    if (fields[i].id === event.id) {
                                        fields.splice(i, 1);
                                    }
                                    self.model.set("phieuchitiet", fields);
                                    self.model.trigger("change:phieuchitiet");
                                    self.applyBindings();
                                }
                            });
                            view.on('close', function (data) {
                                var phieuchitiet = self.model.get("phieuchitiet");
                                for (var i = 0; i < phieuchitiet.length; i++) {
                                    if (phieuchitiet[i].id == data.id) {
                                        phieuchitiet[i] = data;
                                    }
                                }
                                self.model.set("phieuchitiet", phieuchitiet);
                                self.model.trigger("change:phieuchitiet");
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
    						var tinhthanh = self.model.get("tinhthanh");
    						var quanhuyen = self.model.get("quanhuyen");
    						var xaphuong = self.model.get("xaphuong");
    						var tennguoitraloi = self.model.get("tennguoitraloi");
    						var chucvu_nguoitraloi = self.model.get("chucvu_nguoitraloi");
    						var thongtinlienlac = self.model.get("thongtinlienlac");
    						if(tinhthanh === null || tinhthanh === ""){
    							self.getApp().notify({message: "Chưa chọn tên tỉnh"},{type: "danger"});
    						} else if(quanhuyen === null || quanhuyen === ""){
    							self.getApp().notify({message: "Chưa chọn tên huyện"},{type: "danger"});
    						} else if(xaphuong === null || xaphuong === ""){
    							self.getApp().notify({message: "Chưa chọn tên xã"},{type: "danger"});
    						} else if(tentruongtram === null || tentruongtram === ""){
    							self.getApp().notify({message: "Chưa nhập tên trường học/trạm y tế!"},{type: "danger"});
    						}else if(matruongtram === null || matruongtram === ""){
    							self.getApp().notify({message: "Chưa nhập mã trường học/trạm y tế"},{type: "danger"});
    						} else if(tennguoitraloi === null || tennguoitraloi === ""){
    							self.getApp().notify({message: "Chưa nhập tên người trả lời"},{type: "danger"});
    						} else if(chucvu_nguoitraloi === null || chucvu_nguoitraloi === ""){
    							self.getApp().notify({message: "Chưa nhập chức vụ người trả lời"},{type: "danger"});
    						} else if(thongtinlienlac === null || thongtinlienlac === ""){
    							self.getApp().notify({message: "Chưa nhập thông tin liên lạc người trả lời"},{type: "danger"});
    						} else {
                            self.model.save(null,
                                {
                                    success: function (model, respose, options) {
                                        self.getApp().notify("Lưu thông tin thành công");
                                        var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
    									self.getApp().getRouter().navigate(self.collectionName 
    											+ "/collection?loaikybaocao="+routeloaibaocao);

                                    },
                                    error: function (model, xhr, options) {
                                    	try {
    										self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
    									}catch (err) {
    										self.getApp().notify({ message: xhr.responseText }, { type: "danger", delay: 1000 });
    									}
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
                                    var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
									self.getApp().getRouter().navigate(self.collectionName 
											+ "/collection?loaikybaocao="+routeloaibaocao);
	                                },
                                error: function (model, xhr, options) {
                                	try {
										self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
									}catch (err) {
										self.getApp().notify({ message: xhr.responseText }, { type: "danger", delay: 1000 });
									}

                                }
                            });
                        }
                    },
                ],
            }
        ],
        render: function () {
            var self = this;
            var id = this.getApp().getRouter().getParam("id");
			var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
			if (routeloaibaocao!==null){
				var itemkybaocao = self.getApp().mapKyBaoCao[routeloaibaocao];
				if (itemkybaocao === null || itemkybaocao ==="undefined"){
					self.getApp().notify("Đường dẫn không hợp lệ, vui lòng thử lại sau");
					return;
				}else{
					self.model.set("loaikybaocao",itemkybaocao.loaikybaocao);
					self.model.set("kybaocao",itemkybaocao.kybaocao);
					self.$el.find("#kydanhgia").val(itemkybaocao.text);
				}
			}
			var currentUser = self.getApp().currentUser;
			if(!!currentUser && !!currentUser.donvi){
				if (!!currentUser.donvi.tinhthanh_id){
					self.model.set("tinhthanh_id",currentUser.donvi.tinhthanh_id);
					self.model.set("tinhthanh",currentUser.donvi.tinhthanh);
				}
				if (!!currentUser.donvi.quanhuyen_id){
					self.model.set("quanhuyen_id",currentUser.donvi.quanhuyen_id);
					self.model.set("quanhuyen",currentUser.donvi.quanhuyen);
				}
				if (!!currentUser.donvi.xaphuong_id){
					self.model.set("xaphuong_id",currentUser.donvi.xaphuong_id);
					self.model.set("xaphuong",currentUser.donvi.xaphuong);
				}
			}
            
            
            self.$el.find("#nguonnuocchinh_loaikhac").hide();
            self.model.on("change:loai_truong_tramyte", function () {
                if (self.model.get("loai_truong_tramyte") == 7) {
                    self.$el.find("#buoihoc").hide();
                    self.$el.find("#loaidiemtruong").hide();
                } else {
                    self.$el.find("#buoihoc").show();
                    self.$el.find("#loaidiemtruong").show();
                }
            });
            
        	self.model.on("change:phieuchitiet", function () {
        		if(self.model.get("tinhtrang")!==null && self.model.get("tinhtrang")>1){
                } else {
                	var danhsachchitiet = self.model.get("phieuchitiet");
                    for(var i=0;i<danhsachchitiet.length; i++){
                    	console.log(danhsachchitiet[i])
                    	if(danhsachchitiet[i] && (danhsachchitiet[i].ketluan ===0 || danhsachchitiet[i].ketluan ==='0')){
                    		self.model.set("ketluan",0);
                    		console.log("chay vao day ko???");
                    		return;
                    	}
                    }
                    self.model.set("ketluan",1);
                    self.applyBindings();
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