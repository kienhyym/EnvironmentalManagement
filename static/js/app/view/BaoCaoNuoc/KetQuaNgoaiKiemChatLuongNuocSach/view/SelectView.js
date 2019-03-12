define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/tpl/collection.html'),
		schema = require('json!schema/KetQuaNgoaiKiemChatLuongNuocSachSchema.json');
	var CustomFilterView = require('app/bases/views/CustomFilterView');

	return Gonrin.CollectionDialogView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "ketqua_ngoaikiem_chatluong_nuocsach",
		textField: "tendonvicapnuoc",
		tools: [
			{
				name: "defaultgr",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "select",
						type: "button",
						buttonClass: "btn btn-success",
						label: "TRANSLATE:SELECT",
						command: function () {
							var self = this;
							self.trigger("onSelected");
							self.close();
						}
					},
				]
			},
		],
		render: function () {
			var self = this;
			var filter = new CustomFilterView({
				el: self.$el.find("#grid_search"),
				sessionKey: "Ketqua_ngoaikiem_chatluong_nuocsach_filter"
			});
			filter.render();

			if (!filter.isEmptyFilter()) {
				var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
				var filters = {
					"$or": [
						{ "tendonvicapnuoc": { "$likeI": text } },
						{ "madonvicapnuoc": { "$likeI": text } },
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
							"$or": [
								{ "tendonvicapnuoc": { "$likeI": text } },
								{ "madonvicapnuoc": { "$likeI": text } },
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