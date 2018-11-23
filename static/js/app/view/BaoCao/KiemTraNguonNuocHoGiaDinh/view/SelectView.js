define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCao/KiemTraNguonNuocHoGiaDinh/tpl/collection.html'),
		schema = require('json!schema/KiemTraNguonNuocHoGiaDinhSchema.json');
	var CustomFilterView = require('app/bases/views/CustomFilterView');

	return Gonrin.CollectionDialogView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "kiemtranguonnuochogiadinh",
		//textField: "ten",
		uiControl:{
    		fields: [
//	    	     { 
//	    	    	field: "id",label:"ID",width:150,readonly: true, 
//	    	     },
//	    	     { field: "ma", label: "Mã", width:200},
//		     	 { field: "ten", label: "Tên", width:250 },
//		     	{
//   	        	 field: "xaphuong_id", 
//   	        	 label: "Xã Phường",
//   	        	 foreign: "xaphuong",
//   	        	 foreignValueField: "id",
//   	        	 foreignTextField: "ten",
//   	        	 width:250
//   	         },
//				{ field: "xaphuong", visible:false },
//				{
//   	        	 field: "thonxom_id", 
//   	        	 label: "Thôn Xóm",
//   	        	 foreign: "thonxom",
//   	        	 foreignValueField: "id",
//   	        	 foreignTextField: "ten",
//   	        	 width:250
//   	         },
//   	         { field: "thonxom", visible:false },
//		    ],
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    	},
		},
		
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
				sessionKey: "Khaithacnuocngam_filter"
			});
			filter.render();

			if (!filter.isEmptyFilter()) {
				var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
				var filters = {
					"$or": [
						{ "loaiphieu": { "$like": text } },
						{ "tenphieu": { "$like": text } },
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
								{ "loaiphieu": { "$like": text } },
								{ "tenphieu": { "$like": text } },
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