define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/VeSinh/DuyetVeSinhToanXa/tpl/collection.html'),
		schema 				= require('json!schema/DuyetVeSinhToanXaSchema.json');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "duyet_vesinh_toanxa",
    	uiControl:{
    		fields: [
    			{
					field: "tinhthanh_id",
					label: "Tỉnh",
					foreign: "tinhthanh",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "quanhuyen_id",
					label: "Huyện",
					foreign: "quanhuyen",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
				{
					field: "xaphuong_id",
					label: "Xã",
					foreign: "xaphuong",
					foreignValueField: "id",
					foreignTextField: "ten",
				},
	    	     { field: "nam_datvesinh_toanxa", label: "Năm đạt VSXT"},
	    	     { field: "nam_datvesinh_toanxa_benvung", label: "Năm đạt VSTX bền vững"},
		     ],
		     pagination: {
	            	page: 1,
	            	pageSize: 100
	            },
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    	
		    }
    	},
	    render:function(){
			var self = this;
			if (this.getApp().currentUser.donvi.tuyendonvi_id === 2){
				self.uiControl.filters = {"$and":[{"donvi_id":{"$eq": self.getApp().currentUser.donvi_id}}]};
				self.uiControl.orderBy = [{"field": "nam_datvesinh_toanxa", "direction": "asc"}];
			} else {
				self.uiControl.orderBy = [{"field": "nam_datvesinh_toanxa", "direction": "asc"}];
			}
			this.applyBindings();
			
			self.$el.find("#filterBtn").attr({ "style": "margin-top: 26px;" });
			self.$el.find("#clear").attr({ "style": "margin-top: 26px;" });
			var filter_xa = self.$el.find("#filter_xa");
			filter_xa.find("input").ref({
				textField: "ten",
				valueField: "id",
				dataSource: XaPhuongSelectView,
			});

			var filterBtn = self.$el.find("#filterBtn");
			filterBtn.unbind("click").bind("click", function () {
				var filter_nam = self.$el.find("#filter_nam").val().trim();
				const isNumeric = /^\d+$/;
				var filter_xa_data = self.$el.find("#filter_xa_data").val();
				var $col = self.getCollectionElement();
				if (!filter_nam && !filter_xa_data){
					self.getApp().notify({ message: "Mời bạn nhập thông tin cần tìm kiếm vào bộ lọc!" }, { type: "danger" });
					return;
				} else if (!filter_xa_data && filter_nam){
					if (isNumeric.test(filter_nam) === false){
						self.getApp().notify({ message: "Năm không hợp lệ, vui lòng kiểm tra lại!" }, { type: "danger" });
						return;
					}
					var filters = {
						"$and": [
							{
								"nam_datvesinh_toanxa": {
									"$eq": filter_nam
								}
							},
							{
								"donvi_id": {
									"$eq": self.getApp().currentUser.donvi_id
								}
							}
						]
					}
					$col.data('gonrin').filter(filters);
				} else if (filter_xa_data && !filter_nam){
					var filters = {
						"$and": [
							{
								"xaphuong_id": {
									"$eq": filter_xa_data
								}
							},
							{
								"donvi_id": {
									"$eq": self.getApp().currentUser.donvi_id
								}
							}
						]
					}
					$col.data('gonrin').filter(filters);
				} else if (filter_nam && filter_xa_data){
					var filters = {
						"$and": [
							{
								"nam_datvesinh_toanxa": {
									"$eq": filter_nam
								}
							},
							{
								"xaphuong_id": {
									"$eq": filter_xa_data
								}
							},
							{
								"donvi_id": {
									"$eq": self.getApp().currentUser.donvi_id
								}
							}
						]
					}
					$col.data('gonrin').filter(filters);
				}
			});
			self.$el.find("#clear").unbind("click").bind("click", function () {
				var $col = self.getCollectionElement();
				self.$el.find("#filter_nam").val("");
				self.$el.find("#filter_xa input").data('gonrin').setValue(null);
				var filters = {"$and":[{"donvi_id":{"$eq": self.getApp().currentUser.donvi_id}}]};
				$col.data('gonrin').filter(filters);
			});
			self.applyBindings();
			return this;
    	},
    });

});