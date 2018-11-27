define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoPhuLuc5/BienBanBanGiaoSanPham/tpl/model.html'),
	schema = require('json!schema/BienBanBanGiaoSanPhamSchema.json');
	var CungNhauBanGiaoSanPhamView = require('app/view/BaoCaoPhuLuc5/CungNhauBanGiaoSanPham/view/ModelDialogView');

	var curenDate = new Date();
	return Gonrin.ModelView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "bienbanbangiaosanpham",

			uiControl: {
				fields: [
					{
						field:"ngaytaobienban",
						textFormat:"DD/MM/YYYY",
						extraFormats:["DDMMYYYY"],
						maxDate:curenDate,
						},					
						{
		    				field: "cungnhaubangiaosanpham",
		    				uicontrol: "grid",
		    				refresh: true,
		    				primaryField: "id",
		    				fields:[
		    				          {field:"stt", label:"STT"},
		                	          {field:"dulieu", label:"Dữ liệu"},
		                	          {field:"khuondang", label: "Khuôn dạng"},
		                	          {field:"dvt", label: "Đánh giá"},
		                	          {field:"soluong", label: "Số lượng"},
		                	          {field:"ghichu", label: "Ghi chú"},
		                	          {
		                     	    	 field: "command", 
		                     	    	 label:"Command",
		                     	    	 width:"50px", 
		                     	    	 command: [
//		                     	    	     {"label":"Delete",
//		                     	    	        	"action": "delete",
//		                     	    	        	"class": "btn-sm",
//		                     	    	     },
		                     	    	     {
		                     	    	       "label":"Delete",
		                        	    	        "action": function(params, args){
		                        	    	        	$("#grid").data('gonrin').deleteRow(params.el);
		                        	    	        },
		                        	    	        "class": "btn-danger btn-sm"
		                        	    	     },   
		                     	    	 ],
		                     	   	 },
		                	        ],
		                	        
		                	tools:[
	        	                 {
	        	                	 name: "create",
	        	                	 buttonClass:"btn-success",
	        	                	 label: "Thêm",
	        	                	 command: function(){
	        	                		 var self = this;
	                	    			 var view = new CungNhauBanGiaoSanPhamView({"viewData":{"id":null,"baocao_id":self.model.get("id")}});
	        	                		 view.dialog();
	        	                		 view.on('close',function(data){
	        	                			 var cungnhaubangiaosanpham = self.model.get('cungnhaubangiaosanpham');
	        	                			 cungnhaubangiaosanpham.push(data);
	        	                			 self.model.set("cungnhaubangiaosanpham",cungnhaubangiaosanpham);
	        	                			 self.applyBindings();
	        	                		 });
	        	                	 }
	        	                 }
	          	                 ],
		                	onRowClick: function(event){
		                		var self= this;
	            	    		if(event.rowId){
	            	    			 var view = new CungNhauBanGiaoSanPhamView({"viewData":{"id":event.rowId,"baocao_id":self.model.get("id")}});
	    	                		 view.dialog();
	            	        	}
	            	    	}
		    			},
				],
			},

			tools: [{
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
							self.model
								.save(
									null,
									{
										success: function (
											model, respose,
											options) {
											
											self
												.getApp()
												.notify(
													"Lưu thông tin thành công");
											self
												.getApp()
												.getRouter()
												.navigate(
													self.collectionName
													+ "/collection");

										},
										error: function (model,
											xhr, options) {
											self
												.getApp()
												.notify(
													'Lưu thông tin không thành công!');

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
							return this.getApp().getRouter().getParam(
								"id") !== null;
						},
						command: function () {
							var self = this;
							self.model
								.destroy({
									success: function (model,
										response) {
										self
											.getApp()
											.notify(
												'Xoá dữ liệu thành công');
										self
											.getApp()
											.getRouter()
											.navigate(
												self.collectionName
												+ "/collection");
									},
									error: function (model, xhr,
										options) {
										self
											.getApp()
											.notify(
												'Xoá dữ liệu không thành công!');

									}
								});
						}
					},],
			}],

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
