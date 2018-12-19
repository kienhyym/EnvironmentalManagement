define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/PhuLuc/ThongTinThon/tpl/model.html'), 
	schema = require('json!schema/ThongTinThonSchema.json');
    var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
    var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
    var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
    var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');


	var maxDate = new Date();
	return Gonrin.ItemView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			bindings:"data-thon-bind",
			collectionName: "thongtinthon",										
			uiControl:{
        		fields:[
            		{
        				field:"tentinh",
        				uicontrol:"ref",
        				textField: "ten",
        				foreignRemoteField: "id",
        				foreignField: "tentinh_id",
        				dataSource: TinhThanhSelectView
        			},
        			
        			{
        				field:"tenhuyen",
        				uicontrol:"ref",
        				textField: "ten",
        				foreignRemoteField: "id",
        				foreignField: "tenhuyen_id",
        				dataSource: QuanHuyenSelectView
        			},
        			
        			{
        				field:"tenxa",
        				uicontrol:"ref",
        				textField: "ten",
        				foreignRemoteField: "id",
        				foreignField: "tenxa_id",
        				dataSource: XaPhuongSelectView
        			},
        			
        			{
        				field:"tenthon",
        				uicontrol:"ref",
        				textField: "ten",
        				foreignRemoteField: "id",
        				foreignField: "tenthon_id",
        				dataSource: ThonXomSelectView
        			},
            	]
        	},
			render: function () {
				var self = this;
					self.applyBindings();
			},
		});

});