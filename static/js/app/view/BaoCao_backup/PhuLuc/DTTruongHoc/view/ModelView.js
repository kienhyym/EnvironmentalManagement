define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/DTTruongHoc/tpl/model.html'),
	schema = require('json!schema/DTTruongHocSchema.json');
		
	var NguocNcCongTrinh = require('app/view/PhuLuc/NguocNcCongTrinh/view/ModelView'); 
	var CapNcTruongTram = require('app/view/PhuLuc/CapNcTruongTram/view/ModelView'); 
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	
	var curenDate = new Date();
	return Gonrin.ModelView.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "dttruonghoc",

			uiControl: {
				fields: [
					{
						field: "xaphuong",
						uicontrol: "ref",
						textField: "ten",
						foreignRemoteField: "id",
						foreignField: "xaphuong_id",
						dataSource: XaPhuongSelectView
					},
					{
						field: "quanhuyen",
						uicontrol: "ref",
						textField: "ten",
						foreignRemoteField: "id",
						foreignField: "quanhuyen_id",
						dataSource: QuanHuyenSelectView
					},
					
					{
						field: "tinhthanh",
						uicontrol: "ref",
						textField: "ten",
						foreignRemoteField: "id",
						foreignField: "tinhthanh_id",
						dataSource: TinhThanhSelectView
					},
					{
						field: "loai_truonghoc_tram",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Trường mẫu giáo",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Trường tiểu học",
							
						},
						{
							value: 3,
							text: "Trường trung học cơ sở",
							
						},
						{
							value: 4,
							text: "Trường trung học phổ thông",
							
						},
						{
							value: 5,
							text: "Trường trung học dạy nghề",
							
						},
						{
							value: 6,
							text: "Trường nội trú",
							
						},
						{
							value: 7,
							text: "Trạm y tế",
							
						},],
					},
					
					{
						field: "loaidiem_truong",
						uicontrol: "radio",
						textField: "text",
						valueField: "value",
//						cssClassField: "cssClass",
						dataSource: [{
							value: 1,
							text: "Điểm trường chính",
//							cssClass: "yeallow"
						}, {
							value: 2,
							text: "Điểm trường phụ",
							
						},],
					},
					
			        {
			        	field:"nguonnccongtrinh",
			        	uicontrol:false,
			        	itemView:NguocNcCongTrinh
			        },
			        {
			        	field:"capnctruongtram",
			        	uicontrol:false,
			        	itemView:CapNcTruongTram
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
											self.getApp().getRouter().navigate(self.collectionName+ "/collection");

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
				var NguocNcCongTrinhView = new NguocNcCongTrinh();
				var CapNcTruongTramView = new CapNcTruongTram();
				var id = this.getApp().getRouter().getParam("id");
				if (id) {
					this.model.set('id', id);
					this.model.fetch({
						success: function (data) {
							self.applyBindings();
						},
						error: function () {
							self.getApp().notify("Lỗi lấy dữ liệu");
						},
					});
				} else {
					self.applyBindings();
				}

			},
		});

});
