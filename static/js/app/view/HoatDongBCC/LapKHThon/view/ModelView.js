define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!../tpl/model.html'),
		schema = require('json!schema/TienDoKeHoachBCCSchema.json');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var DMHoatDongSelectView = require('app/view/DanhMuc/DanhMucHoatDong/view/SelectView');
	var HoatDongItemView = require('app/view/HoatDongBCC/HoatDong/HoatDongItemView');

	var params = {
		"filters": {
			"$and": [
				{"loai_hoatdong": {"$eq": "thon"}}
			]
		}
	};
	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		filterParams: null,
		onInit: true,
		collectionName: "tiendo_kehoach_bcc",
		uiControl: {
			fields: [
				{
					field: "tinhthanh",
					uicontrol: "ref",
					textField: "ten",
					//chuyen sang thanh object
					foreignRemoteField: "id",
					foreignField: "tinhthanh_id",
					dataSource: TinhThanhSelectView
				},
				{
					field: "xaphuong",
					uicontrol: "ref",
					textField: "ten",
					//chuyen sang thanh object
					foreignRemoteField: "id",
					foreignField: "xaphuong_id",
					dataSource: XaPhuongSelectView
				},
				{
					field: "quanhuyen",
					uicontrol: "ref",
					textField: "ten",
					//chuyen sang thanh object
					foreignRemoteField: "id",
					foreignField: "quanhuyen_id",
					dataSource: QuanHuyenSelectView
				},
				{
					field: "thonxom",
					uicontrol: "ref",
					textField: "ten",
					//chuyen sang thanh object
					foreignRemoteField: "id",
					foreignField: "thonxom_id",
					dataSource: ThonXomSelectView
				},
				{
					field: "tiendo_xaydung",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "Đã hooàn thành dự thảo", value: 2},
						{text: "Đang xây dựng", value: 1},
						{text: "Chưa xây dựng", value: 0}
					]
				},
				{
					field: "tiendo_rasoat",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "VIHEMA đã chấp thuận", value: 2},
						{text: "Đang rà soát", value: 1},
						{text: "Chưa chấp thuận", value: 0}
					]
				},
				{
					field: "tiendo_pheduyet",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{text: "Đã phê duyệt", value: 1},
						{text: "Chưa phê duyệt", value: 0}
					]
				},
				{
					field: "ngay_pheduyet",
					uicontrol: "datetimepicker",
					textFormat: "DD/MM/YYYY"
				}
			]
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
						var currentPeriod = self.getApp().get_currentRoute_loaibaocao();
						if (!self.validate()) {
							return;
						}
						self.model.save(null, {	
							success: function (model, respose, options) {
								self.getApp().notify({message: "Lưu thông tin thành công"}, {type: "success"});
								self.getApp().getRouter().navigate("hoatdongbcc/capthon/collection?loaikybaocao=" + currentPeriod);

							},
							error: function (model, xhr, options) {
								try {
									self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
								}catch (err) {
									self.getApp().notify({ message: 'Lưu thông tin không thành công!' }, { type: "danger", delay: 1000 });
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
						var currentPeriod = self.getApp().get_currentRoute_loaibaocao();
						self.model.destroy({
							success: function (model, response) {
								self.getApp().notify({message: "Xoá dữ liệu thành công"}, {type: "success"});
								self.getApp().getRouter().navigate("hoatdongbcc/capthon/collection?loaikybaocao=" + currentPeriod);
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
			var currentPeriod = self.getApp().get_currentRoute_loaibaocao();
			self.model.set("loaikybaocao", self.getApp().mapKyBaoCao[currentPeriod].loaikybaocao);
			self.model.set("kybaocao", self.getApp().mapKyBaoCao[currentPeriod].kybaocao);
			self.$el.find("#kydanhgia").val(self.getApp().mapKyBaoCao[currentPeriod].text);
			var id = this.getApp().getRouter().getParam("id");
			
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
						self.onChangeEvents();
						self.renderDanhSach(data.attributes.danhsach_hoatdong);
					},
					error: function (xhr) {
						self.getApp().notify({message: xhr.toString()}, {type: "danger"});
					},
				});
			} else {
				
				self.setDefaultData();
				self.applyBindings();
				self.onChangeEvents();
				self.renderDanhSach(null);
			}
			
			self.$el.find("#add_dmhoatdong").unbind("click").bind("click", function(event) {
				
				var dmHoatDongDialog = new DMHoatDongSelectView({"viewData":{"loai_hoatdong":"thon"}});
				dmHoatDongDialog.dialog();
				
				dmHoatDongDialog.on("onSelected", function(data) {
					console.log("data==",data);
					var danhsachhoatdong = self.model.get("danhsach_hoatdong") ? self.model.get("danhsach_hoatdong") : [];
	                for(var i=0; i< danhsachhoatdong.length; i++){
	                	var item = danhsachhoatdong[i];
	                	if(item.id === data.id){
	                		self.getApp().notify("Hoạt động đã tồn tại trong báo cáo");
	                		return;
	                	}
	                }
					self.model.get("danhsach_hoatdong").push(data);
					self.renderHoatDongView(data);
				});
			});
		},
		
		/**
		 * SET AUTO FIELD BASE ON CURRENT USER & FORM
		 */
		setDefaultData: function() {
			var self = this;
			var currentUser = self.getApp().currentUser;
			console.log("currentUser===",currentUser);
			if(!!currentUser && !!currentUser.donvi) {
				if (!!currentUser.donvi.tinhthanh_id) {
					self.model.set("tinhthanh_id", currentUser.donvi.tinhthanh_id);
					self.model.set("tinhthanh", currentUser.donvi.tinhthanh);
				}
				if (!!currentUser.donvi.quanhuyen_id){
					self.model.set("quanhuyen_id", currentUser.donvi.quanhuyen_id);
					self.model.set("quanhuyen", currentUser.donvi.quanhuyen);
				}
				if (!!currentUser.donvi.xaphuong_id){
					self.model.set("xaphuong_id", currentUser.donvi.xaphuong_id);
					self.model.set("xaphuong", currentUser.donvi.xaphuong);
				}
			}
			self.model.set("tuyendonvi", "thon");
		},
		
		onChangeEvents: function() {
			var self = this;
			
			self.model.on("change:tiendo_pheduyet", function(model) {
				if (self.model.get("tiendo_pheduyet") == 1) {
					if (self.$el.find("#pheduyet_extra").hasClass("hide")) {
						self.$el.find("#pheduyet_extra").removeClass("hide");
					}
				} else {
					if (!self.$el.find("#pheduyet_extra").hasClass("hide")) {
						self.$el.find("#pheduyet_extra").addClass("hide");
					}
				}
			});

			if (self.model.get("tiendo_pheduyet") == 1) {
				if (self.$el.find("#pheduyet_extra").hasClass("hide")) {
					self.$el.find("#pheduyet_extra").removeClass("hide");
				}
			}
			
		},
		renderHoatDongView:function(data){
			var self = this;
			var hoatDongItemView = new HoatDongItemView();
			hoatDongItemView.model.set(JSON.parse(JSON.stringify(data)));
			hoatDongItemView.render();
			hoatDongItemView.$el.find("#itemRemove").unbind('click').bind('click',{obj:data}, function(e){
            	var fields = self.model.get("danhsach_hoatdong");
            	var data = e.data.obj;
                for( var i = 0; i < fields.length; i++){ 
                	   if ( fields[i].id === data.id) {
                		   fields.splice(i, 1); 
                	   }
                	}
                self.model.set("danhsach_hoatdong", fields);
                self.model.trigger("change");
                hoatDongItemView.destroy();
                hoatDongItemView.remove();
            });
			hoatDongItemView.on("change", function(data) {
				var dshoatdong = self.model.get("danhsach_hoatdong");
				dshoatdong.forEach(function(item, idx) {
					if (item.id == data.id) {
						dshoatdong[idx] = data;
					}
				});
				self.model.set("danhsach_hoatdong", JSON.parse(JSON.stringify((dshoatdong))));
				self.model.trigger("change");
			});
			self.$el.find("#danhsachhoatdong_list").append(hoatDongItemView.$el);
		},
		renderDanhSach: function(danhsachhoatdong) {
			var self = this;
			
			self.$el.find("#danhsachhoatdong_list").empty();
			self.$el.find("#danhsachhoatdong_list").append(`
			<tr class="top">
                <td colspan="2">(1)</td>
                <td>(2)</td>
                <td>(3)</td>
                <td></td>
                <td colspan="3"></td>
            </tr>
            <tr class="custom" style="background: #F0F0F0;;">
                <td colspan="5">
                    <p>Liệt kê các hoạt động được thực hiện theo kế hoạch BCC</p>
                </td>
                <td>Tổng số người tham gia</td>
                <td>Số người tham gia là nữ</td>
                <td>Số người tham gia là DTTS</td>
            </tr>
            <tr>
                <td colspan="5" class="text-left" style="color: red; font-weight: bold;">Hoạt động cấp thôn</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>`);
			if(danhsachhoatdong === null){
				$.ajax({
					url: self.getApp().serviceURL + "/api/v1/danhmuchoatdong",
		    		data: {"q": JSON.stringify({"filters": {"loai_hoatdong":{"$eq":"thon"}}, "order_by":[{"field": "nganh_id", "direction": "asc"}]})},
					type: "GET",
					success: function(data) {
						self.model.set("danhsach_hoatdong",[]);
						$.each(data.objects, function(idx, obj){
							if(!!obj && obj.id !==null && obj.id.length>0){
								self.model.get("danhsach_hoatdong").push(obj);
				                self.renderHoatDongView(obj);
							}
						});
					},
					error: function (xhr, status, error) {
						self.getApp().notify("Không lấy được danh sách hoạt động, vui lòng thử lại sau!");
					},
				});
			}else{
				for(var i=0; i< danhsachhoatdong.length; i++){
					self.renderHoatDongView(danhsachhoatdong[i]);
				}
			}
		},

		validate : function() {
			const self = this;
			if (!self.model.get("nambaocao")) {
				self.getApp().notify({message: "Năm báo cáo không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("tinhthanh")) {
				self.getApp().notify({message: "Tỉnh thành không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("quanhuyen")) {
				self.getApp().notify({message: "Quận huyện không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("xaphuong")) {
				self.getApp().notify({message: "Xã phường không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("thonxom")) {
				self.getApp().notify({message: "Thôn xóm không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("tiendo_xaydung")) {
				self.getApp().notify({message: "Tiến độ xây dựng không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("tiendo_rasoat")) {
				self.getApp().notify({message: "Tiến độ rà soát không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("tiendo_pheduyet")) {
				self.getApp().notify({message: "Tiến độ phê duyệt không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("sohoatdong_cotloi_hoanthanh")) {
				self.getApp().notify({message: "Số hoạt động BBC cốt lõi không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("tongsogiangvien")) {
				self.getApp().notify({message: "Tổng số giảng viên không được để trống"},{type: "warning"});
				return;
			}
			if (!self.model.get("tongsogiangvien_nu")) {
				self.getApp().notify({message: "Tổng số giảng viên nữ không được để trống"},{type: "warning"});
				return;
			}
			return true;
		},
	});

});