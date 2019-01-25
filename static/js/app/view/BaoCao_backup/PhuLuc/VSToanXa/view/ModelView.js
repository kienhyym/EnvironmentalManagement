define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/VSToanXa/tpl/model.html'),
	schema = require('json!schema/VSToanXaSchema.json');
	var TinhThanhSelectView   = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	
//	var tongitemplate = require('text!app/view/PhuLuc/VSToanXa/tpl/tongcongi.html');
		
//	var TongViewI = Gonrin.ModelView.extend({
//		template: tongitemplate,
//		modelSchema: tongischema,
//		bindings: 'tongi-bind',
//		urlPrefix: "/api/v1/",
//		collectionName: "tong",
//		uiControl: [],
//		render: function () {
//			this.applyBindings();
//		}
//	});
	
	var currentDate = new Date();
	return Gonrin.ModelView.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "vstoanxa",
			uiControl:{
	    		fields:[
					{
						field: "tinhthanh",
						uicontrol: "ref",
						textField: "ten",
						foreignRemoteField: "id",
						foreignField: "tinhthanh_id",
						dataSource: TinhThanhSelectView
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
						field: "xaphuong",
						uicontrol: "ref",
						textField: "ten",
						foreignRemoteField: "id",
						foreignField: "xaphuong_id",
						dataSource: XaPhuongSelectView
					},
	        	]
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
						name: "calculator",
						type: "button",
						buttonClass: "btn-primary btn-sm",
						label: "Cộng dồn",
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
							self.getApp().notify("Lấy dữ liệu lỗi");
						},
					});
				} else {
					self.applyBindings();
				}

			},
		});

});
