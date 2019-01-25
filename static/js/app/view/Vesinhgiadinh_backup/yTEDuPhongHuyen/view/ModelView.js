define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/Vesinhgiadinh/yTEDuPhongHuyen/tpl/model.html'),
	schema = require('json!schema/yTEDuPhongHuyenSchema.json');
		
	var KetQuaVSChung = require('app/view/Vesinhgiadinh/KetQuaVSChung/view/ModelView'); 
	var CumDanCuDuoi500ng = require('app/view/Vesinhgiadinh/CumDanCuDuoi500ng/view/ModelView'); 
	var CacBienPhapSuLy500ng = require('app/view/Vesinhgiadinh/CacBienPhapSuLy500ng/view/ModelView'); 
	
	var curenDate = new Date();
	return Gonrin.ModelView.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "yteduphonghuyen",

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
			        	field:"kqvschung",
			        	uicontrol:false,
			        	itemView:KetQuaVSChung
			        },
			        {
			        	field:"cumdancuduoi500ng",
			        	uicontrol:false,
			        	itemView:CumDanCuDuoi500ng
			        },
			        {
			        	field:"cacbienphapsuly500ng",
			        	uicontrol:false,
			        	itemView:CacBienPhapSuLy500ng
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
				var KetQuaVSChungView = new KetQuaVSChung();
				var CumDanCuDuoi500ngView = new CumDanCuDuoi500ng();
				var CacBienPhapSuLy500ngView = new CacBienPhapSuLy500ng();
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
