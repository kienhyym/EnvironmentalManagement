define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/tpl/DanhMuc/QuanHuyen/collection.html'),
        schema = require('json!schema/QuanHuyenSchema.json');
    var CustomFilterView    = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "quanhuyen",
        bindings:"data-quanhuyen-bind",
        tools : [
//    	    {
//    	    	name: "defaultgr",
//    	    	type: "group",
//    	    	groupClass: "toolbar-group",
//    	    	buttons: [
//					{
//		    	    	name: "back",
//		    	    	type: "button",
//		    	    	buttonClass: "btn-default btn-sm",
//		    	    	label: "TRANSLATE:BACK",
//		    	    	command: function(){
//		    	    		var self = this;
//		    	    		Backbone.history.history.back();
//		    	    	}
//		    	    },
//    	    	]
//    	    },
    	],
        uiControl: {
            fields: [
                {
					field: "stt",
					label: "STT"
				},
                { field: "ma", label: "Mã"},
                { field: "ten", label: "Tên"},
                {
                    field: "tinhthanh_id",
                    label: "Tỉnh thành",
                    foreign: "tinhthanh",
                    foreignValueField: "id",
                    foreignTextField: "ten"
                },

            ],
            pagination: {
            	page: 1,
            	pageSize: 100
            },
            noResultsClass:"alert alert-default no-records-found",
            onRowClick: function (event) {
                if (event.rowId) {
                    var path = this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }
            }
        },
        render: function () {
        	var self = this;
        	var currentUser = this.getApp().currentUser;
            if (currentUser!==null && currentUser!== undefined && this.getApp().data("tinhthanh_id") !== null &&  currentUser.donvi.tuyendonvi_id>=2 && currentUser.donvi.tuyendonvi_id!==10) {
                this.uiControl.filters = { "tinhthanh_id": { "$eq": this.getApp().data("tinhthanh_id") } };
            }
            self.uiControl.orderBy = [{"field": "ten", "direction": "asc"}];

            var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: self.collectionName +"_filter"
			});
			filter.render();

			if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var query = { "$or": [
                    {"ten": {"$likeI": text }},
                ]};
                if (this.getApp().data("tinhthanh_id") !== null) {
                    var filters = {"$and": [
                        {"tinhthanh_id": {"$eq": this.getApp().data("tinhthanh_id")}},
                        query
                    ]};
                } else {
                    var filters = query;
                }
				self.uiControl.filters = filters;
				self.uiControl.orderBy = [{"field": "ten", "direction": "asc"}];
    		}
			this.applyBindings();

			filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var query = { "$or": [
                            {"ten": {"$likeI": text }},
                        ]};
                        if (this.getApp().data("tinhthanh_id") !== null) {
                            var filters = {"$and": [
                                {"tinhthanh_id": {"$eq": this.getApp().data("tinhthanh_id")}},
                                query
                            ]};
                        } else {
                            var filters = query;
                        }
						$col.data('gonrin').filter(filters);
						//self.uiControl.filters = filters;
					} else {
						self.uiControl.filters = null;
					}
				}
				self.applyBindings();
    		});
			return this;
        }
    });
});