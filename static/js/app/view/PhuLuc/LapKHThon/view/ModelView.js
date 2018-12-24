define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/LapKHThon/tpl/model.html'),
	schema = require('json!schema/LapKHThonSchema.json');
	var TinhThanhSelectView   = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var ItemThonView = require('app/view/PhuLuc/ItemThon/view/ModelItemView');
	
	var currentDate = new Date();
	return Gonrin.ModelView.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "lapkhthon",
			uiControl:{
	    		fields:[
	    			{
						field: "tgpheduyet",
						textFormat:'DD-MM-YYYY',
	                	extraFormats:['DDMMYYYY'],
						maxDate: currentDate,
					},
	        		{
	    				field:"tentinh",
	    				uicontrol:"ref",
	    				textField: "ten",
	    				//chuyen sang thanh object
	    				foreignRemoteField: "id",
	    				foreignField: "tentinh_id",
	    				dataSource: TinhThanhSelectView
	    			},
	    			{
	    				field: "nganh",
	    				uicontrol: "combobox",
	    				textField: "text",
	    				valueField: "value",
	    				dataSource: [
	    					{ "value": "yte", "text": "NGÀNH Y TẾ" },
	    					{ "value": "gd", "text": "NGÀNH GIÁO DỤC" },
						],
	    			},
	    			{
	    				field: "tiendo",
	    				uicontrol: "combobox",
	    				textField: "text",
	    				valueField: "value",
	    				dataSource: [
	    					{ "value": "Chưa lập kế hoạch BCC", "text": "Chưa lập kế hoạch BCC" },
	    					{ "value": "Đang lập kế hoạch", "text": "Đang lập kế hoạch" },
						],
	    			},
	    			{
	    				field: "vihema",
	    				uicontrol: "combobox",
	    				textField: "text",
	    				valueField: "value",
	    				dataSource: [
	    					{ "value": "Chưa rà soát", "text": "Chưa rà soát" },
	    					{ "value": "Đang rà soát", "text": "Đang rà soát" },
	    					{ "value": "Đã chấp thuận", "text": "Đã chấp thuận" },
						],
	    			},
	    			{
	    				field: "khpheduyet",
	    				uicontrol: "combobox",
	    				textField: "text",
	    				valueField: "value",
	    				dataSource: [
	    					{ "value": "Chưa", "text": "Chưa" },
	    					{ "value": "Rồi", "text": "Rồi" },
						],
	    			},
	    			
	    			{
						field: "itemthon",
						uicontrol: false,
						itemView: ItemThonView,
						tools: [{
							name: "create",
							type: "button",
							buttonClass: "btn btn-success btn-sm",
							label: "<span class='fa fa-plus'>Thêm</span>",
							command: "create"
						}, ],
						toolEl: "#addItem"
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
					self.$el.find("#addItem button").click();
				}

			},
		});

});
