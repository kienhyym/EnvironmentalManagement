define(function (require) {
	"use strict";
	var $ = require('jquery'), _ = require('underscore'), Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoPhuLuc5/BCKetQuaKiemTra/tpl/model.html'),
	schema = require('json!schema/BCKetQuaKiemTraSchema.json');
	
	var KQNhanLucThamGiaKTView = require('app/view/BaoCaoPhuLuc5/KQNhanLucThamGiaKT/view/ModelDialogView');
	var KQNhanLucThamGiaKTDacTaView = require('app/view/BaoCaoPhuLuc5/KQNhanLucThamGiaKTDacTa/view/ModelDialogView');

	
	
	
	var curenDate = new Date();
	return Gonrin.ModelView
		.extend({
			template: template,
			modelSchema: schema,
			urlPrefix: "/api/v1/",
			collectionName: "bcketquakiemtra",

			uiControl: {
				fields: [
					{
						field:"ngaybaocao",
						textFormat:"DD/MM/YYYY",
						extraFormats:["DDMMYYYY"],
						maxDate:curenDate,
						},					
						{
		    				field: "kqnhanlucthamgiakt",
		    				uicontrol: "grid",
		    				refresh: true,
		    				primaryField: "id",
		    				fields:[
		    				          {field:"stt", label:"STT"},
		                	          {field:"hovate", label:"Họ và tên"},
		                	          {field:"congiecthuchien", label: "Công việc thực hiện"},
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
	                	    			 var view = new KQNhanLucThamGiaKTView({"viewData":{"id":null,"baocao_id":self.model.get("id")}});
	        	                		 view.dialog();
	        	                		 view.on('close',function(data){
	        	                			 var kqnhanlucthamgiakt = self.model.get('kqnhanlucthamgiakt');
	        	                			 kqnhanlucthamgiakt.push(data);
	        	                			 self.model.set("kqnhanlucthamgiakt",kqnhanlucthamgiakt);
	        	                			 self.applyBindings();
	        	                		 });
	        	                	 }
	        	                 }
	          	                 ],
		                	onRowClick: function(event){
		                		var self= this;
	            	    		if(event.rowId){
	            	    			 var view = new KQNhanLucThamGiaKTView({"viewData":{"id":event.rowId,"baocao_id":self.model.get("id")}});
	    	                		 view.dialog();
	    	                		 view.on('close',function(data){
	    	                			 var str = self.model.get('kqnhanlucthamgiakt');
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
		    				field: "kqnhanlucthamgiaktdacta",
		    				uicontrol: "grid",
		    				refresh: true,
		    				primaryField: "id",
		    				fields:[
		    				          {field:"stt", label:"STT"},
		                	          {field:"loi", label:"Lỗi"},
		                	          {field:"mota", label: "Mô tả"},
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
	                	    			 var view = new KQNhanLucThamGiaKTDacTaView({"viewData":{"id":null,"baocao_id":self.model.get("id")}});
	        	                		 view.dialog();
	        	                		 view.on('close',function(data){
	        	                			 var str = self.model.get('kqnhanlucthamgiaktdacta');        	                			
	        	                			 for(var i=0;str<=i;++i){
	        	                				if(str[i] == data.id){
	        	                					str.slipce(i,str);
	        	                				}
	        	                			 }
	        	                			 str.push(data);  
	        	                			 		   			 
	        	                			 self.model.set("kqnhanlucthamgiaktdacta",str);
	        	                			 self.applyBindings();
	        	                		 });
	        	                	 }
	        	                 }
	          	                 ],
		                	onRowClick: function(event){
		                		var self= this;
	            	    		if(event.rowId){
	            	    			 var view = new KQNhanLucThamGiaKTDacTaView({"viewData":{"id":event.rowId,"baocao_id":self.model.get("id")}});
	    	                		 view.dialog();
	    	                		 view.on('close',function(data){
	    	                			 var str = self.model.get('kqnhanlucthamgiaktdacta');
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
							self.model.save(null,
									{
										success: function (model, respose,options) {	
											self.getApp().notify("Lưu thông tin thành công");
											self.getApp().getRouter().navigate(
											self.collectionName+ "/collection");

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
							return this.getApp().getRouter().getParam("id") !== null;
						},
						command: function(){
		    	    		var self = this;
		                    self.model.destroy({
		                        success: function(model, response) {
		                        	self.getApp().notify('Xoá dữ liệu thành công');
		                        	self.trigger("delete",self.model.toJSON());
		                        	self.close();
		                        	self.applyBindings();			                        		                        	
		                        },
		                        error: function (model, xhr, options) {
		                            self.getApp().notify('Xoá dữ liệu không thành công!');
		                            
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
