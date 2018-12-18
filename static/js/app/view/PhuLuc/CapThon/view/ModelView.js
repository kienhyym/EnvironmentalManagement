define(function(require) {
  "use strict";
  var $ = require('jquery'),
    _ = require('underscore'),
    Gonrin = require('gonrin');

  var template = require('text!app/view/BaoCao/KQChatLuongNuocAnUong/tpl/model.html'),
    schema = require('json!schema/KQChatLuongNuocAnUongSchema.json');

  var ThongTinThonView = require('app/view/PhuLuc/ThongTinThon/view/ModelView'); 
  var NhaTieuThonHVSView = require('app/view/PhuLuc/NhaTieuThonHVS/view/ModelView');
  


  var currentDate = new Date();

  return Gonrin.ModelView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    collectionName: "capthon",

    uiControl: {
      fields: [{
          field: "ngaybanhanhthongtu",
          textFormat: "DD/MM/YYYY",
          extraFormats: ["DDMMYYYY"],
          maxDate:currentDate,
        },
			{
	          field: "thoigiankiemtra",
	          textFormat: "DD/MM/YYYY",
	          extraFormats: ["DDMMYYYY"],
	          maxDate:currentDate,
	        },
	        {
	          field: "ngaybaocao",
	          textFormat: "DD/MM/YYYY",
	          extraFormats: ["DDMMYYYY"],
	          maxDate:currentDate,
	        },
	        {
	        	field:"thongtinthon",
	        	uicontrol:false,
	        	itemView:ThongTinThonView
	        },
	        {
	        	field:"nhatieuthonhvs",
	        	uicontrol:false,
	        	itemView:NhaTieuThonHVSView
	        },
			{
	          field: "ngaytaophieu",
	          textFormat: "DD/MM/YYYY",
	          extraFormats: ["DDMMYYYY"],
	          maxDate:currentDate
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
      
     var view_ThongTinThonView = new ThongTinThonView();
     var view_NhaTieuThonHVSView = new NhaTieuThonHVSView();
    
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
