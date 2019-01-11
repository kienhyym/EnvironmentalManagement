define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/CapThon/NhaTieuThonHVS/tpl/itemView.html'),
		schema = require('json!app/view/VeSinh/CapThon/NhaTieuThonHVS/view/NhaTieuThonHVSSchema.json');
	var DanTocSelectView = require('app/view/DanhMuc/DanToc/view/SelectView');


	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		collectionName: "vscapthon",
		bindings: "bind-item-data",
		uiControl: {
			fields: [
//				{
//					field: "dantoc",
//					uicontrol: "ref",
//					textField: "ten",
//					foreignRemoteField: "id",
//					foreignField: "dantoc_id",
//					dataSource: DanTocSelectView
//				},
//				{
//					field: "gioitinh",
//					uicontrol: "combobox",
//					textField: "text",
//					valueField: "value",
//					dataSource: [{
//							"value": 0,
//							"text": "Nam"
//						},
//						{
//							"value": 1,
//							"text": "Nữ"
//						},
//					],
//				},
				{
					field: "loaikhac",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"text": "Dùng chung"
						},
						{
							"value": 2,
							"text": "Một ngăn"
						},
						{
							"value": 3,
							"text": " Chìm không OTH"
						},
						{
							"value": 0,
							"text": "Không có"
						}
					],
				},
				{
					field: "hongheo",
					uicontrol: "checkbox",
					checkedField: "hongheo",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"hongheo": true
						},
						{
							"value": 0,
							"hongheo": false
						},
					],
				},
				{
					field: "tuhoai",
					uicontrol: "checkbox",
					checkedField: "tuhoai",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"tuhoai": true
						},
						{
							"value": 0,
							"tuhoai": false
						},
					],
				},

				{
					field: "thamdoi",
					uicontrol: "checkbox",
					checkedField: "thamdoi",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"thamdoi": true
						},
						{
							"value": 0,
							"thamdoi": false
						},
					],
				},

				{
					field: "haingan",
					uicontrol: "checkbox",
					checkedField: "haingan",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"haingan": true

						},
						{
							"value": 0,
							"haingan": false
						},
					],
				},

				{
					field: "thamdoi",
					uicontrol: "checkbox",
					checkedField: "thamdoi",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"thamdoi": true
						},
						{
							"value": 0,
							"thamdoi": false
						},
					],
				},

				{
					field: "chimco_oth",
					uicontrol: "checkbox",
					checkedField: "chimco_oth",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"chimco_oth": true
						},
						{
							"value": 0,
							"chimco_oth": false
						},
					],
				},

				{
					field: "khongconhatieu",
					uicontrol: "checkbox",
					checkedField: "khongconhatieu",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"khongconhatieu": true
						},
						{
							"value": 0,
							"khongconhatieu": false
						},
					],
				},

				{
					field: "hopvesinh",
					uicontrol: "checkbox",
					checkedField: "hopvesinh",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"hopvesinh": true
						},
						{
							"value": 0,
							"hopvesinh": false
						},
					],
				},

				{
					field: "khonghopvesinh",
					uicontrol: "checkbox",
					checkedField: "khonghopvesinh",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"khonghopvesinh": true
						},
						{
							"value": 0,
							"khonghopvesinh": false
						},
					],
				},

				{
					field: "caithien",
					uicontrol: "checkbox",
					checkedField: "caithien",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"caithien": true
						},
						{
							"value": 0,
							"caithien": false
						},
					],
				},
				{
					field: "diemruataycoxaphong",
					uicontrol: "checkbox",
					checkedField: "diemruataycoxaphong",
					valueField: "value",
					dataSource: [{
							"value": 1,
							"diemruataycoxaphong": true
						},
						{
							"value": 0,
							"diemruataycoxaphong": false
						},
					],
				},
				
			]
		},
		render: function () {
			var self = this;
			var gioitinh = self.model.get("gioitinh");
			if(gioitinh===0 || gioitinh === "0"){
				self.$el.find("#gioitinh").html("Nữ");
			}else{
				self.$el.find("#gioitinh").html("Nam");
			}
			self.model.on("change:dantoc",function(){
				self.model.set("tendantoc",self.model.get("dantoc").ten);
			});
			self.model.on("change:hopvesinh",function(){
				if(self.model.get("hopvesinh")===1){
					self.model.set("khonghopvesinh",0);
				}else{
					self.model.set("khonghopvesinh",1);
				}			
			});
			self.model.on("change:khonghopvesinh",function(){
				if(self.model.get("khonghopvesinh")===1){
					self.model.set("hopvesinh",0);
				}else{
					self.model.set("hopvesinh",1);
				}			
			});
			self.model.on("change", function () {
				
				self.trigger("change", {
					"oldData": self.model.previousAttributes(),
					"data": self.model.toJSON()
				});
			});
			if (self.viewData && self.viewData.chuongtrinhsup === 0){
				self.$el.find(".chuongtrinhsup").hide();
				
			} else{
				self.$el.find(".chuongtrinhsup").show();
			}
//			self.$el.find("#itemRemove").unbind("click").bind("click", function () {
//				self.remove(true);
//			});
			self.applyBindings();
		},
	});

});