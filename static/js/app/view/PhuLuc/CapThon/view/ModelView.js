define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/CapThon/tpl/model.html'),
		schema = require('json!schema/CapThonSchema.json');


	var NhaTieuThonHVSItemView = require('app/view/PhuLuc/NhaTieuThonHVS/view/ModelItemView');
	var tongischema = require('json!app/view/PhuLuc/CapThon/view/TongiSchema.json');
	var tongitemplate = require('text!app/view/PhuLuc/CapThon/tpl/tongcongi.html');
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
		collectionName: "capthon",

		uiControl: {
			fields: [{
					field: "danhgianam",
					textFormat: "YYYY",
					extraFormats: ["YYYY"],
					maxDate: currentDate,
				},
				
				{
					field: "tenxa",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tenxa_id",
					dataSource: XaPhuongSelectView
				},
				{
					field: "thon",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "thon_id",
					dataSource: ThonXomSelectView
				},
				{
					field: "tentinh",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tentinh_id",
					dataSource: TinhThanhSelectView
				},
				{
					field: "tenhuyen",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tenhuyen_id",
					dataSource: QuanHuyenSelectView
				},
				{
					field: "nhatieuthonhvs",
					uicontrol: false,
					itemView: NhaTieuThonHVSItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-success btn-sm",
						label: "<span class='fa fa-plus'>Thêm</span>",
						command: "create"
					}, ],
					toolEl: "#addItem"
				},
				{
    				field: "suprsws",
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
						var ktDate = self.model.get("danhgianam");
						var ten_tinh = self.model.get("tentinh");
						var ten_huyen = self.model.get("tenhuyen");
						var ten_xa = self.model.get("tenxa");
						var ten_thon = self.model.get("thon");

						if(ktDate === null){
							self.getApp().notify({message: "Ngày tháng không đuợc để trống"},{type: "danger"});
							//self.$el.find("#idHuyen").css("background-color", "yellow");
						}else if(ten_tinh === null){
							self.getApp().notify({message: "Tên tỉnh không đuợc để trống"},{type: "danger"});
						}else if(ten_huyen === null){
							self.getApp().notify({message: "Tên huyện không đuợc để trống"},{type: "danger"});
						}else if(ten_xa === null){
							self.getApp().notify({message: "Tên xã không đuợc để trống"},{type: "danger"});
						}else if(ten_thon === null){
							self.getApp().notify({message: "Tên thôn không đuợc để trống"},{type: "danger"});
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
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
						self.renderTinhTongI();
						self.registerTinhTong();
						console.log("success");		
						//console.log("nhatieuthonhvs ", self.model.get("nhatieuthonhvs").length);
						if (self.model.get("nhatieuthonhvs").length === 0) {
							self.$el.find("#addItem button").click();
						}
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				
				if (viewData !== null && viewData!==undefined){
					self.model.set("tentinh_id", viewData.tentinh_id);
					self.model.set("tentinh", viewData.tentinh);
					self.model.set("tenhuyen_id", viewData.tenhuyen_id);
					self.model.set("tenhuyen", viewData.tenhuyen);
					self.model.set("tenxa_id", viewData.tenxa_id);
					self.model.set("tenxa", viewData.tenxa);
//					self.model.set("capxa_id", viewData.capxa_id);
					self.model.set("danhgianam", viewData.danhgianam);
				}
				
				self.applyBindings();
				self.model.set("nhatieuthonhvs", []);
				self.renderTinhTongI();
				self.registerTinhTong();			
				self.$el.find("#addItem button").click();
		

			}

		},

		registerTinhTong: function () {
			var self = this;
			self.model.on("change:nhatieuthonhvs", function () {
				//console.log("nhatieuthonhvs ", self.model.get('nhatieuthonhvs'));
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
				_.each(tongischema, function (props, key) {
					data[key] = toInt(data[key]) + toInt(self.model.get('nhatieuthonhvs')[j][key]);

					//data[key] = !data[key] ? self.model.get('nhatieuthonhvs')[j][key] : self.model.get('nhatieuthonhvs')[j][key] + data[key];

				});
			}

			//console.log("data : ", data);
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
			self.changeTong();

					
		},
		changeTong: function() {
			var self = this;
			var sohongheo = self.tongViewi.model.get("hongheo");
			self.model.set("sohongheo", sohongheo);
			
			var tong_dtts = self.tongViewi.model.get("dantoc");
			self.model.set("sohodtts", tong_dtts);
			
			var soNu = self.tongViewi.model.get("gioitinh");
			self.model.set("chuholanu", soNu);

			var tongSoDan = self.model.get("nhatieuthonhvs").length;
			self.model.set("hotrongthon", tongSoDan);	

			var tongTuhoai = self.tongViewi.model.get("tuhoai");
			self.model.set("tong_tuhoai", tongTuhoai)
			var tongThamdoi = self.tongViewi.model.get("thamdoi");
			self.model.set("tong_thamdoi", tongThamdoi)
			var tong2ngan = self.tongViewi.model.get("haingan");
			self.model.set("tong_2ngan", tong2ngan)
			var tongOngthonghoi = self.tongViewi.model.get("coongthong");	
			self.model.set("tong_ongthonghoi", tongOngthonghoi)
			var tongKhongconhatieu = self.tongViewi.model.get("kconhatieu");
			self.model.set("tong_khongnhatieu", tongKhongconhatieu)
			var tongHopvs = self.tongViewi.model.get("hopvs");
			self.model.set("tong_hopvs", tongHopvs)
			var tongKhopvs = self.tongViewi.model.get("khopvs");
			self.model.set("tong_khonghopvs", tongKhopvs)
			var tongDuocaithien = self.tongViewi.model.get("caithien");
			self.model.set("tong_dccaithien", tongDuocaithien)
			var tongRuatay = self.tongViewi.model.get("diemruatay");
			self.model.set("tong_diemruatay", tongRuatay)

		},

		checkDate: function(dateInput){  
			var self = this;
			var re = /(2[0-9]{4})\b/g;
			var OK = re.exec(dateInput);  
			if(!OK){
				self.getApp().notify({message: "Ngay thang khong dung"},{type: "danger"})
			}
		},
	});

});