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
                // {
				// 	field: "loaikhac",
				// 	uicontrol: "combobox",
				// 	textField: "text",
				// 	valueField: "value",
				// 	dataSource: [{
				// 			"value": 1,
				// 			"text": "Dùng chung"
				// 		},
				// 		{
				// 			"value": 2,
				// 			"text": "Một ngăn"
				// 		},
				// 		{
				// 			"value": 3,
				// 			"text": " Chìm không OTH"
				// 		},
				// 		{
				// 			"value": 0,
				// 			"text": "Không có"
				// 		}
				// 	],
				// },
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
                            if (self.model.get("hogiadinh") === null || self.model.get("hogiadinh") === ""){
                                self.getApp().notify({message: "Vui lòng chọn hộ gia đình!"}, {type: "danger"});
                                return;
                            }
                            var tuhoai = self.$el.find("input[value=tuhoai]").prop('checked');
                            if(tuhoai === true){
                                self.model.set("tuhoai", 1);
                            }
                            var thamdoi = self.$el.find("input[value=thamdoi]").prop('checked');
                            if(thamdoi === true){
                                self.model.set("thamdoi", 1);
                            }
                            var haingan = self.$el.find("input[value=haingan]").prop('checked');
                            if(haingan === true){
                                self.model.set("haingan", 1);
                            }
                            var chimco_oth = self.$el.find("input[value=chimco_oth]").prop('checked');
                            if(chimco_oth === true){
                                self.model.set("chimco_oth", 1);
                            }
                            var khongconhatieu = self.$el.find("input[value=khongconhatieu]").prop('checked');
                            if(khongconhatieu === true){
                                self.model.set("khongconhatieu", 1);
                            }
                            // var loaikhac = self.$el.find("input[value=loaikhac]").prop('checked');
                            // if(loaikhac === true){
                            //     self.model.set("loaikhac", 1);
                            // }
                            var hopvesinh = self.$el.find("input[value=hopvesinh]").prop('checked');
                            if(hopvesinh === true){
                                self.model.set("hopvesinh", 1);
                            }
                            var khonghopvesinh = self.$el.find("input[value=khonghopvesinh]").prop('checked');
                            if(khonghopvesinh === true){
                                self.model.set("khonghopvesinh", 1);
                            }
                            var caithien = self.$el.find("input[value=caithien]").prop('checked');
                            if(caithien === true){
                                self.model.set("caithien", 1);
                            }
                            self.getApp().notify("Thêm hộ gia đình thành công");
                            var hogiadinh = self.model.get("hogiadinh");
                            // console.log("ho gia dinh===",hogiadinh);
                            self.model.set("tenchuho", hogiadinh.tenchuho);
                            self.model.set("tendantoc", hogiadinh.tendantoc);
                            self.model.set("gioitinh", hogiadinh.gioitinh);
                            self.model.set("dantoc_id", hogiadinh.dantoc_id);
                            self.model.set("dantoc", hogiadinh.dantoc);
                            self.model.set("tendantoc", hogiadinh.dantoc.ten);
                            self.model.set("maho", hogiadinh.id);
                            self.trigger("close", self.model.toJSON());
                            // self.$el.find(".toolbar .btn-group .btn-success[btn-name='save']").prop('disabled', true);
                            self.close();

                        }
                    },
                    
                ],
            }],
		render: function () {
            var self = this;
            var dataHoGiaDinh = self.viewData.obj_hogiadinh;
            if (!!dataHoGiaDinh){
                console.log("dataHoGiaDinh", dataHoGiaDinh);
                var hogiadinh = {"tenchuho": dataHoGiaDinh.tenchuho, "maho": dataHoGiaDinh.maho, "tendantoc": dataHoGiaDinh.tendantoc,
                "gioitinh": dataHoGiaDinh.gioitinh, "dantoc": dataHoGiaDinh.dantoc, "dantoc_id": dataHoGiaDinh.dantoc_id};
                self.model.set("hogiadinh", hogiadinh);
                self.model.set("hongheo", dataHoGiaDinh.hongheo);
                self.model.set("diemruataycoxaphong", dataHoGiaDinh.diemruataycoxaphong);
                self.model.set("id", dataHoGiaDinh.id);
                self.model.set("maho", dataHoGiaDinh.maho);
                self.model.set("tenchuho", dataHoGiaDinh.tenchuho);
                self.model.set("tendantoc", dataHoGiaDinh.tendantoc);
                self.model.set("gioitinh", dataHoGiaDinh.gioitinh);
                self.model.set("dantoc", dataHoGiaDinh.dantoc);
                self.model.set("dantoc_id", dataHoGiaDinh.dantoc_id);
                if(dataHoGiaDinh.tuhoai === 1){
                    self.$el.find("input[value=tuhoai]").prop('checked', true);
                }
                if(dataHoGiaDinh.thamdoi === 1){
                    self.$el.find("input[value=thamdoi]").prop('checked', true);
                }
                if(dataHoGiaDinh.haingan === 1){
                    self.$el.find("input[value=haingan]").prop('checked', true);
                }
                if(dataHoGiaDinh.chimco_oth === 1){
                    self.$el.find("input[value=chimco_oth]").prop('checked', true);
                }
                if(dataHoGiaDinh.khongconhatieu === 1){
                    self.$el.find("input[value=khongconhatieu]").prop('checked', true);
                }
                if(dataHoGiaDinh.khonghopvesinh === 1){
                    self.$el.find("input[value=khonghopvesinh]").prop('checked', true);
                }
                if(dataHoGiaDinh.hopvesinh === 1){
                    self.$el.find("input[value=hopvesinh]").prop('checked', true);
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