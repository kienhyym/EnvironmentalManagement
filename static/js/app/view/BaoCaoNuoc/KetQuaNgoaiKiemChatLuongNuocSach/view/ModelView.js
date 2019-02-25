define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/model.html'),
        schema = require('json!schema/KetQuaNgoaiKiemChatLuongNuocSachSchema.json');
    var danhsachmautemplate = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/itemDanhSachMau.html');
    var danhsachmauschema = require('json!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/ViTriMauSchema.json');
    var KetQuaNgoaiKiemChatLuongNuocItemView = require('app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/KetQuaNgoaiKiemChatLuongNuocItemView');
    var ThongSoBaoCaoChatLuongNuocView = require('app/view/DanhMuc/ThongSoBaoCaoChatLuongNuoc/view/SelectView');
    var DonViCapNuocSelectView = require('app/view/DanhMuc/DonViCapNuoc/view/SelectView');
    var ThongSoKhongDatItemView = require('app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/ThongSoKhongDatItem');
    
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
    		this.applyBindings();
    	}
    });
    
    return Gonrin.ModelView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "ketqua_ngoaikiem_chatluong_nuocsach",
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
				field: "thunghiem_chatluong_nuoc",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Có", value: 1},
					{text: "Không", value: 0}
				]
			},
            {
				field: "loai_donvi_kiemtra",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Trung tâm y tế huyện", value: 2},
					{text: "Trung tâm kiểm soát bệnh tật tỉnh", value: 1},
					{text: "Loại khác", value: 0}
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
			},
			{
				field: "laphoso_theoquydinh",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "hoso_daydu_theoquydinh",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
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
				field: "ketquangoaikiem",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Đạt", value: 1},
					{text: "Không Đạt", value: 0}
				]
			},
			{
				field: "congbo_thongtin_chodonvicapnuoc",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Có", value: 1},
					{text: "Không", value: 0}
				]
			},
			{
				field: "congkhai_thongtin",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Có", value: 1},
					{text: "Không", value: 0}
				]
			},
			{
				field: "thongbao_coquan_thamquyen",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Có", value: 1},
					{text: "Không", value: 0}
				]
			},
			{
				field: "thongbao_donvi_chuquan",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{text: "Có", value: 1},
					{text: "Không", value: 0}
				]
			},
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
                    var ngaybaocao = self.model.get("ngaybaocao");
                    var donvicapnuoc = self.model.get("donvicapnuoc");
                    var thoigiankiemtra = self.model.get("thoigiankiemtra");
                    var thanhphan_doankiemtra = self.model.get("thanhphan_doankiemtra");
                    var somauvavitri = self.model.get("somauvavitri");
                    if(!(toInt(nambaocao) >= 1900 || toInt(nambaocao) <= 3000)){
                    	self.getApp().notify({message: "Chưa chọn năm báo cáo hoặc năm báo cáo không hợp lệ"},{type: "danger"});
                    } else if(ngaybaocao === null || ngaybaocao === ""){
                    	self.getApp().notify({message: "Chưa chọn ngày báo cáo"},{type: "danger"});
                    } else if(donvicapnuoc === null || donvicapnuoc === ""){
                    	self.getApp().notify({message: "Chưa chọn tên đơn vị cấp nước"},{type: "danger"});
                    } else if(thoigiankiemtra === null || thoigiankiemtra === ""){
                    	self.getApp().notify({message: "Chưa chọn thời gian kiểm tra"},{type: "danger"});
                    } else if(thanhphan_doankiemtra === null || thanhphan_doankiemtra === ""){
                    	self.getApp().notify({message: "Chưa chọn thành phần đoàn kiểm tra"},{type: "danger"});
                    } else if(somauvavitri > 10){
                    	self.getApp().notify({message: "Số vị trí lấy mẫu phải nhỏ hơn 10!!!"},{type: "danger"});
                    } else {
					self.$el.find(".btn-success").prop('disabled', true);
                    self.model.save(null, {
                        success: function (model, respose, options) {
                            self.getApp().notify("Lưu thông tin thành công");
                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
                        },
                        error: function (xhr, status, error) {
							if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
								self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
								self.getApp().getRouter().navigate("login");
							}
							try {
							  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
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
                        error: function (model, xhr, options) {
							if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
								self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
								self.getApp().getRouter().navigate("login");
							}
                            self.getApp().notify('Xoá dữ liệu không thành công!');
                        }
                    });
                }
            },
            ],
        }],
        render: function () {
			var self = this;
            var ketquangoaikiemchatluongnuoc = self.model.get("ketquangoaikiemchatluongnuoc");
            if (ketquangoaikiemchatluongnuoc == null){
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
            
            self.$el.find("#them_thongso_khongdat").unbind("click").bind("click", function () {
            	self.add_thongso_khongdat();
            });

            self.$el.find("#addItem").unbind("click").bind("click", function () {
            	self.add_thongso_ngoaikiem();
            });
            var id = this.getApp().getRouter().getParam("id");
            if (id) {
                this.model.set('id', id);
                this.model.fetch({
                    success: function (data) {
						self.onChangeEvents();
                    	self.applyBindings();
                        self.model.on("change:somauvavitri", function () {
                            self.changeSoMau(true);
                        });
                        self.changeSoMau();
                        self.render_thongsokhongdat();
                    },
                    error: function (xhr) {
						if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
							self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
							self.getApp().getRouter().navigate("login");
						}
                        self.getApp().notify("Lỗi lấy dữ liệu");
                    },
                });
            } else {
            	self.prepareBaocao();
                self.model.on("change:somauvavitri", function () {
                    self.changeSoMau();
                });
                self.onChangeEvents();
                self.applyBindings();
            }
        },
        add_thongso_khongdat: function(){
        	var self = this;
        	var dsThongSo = new ThongSoBaoCaoChatLuongNuocView();
        	dsThongSo.dialog({size: "large"});
        	var danhsachthongso_khongdat = self.model.get("danhsachthongso_khongdat");
        	if (danhsachthongso_khongdat == null){
        		danhsachthongso_khongdat = []
    		}
        	dsThongSo.on("ThongSo_onSelected", function (dataThongSo) {
            	var thongsoKhongDatView = new ThongSoKhongDatItemView();

        		thongsoKhongDatView.model.set("id", gonrin.uuid());
        		thongsoKhongDatView.model.set("mathongso", dataThongSo.mathongso);
        		thongsoKhongDatView.model.set("tenthongso", dataThongSo.tenthongso);
        		thongsoKhongDatView.model.set("gioihan_toida_txt", dataThongSo.gioihan_toida_txt);
        		thongsoKhongDatView.model.set("gioihan_toida", dataThongSo.gioihan_toida);
        		thongsoKhongDatView.model.set("gioihan_toithieu_txt", dataThongSo.gioihan_toithieu_txt);
        		thongsoKhongDatView.model.set("gioihan_toithieu", dataThongSo.gioihan_toithieu);
        		thongsoKhongDatView.render();
        		self.$el.find("#danhsachthongso_khongdat").append(thongsoKhongDatView.$el);
        		// console.log("model to JSON", thongsoKhongDatView.model.toJSON());
        		danhsachthongso_khongdat.push(thongsoKhongDatView.model.toJSON());
        		thongsoKhongDatView.on("change", function (event) {
                	var ds_khongdat = self.model.get("danhsachthongso_khongdat");
                	for(var i=0;i<ds_khongdat.length;i++){
                		if(ds_khongdat[i].id === event.oldData.id){
                			ds_khongdat[i] = event.data;
                			break;
                		}
                	}
        			self.model.set("danhsachthongso_khongdat",ds_khongdat);
        			self.applyBinding("danhsachthongso_khongdat");
        		});
        		thongsoKhongDatView.$el.find("#xoa_thongso_khongdat").unbind("click").bind("click", function () {
                	var ds_khongdat = self.model.get("danhsachthongso_khongdat");
                    for (var i = 0; i < ds_khongdat.length; i++) {
                        if (ds_khongdat[i].id === thongsoKhongDatView.model.get("id")) {
                        	ds_khongdat.splice(i, 1);
                        }
                    }
                    self.model.set("danhsachthongso_khongdat", ds_khongdat);
                    self.applyBinding("danhsachthongso_khongdat");
                    thongsoKhongDatView.destroy();
                    thongsoKhongDatView.remove();
                });
        		dsThongSo.destroy();
        		dsThongSo.remove();
        	});
        	self.model.set("danhsachthongso_khongdat", danhsachthongso_khongdat);
        },
        render_thongsokhongdat: function(){
        	var self = this;
        	var danhsachthongso_khongdat = self.model.get("danhsachthongso_khongdat");
        	if (!!danhsachthongso_khongdat && danhsachthongso_khongdat.length>0){
        		$.each(danhsachthongso_khongdat, function(idx, data){
        			var thongsoKhongDatView = new ThongSoKhongDatItemView();
        			thongsoKhongDatView.model.set(JSON.parse( JSON.stringify( data )));
            		thongsoKhongDatView.render();
            		self.$el.find("#danhsachthongso_khongdat").append(thongsoKhongDatView.$el);
            		thongsoKhongDatView.on("change", function (event) {
                    	var ds_khongdat = self.model.get("danhsachthongso_khongdat");
                    	for(var i=0;i<ds_khongdat.length;i++){
                    		if(ds_khongdat[i].id === event.oldData.id){
                    			ds_khongdat[i] = event.data;
                    			break;
                    		}
                    	}
            			self.model.set("danhsachthongso_khongdat",ds_khongdat);
            			self.applyBinding("danhsachthongso_khongdat");
            		});
            		thongsoKhongDatView.$el.find("#xoa_thongso_khongdat").unbind("click").bind("click", function () {
                    	var ds_khongdat = self.model.get("danhsachthongso_khongdat");
	                    for (var i = 0; i < ds_khongdat.length; i++) {
	                        if (ds_khongdat[i].id === thongsoKhongDatView.model.get("id")) {
	                        	ds_khongdat.splice(i, 1);
	                        }
	                    }
	                    self.model.set("danhsachthongso_khongdat", ds_khongdat);
	                    self.applyBinding("danhsachthongso_khongdat");
	                    thongsoKhongDatView.destroy();
	                    thongsoKhongDatView.remove();
	                });
            		
        		});
        	}
        },
        add_thongso_ngoaikiem: function(){
        	var self = this;
            var view = new ThongSoBaoCaoChatLuongNuocView();
            view.dialog({size: "large"});
            var ketquangoaikiemchatluongnuoc = self.model.get('ketquangoaikiemchatluongnuoc');
            view.on("ThongSo_onSelected", function (data) {
                for (var i = 0; i < ketquangoaikiemchatluongnuoc.length; i++) {
                    if (ketquangoaikiemchatluongnuoc[i].id === data.id) {
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
                ketquangoaikiemchatluongnuoc.push(item);
                self.model.set("ketquangoaikiemchatluongnuoc", ketquangoaikiemchatluongnuoc);
                self.applyBinding("ketquangoaikiemchatluongnuoc");
                self.changeSoMau();
                view.destroy();
                view.remove();
            });
        },
        changeSoMau: function () {
            var self = this;
            var somau = self.model.get("somauvavitri");
            self.$el.find("[id=mauvitri_header]").remove();
            self.$el.find("[id=mauvitri_header_before]").hide();
            self.$el.find("#ketquangoaikiemchatluongnuoc").empty();
            if (!!somau & (somau > 0)) {
            	self.renderViTriMau();
            	var danhsachthongso = self.model.get("ketquangoaikiemchatluongnuoc");
                if (danhsachthongso.length == 0){
                	self.$el.find("[id=removeButton]").hide();
                } else {
                	self.$el.find("[id=removeButton]").show();
                }
                // console.log("changeSoMau.danhsachthongso===",danhsachthongso);
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
                        		arr_ketquakiemtra.push(item_vitrilaymau);
                        	}else{
                        		// console.log("chay vao day ngoai kiem la loi roi???? line 362");
                        	}
                        }
                    	obj["ketquakiemtra"] = arr_ketquakiemtra;
                    } else if (old_thongso_ketqua.length > somau) {
                    	obj["ketquakiemtra"].length = somau;
                    }
                    danhsachthongso_new.push(obj);
                });
                self.model.set("ketquangoaikiemchatluongnuoc",danhsachthongso_new);

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
            $.each(danhsachthongso, function (idx, obj) {
                var view = new KetQuaNgoaiKiemChatLuongNuocItemView();
                obj["sothutu"] = idx + 1;
                view.model.set(JSON.parse( JSON.stringify( obj )));
                view.render();
                self.$el.find("#ketquangoaikiemchatluongnuoc").append(view.$el);
                
                view.on("ketquachange", function (data_thongso) {
                    self.update_ketqua_thongso(data_thongso);
                    if (view.model.get("danhgia") == 1) {
                    	view.$el.find("[id=danhgiathongso]").text("Đạt");
                    } else {
                    	view.$el.find("[id=danhgiathongso]").text("Không Đạt");
                    }
                });
                view.$el.find("#itemRemove").unbind("click").bind("click", function () {
                    var itemketquangoaikiem = self.model.get("ketquangoaikiemchatluongnuoc");
                    for (var i = 0; i < itemketquangoaikiem.length; i++) {
                        if (itemketquangoaikiem[i].id === obj.id) {
                            itemketquangoaikiem.splice(i, 1);
                        }
                    }
                    self.model.set("ketquangoaikiemchatluongnuoc", itemketquangoaikiem);
                    self.applyBinding("ketquangoaikiemchatluongnuoc");
                    self.calculator_ketqua_vitri();
                    view.destroy();
					view.remove();
					
					if(itemketquangoaikiem.length == 0) {
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
            var danhsachthongso = self.model.get("ketquangoaikiemchatluongnuoc");
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
            self.model.set('ketquangoaikiemchatluongnuoc', danhsachthongso);
            self.applyBinding("ketquangoaikiemchatluongnuoc");
//            
//          Tính lại tổng các thông số tại các vị trí đạt  hay không đạt
            self.calculator_ketqua_vitri();
        },
        calculator_ketqua_vitri: function(){
        	var self = this;
        	var danhsachthongso = self.model.get("ketquangoaikiemchatluongnuoc");
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
        prepareBaocao: function () {
            var self = this;
            self.model.set("ketquangoaikiemchatluongnuoc", []);
//            var url = self.getApp().serviceURL + "/api/v1/thongsobaocaochatluongnuoc";
            var url = self.getApp().serviceURL + "/api/v1/thongsobaocaochatluongnuoc?results_per_page=1000&max_results_per_page=10000";

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
                    self.model.set("ketquangoaikiemchatluongnuoc", danhsachthongso);
                    self.applyBinding("ketquangoaikiemchatluongnuoc");
                    self.model.set("somauvavitri", 1);
                    self.model.trigger("change");
                },
                error: function (xhr, status, error) {
					if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
						self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
						self.getApp().getRouter().navigate("login");
					}
                    self.getApp().notify("Không tìm thấy thông số");
                },
            });
        },
        checkDate: function(dateInput){  
			var self = this;
			var re = /(2[0-9]{3})\b/g;
			var OK = re.exec(dateInput); 
			if(!OK){
				self.getApp().notify({message: "Năm đánh giá không hợp lệ"},{type: "danger"})
			}
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
			var tong_thongso_khongdat = self.model.get("danhsachthongso_khongdat") != null ? self.getApp().toInt(self.model.get("danhsachthongso_khongdat").length):0;
			self.model.set("tong_thongso_khongdat", tong_thongso_khongdat);
			self.model.on("change:danhsachthongso_khongdat",function(){
				var tong_thongso_khongdat = self.model.get("danhsachthongso_khongdat") != null ? self.getApp().toInt(self.model.get("danhsachthongso_khongdat").length):0;
				self.model.set("tong_thongso_khongdat", tong_thongso_khongdat);
//            	var thunghiem_chatluong_nuoc = self.model.get("tong_thongso_khongdat");
//            	if(!!thunghiem_chatluong_nuoc && thunghiem_chatluong_nuoc != 0){
//            		self.$el.find("#danhsachthongsokhongdat").show();
//            	}else{
//            		self.$el.find("#danhsachthongsokhongdat").hide();
//            	}
            });
			 self.model.on("change:thunghiem_chatluong_nuoc",function(){
            	var thunghiem_chatluong_nuoc = self.model.get("thunghiem_chatluong_nuoc");
            	if(!!thunghiem_chatluong_nuoc && thunghiem_chatluong_nuoc ===1){
            		self.$el.find(".tagketquangoaikiem").show();
            	}else{
            		self.$el.find(".tagketquangoaikiem").hide();
            	}
            });
			
		 	var tongsomau_thunghiem = self.model.get("tongsomau_thunghiem");
			var tongsomau_dat_quychuan = self.model.get("tongsomau_dat_quychuan");
			var tylemau_datquychuan = 0;
			if(toInt(tongsomau_thunghiem)>0){
				tylemau_datquychuan = (tongsomau_dat_quychuan*100/tongsomau_thunghiem).toFixed(2);
			}
			self.$el.find("#tylemau_datquychuan").val(tylemau_datquychuan);
			
			var tongsomau_khongdat_quychuan = self.model.get("tongsomau_khongdat_quychuan");
			var tyle_khongdatchuan = 0;
			if(toInt(tongsomau_thunghiem)>0){
				tyle_khongdatchuan = (tongsomau_khongdat_quychuan*100/tongsomau_thunghiem).toFixed(2);
			}
			self.$el.find("#tylemau_khongdatquychuan").val(tyle_khongdatchuan);
			
			self.model.on("change:tongsomau_thunghiem", function(){
				var tongsomau_thunghiem = self.model.get("tongsomau_thunghiem");
				var tongsomau_dat_quychuan = self.model.get("tongsomau_dat_quychuan");
				var tylemau_datquychuan = 0;
				if(toInt(tongsomau_thunghiem)>0){
					tylemau_datquychuan = (tongsomau_dat_quychuan*100/tongsomau_thunghiem).toFixed(2);
				}
				self.$el.find("#tylemau_datquychuan").val(tylemau_datquychuan);
				
				var tongsomau_khongdat_quychuan = self.model.get("tongsomau_khongdat_quychuan");
				var tyle_khongdatchuan = 0;
				if(toInt(tongsomau_thunghiem)>0){
					tyle_khongdatchuan = (tongsomau_khongdat_quychuan*100/tongsomau_thunghiem).toFixed(2);
				}
				self.$el.find("#tylemau_khongdatquychuan").val(tyle_khongdatchuan);
			});
			self.model.on("change:tongsomau_dat_quychuan", function(){
				var tongsomau_thunghiem = self.model.get("tongsomau_thunghiem");
				var tongsomau_dat_quychuan = self.model.get("tongsomau_dat_quychuan");
				var tylemau_datquychuan = 0;
				if(toInt(tongsomau_thunghiem)>0){
					tylemau_datquychuan = (tongsomau_dat_quychuan*100/tongsomau_thunghiem).toFixed(2);
				}
				self.$el.find("#tylemau_datquychuan").val(tylemau_datquychuan);
			});
			self.model.on("change:tongsomau_khongdat_quychuan", function(){
				var tongsomau_thunghiem = self.model.get("tongsomau_thunghiem");
				var tongsomau_khongdat_quychuan = self.model.get("tongsomau_khongdat_quychuan");
				var tyle = 0;
				if(toInt(tongsomau_thunghiem)>0){
					tyle = (tongsomau_khongdat_quychuan*100/tongsomau_thunghiem).toFixed(2);
				}
				self.$el.find("#tylemau_khongdatquychuan").val(tyle);
			});
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