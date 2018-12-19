define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/PhuLuc/NhaTieuThonHVS/tpl/itemView.html'),
	schema 				    = require('json!schema/NhaTieuThonHVSSchema.json');
    
	var currentDate = new Date();
    return Gonrin.ItemView.extend({
    	template : template,
    	modelSchema	: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		collectionName: "nhatieuthonhvs",
		bindings:"bind-item-data",
		// uiControl: {
		// 	fields: [
		// 		{
		// 			field: "gioitinh",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Nam" },
		// 				{ "value": 2, "text": "Nữ" },
		// 				{ "value": 3, "text": "Khác" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "hongheo",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "tuhoai",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "thamdoi",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "haingan",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "thamdoi",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// applyBindings				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "coongthong",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "kconhatieu",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "hopvs",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "khopvs",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
				
		// 		{
		// 			field: "caithien",
		// 			uicontrol: "combobox",
		// 			textField: "text",
		// 			valueField: "value",
		// 			dataSource: [
		// 				{ "value": 1, "text": "Có" },
		// 				{ "value": 0, "text": "Không" },
		// 			],
		// 		},
		// 	]
		// },
    	 		        		        	
    	render:function(){
			var self = this; 	
			
			self.$el.find("#itemRemove").unbind("click").bind("click", function () {
				self.remove(true);
	 		 });
			// var el = $stt.text();
			// console.log("el : "+el);		
    		self.applyBindings();
    		
    	},
    });

});