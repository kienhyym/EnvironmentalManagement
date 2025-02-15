define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/HoatDongBCC/LapKHXa/tpl/collection.html'),
		schema = require('json!schema/TienDoKeHoachBCCSchema.json');
	var CustomFilterView = require('app/bases/views/CustomFilterView');

	return Gonrin.CollectionDialogView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tiendo_kehoach_bcc",
		tools: [{
			name: "defaultgr",
			type: "group",
			groupClass: "toolbar-group",
			buttons: [{
				name: "select",
				type: "button",
				buttonClass: "btn-success btn-sm",
				label: "TRANSLATE:SELECT",
				command: function () {
					var self = this;
					self.trigger("onSelected");
					self.close();
				}
			}, ]
		}, ],

		render: function () {
			var self = this;
			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: "tiendo_kehoach_bcc_filter"
			});
			filter.render();

			if (!filter.isEmptyFilter()) {
				var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
				var filters = {
					"$or": [{
							"id": {
								"$likeI": text
							}
						},
						{
							"nganh": {
								"$likeI": text
							}
						},
					]
				};
				self.uiControl.filters = filters;
			}
			self.applyBindings();

			filter.on('filterChanged', function (evt) {
				var $col = self.getCollectionElement();
				var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null) {
						var filters = {
							"$or": [{
									"id": {
										"$likeI": text
									}
								},
								{
									"nganh": {
										"$likeI": text
									}
								},
							]
						};
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