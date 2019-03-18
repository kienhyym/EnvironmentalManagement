define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/tpl/HeThong/User/collection.html'),
		schema = require('json!schema/UserSchema.json');
	var CustomFilterView = require('app/bases/views/CustomFilterView');


	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "user",
		uiControl: {
			fields: [
				{ field: "fullname", label: "Tên" },
				{ field: "phone", label: "Điện thoại" },
				{ field: "email", label: "Email" },
				{ field: "active", label: "Kích hoạt" },
				{ field: "roles", label: "Vai trò", textField: "name" },

			],
			onRowClick: function (event) {
				if (event.rowId) {
					var path = this.collectionName + '/model?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
				}
			}
		},
		render: function () {
			var self = this;

			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: self.collectionName +"_filter"
			});
			// $("#search_input").attr("placeholder", "Nhập số điện thoại...");
			filter.render();
			this.applyBindings();

			filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var filters = { "$or": [
							{"phone": {"$likeI": text }},
							{"email": {"$likeI": text }},
							{"fullname": {"$likeI": text }},
						]};
						$col.data('gonrin').filter(filters);
						//self.uiControl.filters = filters;
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