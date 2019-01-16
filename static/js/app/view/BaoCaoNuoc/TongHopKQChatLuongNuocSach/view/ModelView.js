define(function(require) {
  "use strict";
  var $ = require('jquery'),
    _ = require('underscore'),
    Gonrin = require('gonrin');

  var template = require('text!app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/tpl/model.html'),
    schema = require('json!schema/TongHopKetQuaKiemTraChatLuongNuocSachSchema.json');
  var DonViCapNuocSelectView = require('app/view/DanhMuc/DonViCapNuoc/view/SelectView');

  var maxDate = new Date();

  function toInt(x) {
    return parseInt(x) ? parseInt(x) : 0;
  }


  return Gonrin.ModelView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    collectionName: "tonghop_ketqua_chatluong_nuocsach",
    uiControl: {
      fields: [{
          field: "ngaybaocao",
          textFormat: "DD/MM/YYYY",
          extraFormats: ["DDMMYYYY"],
          maxDate: maxDate
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
          command: function() {
            var self = this;

            Backbone.history.history.back();
          }
        },
        {
          name: "save",
          type: "button",
          buttonClass: "btn-success btn-sm",
          label: "TRANSLATE:SAVE",
          command: function() {
				var self = this;
				var id = this.getApp().getRouter().getParam("id");
				var nambaocao = self.model.get("nambaocao");
				if(nambaocao === null || nambaocao === ""){
					self.getApp().notify({message: "Chưa chọn năm báo cáo"},{type: "danger"});
					return;
				}else if(!self.model.get("donvicapnuoc")){
                	self.getApp().notify({message: "Chưa chọn tên đơn vị cấp nước"},{type: "warning"});
                	return;
                }
				var check_donvi = true;
				if (id !== null && id.length>0){
					if (self.getApp().currentUser !== null 
							&& self.getApp().currentUser.donvi_id !== self.model.get("donvi_id")){
						check_donvi = false;
					}
				}
				if(check_donvi === true){
					self.model.save(null, {
						success: function (model, respose, options) {
							self.getApp().notify("Lưu thông tin thành công");
							var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
							self.getApp().getRouter().navigate(self.collectionName 
									+ "/collection?loaikybaocao="+routeloaibaocao);

						},
						error: function (xhr, status, error) {
							try {
								self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
							}
							catch (err) {
								self.getApp().notify({ message: xhr.responseText }, { type: "danger", delay: 1000 });
							}
						}
					});
				}else{
					self.getApp().notify("Tài khoản hiện tại không có quyền sửa báo cáo này,\n Chỉ có đơn vị tạo báo cáo mới được phép sửa báo cáo này")
				}
          }
        },
        {
			name: "count",
			type: "button",
			buttonClass: "btn-primary btn-sm",
			label: "Cộng dồn",
//			visible: function () {
//				return this.getApp().getRouter().getParam("id") !== null;
//			},
			command: function () {
				var self = this;
				var nambaocao = self.model.get("nambaocao");
				if(nambaocao === null || nambaocao === ""){
					self.getApp().notify({message: "Chưa chọn năm báo cáo"},{type: "danger"});
					return;
				}else if(!self.model.get("donvicapnuoc")){
                	self.getApp().notify({message: "Chưa chọn tên đơn vị cấp nước"},{type: "warning"});
                	return;
                }
				self.model.save(null, {
					success: function (model, respose, options) {
						self.getApp().notify("Lưu thông tin thành công");
					},
					error: function (xhr, status, error) {
						try {
							self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
						}
						catch (err) {
							self.getApp().notify({ message: xhr.responseText }, { type: "danger", delay: 1000 });
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
          visible: function() {
            return this.getApp().getRouter().getParam("id") !== null;
          },
          command: function() {
            var self = this;
            self.model.destroy({
              success: function(model, response) {
                self.getApp().notify('Xoá dữ liệu thành công');
                self.getApp().getRouter().navigate(self.collectionName + "/collection");
              },
              error: function(model, xhr, options) {
                self.getApp().notify('Xoá dữ liệu không thành công!');

              }
            });
          }
        },
      ],
    }],
    render: function() {
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
		}
		self.getApp().on("DonViCapNuoc_onSelected", function (data) {
			self.model.set("tendonvicapnuoc",data.ten)
            self.model.set("congsuat_thietke", data.congsuat);
            self.model.set("tansuat_noikiem", data.tansuat_noikiem);
            self.model.set("tongso_hogiadinh", data.tongso_hogiadinh);
            self.model.set("nguonnuoc_nguyenlieu", toInt(data.nguonnuoc_nguyenlieu));
            self.model.set("diachi_donvicapnuoc", data.diachi);
            self.applyBindings();
        });
		if (id) {
			this.model.set('id', id);
			this.model.fetch({
				success: function (data) {
					self.applyBindings();
				},
				error: function () {
					self.getApp().notify("Lỗi không lấy được dữ liệu");
				},
			});
		} else {
			self.applyBindings();
		}
    },

  });

});
