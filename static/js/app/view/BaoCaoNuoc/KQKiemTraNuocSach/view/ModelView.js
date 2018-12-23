define(function(require) {
  "use strict";
  var $ = require('jquery'),
    _ = require('underscore'),
    Gonrin = require('gonrin');

  var template = require('text!app/view/BaoCaoNuoc/KQKiemTraNuocSach/tpl/model.html'),
    schema = require('json!schema/KQKiemTraNuocSachSchema.json');

  var maxDate = new Date();
  var HoSoTheoDoi = require('app/view/BaoCaoNuoc/HoSoTheoDoi/view/ModelItemView');
  var tongischema = require('json!app/view/BaoCaoNuoc/KQKiemTraNuocSach/view/tongSchema.json');
  var tongitemplate = require('text!app/view/BaoCaoNuoc/KQKiemTraNuocSach/tpl/tong.html');


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
    render: function() {
      this.applyBindings();
    }
  });

  return Gonrin.ModelView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    collectionName: "kqkiemtranuocsach",
    uiControl: {
      fields: [{
          field: "thoigiankiemtra",
          textFormat: "DD/MM/YYYY",
          extraFormats: ["DDMMYYYY"],
          maxDate,
        },
        {
          field: "hosotheodoi",
          uicontrol: false,
          itemView: HoSoTheoDoi,
          tools: [{
            name: "create",
            type: "button",
            buttonClass: "btn btn-success btn-sm",
            label: "<span class='fa fa-plus'>Thêm</span>",
            command: "create"
          }, ],
          toolEl: "#addItem"
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
      var id = this.getApp().getRouter().getParam("id");
      if (id) {
        this.model.set('id', id);
        this.model.fetch({
          success: function(data) {
            self.applyBindings();
            self.renderTinhTongI();
            self.registerTinhTong();
            console.log("success");
            if (self.model.get("hosotheodoi").length === 0) {
              self.$el.find("#addItem button").click();
            }
          },
          error: function() {
            self.getApp().notify("Get data Eror");
          },
        });
      } else {
        self.applyBindings();
        self.model.set("hosotheodoi", []);
        self.renderTinhTongI();
        self.registerTinhTong();
        self.$el.find("#addItem button").click();

      }

    },
    registerTinhTong: function() {
      var self = this;
      self.model.on("change:hosotheodoi", function() {
        //console.log("hosotheodoi ", self.model.get('hosotheodoi'));
        self.renderTinhTongI();

      });


    },
    renderTinhTongI: function() {
      var self = this;
      if (!self.tongViewi) {
        self.tongViewi = new TongViewI({
          el: self.$el.find("#tongcongi")
        });
        self.tongViewi.render();
      }

      var data = Gonrin.getDefaultModel(tongischema);
      for (var j = 0; j < self.model.get('hosotheodoi').length; j++) {
        var chitiet = self.model.get('hosotheodoi')[j];
        _.each(tongischema, function(props, key) {
          data[key] = toInt(data[key]) + toInt(self.model.get('hosotheodoi')[j][key]);

          //data[key] = !data[key] ? self.model.get('hosotheodoi')[j][key] : self.model.get('hosotheodoi')[j][key] + data[key];

        });
      }

      //console.log("data : ", data);
      // self.tongViewi.model.set(data);
      // self.tongViewi.applyBindings();
      // var sohongheo = self.tongViewi.model.get("hongheo");
      // self.model.set("sohongheo", sohongheo);
      //
      // var dantoc333 = self.tongViewi.model.get("dantoc");
      // self.model.set("sohodtts", dantoc333);
      //
      // var soNu = self.tongViewi.model.get("gioitinh");
      // self.model.set("chuholanu", soNu);
      //
      // var tongSoDan = self.model.get("hosotheodoi").length;
      // self.model.set("hotrongthon", tongSoDan);
      //
      // var tongSoDan = self.model.get("hosotheodoi").length;
      // self.model.set("hotrongthon", tongSoDan);

      // var sonam = self.tongViewi.model.get("gioitinh");
      // var sonu = tongSoDan - sonam;
      // self.model.set("chuholanu", sonu);
    },

  });

});
