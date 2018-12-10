define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/Vesinhgiadinh/VienChuyenNganhKhuVuc/tpl/model.html'),
	schema = require('json!schema/VienChuyenNganhKhuVucSchema.json');
		
	var KQKTVSChungHo500ng = require('app/view/Vesinhgiadinh/KQKTVSChungHo500ng/view/ModelView'); 
	var KQKTVSChungHo500ngKDat = require('app/view/Vesinhgiadinh/KQKTVSChungHo500ngKDat/view/ModelView'); 
	var TongHopKQKTVSChungHo500ng = require('app/view/Vesinhgiadinh/TongHopKQKTVSChungHo500ng/view/ModelView'); 
	
	var curenDate = new Date();
	return Gonrin.ModelView.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "vienchuyennganhkhuvuc",

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
			        	field:"kqktvschungho500ng",
			        	uicontrol:false,
			        	itemView:KQKTVSChungHo500ng
			        },
			        {
			        	field:"kqktvschungho500ngkdat",
			        	uicontrol:false,
			        	itemView:KQKTVSChungHo500ngKDat
			        },
			        {
			        	field:"tonghopkqktvschungho500ng",
			        	uicontrol:false,
			        	itemView:TongHopKQKTVSChungHo500ng
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
				var KQKTVSChungHo500ngV = new KQKTVSChungHo500ng();
				var KQKTVSChungHo500ngKDatV = new KQKTVSChungHo500ngKDat();
				var TongHopKQKTVSChungHo500ngV = new TongHopKQKTVSChungHo500ng();
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
