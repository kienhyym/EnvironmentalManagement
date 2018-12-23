define(function(require) {
  "use strict";
  var $ = require('jquery'),
    _ = require('underscore'),
    Gonrin = require('gonrin');

  var template = require('text!app/view/BaoCaoNuoc/HoSoTheoDoi/tpl/itemView.html'),
    schema = require('json!schema/HoSoTheoDoiSchema.json');
  //var DanTocSelectView = require('app/view/DanhMuc/DanToc/view/SelectView');


  var currentDate = new Date();
  return Gonrin.ItemView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    tagName: 'tr',
    collectionName: "hosotheodoi",
    bindings: "bind-item-data",
    uiControl: {
      fields: [

        // {
        // 	field: "haingan",
        // 	uicontrol: "checkbox",
        // 	checkedField: "haingan",
        // 	valueField: "value",
        // 	dataSource: [{
        // 			"value": 1,
        // 			"haingan": true
        //
        // 		},
        // 		{
        // 			"value": 0,
        // 			"haingan": false
        // 		},
        // 	],
        // },
        //
        {
          field: "bpkhacphuc",
          uicontrol: "combobox",
          textField: "text",
          valueField: "value",
          dataSource: [{
              "value": 0,
              "text": "Không"
            },
            {
              "value": 1,
              "text": "Có"
            },
          ],
        },
        {
          field: "ttbaocao",
          uicontrol: "combobox",
          textField: "text",
          valueField: "value",
          dataSource: [{
              "value": 0,
              "text": "Không"
            },
            {
              "value": 1,
              "text": "Có"
            },
          ],
        },
        {
          field: "tsthuchien",
          uicontrol: "combobox",
          textField: "text",
          valueField: "value",
          dataSource: [{
              "value": 0,
              "text": "Không"
            },
            {
              "value": 1,
              "text": "Có"
            },
          ],
        },
		{
          field: "slmau",
          uicontrol: "combobox",
          textField: "text",
          valueField: "value",
          dataSource: [{
              "value": 0,
              "text": "Không"
            },
            {
              "value": 1,
              "text": "Có"
            },
          ],
        },
		{
          field: "kdaydu",
          uicontrol: "combobox",
          textField: "text",
          valueField: "value",
          dataSource: [{
              "value": 0,
              "text": "Không"
            },
            {
              "value": 1,
              "text": "Có"
            },
          ],
        },
		{
          field: "hsdaydu",
          uicontrol: "combobox",
          textField: "text",
          valueField: "value",
          dataSource: [{
              "value": 0,
              "text": "Không"
            },
            {
              "value": 1,
              "text": "Có"
            },
          ],
        },
		{
          field: "laphoso",
          uicontrol: "combobox",
          textField: "text",
          valueField: "value",
          dataSource: [{
              "value": 0,
              "text": "Không"
            },
            {
              "value": 1,
              "text": "Có"
            },
          ],
        },

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
