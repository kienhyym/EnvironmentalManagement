define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCao/PhieuNgoaiKiemChatLuong/tpl/model.html'),
	schema = require('json!schema/PhieuNgoaiKiemChatLuongSchema.json');
	//var modelKQphieungoaikiemtrachatluong = require('app/view/BaoCao/KQPhieuNgoaiKiemChatLuong/view/ModelView')

	var maxDate = new Date();
	return Gonrin.ModelView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "phieungoaikiemchatluong",

			uiControl: {
				fields: [
					// {
        			// 	field:"tenvitri1",
        			// 	uicontrol:"ref",
        			// 	textField: "tenvitri1",
        			// 	foreignRemoteField: "id",
        			// 	foreignField: "kqphieungoaikiemtrachatluong",
        			// 	dataSource: modelKQphieungoaikiemtrachatluong
					// },
					// {
        			// 	field:"tenvitri2",
        			// 	uicontrol:"ref",
        			// 	textField: "tenvitri1",
        			// 	foreignRemoteField: "id",
        			// 	foreignField: "kqphieungoaikiemtrachatluong",
        			// 	dataSource: modelKQphieungoaikiemtrachatluong
					// },
					
					{
					field:"ngaybanhanhthongtu",
					textFormat:"DD/MM/YYYY",
					extraFormats:["DDMMYYYY"],
					maxDate,
					},
					{
					field:"thoigiankiemtra",
					textFormat:"DD/MM/YYYY",
					extraFormats:["DDMMYYYY"],
					maxDate,
					},
					{
					field:"ngaykiemtra",
					textFormat:"DD/MM/YYYY",
					extraFormats:["DDMMYYYY"],
					maxDate,
					},
					{
	    				field: "kqphieungoaikiemtrachatluong",
	    				uicontrol: "grid",
	    				refresh: true,
	    				primaryField: "id",
	    				fields:[
	    				          {field:"vitrilaymau", label:"Vị trí lấy mẫu"},
	                	          {field:"ph", label:"pH"},
	                	          {field:"doduc", label: "Độ đục (NTU)"},
	                	          {field:"danhgia", label: "Đánh giá"},
	                	          {
	                     	    	 field: "command", 
	                     	    	 label:"Command",
	                     	    	 width:"50px", 
	                     	    	 command: [
	                     	    	     {"label":"Delete",
	                     	    	        	"action": "delete",
	                     	    	        	"class": "btn-sm",
	                     	    	     },
//	                     	    	     {
//	                     	    	       "label":"Custom function",
//	                        	    	        "action": function(params, args){
//	                        	    	        	$("#grid").data('gonrin').deleteRow(params.el);
//	                        	    	        },
//	                        	    	        "class": "btn-primary btn-sm"
//	                        	    	     },   
	                     	    	 ],
	                     	   	 },
	                	        ],
	                	tools:[
	                	                 {
	                	                	 name: "create",
	                	                	 buttonClass:"btn-success",
	                	                	 label: "Thêm",
	                	                	 command: function(){
	                	                		 this.addUser();
	                	                	 }
	                	                 }
          	                 ],
	                	onRowClick: function(event){
	                	    		if(event.rowId){
	                	        		var path = 'user/model?id='+ event.rowId;
	                	        		this.getApp().getRouter().navigate(path);
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
