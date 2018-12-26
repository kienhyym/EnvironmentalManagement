define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinhHoGiaDinh/CapThon/tpl/model.html'),
		schema = require('json!schema/VSCapThonSchema.json');


	var NhaTieuThonHVSItemView = require('app/view/VeSinhHoGiaDinh/CapThon/NhaTieuThonHVS/view/ModelItemView');
	var tongischema = require('json!app/view/VeSinhHoGiaDinh/CapThon/view/TongiSchema.json');
	var tongitemplate = require('text!app/view/VeSinhHoGiaDinh/CapThon/tpl/tongcongi.html');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');



	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	var TongViewI = Gonrin.ModelView.extend({
		template: tongitemplate,
		modelSchema: tongischema,
		bindings: 'tongi-bind',
		urlPrefix: "/api/v1/",
		collectionName: "tong",
		uiControl: [],
		render: function () {
			this.applyBindings();
		}
	});
	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,

		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "vscapthon",

		uiControl: {
			fields: [
				{
					field: "xaphuong",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "xaphuong_id",
					dataSource: XaPhuongSelectView
				},
				{
					field: "thonxom",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "thonxom_id",
					dataSource: ThonXomSelectView
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
//				{
//					field: "nhatieuthonhvs",
//					uicontrol: false,
//					itemView: NhaTieuThonHVSItemView,
//					tools: [{
//						name: "create",
//						type: "button",
//						buttonClass: "btn btn-success btn-sm",
//						label: "<span class='fa fa-plus'>Thêm mới</span>",
//						command: "create"
//					}, ],
//					toolEl: "#addItem"
//				},
				{
    				field: "thuocsuprsws",
    				uicontrol: "combobox",
    				textField: "text",
    				valueField: "value",
    				dataSource: [
    					{ "value": 1, "text": "Có" },
    					{ "value": 0, "text": "Không" },
					],
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
						var tinhthanh = self.model.get("tinhthanh");
						var quanhuyen = self.model.get("quanhuyen");
						var xaphuong = self.model.get("xaphuong");
						var thonxom = self.model.get("thonxom");

						if(nambaocao === null || nambaocao === ""){
							self.getApp().notify({message: "Chưa chọn năm báo cáo"},{type: "danger"});
						}else if(tinhthanh === null){
							self.getApp().notify({message: "Chưa chọn thông tin Tỉnh/Thành"},{type: "danger"});
						}else if(quanhuyen === null){
							self.getApp().notify({message: "Chưa chọn thông tin Quận/Huyện"},{type: "danger"});
						}else if(xaphuong === null){
							self.getApp().notify({message: "Chưa chọn thông tin Xã/Phương"},{type: "danger"});
						}else if(thonxom === null){
							self.getApp().notify({message: "Chưa chọn thông tin Thôn/Xóm"},{type: "danger"});
						}else {
							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().notify("Lưu thông tin thành công");
									self.getApp().getRouter().navigate(
										self.collectionName + "/collection");
	
								},
								error: function (model, xhr, options) {
									var msgJson = $.parseJSON(xhr.responseText);
										if (msgJson) {
											self.getApp().notify({message: msgJson.error_message}, {type: "danger"});
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
								self.getApp().notify('Xoá dữ liệu không thành công!');

							}
						});
					}
				},
			],
		}],
		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			var viewData = self.viewData;
			if (viewData !== null && viewData!==undefined){
				id =null;
			}
			self.$el.find("#addItem").unbind("click").bind("click", function () {
                var view = new NhaTieuThonHVSItemView();
                view.model.set("id",gonrin.uuid());
                self.model.get("nhatieuthonhvs").push(view.model.toJSON());
                self.renderItemView(view.model.toJSON());
            });
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						var nhatieuthonhvs = self.model.get("nhatieuthonhvs");
						for(var i=0; i< nhatieuthonhvs.length; i++){
							nhatieuthonhvs[i]['stt'] = i+1;
							self.renderItemView(nhatieuthonhvs[i]);
							
						}
