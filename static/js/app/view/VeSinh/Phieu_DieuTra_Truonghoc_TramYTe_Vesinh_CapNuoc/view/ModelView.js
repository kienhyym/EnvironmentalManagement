define(function (require) {
    "use strict";
    var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

    var template = require('text!app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/tpl/model.html'),
        schema = require('json!schema/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuocSchema.json');
    var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
    var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
    var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
    var Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTeView = require('app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTe/view/ModelDialogView');

    function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

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
                    field: "chatluongnuocuong",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [
                    	{
	                        value: 1,
	                        text: "Có - Đạt"
	                    }, {
	                        value: 0,
	                        text: "Có - Không đạt"
                        },
                        {
	                        value: 96,
	                        text: "Không có"
	                    }
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
                                    "label": "Xoá phiếu",
                                    "action": function (params, args) {
                                        var self = this;
                                        var fields = self.model.get("phieuchitiet");
                                        var rowID = params.rowData.id;
                                        for (var i = 0; i < fields.length; i++) {
                                            if (fields[i].id === rowID) {
                                                fields.splice(i, 1);
                                            }
                                        }
                                        self.getApp().notify("Xoá phiếu thành công");
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
                                var phieuchitiet = self.model.get('phieuchitiet');
                                if (phieuchitiet == null){
                                    phieuchitiet = []
                                }
                                var sokhuvesinh_truong_tramyte = self.model.get('sokhuvesinh_truong_tramyte');
                                if (sokhuvesinh_truong_tramyte === null || sokhuvesinh_truong_tramyte === ""){
                                    self.getApp().notify({message: "Bạn phải nhập số khu vệ sinh trong trường trạm trước khi thêm mới phiếu!"}, {type: "danger"});
                                    return;
                                }
                                if (sokhuvesinh_truong_tramyte > phieuchitiet.length) {
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
                                        
                                        if (view.model.get("quansat_khuvesinh") == 4 || view.model.get("quansat_khuvesinh") == 6) {
                                            view.$el.find("#nuocthaichaydidau").show();
                                        } else {
                                            view.$el.find("#nuocthaichaydidau").hide();
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
                                    var nguonnuocchinh_value = view.viewData.nguonnuocchinh;
                                    if (nguonnuocchinh_value == 5 || nguonnuocchinh_value == 6){
                                        view.$el.find("#khoangcach_nguonnuoc_bechua").hide();
                                    } else {
                                        view.$el.find("#khoangcach_nguonnuoc_bechua").show();
                                    }
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
                                } else {
                                    self.getApp().notify({message: "Không thể tạo thêm phiếu thu thập"}, {type: "danger"});
                                }

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
                                
                                if (view.model.get("quansat_khuvesinh") == 4 || view.model.get("quansat_khuvesinh") == 6) {
                                    view.$el.find("#nuocthaichaydidau").show();
                                } else {
                                    view.$el.find("#nuocthaichaydidau").hide();
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
                            var nguonnuocchinh_value = view.viewData.nguonnuocchinh;
                            if (nguonnuocchinh_value == 5 || nguonnuocchinh_value == 6){
                                view.$el.find("#khoangcach_nguonnuoc_bechua").hide();
                            } else {
                                view.$el.find("#khoangcach_nguonnuoc_bechua").show();
                            }
                            
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
                            if (!self.validate()) {
                                return;
                            }
                            self.model.save(null,
                                {
                                    success: function (model, respose, options) {
                                        self.getApp().notify("Lưu thông tin thành công");
                                        var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
    									self.getApp().getRouter().navigate(self.collectionName 
    											+ "/collection?loaikybaocao="+routeloaibaocao);

                                    },
                                    error: function (xhr, status, error) {
                                        try {
                                          self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
                                        }
                                        catch (err) {
                                          self.getApp().notify({ message: "Lưu thông tin không thành công"}, { type: "danger", delay: 1000 });
                                        }
                                    }
                                });
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
				if (!!currentUser.donvi.tinhthanh_id && currentUser.donvi.tuyendonvi_id >= 2){
					self.model.set("tinhthanh_id",currentUser.donvi.tinhthanh_id);
                    self.model.set("tinhthanh",currentUser.donvi.tinhthanh);
                    self.$el.find("#tinhthanh").prop('disabled', true);
				}
				if (!!currentUser.donvi.quanhuyen_id && currentUser.donvi.tuyendonvi_id >= 3){
					self.model.set("quanhuyen_id",currentUser.donvi.quanhuyen_id);
                    self.model.set("quanhuyen",currentUser.donvi.quanhuyen);
                    self.$el.find("#quanhuyen").prop('disabled', true);
				}
				if (!!currentUser.donvi.xaphuong_id && currentUser.donvi.tuyendonvi_id === 4){
					self.model.set("xaphuong_id",currentUser.donvi.xaphuong_id);
                    self.model.set("xaphuong",currentUser.donvi.xaphuong);
                    self.$el.find("#xaphuong").prop('disabled', true);
				}
			}
            
            
            self.$el.find("#nguonnuocchinh_loaikhac").hide();
            self.model.on("change:loai_truong_tramyte", function () {
                if (self.model.get("loai_truong_tramyte") == 7) {
                    self.$el.find("#buoihoc").hide();
                    self.$el.find("#loaidiemtruong").hide();
                    self.$el.find(".choose_tramyte_hidden").hide();
                } else {
                    self.$el.find("#buoihoc").show();
                    self.$el.find("#loaidiemtruong").show();
                    self.$el.find(".choose_tramyte_hidden").show();
                }
            });
            
        	self.model.on("change:phieuchitiet", function () {
        		if(self.model.get("tinhtrang")!==null && self.model.get("tinhtrang")>1){
                } else {
                	var danhsachchitiet = self.model.get("phieuchitiet");
                    for(var i=0;i<danhsachchitiet.length; i++){
                    	// console.log(danhsachchitiet[i])
                    	if(danhsachchitiet[i] && (danhsachchitiet[i].ketluan ===0 || danhsachchitiet[i].ketluan ==='0')){
                    		self.model.set("ketluan",0);
                    		// console.log("chay vao day ko???");
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
        validate: function() {
            const self = this;
            var nambaocao = self.model.get("nambaocao");
            var tentruongtram = self.model.get("ten_truong_tramyte");
            var matruongtram = self.model.get("ma_truong_tramyte");
            var tinhthanh = self.model.get("tinhthanh");
            var quanhuyen = self.model.get("quanhuyen");
            var xaphuong = self.model.get("xaphuong");
            var tennguoitraloi = self.model.get("tennguoitraloi");
            var chucvu_nguoitraloi = self.model.get("chucvu_nguoitraloi");
            var thongtinlienlac = self.model.get("thongtinlienlac");
            var nguonnuocchinh = self.model.get("nguonnuocchinh");
            var nguonnuocchinh_loaikhac = self.model.get("nguonnuocchinh_loaikhac");
            var truong_sobuoihoc = self.model.get("truong_sobuoihoc");
            var truong_sohocsinh_moibuoi = self.model.get("truong_sohocsinh_moibuoi");
            var truong_sohocsinh_nam = self.model.get("truong_sohocsinh_nam");
            var truong_sohocsinh_nu = self.model.get("truong_sohocsinh_nu");
            var sokhuvesinh_truong_tramyte = self.model.get("sokhuvesinh_truong_tramyte");
            var sokhuvesinh_truong_hossinh_nam = self.model.get("sokhuvesinh_truong_hossinh_nam");
            var sokhuvesinh_truong_hocsinh_nu = self.model.get("sokhuvesinh_truong_hocsinh_nu");
            var sokhuvesinh_truong_giaovien_nam = self.model.get("sokhuvesinh_truong_giaovien_nam");
            var sokhuvesinh_truong_giaovien_nu = self.model.get("sokhuvesinh_truong_giaovien_nu");
            if (nambaocao === null || nambaocao === ""){
                self.getApp().notify({message: "Năm đánh giá không được để trống!"},{type: "danger"});
                return;
            }
            if (toInt(nambaocao)<1900 || toInt(nambaocao)>3000){
                self.getApp().notify({message: "Năm không hợp lệ, vui lòng kiểm tra lại!"},{type: "danger"});
                return;
            }
            if(tinhthanh === null || tinhthanh === ""){
                self.getApp().notify({message: "Chưa chọn tên tỉnh"},{type: "danger"});
                return;
            } 
            if(quanhuyen === null || quanhuyen === ""){
                self.getApp().notify({message: "Chưa chọn tên huyện"},{type: "danger"});
                return;
            } 
            if(xaphuong === null || xaphuong === ""){
                self.getApp().notify({message: "Chưa chọn tên xã"},{type: "danger"});
                return;
            } 
            if(tentruongtram === null || tentruongtram === ""){
                self.getApp().notify({message: "Chưa nhập tên trường học/trạm y tế!"},{type: "danger"});
                return;
            } 
            if(matruongtram === null || matruongtram === ""){
                self.getApp().notify({message: "Chưa nhập mã trường học/trạm y tế"},{type: "danger"});
                return;
            }
            if (toInt(truong_sobuoihoc) < 0){
                self.getApp().notify({message: "Số buổi học không hợp lệ!"},{type: "danger"});
                return;
            }
            if (toInt(truong_sohocsinh_moibuoi) < 0){
                self.getApp().notify({message: "Số học sinh mỗi buổi học không hợp lệ!"},{type: "danger"});
                return;
            }
            if (toInt(truong_sohocsinh_nam) < 0){
                self.getApp().notify({message: "Số học sinh nam không hợp lệ!"},{type: "danger"});
                return;
            }
            if (toInt(truong_sohocsinh_nu) < 0){
                self.getApp().notify({message: "Số học sinh nữ không hợp lệ!"},{type: "danger"});
                return;
            }
            if (toInt(truong_sohocsinh_nam) + toInt(truong_sohocsinh_nu) > toInt(truong_sohocsinh_moibuoi)) {
                self.getApp().notify({message: "Số học sinh nam hoặc nữ không hợp lệ!"}, {type: "danger"});
                return;
            } 
            if(tennguoitraloi === null || tennguoitraloi === ""){
                self.getApp().notify({message: "Chưa nhập tên người trả lời"},{type: "danger"});
                return;
            }
            if(chucvu_nguoitraloi === null || chucvu_nguoitraloi === ""){
                self.getApp().notify({message: "Chưa nhập chức vụ người trả lời"},{type: "danger"});
                return;
            }
            if(thongtinlienlac === null || thongtinlienlac === ""){
                self.getApp().notify({message: "Chưa nhập thông tin liên lạc người trả lời"},{type: "danger"});
                return;
            }
            if(nguonnuocchinh === 96){
                if(nguonnuocchinh_loaikhac === null || nguonnuocchinh_loaikhac === ""){
                    self.getApp().notify({message: "Nguồn nước khác không được để trống"},{type: "danger"});
                    return;
                }
            }
            if (sokhuvesinh_truong_tramyte === null || sokhuvesinh_truong_tramyte === ""){
                self.getApp().notify({message: "Số khu vệ sinh trong trường/trạm không được để trống!"},{type: "danger"});
                return;
            }
            if (sokhuvesinh_truong_tramyte < 0){
                self.getApp().notify({message: "Số khu vệ sinh trong trường/trạm không hợp lệ!"},{type: "danger"});
                return;
            }
            if (sokhuvesinh_truong_hossinh_nam < 0){
                self.getApp().notify({message: "Số khu vệ sinh cho học sinh nam không hợp lệ!"},{type: "danger"});
                return;
            }
            if (sokhuvesinh_truong_hocsinh_nu < 0){
                self.getApp().notify({message: "Số khu vệ sinh cho học sinh nữ không hợp lệ!"},{type: "danger"});
                return;
            }
            if (sokhuvesinh_truong_giaovien_nam < 0){
                self.getApp().notify({message: "Số khu vệ sinh cho giáo viên nam không hợp lệ!"},{type: "danger"});
                return;
            }
            if (sokhuvesinh_truong_giaovien_nu < 0){
                self.getApp().notify({message: "Số khu vệ sinh cho giáo viên nữ không hợp lệ!"},{type: "danger"});
                return;
            }
            if (toInt(sokhuvesinh_truong_hossinh_nam) + toInt(sokhuvesinh_truong_hocsinh_nu)
                + toInt(sokhuvesinh_truong_giaovien_nam) + toInt(sokhuvesinh_truong_giaovien_nu) > toInt(sokhuvesinh_truong_tramyte)) {
                self.getApp().notify({message: "Số khu vệ sinh không hợp lệ!"}, {type: "danger"});
                return;
            }
            return true;
        }
    });
});