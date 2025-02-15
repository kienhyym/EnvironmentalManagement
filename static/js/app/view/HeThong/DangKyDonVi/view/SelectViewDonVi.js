define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/tpl/HeThong/DonVi/collection.html'),
		schema = require('json!schema/DonViSchema.json');

	var TuyenDonViSelectView = require('app/view/DanhMuc/TuyenDonVi/view/SelectView');
	var CustomFilterView    = require('app/bases/views/CustomFilterView');

	return Gonrin.CollectionDialogView.extend({

		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "donvi",
		textField: "ten",
		//    	valueField: "id",
		uiControl: {
			fields: [


				{
					field: "ten",
					label: "Tên cấp trên"
				},



			],
			onRowClick: function (event) {
				this.uiControl.selectedItems = event.selectedItems;
			},
		},
		render: function () {
			var self = this;

			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: self.collectionName +"_filter"
			});
			filter.render();
			self.uiControl.orderBy = [{"field": "ten", "direction": "asc"}];

			if(!filter.isEmptyFilter()) {
				var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
				var default_filter = self.uiControl.filters;
				var filters = {"ten": {"$likeI": text }};
				if (default_filter !==null  && default_filter!== ""){
    				filters = { "$and": [
    					filters,
    					default_filter
    				]};
    			}
    			self.uiControl.filters = filters;
    		}
			self.applyBindings();

			filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var default_filter = self.uiControl.filters;
						var filters = {"ten": {"$likeI": text }};
						if (default_filter !==null  && default_filter!== ""){
		    				filters = { "$and": [
		    					filters,
		    					default_filter
		    				]};
		    			}
						$col.data('gonrin').filter(filters);
						//self.uiControl.filters = filters;
					} else {
						// self.uiControl.filters = null;
					}
				}
				self.applyBindings();
			});
			return this;
		},

	});

});