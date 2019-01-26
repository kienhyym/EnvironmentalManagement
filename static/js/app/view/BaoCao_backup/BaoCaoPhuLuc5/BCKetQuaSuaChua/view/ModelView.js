define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoPhuLuc5/BCKetQuaSuaChua/tpl/model.html'),
	schema = require('json!schema/BCKetQuaSuaChuaSchema.json');
	var NhanLucSuaChuaView = require('app/view/BaoCaoPhuLuc5/NhanLucSuaChua/view/ModelDialogView');
	var KetQuaSuaChuaDuLieuView = require('app/view/BaoCaoPhuLuc5/KetQuaSuaChuaDuLieu/view/ModelDialogView');
	var KetQuaSuaChuaView = require('app/view/BaoCaoPhuLuc5/KetQuaSuaChua/view/ModelDialogView');
	
	
	
	var curenDate = new Date();
	return Gonrin.ModelView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "bcketquasuachua",

			uiControl: {
				fields: [
					{
						field:"ngaybaocao",
						textFormat:"DD/MM/YYYY",
						extraFormats:["DDMMYYYY"],
						maxDate:curenDate,
						},					
						{
		    				field: "nhanlucsuachua",
		    				uicontrol: "grid",
		    				refresh: true,
		    				primaryField: "id",
		    				fields:[
		    				          {field:"stt", label:"STT"},
		                	          {field:"hovaten", label:"Họ và tên"},
		                	          {field:"congviecthuchien", label: "Công việc thực hiện"},
		                	          {
		                     	    	 field: "command", 
		                     	    	 label:"Command",
		                     	    	 width:"50px", 
		                     	    	 command: [
//		                     	    	     {"label":"Delete",
//		                     	    	        	"action": "delete",
//		                     	    	        	"class": "btn-sm",
//		                     	    	     },
		                     	    	     {
		                     	    	       "label":"Delete",
		                        	    	        "action": function(params, args){
		                        	    	        	$("#grid").data('gonrin').deleteRow(params.el);
		                        	    	        },
		                        	    	        "class": "btn-danger btn-sm"
		                        	    	     },   
		                     	    	 ],
		                     	   	 },
		                	        ],
		                	        
		                	tools:[
	        	                 {
	        	                	 name: "create",
	        	                	 buttonClass:"btn-success",
	        	                	 label: "Thêm",
	        	                	 command: function(){
	        	                		 var self = this;
	                	    			 var view = new NhanLucSuaChuaView({"viewData":{"id":null,"baocao_id":self.model.get("id")}});
	        	                		 view.dialog();
	        	                		 view.on('close',function(data){
	        	                			 var nhanlucsuachua = self.model.get('nhanlucsuachua');
	        	                			 nhanlucsuachua.push(data);
	        	                			 self.model.set("nhanlucsuachua",nhanlucsuachua);
	        	                			 self.applyBindings();
	        	                		 });
	        	                	 }
	        	                 }
	          	                 ],
		                	onRowClick: function(event){
		                		var self= this;
	            	    		if(event.rowId){
	            	    			 var view = new NhanLucSuaChuaView({"viewData":{"id":event.rowId,"baocao_id":self.model.get("id")}});
	    	                		 view.dialog();
	    	                		 view.on('close',function(data){
	    	                			 var str = self.model.get('nhanlucsuachua');
	    	                			    for(var i=0 ;i<str.length;i++){
	    	                			    	if(str[i].id == data.id){	    	                			    
		    	                					str.splice(i,1);	    	              	  	    	                			 
		    	                				 }		    	                			    	 
	    	                			    } 	   
	    	                			    str.push(data);  
		  	    	                		self.applyBindings();                				  	    	                			
        	                		 });	
	            	        	}
	            	    	}
		    			},
		    			//1---->
		    			{
		    				field: "ketquasuachua",
		    				uicontrol: "grid",
		    				refresh: true,
		    				primaryField: "id",
		    				fields:[
		    				          {field:"tt", label:"TT"},
		                	          {field:"loi", label:"Lỗi"},
		                	          {field:"dasua", label: "Sửa"},
		                	          {field:"chuasua", label: "Không sửa"},
		                	          {field:"thoigian", label: "Thời gian"},
		                	          {field:"ghichu", label: "Ghi chú"},
		                	          {
		                     	    	 field: "command", 
		                     	    	 label:"Command",
		                     	    	 width:"50px", 
		                     	    	 command: [
//		                     	    	     {"label":"Delete",
//		                     	    	        	"action": "delete",
//		                     	    	        	"class": "btn-sm",
//		                     	    	     },
		                     	    	     {
		                     	    	       "label":"Delete",
		                        	    	        "action": function(params, args){
		                        	    	        	$("#grid").data('gonrin').deleteRow(params.el);
		                        	    	        },
		                        	    	        "class": "btn-danger btn-sm"
		                        	    	     },   
		                     	    	 ],
		                     	   	 },
		                	        ],
		                	        
		                	tools:[
	        	                 {
	        	                	 name: "create",
	        	                	 buttonClass:"btn-success",
	        	                	 label: "Thêm",
	        	                	 command: function(){
	        	                		 var self = this;
	                	    			 var view = new KetQuaSuaChuaView({"viewData":{"id":null,"baocao_id":self.model.get("id")}});
	        	                		 view.dialog();
	        	                		 view.on('close',function(data){
	        	                			 var ketquasuachua = self.model.get('ketquasuachua');
	        	                			 ketquasuachua.push(data);
	        	                			 self.model.set("ketquasuachua",ketquasuachua);
	        	                			 self.applyBindings();
	        	                		 });
	        	                	 }
	        	                 }
	          	                 ],
		                	onRowClick: function(event){
		                		var self= this;
	            	    		if(event.rowId){
	            	    			 var view = new KetQuaSuaChuaView({"viewData":{"id":event.rowId,"baocao_id":self.model.get("id")}});
	    	                		 view.dialog();
	            	        	}
	            	    	}
		    			},
		    			//1---->
		    			{
		    				field: "ketquasuachuadulieu",
		    				uicontrol: "grid",
		    				refresh: true,
		    				primaryField: "id",
		    				fields:[
		    					 {field:"tt", label:"TT"},
	                	          {field:"loi", label:"Lỗi"},
	                	          {field:"dasua", label: "Sửa"},
	                	          {field:"chuasua", label: "Không sửa"},
	                	          {field:"thoigian", label: "Thời gian"},
	                	          {field:"ghichu", label: "Ghi chú"},
		                	          {
		                     	    	 field: "command", 
		                     	    	 label:"Command",
		                     	    	 width:"50px", 
		                     	    	 command: [
//		                     	    	     {"label":"Delete",
//		                     	    	        	"action": "delete",
//		                     	    	        	"class": "btn-sm",
//		                     	    	     },
		                     	    	     {
		                     	    	       "label":"Delete",
		                        	    	        "action": function(params, args){
		                        	    	        	$("#grid").data('gonrin').deleteRow(params.el);
		                        	    	        },
		                        	    	        "class": "btn-danger btn-sm"
		                        	    	     },   
		                     	    	 ],
		                     	   	 },
		                	        ],
		                	        
		                	tools:[
	        	                 {
	        	                	 name: "create",
	        	                	 buttonClass:"btn-success",
	        	                	 label: "Thêm",
	        	                	 command: function(){
	        	                		 var self = this;
	                	    			 var view = new KetQuaSuaChuaDuLieuView({"viewData":{"id":null,"baocao_id":self.model.get("id")}});
	        	                		 view.dialog();
	        	                		 view.on('close',function(data){
	        	                			 var ketquasuachuadulieu = self.model.get('ketquasuachuadulieu');
	        	                			 ketquasuachuadulieu.push(data);
	        	                			 self.model.set("ketquasuachuadulieu",ketquasuachuadulieu);
	        	                			 self.applyBindings();
	        	                		 });
	        	                	 }
	        	                 }
	          	                 ],
		                	onRowClick: function(event){
		                		var self= this;
	            	    		if(event.rowId){
	            	    			 var view = new KetQuaSuaChuaDuLieuView({"viewData":{"id":event.rowId,"baocao_id":self.model.get("id")}});
	    	                		 view.dialog();
	    	                		 view.on('close',function(data){
	    	                			 var str = self.model.get('ketquasuachuadulieu');
	    	                			    for(var i=0 ;i<str.length;i++){
	    	                			    	if(str[i].id == data.id){	    	                			    
		    	                					str.splice(i,1);	    	              	  	    	                			 
		    	                				 }		    	                			    	 
	    	                			    } 	   
	    	                			    str.push(data);  
		  	    	                		self.applyBindings();                				  	    	                			
        	                		 });	
	            	        	}
	            	    	}
		    			},
		    			
		    			
		    			
				],
			},

			tools: [{
				name: "defaultgr",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "back",
						type: "button",
						buttonClass: "btn-default btn-sm",
						label: "TRANSLATE:BACK",
						command: function () {
							var self = this;

							Backbone.history.history.back();
						}
					},
					{
						name: "save",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "TRANSLATE:SAVE",
						command: function () {
							var self = this;						                				                			 
							self.model.save(null,{
										success: function (model, respose,options) {self.getApp().notify("Lưu thông tin thành công");
											self.getApp().getRouter().navigate(self.collectionName+ "/collection");
										},
										error: function (xhr, status, error) {
											try {
												self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
											}
											catch (err) {
												self.getApp().notify({ message: "Lưu thông tin không thành công"}, { type: "danger", delay: 1000 });
											}
										}
									});
						}
					},
					{
						name: "delete",
						type: "button",
						buttonClass: "btn-danger btn-sm",
						label: "TRANSLATE:DELETE",
						visible: function () {
							return this.getApp().getRouter().getParam(
								"id") !== null;
						},
						command: function () {
							var self = this;
							self.model
								.destroy({
									success: function (model,response) {self.getApp().notify('Xoá dữ liệu thành công');
										self.getApp().getRouter().navigate(self.collectionName+ "/collection");
									},
									error: function (model, xhr,options) {self.getApp().notify(
												'Xoá dữ liệu không thành công!');
									}
								});
						}
					},],
			}],

			render: function () {
				var self = this;
				var id = this.getApp().getRouter().getParam("id");
				if (id) {
					this.model.set('id', id);
					this.model.fetch({
						success: function (data) {
							self.applyBindings();
						},
						error: function () {
							self.getApp().notify("Get data Eror");
						},
					});
				} else {
					self.applyBindings();
				}

			},
		});

});
