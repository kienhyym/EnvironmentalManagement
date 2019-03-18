define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/CapThon/NhaTieuThonHVS/tpl/itemHoGiaDinh.html'),
        schema = require('json!app/view/VeSinh/CapThon/NhaTieuThonHVS/view/HoGiaDinhSchema.json');
    var HoGiaDinhSelectView = require('app/view/DanhMuc/HoGiaDinh/view/SelectView');

	return Gonrin.ModelDialogView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "vscapthon",
		bindings: "bind-item-data",
		uiControl: {
			fields: [
                {
					field: "hogiadinh",
					uicontrol: "ref",
					textField: "tenchuho",
					foreignRemoteField: "id",
					foreignField: "hogiadinh_id",
					dataSource: HoGiaDinhSelectView
				},
				{
					field: "diemruataycoxaphong",
					uicontrol: "radio",
					textField: "text",
					valueField: "value",
					dataSource: [{
                            value: 1,
                            text: "Có",
						},
						{
							value: 0,
							text: "Không",
						},
					],
				},
				{
					field: "hongheo",
					uicontrol: "radio",
					textField: "text",
					valueField: "value",
					dataSource: [{
							value: 1,
							text: "Có",
						},
						{
							value: 0,
							text: "Không",
						},
					],
				},
                {
					field: "loaikhac",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Dùng chung"
						},
						{
							"value": 2,
							"text": "Một ngăn"
						},
						{
							"value": 3,
							"text": "Chìm không OTH"
                        }
					],
                },
                {
					field: "loainhatieusudung",
					uicontrol: "radio",
					textField: "text",
					valueField: "value",
					dataSource: [{
							value: 1,
							text: "Tự hoại",
						},
						{
							value: 2,
							text: "Thẩm đội",
                        },
                        {
							value: 3,
							text: "Hai ngăn",
                        },
                        {
							value: 4,
							text: "Chìm có ống thông hơi",
                        },
                        {
							value: 5,
							text: "Không có nhà tiêu(bao gồm cầu tiêu ao cá)",
                        },
                        {
							value: 6,
							text: "Loại khác",
						},
					],
                },
                {
					field: "danhgiatinhtrangvesinh",
					uicontrol: "radio",
					textField: "text",
					valueField: "value",
					dataSource: [{
                            value: 1,
                            text: "Hợp vệ sinh",
						},
						{
							value: 2,
							text: "Không hợp vệ sinh",
                        }
					],
				},
                {
					field: "caithien",
					uicontrol: "radio",
					textField: "text",
					valueField: "value",
					dataSource: [{
                            value: 1,
                            text: "Có",
						},
						{
							value: 0,
							text: "Không",
						},
					],
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
                        label: "HỦY BỎ",
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
                            var chuongtrinhsup = self.viewData.chuongtrinhsup;
                            console.log("chuongtrinhsup", chuongtrinhsup);
                            if (!self.model.get("hogiadinh")){
                                self.getApp().notify({message: "Vui lòng chọn hộ gia đình!"}, {type: "danger"});
                                return;
                            }
                            if (self.model.get("loainhatieusudung") == null || self.model.get("loainhatieusudung") == ""){
                                self.getApp().notify({message: "Vui lòng chọn loại nhà tiêu đang sử dụng!"}, {type: "danger"});
                                return;
                            }
                            if (self.model.get("loainhatieusudung") == 6 && !self.model.get("loaikhac")){
                                self.getApp().notify({message: "Vui lòng chọn loại khác!"}, {type: "danger"});
                                return;
                            }
                            if (self.model.get("danhgiatinhtrangvesinh") == null || self.model.get("danhgiatinhtrangvesinh") == ""){
                                self.getApp().notify({message: "Vui lòng chọn đánh giá tình trạng vệ sinh!"}, {type: "danger"});
                                return;
                            }
                            if (chuongtrinhsup === 1){
                                if (self.model.get("hongheo") == null){
                                    self.getApp().notify({message: "Có thuộc diện hộ nghèo không?"}, {type: "danger"});
                                    return; 
                                }
                                if (self.model.get("caithien") == null){
                                    self.getApp().notify({message: "Có thuộc diện được cải thiện hay không?"}, {type: "danger"});
                                    return; 
                                }
                                if (self.model.get("diemruataycoxaphong") == null){
                                    self.getApp().notify({message: "Có điểm rửa tay với nước xà phòng hay không?"}, {type: "danger"});
                                    return; 
                                }
                            }
                            var loainhatieusudung = self.model.get("loainhatieusudung");
                            var danhgiatinhtrangvesinh = self.model.get("danhgiatinhtrangvesinh");
                            var loaikhac = self.model.get("loaikhac");
                            if (loainhatieusudung == 1){
                                self.model.set("tuhoai", 1);
                            } else if (loainhatieusudung == 2){
                                self.model.set("thamdoi", 1);
                            }else if (loainhatieusudung == 3){
                                self.model.set("haingan", 1);
                            }else if (loainhatieusudung == 4){
                                self.model.set("chimco_oth", 1);
                            }else if (loainhatieusudung == 5){
                                self.model.set("khongconhatieu", 1);
                            }else if (loainhatieusudung == 6){
                                self.model.set("loaikhac", loaikhac);
                            }
                            if (danhgiatinhtrangvesinh == 1){
                                self.model.set("hopvesinh", 1);
                            }else if (danhgiatinhtrangvesinh == 2){
                                self.model.set("khonghopvesinh", 1);
                            }
                            // self.getApp().notify("Thêm hộ gia đình thành công");
                            var hogiadinh = self.model.get("hogiadinh");
                            // self.model.set("id", hogiadinh.id);
                            self.model.set("maho", hogiadinh.id);
                            self.model.set("tenchuho", hogiadinh.tenchuho);
                            self.model.set("tendantoc", hogiadinh.dantoc.ten);
                            self.model.set("gioitinh", hogiadinh.gioitinh);
                            self.model.set("dantoc", hogiadinh.dantoc);
                            self.model.set("dantoc_id", hogiadinh.dantoc_id);
                            self.trigger("close", self.model.toJSON());
                            // self.$el.find(".toolbar .btn-group .btn-success[btn-name='save']").prop('disabled', true);
                            self.close();

                        }
                    },
                    
                ],
            }],
		render: function () {
            var self = this;
            self.$el.find("#choose_loaikhac").hide();
            var chuongtrinhsup = self.viewData.chuongtrinhsup;
            if (chuongtrinhsup == 0){
                self.$el.find("#hidden_hongheo").hide();
                self.$el.find("#hidden_diemruatay").hide();
                self.$el.find("#hidden_caithien").hide();
            }
            self.model.on("change", function() {
                var loainhatieusudung = self.model.get("loainhatieusudung");
                if (loainhatieusudung == 6){
                    self.$el.find("#choose_loaikhac").show();
                } else{
                    self.$el.find("#choose_loaikhac").hide();
                }
            });   
            self.model.on("change:hongheo", function() {
                var choose_hogiadinh = self.model.get("hogiadinh");
                if (choose_hogiadinh == undefined || choose_hogiadinh == null){
                    self.getApp().notify({message:"Vui lòng chọn thông tin hộ gia đình trước!"}, {type: "danger"});
                    return;
                }
            });
            self.model.on("change:loainhatieusudung", function() {
                var choose_hogiadinh = self.model.get("hogiadinh");
                if (choose_hogiadinh == undefined || choose_hogiadinh == null){
                    self.getApp().notify({message:"Vui lòng chọn thông tin hộ gia đình trước!"}, {type: "danger"});
                }
            });
            self.model.on("change:danhgiatinhtrangvesinh", function() {
                var choose_hogiadinh = self.model.get("hogiadinh");
                if (choose_hogiadinh == undefined || choose_hogiadinh == null){
                    self.getApp().notify({message:"Vui lòng chọn thông tin hộ gia đình trước!"}, {type: "danger"});
                }
            });
            self.model.on("change:caithien", function() {
                var choose_hogiadinh = self.model.get("hogiadinh");
                if (choose_hogiadinh == undefined || choose_hogiadinh == null){
                    self.getApp().notify({message:"Vui lòng chọn thông tin hộ gia đình trước!"}, {type: "danger"});
                }
            });
            self.model.on("change:diemruataycoxaphong", function() {
                var choose_hogiadinh = self.model.get("hogiadinh");
                if (choose_hogiadinh == undefined || choose_hogiadinh == null){
                    self.getApp().notify({message:"Vui lòng chọn thông tin hộ gia đình trước!"}, {type: "danger"});
                }
            });
            var dataHoGiaDinh = self.viewData.obj_hogiadinh;
            if (!!dataHoGiaDinh){
                var hogiadinh = {"tenchuho": dataHoGiaDinh.tenchuho, "id": dataHoGiaDinh.maho, 
                "gioitinh": dataHoGiaDinh.gioitinh, "dantoc": dataHoGiaDinh.dantoc, "dantoc_id": dataHoGiaDinh.dantoc_id};
                self.model.set("hogiadinh", hogiadinh);
                self.model.set("hongheo", dataHoGiaDinh.hongheo);
                self.model.set("caithien", dataHoGiaDinh.caithien);
                self.model.set("diemruataycoxaphong", dataHoGiaDinh.diemruataycoxaphong);
                self.model.set("id", dataHoGiaDinh.id);
                self.model.set("maho", dataHoGiaDinh.maho);
                self.model.set("tenchuho", dataHoGiaDinh.tenchuho);
                self.model.set("tendantoc", dataHoGiaDinh.tendantoc);
                self.model.set("gioitinh", dataHoGiaDinh.gioitinh);
                self.model.set("dantoc", dataHoGiaDinh.dantoc);
                self.model.set("dantoc_id", dataHoGiaDinh.dantoc_id);
                if(dataHoGiaDinh.tuhoai === 1){
                    self.model.set("loainhatieusudung", 1);
                } else if(dataHoGiaDinh.thamdoi === 1){
                    self.model.set("loainhatieusudung", 2);
                }else if(dataHoGiaDinh.haingan === 1){
                    self.model.set("loainhatieusudung", 3);
                }else if(dataHoGiaDinh.chimco_oth === 1){
                    self.model.set("loainhatieusudung", 4);
                }else if(dataHoGiaDinh.khongconhatieu === 1){
                    self.model.set("loainhatieusudung", 5);
                }else if(dataHoGiaDinh.loaikhac >= 0){
                    self.model.set("loainhatieusudung", 6);
                    self.$el.find("#choose_loaikhac").show();
                    self.model.set("loaikhac", dataHoGiaDinh.loaikhac);
                }
                if(dataHoGiaDinh.hopvesinh === 1){
                    self.model.set("danhgiatinhtrangvesinh", 1);
                }else if(dataHoGiaDinh.khonghopvesinh === 1){
                    self.model.set("danhgiatinhtrangvesinh", 2);
                }
            }
			// self.model.on("change", function () {
			// 	self.trigger("change", {
			// 		"oldData": self.model.previousAttributes(),
			// 		"data": self.model.toJSON()
			// 	});
			// });
			// if (self.viewData && self.viewData.chuongtrinhsup === 0){
			// 	self.$el.find(".chuongtrinhsup").hide();
				
			// } else{
			// 	self.$el.find(".chuongtrinhsup").show();
			// }
            self.applyBindings();
            self.getFieldElement("hogiadinh").data("gonrin").setFilters({"thonxom_id": { "$eq": self.viewData.thonxom_id}});
        },
	});

});