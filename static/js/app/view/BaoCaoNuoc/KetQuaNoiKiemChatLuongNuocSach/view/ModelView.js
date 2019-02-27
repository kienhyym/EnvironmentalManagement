define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/tpl/model.html'),
        schema = require('json!schema/KetQuaNoiKiemChatLuongNuocSachSchema.json');
    var danhsachmautemplate = require('text!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/tpl/itemDanhSachMau.html');
    var danhsachmauschema = require('json!app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/view/ViTriMauSchema.json');
    var KetQuaNoiKiemChatLuongNuocItemView = require('app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/view/KetQuaNoiKiemChatLuongNuocItemView');
    var ThongSoBaoCaoChatLuongNuocView = require('app/view/DanhMuc/ThongSoBaoCaoChatLuongNuoc/view/SelectView');
    var DonViCapNuocSelectView = require('app/view/DanhMuc/DonViCapNuoc/view/SelectView');
    
    function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}
    var DanhSachMauView = Gonrin.ModelView.extend({
    	tagName: "tr",
    	template : danhsachmautemplate,
    	modelSchema	: danhsachmauschema,
    	bindings: "danhsachmau-bind",
    	urlPrefix: "/api/v1/",
    	collectionName: "somau_va_vitri_laymau",
    	uiControl:{
    		fields: [
    			{
	                field: "ngaykiemtra",
	                textFormat: "DD/MM/YYYY",
	                extraFormats: ["DDMMYYYY"]
	    		},
	    		{
					field: "danhgia",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "Đạt", value: 1},
						{text: "Không Đạt", value: 0}
					]
				},
    		]
    	},
    	render:function(){
    		var self = this;
    		self.model.on("change", function(){
    			self.trigger("change", {
    				"data": self.model.toJSON()
    			});
    		});
    		self.applyBindings();
    	}
    });
    return Gonrin.ModelView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "ketqua_noikiem_chatluong_nuocsach",
        uiControl: {
            fields: [{
                field: "thoigiankiemtra",
                textFormat: "DD/MM/YYYY",
                extraFormats: ["DDMMYYYY"],
            },
            {
                field: "ngaybaocao",
                textFormat: "DD/MM/YYYY",
                extraFormats: ["DDMMYYYY"],
            },
            {
                field: "donvicapnuoc",
                uicontrol: "ref",
                textField: "ten",
                foreignRemoteField: "id",
                foreignField: "donvicapnuoc_id",
                dataSource: DonViCapNuocSelectView
            },
			{
				field: "laphoso_theoquydinh",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 2}
				]
			},
			{
				field: "hoso_daydu_theoquydinh",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 2}
				]
			},
			{
				field: "somau_thunghiem_dungquydinh",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "thunghiem_daydu_thongso",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "tansuat_thuchien_noikiem_dungquydinh",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "thuchien_baocao_daydu",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "thuchien_congkhai_thongtin",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "thuchien_bienphap_khacphuc",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "ketquanoikiem",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "cothuchien_khacphuc",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Có", value: 1},
					{text: "Không", value: 0}
				]
			},
			{
				field: "nguonnuoc_nguyenlieu",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Nước mặt", value: 3},
					{text: "Nước nguồn", value: 2},
					{text: "Cả nước mặt và nước nguồn", value: 1},
					{text: "Loại khác", value: 0}
				]
			}
            ],
        },
        tools: [{
            name: "defaultgr",
            type: "group",
            groupClass: "toolbar-group",
            buttons: [{
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
                    var nambaocao = self.model.get("nambaocao");
                	if(!(toInt(nambaocao) >= 1900 || toInt(nambaocao) <= 3000)){
                    	self.getApp().notify({message: "Chưa chọn năm báo cáo hoặc năm báo cáo không hợp lệ"},{type: "danger"});
                    } else if(!self.model.get("ngaybaocao")){
                    	self.getApp().notify({message: "Chưa chọn ngày báo cáo"},{type: "danger"});
                    }
                    else if(!self.model.get("donvicapnuoc")){
                    	self.getApp().notify({message: "Chưa chọn tên đơn vị cấp nước"},{type: "danger"});
                    }
                    else if(!self.model.get("thoigiankiemtra")){
                    	self.getApp().notify({message: "Chưa chọn thời gian kiểm tra"},{type: "danger"});
                    }
                    else if(!self.model.get("nguoikiemtra")){
                    	self.getApp().notify({message: "Chưa chọn người kiểm tra"},{type: "danger"});
                    } else {
                        self.$el.find(".toolbar .btn-group .btn-success[btn-name='save']").prop('disabled', true);
	                    self.model.save(null, {
	                        success: function (model, respose, options) {
	                            self.getApp().notify("Lưu thông tin thành công");
                                self.$el.find(".toolbar .btn-group .btn-success[btn-name='save']").prop('disabled', false);
                                self.getApp().getRouter().navigate(self.collectionName + "/collection");
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
                                  self.getApp().notify({ message: "Lưu thông tin không thành công"}, { type: "danger", delay: 1000 });
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
                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
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
                              self.getApp().notify({ message: "Xóa dữ liệu không thành công"}, { type: "danger", delay: 1000 });
                            }
                        }
                    });
                }
            },
            ],
        }],
        render: function () {
            var self = this;
            var ketquanoikiemchatluongnuoc = self.model.get("ketquanoikiemchatluongnuoc");
            if (ketquanoikiemchatluongnuoc == null){
            	self.$el.find("[id=removeButton]").hide();
            } else {
            	self.$el.find("[id=removeButton]").show();
            }
            
            self.getApp().on("DonViCapNuoc_onSelected", function (data) {
                self.model.set("congsuat_thietke", data.congsuat);
                self.model.set("tansuat_noikiem", data.tansuat_noikiem);
                self.model.set("tongso_hogiadinh", data.tongso_hogiadinh);
                self.model.set("nguonnuoc_nguyenlieu", data.nguonnuoc_nguyenlieu);
                self.model.set("diachi_donvicapnuoc", data.diachi);
                self.model.set("tendonvicapnuoc", data.ten);

            });
            
            self.$el.find("#addItem").unbind("click").bind("click", function () {
                var view = new ThongSoBaoCaoChatLuongNuocView();
                view.dialog({ size: "large"});
                var ketquanoikiemchatluongnuoc = self.model.get('ketquanoikiemchatluongnuoc');
                view.on("ThongSo_onSelected", function (data) {
                    for (var i = 0; i < ketquanoikiemchatluongnuoc.length; i++) {
                        if (ketquanoikiemchatluongnuoc[i].id === data.id) {
                            self.getApp().notify({ message: "Thông số này đã tồn tại!" }, { type: "danger" });
                            return;
                        }
                    }
                    var item = {
                        "id": data.id,
                        "mathongso": data.mathongso,
                        "tenthongso": data.tenthongso,
                        "gioihan_toithieu": data.gioihan_toithieu,
                        "gioihan_toithieu_txt": data.gioihan_toithieu_txt,
                        "gioihan_toida": data.gioihan_toida,
                        "gioihan_toida_txt": data.gioihan_toida_txt,
                        "ketquakiemtra": [],
                        "danhgia": 0
                    };
                    ketquanoikiemchatluongnuoc.push(item);
                    self.model.set("ketquanoikiemchatluongnuoc", ketquanoikiemchatluongnuoc);
                    // console.log(ketquanoikiemchatluongnuoc);
                    self.changeSoMau();
                    self.applyBindings();
                });
            });
            var id = this.getApp().getRouter().getParam("id");
            if (id) {
                this.model.set('id', id);
                this.model.fetch({
                    success: function (data) {
                    	
                        self.model.on("change:somauvavitri", function () {
                            self.changeSoMau();
                        });
                        self.onChangeEvents();
                        self.changeSoMau();
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
            	
                self.prepareBaocao();
                self.onChangeEvents();
                self.model.on("change:somauvavitri", function () {
                    self.changeSoMau();
                });
                self.applyBindings();
                
            }
        },
        changeSoMau: function () {
            var self = this;
            var somau = self.model.get("somauvavitri");
            self.$el.find("[id=mauvitri_header]").remove();
            self.$el.find("[id=mauvitri_header_before]").hide();
            self.$el.find("#ketquanoikiemchatluongnuoc").empty();
            
            // console.log("somau===",somau);
            if (!!somau & (somau > 0)) {
            	self.renderViTriMau();
//            	self.calculator_ketqua_vitri();
            	var danhsachthongso = self.model.get("ketquanoikiemchatluongnuoc");
                if (danhsachthongso === null || danhsachthongso.length == 0){
                	self.$el.find("[id=removeButton]").hide();
                	danhsachthongso = [];
                } else {
                	self.$el.find("[id=removeButton]").show();
                }
                
                var danhsachvitrilaymau = self.model.get("danhsachvitrilaymau");
                if (danhsachvitrilaymau === null) {
                	danhsachvitrilaymau = [];
                }
                var danhsachthongso_new =[];
                $.each(danhsachthongso, function (idx, obj) {
                	var old_thongso_ketqua = obj["ketquakiemtra"];
                    if (old_thongso_ketqua.length < somau) {
                    	var arr_ketquakiemtra = old_thongso_ketqua;
                    	for (var i = old_thongso_ketqua.length; i < somau; i++) {
                        	var item_vitrilaymau = danhsachvitrilaymau[i];
                        	if(item_vitrilaymau !== null && item_vitrilaymau !== undefined){
//                        		item_vitrilaymau.danhgia = null;
//                        		item_vitrilaymau.ketqua = null;
                        		arr_ketquakiemtra.push(item_vitrilaymau);
                            	
                        	}else{
                        		// console.log("chay vao day la loi roi???? line 362");
                        	}
                        }
                    	obj["ketquakiemtra"] = arr_ketquakiemtra;

                    } else if (old_thongso_ketqua.length > somau) {
                    	// console.log("chay vao thay doi thong so ket qua hay ko?");
                    	obj["ketquakiemtra"].length = somau;
                    }
                    danhsachthongso_new.push(obj);
                });
                self.model.set("ketquanoikiemchatluongnuoc",danhsachthongso_new);
                
                for (var j = 0; j < somau; j++) {
                	var mavitrimau = j+1;
                	if (!!danhsachvitrilaymau && danhsachvitrilaymau.length === somau){
                		mavitrimau = danhsachvitrilaymau[j].mavitri;
                	}
                    var el = $("<th>").attr("id", "mauvitri_header").css({ "text-align": "center" }).addClass("background-colorTH").html(mavitrimau);
                    self.$el.find("#mauvitri_header_before").before(el);
                    self.$el.find("#ketquathunghiem").attr("colspan", j + 1);
                }
                self.renderKetQua(danhsachthongso_new);
            }
            
            
        },
        renderKetQua: function (danhsachthongso) {
            var self = this;
//            var danhsachthongso = self.model.get("ketquanoikiemchatluongnuoc");
            self.$el.find("#ketquanoikiemchatluongnuoc").html("");
            $.each(danhsachthongso, function (idx, obj) {
                var view = new KetQuaNoiKiemChatLuongNuocItemView();
                obj["sothutu"] = idx + 1;
//                view.model.set(obj);
                view.model.set(JSON.parse( JSON.stringify( obj )));
                view.render();
                self.$el.find("#ketquanoikiemchatluongnuoc").append(view.$el);
                
                
                view.on("ketquachange", function (data_thongso) {
                    self.update_ketqua_thongso(data_thongso);
                    if (view.model.get("danhgia") == 1) {
                    	view.$el.find("[id=danhgiathongso]").text("Đạt");
                    } else {
                    	view.$el.find("[id=danhgiathongso]").text("Không Đạt");
                    }
                });
                view.$el.find("#itemRemove").unbind("click").bind("click", function () {
                    var itemketquanoikiem = self.model.get("ketquanoikiemchatluongnuoc");
                    for (var i = 0; i < itemketquanoikiem.length; i++) {
                        if (itemketquanoikiem[i].id === view.model.get("id")) {
                        	itemketquanoikiem.splice(i, 1);
                        }
                    }
                    
                    self.model.set("ketquanoikiemchatluongnuoc", itemketquanoikiem);
                    self.applyBinding("ketquanoikiemchatluongnuoc");
                    self.calculator_ketqua_vitri();
                    view.destroy();
                    view.remove();

                    if(itemketquanoikiem.length == 0) {
                        self.$el.find("#removeButton").hide();
                    } else {
                        self.$el.find("#removeButton").show();
                    }
                });
            });
        },
        update_ketqua_thongso: function(data_thongso){
        	var self = this;
//          var donvicapnuoc = self.model.get("donvicapnuoc");
//        	if (!!donvicapnuoc){
//        		//check don vi nuoc ngam
//    			if(donvicapnuoc.nguonnuoc_nguyenlieu === 1 || donvicapnuoc.nguonnuoc_nguyenlieu === 2){
//    			}
//    			//check su dung clo de khu trung
//    			if(donvicapnuoc.phuongphap_khutrung === 1){
//    			}
//        	}

            

            var danhsachthongso = self.model.get("ketquanoikiemchatluongnuoc");
            for (var i = 0; i < danhsachthongso.length; i++) {
                if (danhsachthongso[i].id === data_thongso.id) {
                    var danhsachvitri = self.model.get("danhsachvitrilaymau");
                    var ketquakiemtra_vitrilaymau = []
                    $.each(data_thongso.ketquakiemtra, function(idx, data){
                    	
                    	var item_thongso = data;
                    	for(var index=0; index<danhsachvitri.length; index++){
                    		if (item_thongso.id === danhsachvitri[index].id){
                    			item_thongso.tenvitri = danhsachvitri[index].tenvitri;
                    			item_thongso.mavitri = danhsachvitri[index].mavitri;
                    			item_thongso.ngaykiemtra = danhsachvitri[index].ngaykiemtra;
                    			break;
                    		}
                    	}
                    	ketquakiemtra_vitrilaymau.push(item_thongso);
                    });
                    data_thongso.ketquakiemtra = ketquakiemtra_vitrilaymau;
                	danhsachthongso[i] = data_thongso;
                    break;
                }
            }
            self.model.set('ketquanoikiemchatluongnuoc', danhsachthongso);
            self.applyBinding("ketquanoikiemchatluongnuoc");
//            
//          Tính lại tổng các thông số tại các vị trí đạt  hay không đạt
            self.calculator_ketqua_vitri();
        },
        calculator_ketqua_vitri: function(){
        	var self = this;
        	var danhsachthongso = self.model.get("ketquanoikiemchatluongnuoc");
        	var danhsachvitri = self.model.get("danhsachvitrilaymau");
        	for(var j=0; j<danhsachvitri.length; j++){
            	danhsachvitri[j].danhgia = 1;
            }
            var danhsachvitri_new = [];
            for(var j=0; j<danhsachvitri.length; j++){
            	var item_vitri = danhsachvitri[j];
            	$.each(danhsachthongso, function(idx, thongso){
                	if (!!thongso && !!thongso["ketquakiemtra"]){
                		for (var i=0; i<thongso["ketquakiemtra"].length; i++){
                			var item_thongso = thongso["ketquakiemtra"][i];
            				if(item_vitri.id === item_thongso.id){
            					item_vitri.danhgia *= item_thongso.danhgia ? item_thongso.danhgia : 0;
            					break;
            				}
                				
                		}
                	}
                });
            	danhsachvitri_new.push(item_vitri);
            }
            
            self.model.set("danhsachvitrilaymau",danhsachvitri_new);
            self.applyBinding("danhsachvitrilaymau");
            self.renderViTriMau();
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
//        updateKetqua: function (obj) {
//            var self = this;
//            for (var i = 0; i < self.model.get("ketquanoikiemchatluongnuoc").length; i++) {
//                if (self.model.get("ketquanoikiemchatluongnuoc")[i].id === obj.id) {
//                    self.model.get("ketquanoikiemchatluongnuoc")[i] = obj;
//                    break;
//                }
//            }
// //            self.applyBinding("ketquanoikiemchatluongnuoc");
//        },
        prepareBaocao: function () {
            var self = this;
            self.model.set("ketquanoikiemchatluongnuoc", []);
            
            var url = self.getApp().serviceURL + "/api/v1/thongsobaocaochatluongnuoc?results_per_page=1000&max_results_per_page=1000";
            $.ajax({
                url: url,
                method: "GET",
                contentType: "application/json",
                success: function (data) {
                	var danhsachthongso = [];
                    if (!!data && !!data.objects && (data.objects.length > 0)) {
                    	
                        $.each(data.objects, function (idx, obj) {
                            if (obj.batbuoc == true) {
                                var item = {
                                    "id": obj.id,
                                    "mathongso": obj.mathongso,
                                    "tenthongso": obj.tenthongso,
                                    "gioihan_toithieu": obj.gioihan_toithieu,
                                    "gioihan_toithieu_txt": obj.gioihan_toithieu_txt,
                                    "gioihan_toida": obj.gioihan_toida,
                                    "gioihan_toida_txt": obj.gioihan_toida_txt,
                                    "ketquakiemtra": [],
                                    "danhgia": 0
                                };
                                danhsachthongso.push(item);
                            };
                        });
                    }
                    self.model.set("ketquanoikiemchatluongnuoc", danhsachthongso);
                    self.model.set("somauvavitri", 1);
                    self.model.trigger("change");
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
                      self.getApp().notify({ message: "Không tìm thấy thông số"}, { type: "danger", delay: 1000 });
                    }
                }
            });
            
        },
        
        renderViTriMau: function () {
        	var self = this;
            var somauvavitri = self.model.get("somauvavitri");
        	self.$el.find("#danhsachvitrilaymau").empty();
        	var danhsachvitrilaymau = self.model.get("danhsachvitrilaymau");
    		if (danhsachvitrilaymau == null){
    			danhsachvitrilaymau = []
    		}
    		var danhsachvitri_new = [];
        	for (var i = 0; i < somauvavitri; i++){
        		var somauvavitri_view = new DanhSachMauView();
        		
        		if(danhsachvitrilaymau && danhsachvitrilaymau[i] !== undefined && danhsachvitrilaymau[i] !== null){
        			var data_mau = danhsachvitrilaymau[i];
        			if (data_mau.danhgia === null || data_mau.danhgia === "0"){
        				data_mau.danhgia =0;
        			}
        			somauvavitri_view.model.set(data_mau);
        		}else{
        			somauvavitri_view.model.set("id", gonrin.uuid());
            		somauvavitri_view.model.set("mavitri", i + 1);
            		somauvavitri_view.model.set("tenvitri", "Vị trí mẫu "+ (i + 1));
            		somauvavitri_view.model.set("danhgia", 0);
        		}
        		somauvavitri_view.render();
        		danhsachvitri_new.push(somauvavitri_view.model.toJSON());
        		self.$el.find("#danhsachvitrilaymau").append(somauvavitri_view.$el);
        		somauvavitri_view.on("change", function(data){
        			var ds = self.model.get("danhsachvitrilaymau");
        			var arr_vitri_new = ds;
        			for(var j=0; j<arr_vitri_new.length;j++){
        				if(data.data.id === arr_vitri_new[j].id){
        					arr_vitri_new[j].tenvitri = data.data.tenvitri;
        					arr_vitri_new[j].mavitri = data.data.mavitri;
        					arr_vitri_new[j].ngaykiemtra = data.data.ngaykiemtra;
        					arr_vitri_new[j].danhgia = data.data.danhgia;
        					break;
        				}
        			}

    				self.model.set("danhsachvitrilaymau", arr_vitri_new);
    				self.applyBinding("danhsachvitrilaymau");
        		});
        	}
        	self.model.set("danhsachvitrilaymau", danhsachvitri_new);
        	self.model.trigger("change");
//        	self.applyBinding("danhsachvitrilaymau");
        },
        
        onChangeEvents: function () {
        	var self = this;
            self.$el.find("#tailieu_thieu").hide();
            self.model.on("change:hoso_daydu_theoquydinh", function (data) {
            	if (self.model.get("hoso_daydu_theoquydinh") == 1) {
            		self.$el.find("#tailieu_thieu").hide();
            	} else {
            		self.$el.find("#tailieu_thieu").show();
            	}
            });
            if (self.model.get("hoso_daydu_theoquydinh") == 1) {
            	self.$el.find("#tailieu_thieu").hide();
            } else {
            	self.$el.find("#tailieu_thieu").show();
            }
            
            self.model.on("change:thuchien_bienphap_khacphuc", function (data) {
            	if (self.model.get("thuchien_bienphap_khacphuc") == 0) {
					if (self.$el.find("#bienphap_extra").hasClass("hide")) {
						self.$el.find("#bienphap_extra").removeClass("hide");
					}
				} else {
					if (!self.$el.find("#bienphap_extra").hasClass("hide")) {
						self.$el.find("#bienphap_extra").addClass("hide");
					}
				}
            });
			if (self.model.get("thuchien_bienphap_khacphuc") == 1) {
				if (self.$el.find("#pheduyet_extra").hasClass("hide")) {
					self.$el.find("#pheduyet_extra").removeClass("hide");
				}
			}
        },
    });
});