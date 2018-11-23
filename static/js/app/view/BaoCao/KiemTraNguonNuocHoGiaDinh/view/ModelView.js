define(function(require) {
  "use strict";
  var $ = require('jquery'),
    _ = require('underscore'),
    Gonrin = require('gonrin');

  var template = require('text!app/view/BaoCao/KiemTraNguonNuocHoGiaDinh/tpl/model.html'),
    schema = require('json!schema/KiemTraNguonNuocHoGiaDinhSchema.json');
  var xaphuongView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
  var thonxomView = require('app/view/DanhMuc/ThonXom/view/SelectView');
  var tinhthanhView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
  var quanhuyenView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
  
//  var nuoctuchayView = require('app/view/BaoCao/NguonNuocTuChay/view/SelectView');
//  var nuocgiengdaoView = require('app/view/BaoCao/NguonNuocGiengDao/view/SelectView');

  var maxDate = new Date();

  return Gonrin.ModelView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    collectionName: "kiemtranguonnuochogiadinh",

    uiControl: {
      fields: [{
          field: "ngaybanhanhthongtu",
          textFormat: "DD/MM/YYYY",
          extraFormats: ["DDMMYYYY"],
          maxDate,
        },
				{
	          field: "thoigiankiemtra",
	          textFormat: "DD/MM/YYYY",
	          extraFormats: ["DDMMYYYY"],
	          maxDate,
	        },
					{
		          field: "ngaykiemtra",
		          textFormat: "DD/MM/YYYY",
		          extraFormats: ["DDMMYYYY"],
		          maxDate,
		        },

        {
          field: "xaphuong",
          uicontrol: "ref",
          textField: "ten",
          //chuyen sang thanh object
          foreignRemoteField: "id",
          foreignField: "xaphuong_id",
          dataSource: xaphuongView
        },
        {
          field: "quanhuyen",
          uicontrol: "ref",
          textField: "ten",
          //chuyen sang thanh object
          foreignRemoteField: "id",
          foreignField: "quanhuyen_id",
          dataSource: quanhuyenView
        },
        {
          field: "thonxom",
          uicontrol: "ref",
          textField: "ten",
          //chuyen sang thanh object
          foreignRemoteField: "id",
          foreignField: "thonxom_id",
          dataSource: thonxomView
        },
        {
          field: "tinhthanh",
          uicontrol: "ref",
          textField: "ten",
          //chuyen sang thanh object
          foreignRemoteField: "id",
          foreignField: "tinhthanh_id",
          dataSource: tinhthanhView
        },
//        {
//            field: "nguonuoctuchay",
//            uicontrol: "dict",
//            textField: "cong",
//            //chuyen sang thanh object
//            foreignRemoteField: "id",
//            foreignField: "nguonnuoctuchay_id",
//            dataSource: nuoctuchayView
//          },
//          {
//              field: "nguonnuocgiengdao",
//              uicontrol: "dict",
//              textField: "cong",
//              //chuyen sang thanh object
//              foreignRemoteField: "id",
//              foreignField: "nguonnuocgiengdao_id",
//              dataSource: nuoctuchayView
//            },

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

            self.model.save(null, {
              success: function(model, respose, options) {
                self.getApp().notify("Lưu thông tin thành công");
                self.getApp().getRouter().navigate(self.collectionName + "/collection");

              },
              error: function(model, xhr, options) {
                self.getApp().notify('Lưu thông tin không thành công!');

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
      if (id) {
        this.model.set('id', id);
        this.model.fetch({
          success: function(data) {
            self.applyBindings();
          },
          error: function() {
            self.getApp().notify("Get data Eror");
          },
        });
      } else {
        self.applyBindings();
      }

    },
  });

});
