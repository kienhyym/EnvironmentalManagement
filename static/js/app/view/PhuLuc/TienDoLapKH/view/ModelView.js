    define(function (require) {
    	"use strict";
    	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');
    	var template = require('text!app/view/PhuLuc/TienDoLapKH/tpl/model.html'), 
    	schema = require('json!schema/TienDoLapKHSchema.json');
    	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
    	var currentDate = new Date();
    	return Gonrin.ItemView.extend({
    			template: template,
    			modelSchema: schema,
    			urlPrefix: "/api/v1/",
    			collectionName: "tiendolapkh",	
    			uiControl: {
    				fields: [{
    						field: "ngaypheduyet",
    						textFormat: 'DD-MM-YYYY',
    						extraFormats: ['DDMMYYYY'],
    						maxDate: currentDate,
    					},
    					{
    						field: "ngaytinhpheduyet",
    						textFormat: 'DD-MM-YYYY',
    						extraFormats: ['DDMMYYYY'],
    						maxDate: currentDate,
    					},
    					{
    						field: "tentinh",
    						uicontrol: "ref",
    						textField: "ten",
    						//chuyen sang thanh object
    						foreignRemoteField: "id",
    						foreignField: "tentinh_id",
    						dataSource: TinhThanhSelectView
    					},
    					{
    						field: "tiendo",
    						uicontrol: "combobox",
    						textField: "text",
    						valueField: "value",
    						dataSource: [{
    								"value": "chualap",
    								"text": "Chưa lập kế hoạch"
    							},
    							{
    								"value": "danglap",
    								"text": "Đang lập kế hoạch"
    							},
    							{
    								"value": "dalap",
    								"text": "Đã lập kế hoạch"
    							},
    						],
    					},
    					{
    						field: "vihema",
    						uicontrol: "combobox",
    						textField: "text",
    						valueField: "value",
    						dataSource: [{
    								"value": "chuars",
    								"text": "Chưa rà soát"
    							},
    							{
    								"value": "dangrs",
    								"text": "Đang rà soát"
    							},
    							{
    								"value": "dachapthuan",
    								"text": "Đã chấp thuận"
    							},
    						],
    					},
    					{
    						field: "khpheduyet",
    						uicontrol: "combobox",
    						textField: "text",
    						valueField: "value",
    						dataSource: [{
    								"value": "chua",
    								"text": "Chưa"
    							},
    							{
    								"value": "roi",
    								"text": "Rồi"
    							},
    						],
    					},
    				]
    			},
    			render: function () {
    				var self = this;
    					self.applyBindings();
    			},
    		});
    });