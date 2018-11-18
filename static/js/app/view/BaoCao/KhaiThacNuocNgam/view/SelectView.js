define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/BaoCao/KhaiThacNuocNgam/tpl/collection.html'),
    	schema 				= require('json!schema/KhaiThacNuocSongSchema.json');
    var CustomFilterView      = require('app/bases/views/CustomFilterView');

    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "khaithacnuocngam",
    	textField: "tenphieu",
    	tools : [
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
		    	    	command: function(){
		    	    		var self = this;
		    	    		self.trigger("onSelected");
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	// uiControl : {
		// 	fields : [
		// 	// {
		// 	// field:"ngaybanhanhthongtu",
		// 	// textFormat:"DD/MM/YYYY",
		// 	// extraFormats:["DDMMYYYY"],
		// 	// maxDate: currentDate,
		// 	// },

		// 	{
		// 		field : "phamvi",
		// 		uicontrol : "radio",
		// 		textField : "text",
		// 		valueField : "value",
		// 		cssClassField : "cssClass",
		// 		dataSource : [ {
		// 			value : 0,
		// 			text : "Có"
		// 		}, {
		// 			value : 1,
		// 			text : "Không",
		// 			cssClass : "yeallow"
		// 		}, ],
		// 	}, {
		// 		field : "bienbao",
		// 		uicontrol : "radio",
		// 		textField : "text",
		// 		valueField : "value",
		// 		cssClassField : "cssClass",
		// 		dataSource : [ {
		// 			value : 0,
		// 			text : "Có"
		// 		}, {
		// 			value : 1,
		// 			text : "Không",
		// 			cssClass : "yeallow"
		// 		}, ],
		// 	}, {
		// 		field : "vatnuoi",
		// 		uicontrol : "radio",
		// 		textField : "text",
		// 		valueField : "value",
		// 		cssClassField : "cssClass",
		// 		dataSource : [ {
		// 			value : 0,
		// 			text : "Có"
		// 		}, {
		// 			value : 1,
		// 			text : "Không",
		// 			cssClass : "yeallow"
		// 		}, ],
		// 	}, {
		// 		field : "nuoitrongthuysan",
		// 		uicontrol : "radio",
		// 		textField : "text",
		// 		valueField : "value",
		// 		cssClassField : "cssClass",
		// 		dataSource : [ {
		// 			value : 0,
		// 			text : "Có"
		// 		}, {
		// 			value : 1,
		// 			text : "Không",
		// 			cssClass : "yeallow"
		// 		}, ],
		// 	}, {
		// 		field : "khaithactainguyen",
		// 		uicontrol : "radio",
		// 		textField : "text",
		// 		valueField : "value",
		// 		cssClassField : "cssClass",
		// 		dataSource : [ {
		// 			value : 0,
		// 			text : "Có"
		// 		}, {
		// 			value : 1,
		// 			text : "Không",
		// 			cssClass : "yeallow"
		// 		}, ],
		// 	}, {
		// 		field : "nguoisinhhoat",
		// 		uicontrol : "radio",
		// 		textField : "text",
		// 		valueField : "value",
		// 		cssClassField : "cssClass",
		// 		dataSource : [ {
		// 			value : 0,
		// 			text : "Có"
		// 		}, {
		// 			value : 1,
		// 			text : "Không",
		// 			cssClass : "yeallow"
		// 		}, ],
		// 	}, {
		// 		field : "duongongkenhmuong",
		// 		uicontrol : "radio",
		// 		textField : "text",
		// 		valueField : "value",
		// 		cssClassField : "cssClass",
		// 		dataSource : [ {
		// 			value : 0,
		// 			text : "Có"
		// 		}, {
		// 			value : 1,
		// 			text : "Không",
		// 			cssClass : "yeallow"
		// 		}, ],
		// 	},

		// 	{
		// 		field : "chanrac",
		// 		uicontrol : "radio",
		// 		textField : "text",
		// 		valueField : "value",
		// 		cssClassField : "cssClass",
		// 		dataSource : [ {
		// 			value : 0,
		// 			text : "Có"
		// 		}, {
		// 			value : 1,
		// 			text : "Không",
		// 			cssClass : "yeallow"
		// 		}, ],
		// 	}, {
		// 		field : "bendoneodau",
		// 		uicontrol : "radio",
		// 		textField : "text",
		// 		valueField : "value",
		// 		cssClassField : "cssClass",
		// 		dataSource : [ {
		// 			value : 0,
		// 			text : "Có"
		// 		}, {
		// 			value : 1,
		// 			text : "Không",
		// 			cssClass : "yeallow"
		// 		}, ],
		// 	}, {
		// 		field : "duonguongkenhmuong",
		// 		uicontrol : "radio",
		// 		textField : "text",
		// 		valueField : "value",
		// 		cssClassField : "cssClass",
		// 		dataSource : [ {
		// 			value : 0,
		// 			text : "Có"
		// 		}, {
		// 			value : 1,
		// 			text : "Không",
		// 			cssClass : "yeallow"
		// 		}, ],
		// 	}, {
		// 		field : "congtrinhxaydung",
		// 		uicontrol : "radio",
		// 		textField : "text",
		// 		valueField : "value",
		// 		cssClassField : "cssClass",
		// 		dataSource : [ {
		// 			value : 0,
		// 			text : "Có"
		// 		}, {
		// 			value : 1,
		// 			text : "Không",
		// 			cssClass : "yeallow"
		// 		}, ],
		// 	},

		// 	],
		// },
    	render:function(){
    		var self= this;
    		var filter = new CustomFilterView({
    			el: self.$el.find("#grid_search"),
    			sessionKey: "Khaithacnuocngam_filter"
    		});
    		filter.render();
    		
    		if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var filters = { "$or": [
					{"loaiphieu": {"$like": text }},
					{"tenphieu": {"$like": text }},
				] };
    			self.uiControl.filters = filters;
    		}
    		self.applyBindings();
    		
    		filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var filters = { "$or": [
							{"loaiphieu": {"$like": text }},
							{"tenphieu": {"$like": text }},
						] };
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