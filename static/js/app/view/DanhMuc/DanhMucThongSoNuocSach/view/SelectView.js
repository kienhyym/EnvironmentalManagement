define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/view/tpl/DanhMuc/DanhMucThongSoNuocSach/collection.html'),
    	schema 				= require('json!schema/DanhMucThongSoNuocSachSchema.json');
    var CustomFilterView      = require('app/bases/views/CustomFilterView');

    var template = `<div class="panel panel-default">
					<div class="panel-heading">
						<h3>Danh sách các thông số</h3>
					</div>
					<div style="padding:15px 10px;">
						<div class="row">
							<div class="col-md-7">
								<button id="select_item" type="button" class="btn btn-success">Chọn</button>
							</div>
							<div class="col-md-5">
								<div class="form-group text-right" id="grid_search">
								</div>
							</div>
						</div>
						<div id="grid" data-thongsobaocaochatluongnuoc-bind='collection:$collection'></div>
					</div>
				</div>`;
    return Gonrin.DialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "danhmuc_thongso_nuocsach",
		bindings:"data-thongsobaocaochatluongnuoc-bind",
    	render:function(){
    		var self= this;
    		var viewData = self.viewData;
    		var filter = new CustomFilterView({
    			el: self.$el.find("#grid_search"),
    			sessionKey: "ThongSoNuoc_filter"
    		});
    		filter.render();
    		self.$el.find("#select_item").unbind("click").bind('click', function(){
	    		var selectedItems = self.$el.find('#grid').data('gonrin').selectedRows("get_ids");
	    		if (selectedItems && selectedItems.length>0) { 
					var get_data_onSelected = selectedItems[0];
					delete get_data_onSelected.stt;   			    	    			
					self.trigger("ThongSo_onSelected", get_data_onSelected);
	    			self.getApp().trigger("ThongSo_onSelected", get_data_onSelected);
	    		}
	    		self.close();
    		});
    		self.$el.find("#grid").grid({
            	showSortingIndicator: true,
            	orderByMode: "client",
            	dataSource: viewData,
//            	tools : [
//    	    	    {
//    	    	    	name: "defaultgr",
//    	    	    	type: "group",
//    	    	    	groupClass: "toolbar-group",
//    	    	    	buttons: [
//    						{
//    			    	    	name: "select",
//    			    	    	type: "button",
//    			    	    	buttonClass: "btn-success btn-sm",
//    			    	    	label: "Chọn",
//    			    	    	command: function(){
//    			    	    		var self = this;
//    			    	    		var selectedItems = self.$el.find('#grid').data('gonrin').selectedItems;
//    			    	    		if (selectedItems && selectedItems.length) { 
//										var get_data_onSelected = selectedItems[0];
//										delete get_data_onSelected.stt;   			    	    			
//										self.trigger("ThongSo_onSelected", get_data_onSelected);
//    			    	    			self.getApp().trigger("ThongSo_onSelected", get_data_onSelected);
//    			    	    		}
//    			    	    		self.close();
//    			    	    	}
//    			    	    },
//    			    	    ]
//    	    	    	},
//		    	    	],
		    		fields: [
		    			 { 
		 	    	    	field: "id",label:"Mã Thông Số",
		 	    	     },
		 	    	     { field: "tenthongso", label: "Tên Thông số"},
						  { field: "gioihan_toida", label: "Giới hạn tối đa"},
						  { field: "gioihan_toithieu", label: "Giới hạn tối thiểu"}
				    ],
				    primaryField:"id",
                    selectionMode: "single",
				    noResultsClass:"alert alert-default no-records-found",
				    onRowClick: function(event){
//			    		var selectedItems = event.selectedItems;
//			    		console.log(selectedItems);
			    	},
    		});
    		
    		filter.on('filterChanged', function(evt) {
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
    			self.$el.find("#grid").data('gonrin').filter({
            		tenthongso: {$likeI: text}
                });
			});
			self.$el.find("#tbl_container_grid table").attr({"style": "table-layout: fixed"});
    		return this;
    	},
    	
    });

});