//						self.model.set("nhatieuthonhvs", nhatieuthonhvs)
						self.applyBindings();
						self.renderTinhTongI();
						if (self.model.get("nhatieuthonhvs").length === 0) {
							self.$el.find("#addItem").click();
						}
					},
					error: function () {
						self.getApp().notify("Lỗi lấy thông tin cấp thôn");
					},
				});
			} else {
				
				if (viewData !== null && viewData!==undefined){
					self.model.set("tinhthanh_id", viewData.tinhthanh_id);
					self.model.set("tinhthanh", viewData.tinhthanh);
					self.model.set("quanhuyen_id", viewData.quanhuyen_id);
					self.model.set("quanhuyen", viewData.quanhuyen);
					self.model.set("xaphuong_id", viewData.xaphuong_id);
					self.model.set("xaphuong", viewData.xaphuong);
					self.model.set("nambaocao", viewData.nambaocao);
				}
				
				self.applyBindings();
				self.model.set("nhatieuthonhvs", []);
				self.renderTinhTongI();
				self.$el.find("#addItem").click();
		

			}
			
		},
		renderItemView:function(data){
			var self  =this;
			var view = new NhaTieuThonHVSItemView();
            view.model.set(data);
            view.render();
            self.$el.find("#nhatieuthonhvs").append(view.$el);
			view.$el.find("#itemRemove").unbind('click').bind('click',{obj:data}, function(e){
            	var fields = self.model.get("nhatieuthonhvs");
            	var data = e.data.obj;
                for( var i = 0; i < fields.length; i++){ 
                	   if ( fields[i].id === data.id) {
                		   fields.splice(i, 1); 
                	   }
                	}
                self.model.set("nhatieuthonhvs", fields);
                self.model.trigger("change");
                self.renderTinhTongI();
                view.destroy();
                view.remove();
            });
            view.on("change", function (event) {
            	console.log("onchange=====",event);	
                var fields = self.model.get("nhatieuthonhvs");
                fields.forEach(function (item, idx) {
                	if (fields[idx].id === event.oldData.id){
                		fields[idx] = event.data;
                	}
                });
                self.model.set("nhatieuthonhvs", fields);
                self.model.trigger("change");
                self.renderTinhTongI();
            });
		},
		renderTinhTongI: function () {
			var self = this;
			if (!self.tongViewi) {
				self.tongViewi = new TongViewI({
					el: self.$el.find("#tongcongi")
				});
				self.tongViewi.render();
			}
			var data = Gonrin.getDefaultModel(tongischema);	
			for (var j = 0; j < self.model.get('nhatieuthonhvs').length; j++) {
				var chitiet = self.model.get('nhatieuthonhvs')[j];
				var check_loaikhac = 0;
				if (toInt(chitiet['loaikhac'])>0){
					check_loaikhac = 1;
				}
				var check_dantoc = 0;
				if(chitiet["dantoc"]===null || chitiet["dantoc"].ma==="1"){
					check_dantoc = 0;
				}else{
					check_dantoc = 1;
				}
				_.each(tongischema, function (props, key) {
					
					if(key === "dtts"){
						data[key] = toInt(data[key]) + toInt(check_dantoc);
					}else if(key === "loaikhac"){
						data[key] = toInt(data[key]) + toInt(check_loaikhac);
					}else{
						data[key] = toInt(data[key]) + toInt(chitiet[key]);
					}
				});
			}
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
			self.changeTong();

					
		},
		changeTong: function() {
			var self = this;
			var sohongheo = self.tongViewi.model.get("hongheo");
			self.model.set("tong_sohongheo", sohongheo);
			
			var tong_nu = self.model.get("tong_nu");
			var tong_nam = self.model.get("tong_nam");
			var tong_dantrongthon = toInt(tong_nam) + toInt(tong_nu);
			self.model.set("tong_danso" , tong_dantrongthon)

			var tong_dtts = self.tongViewi.model.get("dtts");
			self.model.set("tong_sohodtts", tong_dtts);
			
			var soNu = self.tongViewi.model.get("gioitinh");
			self.model.set("tong_chuholanu", soNu);

			self.model.set("tong_soho", self.model.get("nhatieuthonhvs").length);	

			var tongTuhoai = self.tongViewi.model.get("tuhoai");
			self.model.set("tong_tuhoai", tongTuhoai);
			var tongThamdoi = self.tongViewi.model.get("thamdoi");
			self.model.set("tong_thamdoi", tongThamdoi);
			var tong2ngan = self.tongViewi.model.get("haingan");
			self.model.set("tong_2ngan", tong2ngan);
			var tong_loaikhac = self.tongViewi.model.get("loaikhac");
			self.model.set("tong_loaikhac", tong_loaikhac);
			var tongOngthonghoi = self.tongViewi.model.get("chimco_oth");	
			self.model.set("tong_ongthonghoi", tongOngthonghoi);
			var tongKhongconhatieu = self.tongViewi.model.get("khongconhatieu");
			self.model.set("tong_khongnhatieu", tongKhongconhatieu);
			var tongHopvs = self.tongViewi.model.get("hopvesinh");
			self.model.set("tong_hopvs", tongHopvs);
			var tongKhopvs = self.tongViewi.model.get("khonghopvesinh");
			self.model.set("tong_khonghopvs", tongKhopvs);
			var tongDuocaithien = self.tongViewi.model.get("caithien");
			self.model.set("tong_caithien", tongDuocaithien);
			var tongRuatay = self.tongViewi.model.get("diemruataycoxaphong");
			self.model.set("tong_diemruatay", tongRuatay);

		},

		checkDate: function(dateInput){  
			var self = this;
			var re = /(2[0-9]{4})\b/g;
			var OK = re.exec(dateInput);  
			if(!OK){
				self.getApp().notify({message: "Năm đánh giá không hợp lệ"},{type: "danger"})
			}
		},
	});

});