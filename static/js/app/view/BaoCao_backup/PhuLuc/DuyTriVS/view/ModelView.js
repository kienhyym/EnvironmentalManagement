define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/DuyTriVS/tpl/model.html'),
	schema = require('json!schema/DuyTriVSSchema.json');
	var TinhThanhSelectView   = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	
	var currentDate = new Date();
	return Gonrin.ModelView.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "duytrivs",
			uiControl:{
	    		fields:[
	    			{
						field: "namdatvstx",
						textFormat: "YYYY",
						extraFormats: ["YYYY"],
						maxDate: currentDate,
					},
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
						foreignField: "tinhthanh",
						dataSource: TinhThanhSelectView
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
//				var ThongTinThonView = new ThongTinThon();
//				var NhaTieuThonHVSView = new NhaTieuThonHVS();
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
