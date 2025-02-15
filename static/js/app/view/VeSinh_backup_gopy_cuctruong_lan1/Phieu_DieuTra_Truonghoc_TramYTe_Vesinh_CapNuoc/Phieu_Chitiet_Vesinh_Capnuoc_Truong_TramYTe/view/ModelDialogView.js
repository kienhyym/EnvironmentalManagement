define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTe/tpl/model.html'),
        schema = require('json!app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTe/view/Phieu_Chitiet_Vesinh_Capnuoc_Truong_TramYTeSchema.json');
        
    function toInt(x) {
        return parseInt(x) ? parseInt(x) : 0;
    }

    return Gonrin.ModelDialogView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
        uiControl: {
            fields: [
                {
                    field: "quansat_khuvesinh",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Nhà vệ sinh khô nổi một ngăn tách",
                    }, {
                        value: 2,
                        text: "Nhà vệ sinh khô nổi hai ngăn",

                    },
                    {
                        value: 3,
                        text: "Nhà vệ sinh khô chìm",

                    },
                    {
                        value: 4,
                        text: "Nhà vệ sinh tự hoại",

                    },
                    {
                        value: 5,
                        text: "Nhà vệ sinh thấm dội nước",

                    },
                    {
                        value: 6,
                        text: "Nhà vệ sinh dội nước + bể biogas",

                    },
                    {
                        value: 7,
                        text: "Nhà vệ sinh dội nước (nước thải không qua bể phốt, hố, hay biogas)",

                    },
                    {
                        value: 8,
                        text: "Nhà vệ sinh thùng hoặc cầu tõm",
                    },
                    {
                        value: 99,
                        text: "Không quan sát được",
                    },
                    {
                        value: 96,
                        text: "Khác (Nêu rõ)",
                    },
                    ],
                },
                {
                    field: "sannha_rannut",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 2,
                        text: "Có",
                    }, {
                        value: 1,
                        text: "Không",
                    },],
                },
                {
                    field: "coloditieu_daynapkin",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "bechua_rannut",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 2,
                        text: "Có",
                    }, {
                        value: 1,
                        text: "Không",

                    },],
                },
                {
                    field: "khoangcach_nguonnuoc_bechua",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Cách nhiều hơn 10 mét",
                    }, {
                        value: 2,
                        text: "Cách ít hơn 10 mét",

                    },],
                },
                {
                    field: "hoatdong_binhthuong",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    }, {
                        value: 99,
                        text: "Không biết",

                    },],
                },
                // {
                //     field: "capnuocsach",
                //     uicontrol: "radio",
                //     textField: "text",
                //     valueField: "value",
                //     dataSource: [{
                //         value: 1,
                //         text: "Có",
                //     }, {
                //         value: 2,
                //         text: "Không",

                //     },],
                // },
                {
                    field: "congtrinh_ruatay",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "quansat_congtrinh_ruatay",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [
                    	{
                            value: 1,
                            text: "Có cả nước sạch và xà phòng",
                        },
                    	{
                        value: 2,
                        text: "Chỉ có nước sạch",
	                    }, 
	                    {
	                        value: 3,
	                        text: "Chỉ có xà phòng",
	                    }, 
	                    {
	                        value: 4,
	                        text: "Không có cả nước sạch và xà phòng",
	                    },
	                    {
	                        value: 99,
	                        text: "Không quan sát được",
	                    }]
                },
                {
                    field: "mailop_nhavesinh",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có, đủ bảo vệ và kín đáo",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "phan_dinhdong_nhavesinh",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 2,
                        text: "Có",
                    }, {
                        value: 1,
                        text: "Không",

                    },],
                },
                {
                    field: "vesinh_sachse",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "sannha_vesinh_kho_sach",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "nangmui",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 2,
                        text: "Có",
                    }, {
                        value: 1,
                        text: "Không",

                    },
                    {
                        value: 99,
                        text: "Không thể kết luận được",

                    },],
                },
                {
                    field: "nuocthai_chaydidau",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Nước thải chảy đến ống thoát nước hở hoặc cống hở ",
                    }, {
                        value: 2,
                        text: "Nước thải chảy vào các chỗ trữ nước (ví dụ: ao, hồ) hoặc các công trình hở",

                    },
                    {
                        value: 3,
                        text: "Nước thải chảy đến hố thấm hoặc cống kín",

                    },
                    {
                        value: 99,
                        text: "Không quan sát được",

                    },],
                },
                {
                    field: "bexi_docao",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    },],
                },
                {
                    field: "ngaplut_khi_mualon",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 2,
                        text: "Có",
                    }, {
                        value: 1,
                        text: "Không",

                    },
                    {
                        value: 99,
                        text: "Không biết",

                    },],
                },

                {
                    field: "khu_ditieu",
                    uicontrol: "radio",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Có",
                    }, {
                        value: 2,
                        text: "Không",

                    }, {
                        value: 99,
                        text: "Không biết",

                    },],
                },
                {
                    field: "ketluan",
                    uicontrol: "combobox",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        value: 1,
                        text: "Hợp vệ sinh",
                    }, {
                        value: 0,
                        text: "Không hợp vệ sinh",

                    }],
                },
            ]
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
                            self.close();
                        }
                    },
                    {
                        name: "save",
                        type: "button",
                        buttonClass: "btn-success btn-sm",
                        label: "TRANSLATE:SAVE",
                        command: function () {
                            var self = this;
                            if (!self.validate()){
                                return;
                            }
                            self.getApp().notify("Thêm phiếu thành công");
                            self.trigger("close", self.model.toJSON());
                            self.$el.find(".toolbar .btn-group .btn-success[btn-name='save']").prop('disabled', true);
                            self.close();

                        }
                    },
                    {
                        name: "delete",
                        type: "button",
                        buttonClass: "btn-danger btn-sm",
                        label: "TRANSLATE:DELETE",
                        visible: function () {
                            return false;
                            // return this.getApp().getRouter().getParam("id") !== null;
                        },
                        command: function () {
                            var self = this;
                            self.getApp().notify('Xoá phiếu thành công');
                            self.trigger("delete", self.model.toJSON());
                            self.close();
                        }
                    },
                ],
            }],

        render: function () {
            var self = this;
//            self.$el.find("#quansat_khuvesinh_loaikhac").hide();
            var id = null;
//            if (self.viewData !== null) {
//                id = self.viewData.id;
//                var phieuthuthap_id = self.viewData.phieuthuthap_id;
//                self.model.set("phieu_chitiet_vesinh_capnuoc_truong_tramyte_id", phieuthuthap_id);
//            }
//            self.model.on("change:quansat_khuvesinh", function () {
//            	if (self.model.get("quansat_khuvesinh") == 96) {
//            		self.$el.find("#quansat_khuvesinh_loaikhac").show();
//            	} else{
//            		self.$el.find("#quansat_khuvesinh_loaikhac").hide();
//            	}
//			});
            self.model.on("change",function(){
            	self.model.set("ketluan",self.check_danhgia_nhatieu());
            });
            if (id) {
                this.model.set('id', id);
                this.model.fetch({
                    success: function (data) {
                        self.applyBindings();
                    },
                    error: function (xhr, status, error) {
						try {
							if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
								self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
								self.getApp().getRouter().navigate("login");
							} else {
							  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
							}
						}
						catch (err) {
						  self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
						}
					}
                });
            } else {
                self.applyBindings();
            }

        },
        check_danhgia_nhatieu:function(){
            var self=this;
        	var tieuchichinh = false;
            var tieuchiphu = 0;

            if(self.viewData.nguonnuocchinh == 5 || self.viewData.nguonnuocchinh == 6){
                if((self.model.get("quansat_khuvesinh") !== null && self.model.get("quansat_khuvesinh") <7) &&
        		self.model.get("sannha_rannut") ===1 &&
        		self.model.get("coloditieu_daynapkin") ===1 &&
        		self.model.get("bechua_rannut") ===1 &&
        		// self.model.get("khoangcach_nguonnuoc_bechua") ===1 &&
        		self.model.get("hoatdong_binhthuong") ===1 &&
        		// self.model.get("capnuocsach") ===1 &&
        		self.model.get("congtrinh_ruatay") ===1 &&
        		self.model.get("mailop_nhavesinh") ===1 &&
        		(((self.viewData.loai_truong_tramyte ===1 || 
        				self.viewData.loai_truong_tramyte ===7) 
        				&& self.viewData.sokhuvesinh_truong_tramyte>=2)||
        		((self.viewData.loai_truong_tramyte ===2 
        				|| self.viewData.loai_truong_tramyte ===3 
        				|| self.viewData.loai_truong_tramyte ===4) 
        				&& self.viewData.sokhuvesinh_truong_tramyte>=4))){
        		tieuchichinh = true;
        	    }
            } else {
                if((self.model.get("quansat_khuvesinh") !== null && self.model.get("quansat_khuvesinh") <7) &&
        		self.model.get("sannha_rannut") ===1 &&
        		self.model.get("coloditieu_daynapkin") ===1 &&
        		self.model.get("bechua_rannut") ===1 &&
        		self.model.get("khoangcach_nguonnuoc_bechua") ===1 &&
        		self.model.get("hoatdong_binhthuong") ===1 &&
        		// self.model.get("capnuocsach") ===1 &&
        		self.model.get("congtrinh_ruatay") ===1 &&
        		self.model.get("mailop_nhavesinh") ===1 &&
        		(((self.viewData.loai_truong_tramyte ===1 || 
        				self.viewData.loai_truong_tramyte ===7) 
        				&& self.viewData.sokhuvesinh_truong_tramyte>=2)||
        		((self.viewData.loai_truong_tramyte ===2 
        				|| self.viewData.loai_truong_tramyte ===3 
        				|| self.viewData.loai_truong_tramyte ===4) 
        				&& self.viewData.sokhuvesinh_truong_tramyte>=4))){
        		tieuchichinh = true;
        	    }
            }
        	
        	if (self.model.get("phan_dinhdong_nhavesinh")===1){
        		tieuchiphu +=1;
        	}
        	if (self.model.get("vesinh_sachse")===1){
        		tieuchiphu +=1;
        	}
        	if (self.model.get("sannha_vesinh_kho_sach")===1){
        		tieuchiphu +=1;
        	}
        	if (self.model.get("nangmui")===1){
        		tieuchiphu +=1;
        	}
        	if (self.model.get("nuocthai_chaydidau")===1 || 
        			self.model.get("nuocthai_chaydidau")===2 || 
        			self.model.get("nuocthai_chaydidau")===3){
        		tieuchiphu +=1;
        	}
        	if (self.model.get("bexi_docao")===1){
        		tieuchiphu +=1;
        	}
        	if (self.model.get("ngaplut_khi_mualon")===1){
        		tieuchiphu +=1;
        	}
        	
        	if(tieuchichinh === true && tieuchiphu >=3){
                return 1;
        	}else{
                return 0;
                
        	} 	
        },
        validate: function() {
            const self = this;
            var ten_khu_khaosat = self.model.get("ten_khu_khaosat");
            var soluong_chauxi = self.model.get("soluong_chauxi");
            var khu_ditieu = self.model.get("khu_ditieu");
            var khu_ditieu_dientich = self.model.get("khu_ditieu_dientich");
            var khu_ditieu_sochau = self.model.get("khu_ditieu_sochau");
            var quansat_khuvesinh = self.model.get("quansat_khuvesinh");
            var quansat_khuvesinh_loaikhac = self.model.get("quansat_khuvesinh_loaikhac");
            if(ten_khu_khaosat === null || ten_khu_khaosat === ""){
                self.getApp().notify({message: "Tên khu vệ sinh không được để trống!"},{type: "danger"});
                return;
            }
            if (quansat_khuvesinh === 96){
                if (quansat_khuvesinh_loaikhac === null || quansat_khuvesinh_loaikhac === ""){
                    self.getApp().notify({message: "Loại nhà vệ sinh khác không được để trống"},{type: "danger"});
                    return;
                }
            }
            if (soluong_chauxi === null || soluong_chauxi === "" || toInt(soluong_chauxi) < 0 || Number.isInteger(soluong_chauxi) === false){
                self.getApp().notify({message: "Số chậu xí không hợp lệ!"},{type: "danger"});
                return;
            }
            if (khu_ditieu === 1){
                if (khu_ditieu_dientich === null || khu_ditieu_dientich === "" || toInt(khu_ditieu_dientich) < 0){
                    self.getApp().notify({message: "Diện tích khu đi tiểu không hợp lệ!"},{type: "danger"});
                    return;
                }
                if (khu_ditieu_sochau === null || khu_ditieu_sochau === "" || toInt(khu_ditieu_sochau) < 0 || Number.isInteger(khu_ditieu_sochau) === false){
                    self.getApp().notify({message: "Số chậu khu đi tiểu không hợp lệ!"},{type: "danger"});
                    return;
                }
            }
            return true;
        },
    });
});
