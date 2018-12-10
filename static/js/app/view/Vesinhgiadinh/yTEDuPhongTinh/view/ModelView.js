define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/Vesinhgiadinh/yTEDuPhongTinh/tpl/model.html'),
	schema = require('json!schema/yTEDuPhongTinhSchema.json');
		
	var TramCapNuoc500ng = require('app/view/Vesinhgiadinh/TramCapNuoc500ng/view/ModelView'); 
	var XetNghiemNuoc500ng = require('app/view/Vesinhgiadinh/XetNghiemNuoc500ng/view/ModelView'); 
	var VSNhaTieuGD = require('app/view/Vesinhgiadinh/VSNhaTieuGD/view/ModelView'); 
	
	var curenDate = new Date();
	return Gonrin.ModelView.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "yteduphongtinh",

			uiControl: {
				fields: [
					{
						field:"ngaybanhanhthongtu",
						textFormat:"DD/MM/YYYY",
						extraFormats:["DDMMYYYY"],
						maxDate:curenDate,
					},
					{
						field:"ngaynaocao",
						textFormat:"DD/MM/YYYY",
						extraFormats:["DDMMYYYY"],
						maxDate:curenDate,
					},
					{
			        	field:"tramcapnuoc500ng",
			        	uicontrol:false,
			        	itemView:TramCapNuoc500ng
			        },
			        {
			        	field:"xetnghiemnuoc500ng",
			        	uicontrol:false,
			        	itemView:XetNghiemNuoc500ng
			        },
			        {
			        	field:"vsnhatieugd",
			        	uicontrol:false,
			        	itemView:VSNhaTieuGD
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
										error: function (model,xhr, options) {
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
				var TramCapNuoc500ngView = new TramCapNuoc500ng();
				var XetNghiemNuoc500ngView = new XetNghiemNuoc500ng();
				var VSNhaTieuGDView = new VSNhaTieuGD();
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
