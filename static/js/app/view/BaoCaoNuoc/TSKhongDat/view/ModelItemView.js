define(function(require) {
  "use strict";
  var $ = require('jquery'),
    _ = require('underscore'),
    Gonrin = require('gonrin');

  var template = require('text!app/view/BaoCaoNuoc/TSKhongDat/tpl/itemView.html'),
    schema = require('json!schema/TSKhongDatSchema.json');
  //var DanTocSelectView = require('app/view/DanhMuc/DanToc/view/SelectView');


  var currentDate = new Date();
  return Gonrin.ItemView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    tagName: 'tr',
    collectionName: "tskhongdat",
    bindings: "bind-item2-data",
    uiControl: {
      fields: [

      ],
    },
    render: function() {
      var self = this;
      // this.setElement(this.el.innerHTML)
      self.$el.find("#itemRemove").unbind("click").bind("click", function() {
        self.remove(true);
      });
      self.applyBindings();
    },
  });

});
