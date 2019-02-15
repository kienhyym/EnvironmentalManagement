define(function(require) {
  "use strict";
  var $ = require('jquery'),
    _ = require('underscore'),
    Gonrin = require('gonrin');

  var template = require('text!app/view/BaoCaoNuoc/THKQNoiKiemNuocSach/tpl/model.html'),
    schema = require('json!schema/THKQNoiKiemNuocSachSchema.json');

  var maxDate = new Date();
  
  var HoSoTheoDoi = require('app/view/BaoCaoNuoc/HoSoTheoDoi/view/ModelItemView');
  var TSKhongDat = require('app/view/BaoCaoNuoc/TSKhongDat/view/ModelItemView');
  var LietKeDonVi = require('app/view/BaoCaoNuoc/LietKeDonVi/view/ModelItemView');
  
  var KQNgoaiKiemView = require('app/view/BaoCaoNuoc/KQNgoaiKiem/view/ModelView'); 
  
  var tongischema = require('json!app/view/BaoCaoNuoc/THKQNoiKiemNuocSach/view/TongSchema.json');
  var tongitemplate = require('text!app/view/BaoCaoNuoc/THKQNoiKiemNuocSach/tpl/tongcongi.html');
  
  var currentDate = Date();

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
    collectionName: "thkqnoikiemnuocsach",
    uiControl: {
      fields: [
    	  {
          field: "ngaybanhanh",
          textFormat: "DD/MM/YYYY",
          extraFormats: ["DDMMYYYY"],
          maxDate: currentDate,
        },
        
		{
			field: "quy",
			uicontrol: "combobox",
			textField: "text",
			valueField: "value",
			dataSource: [
				{ "value": 1, "text": "Quý I" },
				{ "value": 2, "text": "Quý II" },
				{ "value": 3, "text": "Quý III" },
				{ "value": 4, "text": "Quý IV" },
			],
		},
        
        
        {
            field: "ngaybc",
            textFormat: "DD/MM/YYYY",
            extraFormats: ["DDMMYYYY"],
            maxDate: currentDate,
          },
	        {
	        	field:"kqngoaikiem",
	        	uicontrol:false,
	        	itemView:KQNgoaiKiemView
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
        {
          field: "lietkedonvi",
          uicontrol: false,
          itemView: LietKeDonVi,
          tools: [{
            name: "create",
            type: "button",
            buttonClass: "btn btn-success btn-sm",
            label: "<span class='fa fa-plus'>Thêm</span>",
            command: "create"
          }, ],
          toolEl: "#addItem3"
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
              error: function (xhr, status, error) {
                try {
                  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
                }
                catch (err) {
                  self.getApp().notify({ message: "Lưu thông tin không thành công"}, { type: "danger", delay: 1000 });
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
      var view_KQNgoaiKiemView = new KQNgoaiKiemView();
      var id = this.getApp().getRouter().getParam("id");
      if (id) {
        this.model.set('id', id);
        this.model.fetch({
          success: function(data) {
            self.applyBindings();
            self.renderTinhTongI();
            self.registerTinhTong();
            // console.log("success");
            if (self.model.get("hosotheodoi").length === 0) {
              self.$el.find("#addItem button").click();
            }
            // if (self.model.get("tskhongdat").length === 0) {
            //   self.$el.find("#addItem2 button").click();
            // }
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
//        self.$el.find("#addItem2 button").click();
        self.$el.find("#addItem3 button").click();

      }

    },
    registerTinhTong: function() {
      var self = this;
      self.model.on("change:hosotheodoi", function() {
        //console.log("hosotheodoi ", self.model.get('hosotheodoi'));
        // console.log("this change event");
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

//          data[key] = !data[key] ? self.model.get('hosotheodoi')[j][key] : self.model.get('hosotheodoi')[j][key] + data[key];

        });
      }

      console.log("data : ", data);
      self.tongViewi.model.set(data);
      self.tongViewi.applyBindings();
      // var sohongheo = self.tongViewi.model.get("hongheo");
      // self.model.set("sohongheo", sohongheo);
      // var sohogd = self.tongViewi.model.get("sohogd");
      // console.log(sohogd);

    },

  });

});
