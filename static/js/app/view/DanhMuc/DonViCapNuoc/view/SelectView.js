define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
		var template 		= require('text!app/view/DanhMuc/DonViCapNuoc/tpl/collection.html'),
    	schema 				= require('json!schema/DonViCapNuocSchema.json');
    var CustomFilterView    = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "donvicapnuoc",
    	bindings:"data-donvicapnuoc-bind",
		bindingBlocks: 'block-donvicapnuoc-bind',
    	tools : [
    	    {
    	    	name: "defaultgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [
					{
		    	    	name: "select",
		    	    	type: "button",
		    	    	buttonClass: "btn-success btn-sm",
		    	    	label: "TRANSLATE:SELECT",
		    	    	command: function(){
		    	    		var self = this;
		    	    		if (this.uiControl.selectedItems && this.uiControl.selectedItems.length) { 
								var get_data_onSelected = this.uiControl.selectedItems[0];
								delete get_data_onSelected.stt;   			    	    			
		    	    			self.getApp().trigger("DonViCapNuoc_onSelected", get_data_onSelected);
		    	    			self.trigger("onSelected", get_data_onSelected);
		    	    		}
		    	    		self.destroy();
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
				{
					field: "stt",
					label: "STT"
				},
				{
					field: "ten",
					label: "Tên Đơn Vị"
				},
				{
					field: "congsuat",
					label: "Công suất"
				},
				{
					field: "tongso_hogiadinh",
					label: "Tổng số HGĐ"
				},
				{
					field: "diachi",
					label: "Địa Chỉ"
				},
		    ],
		    noResultsClass:"alert alert-default no-records-found",
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    	},
    	},
    	render:function(){
    		var self= this;
    		var currentUser = this.getApp().currentUser;
    		var filter = new CustomFilterView({
    			el: self.$el.find("#grid_search"),
    			sessionKey: "DonViCapNuoc_filter"
    		});
    		filter.render();

    		//data: {"q": JSON.stringify({"filters": filters, "order_by":[{"field": "thoigian", "direction": "desc"}], "limit":1})},
    		if (currentUser.donvi.tuyendonvi_id ===2){
    			this.uiControl.filters = {"$and":[
					{"quanhuyen_id": {"$eq": this.getApp().data("quanhuyen_id")}}, 
					{"$or":[
						{"tongso_hogiadinh":{"$gte":500}},
						{"$and":[
								{"tongso_hogiadinh":{"$eq":0}},
								{"congsuat":{"$gte":1000}}
								]
						}
						]
					},
					{"trangthai":{"$eq":1}}
					]};
				self.uiControl.orderBy = [{"field": "quanhuyen_id", "direction": "desc"},{"field": "congsuat", "direction": "desc"}];

			} else if (currentUser.donvi.tuyendonvi_id ===3){
				this.uiControl.filters = {"$and":[
					{"quanhuyen_id": {"$eq": this.getApp().data("quanhuyen_id")}}, 
					{"$or":[
						{"$and":[
							{"tongso_hogiadinh":{"$gte":0}},
							{"tongso_hogiadinh":{"$lt":500}}
							]
						},
						{"$and":[
								{"tongso_hogiadinh":{"$eq":0}},
								{"congsuat":{"$lt":1000}}
								]
						}
						]
					},
					{"trangthai":{"$eq":1}}
					]};
				self.uiControl.orderBy = [{"field": "congsuat", "direction": "desc"}];
    		} else {
    			self.uiControl.filters = {"trangthai":{"$eq":1}};
				self.uiControl.orderBy = [{"field": "congsuat", "direction": "desc"}];
    		}
//			if(!filter.isEmptyFilter()) {
//				var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
//				var query = {"$or":[
//					{"ma": {"$likeI": text }},
//					{"diachi": {"$likeI": text }},
//						{"ten": {"$likeI": text }},
//					]};
//				var filters = {"trangthai":{"$eq":1}};
//				if (currentUser.donvi.tuyendonvi_id === 2){
//					filters = {"$and":[
//							{"tinhthanh_id": {"$eq": currentUser.donvi.tinhthanh_id}}, 
//							{"$or":[
//								{"$and":[
//									{"tongso_hogiadinh":{"$ne":null}},
//									{"tongso_hogiadinh":{"$gte":500}}
//									]
//								},
//								{"$and":[
//									{"$or":[
//										{"tongso_hogiadinh":{"$eq":null}},
//										{"tongso_hogiadinh":{"$eq":0}}
//										]
//									},
//									{"congsuat":{"$gte":1000}}
//									]
//								}
//								]
//							},
//							{"trangthai":{"$eq":1}},
//							query
//							]};
//				} else if (currentUser.donvi.tuyendonvi_id ===3){
////					 filters = {"$and": [
////						{"quanhuyen_id": {"$eq": currentUser.donvi.quanhuyen_id}},
////						{"tongso_hogiadinh":{"$lt":500}}
////						{"congsuat":{"$lt":1000}},
////						{"trangthai":{"$eq":1}},
////						query
////					]};
//					 filters = {"$and":[
//							{"quanhuyen_id": {"$eq": currentUser.donvi.quanhuyen_id}}, 
//							{"$or":[
//								{"$and":[
//									{"tongso_hogiadinh":{"$ne":null}},
//									{"tongso_hogiadinh":{"$lt":500}}
//									]
//								},
//								{"$and":[
//									{"$or":[
//										{"tongso_hogiadinh":{"$eq":null}},
//										{"tongso_hogiadinh":{"$eq":0}}
//										]
//									},
//									{"congsuat":{"$lt":1000}}
//									]
//								}
//								]
//							},
//							{"trangthai":{"$eq":1}},
//							query
//							]};
//					 
//				}
//				self.uiControl.filters = filters;
//				self.uiControl.orderBy = [{"field": "congsuat", "direction": "asc"}, {"field": "tinhthanh_id", "direction": "asc"}, {"field": "quanhuyen_id", "direction": "asc"}];
//			}else{
//				if (currentUser.donvi.tuyendonvi_id ===2){
//					this.uiControl.filters = {"$and":[{"tinhthanh_id": {"$eq": currentUser.donvi.tinhthanh_id}}, {"$or":[{"tongso_hogiadinh":{"$gte":500}},{"congsuat":{"$gte":1000}}]},{"trangthai":{"$eq":1}}]};
//					self.uiControl.orderBy = [{"field": "quanhuyen_id", "direction": "desc"},{"field": "congsuat", "direction": "desc"}];
//
//				} else if (currentUser.donvi.tuyendonvi_id ===3){
//					this.uiControl.filters = {"$and":[{"quanhuyen_id": {"$eq": currentUser.donvi.quanhuyen_id}}, {"$and":[{"tongso_hogiadinh":{"$lt":500}},{"congsuat":{"$lt":1000}}]},{"trangthai":{"$eq":1}}]};
//					self.uiControl.orderBy = [{"field": "congsuat", "direction": "desc"},{"field": "tongso_hogiadinh", "direction": "desc"}];
//	    		} else {
//	    			self.uiControl.filters = {"trangthai":{"$eq":1}};
//					self.uiControl.orderBy = [{"field": "congsuat", "direction": "desc"},{"field": "tongso_hogiadinh", "direction": "desc"}];
//	    		}
//			}
    		self.applyBindings();
    		
    		filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var query = { "$or": [
		    				{"ma": {"$likeI": text }},
		    				{"diachi": {"$likeI": text }},
							{"ten": {"$likeI": text }},
						]};
						var filters = {"trangthai":{"$eq":1}};
						if (currentUser.donvi.tuyendonvi_id === 2){
							 filters = {"$and": [
								{"tinhthanh_id": {"$eq": currentUser.donvi.tinhthanh_id}},
								{"$or":[
									{"tongso_hogiadinh":{"$gte":500}},
									{"$and":[
											{"tongso_hogiadinh":{"$eq":0}},
											{"congsuat":{"$gte":1000}}
											]
									}
									]
								},
								{"trangthai":{"$eq":1}},
								query
							]};
//							 filters = {"$and":[
//									{"tinhthanh_id": {"$eq": currentUser.donvi.tinhthanh_id}}, 
//									{"$or":[
//										{"$and":[
//											{"tongso_hogiadinh":{"$ne":null}},
//											{"tongso_hogiadinh":{"$gte":500}}
//											]
//										},
//										{"$and":[
//											{"$or":[
//												{"tongso_hogiadinh":{"$eq":null}},
//												{"tongso_hogiadinh":{"$eq":0}}
//												]
//											},
//											{"congsuat":{"$gte":1000}}
//											]
//										}
//										]
//									},
//									{"trangthai":{"$eq":1}},
//									query
//									]};
						} else if (currentUser.donvi.tuyendonvi_id ===3){
							 filters = {"$and": [
								{"quanhuyen_id": {"$eq": currentUser.donvi.quanhuyen_id}},
								{"$or":[
									{"$and":[
										{"tongso_hogiadinh":{"$gte":0}},
										{"tongso_hogiadinh":{"$lt":500}}
										]
									},
									{"$and":[
											{"tongso_hogiadinh":{"$eq":0}},
											{"congsuat":{"$lt":1000}}
											]
									}
									]
								},
								{"trangthai":{"$eq":1}},
								query
							]};
//							 filters = {"$and":[
//									{"quanhuyen_id": {"$eq": currentUser.donvi.quanhuyen_id}}, 
//									{"$or":[
//										{"$and":[
//											{"tongso_hogiadinh":{"$ne":null}},
//											{"tongso_hogiadinh":{"$lt":500}}
//											]
//										},
//										{"$and":[
//											{"$or":[
//												{"tongso_hogiadinh":{"$eq":null}},
//												{"tongso_hogiadinh":{"$eq":0}}
//												]
//											},
//											{"congsuat":{"$lt":1000}}
//											]
//										}
//										]
//									},
//									{"trangthai":{"$eq":1}},
//									query
//									]};
						}
						$col.data('gonrin').filter(filters);
					} else {
		    			self.uiControl.filters = null;
					}
				}
				self.applyBindings();
    		});
    		
    		return this;
    		
    	},
    	
    });

});