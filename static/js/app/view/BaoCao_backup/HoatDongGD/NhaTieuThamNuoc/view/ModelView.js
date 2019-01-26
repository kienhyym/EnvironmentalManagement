define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/HoatDongGD/NhaTieuThamNuoc/tpl/model.html'),
	schema = require('json!schema/NhaTieuThamNuocSchema.json');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var DanTocSelectView = require('app/view/DanhMuc/DanToc/view/SelectView');
	
	var curenDate = new Date();
	return Gonrin.ModelView.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "nhatieuthamnuoc",

			uiControl: {
				 fields: [
					 {
							field: "gioitinh",
							uicontrol: "combobox",
							textField: "text",
							valueField: "value",
							dataSource: [{
									"value": 0,
									"text": "Nam"
								},
								{
									"value": 1,
									"text": "Nữ"
								},
							],
						},
						 {
							field: "hongheo",
							uicontrol: "combobox",
							textField: "text",
							valueField: "value",
							dataSource: [{
									"value": 1,
									"text": "Thuộc diện hộ nghèo"
								},
								{
									"value": 0,
									"text": "Không thuộc diện hộ nghèo"
								},
							],
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
							field: "tenthon",
							uicontrol: "ref",
							textField: "ten",
							foreignRemoteField: "id",
							foreignField: "tenthon_id",
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
							field: "dantoc",
							uicontrol: "ref",
							textField: "ten",
							foreignRemoteField: "id",
							foreignField: "dantoc_id",
							dataSource: DanTocSelectView
						},
						
				 	],
			},
						
			tools: [
				{
				name: "defaultgr",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
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
							self.model.save(null,
									{
										success: function (model, respose,options) {	
											self.getApp().notify("Lưu thông tin thành công");
											self.getApp().getRouter().navigate(
											self.collectionName+ "/collection");

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
						visible: function () {
							return this.getApp().getRouter().getParam("id") !== null;
						},
						command: function(){
		    	    		var self = this;
		                    self.model.destroy({
		                        success: function(model, response) {
		                        	self.getApp().notify('Xoá dữ liệu thành công');
		                        	self.getApp().getRouter().navigate(self.collectionName+ "/collection");		                        		                        	
		                        },
		                        error: function (model, xhr, options) {
		                            self.getApp().notify('Xoá dữ liệu không thành công!');
		                            
		                        }
		                    });
		    	    	}
					},
				],
			}
		],

			render: function () {
				var self = this;
				var id = this.getApp().getRouter().getParam("id");
				if (id) {
					this.model.set('id', id);
					this.model.fetch({
						success: function (data) {
							self.applyBindings();
						},
						error: function () {
							self.getApp().notify("Get data Eror");
						},
					});
				} else {
					self.applyBindings();
				}

			},
		});

});
