define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template = require('text!app/view/HeThong/CaiDatBaoCao/tpl/model.html'),
		schema = require('json!schema/BaoCaoTuyenDonViSchema.json');

    var TuyenDonViSelectView = require('app/view/DanhMuc/TuyenDonVi/view/SelectView');
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bctuyendonvi",
    	tools : [
    	         {
    	        	 name: "defaultgr",
    	        	 type: "group",
    	        	 groupClass: "toolbar-group",
    	        	 buttons: [
    	        	           {
    	        	        	   name: "back",
    	        	        	   type: "button",
    	        	        	   buttonClass: "btn-default btn-sm",
    	        	        	   label: "TRANSLATE:BACK",
    	        	        	   command: function(){
    	        	        		   var self = this;
    	        	        		   Backbone.history.history.back();
    	        	        	   }
    	        	           },
    	        	           {
    	        	        	   name: "save",
    	        	        	   type: "button",
    	        	        	   buttonClass: "btn-success btn-sm",
    	        	        	   label: "Lưu Cài Đặt",
    	        	        	   command: function(){
    	        	        		   var self = this;
    	        	        		   var selectedCollectionNames = "";
    	        	        		   $('#content_table input:checked').each(function() {
    	        	        			   selectedCollectionNames+= $(this).attr('id')+",";
    	        	        		   });
    	        	        		   //TODO: set collectionsNam to model
    	        	        		   self.model.set("collectionNames",selectedCollectionNames);

    	        	        		   var tuyendonvi_id = this.getApp().getRouter().getParam("tuyendonvi_id");
    	        	        		   self.model.set("tuyendonvi_id",tuyendonvi_id);

    	        	        		   self.model.save(null,{
    	        	        			   success: function (model, respose, options) {
    	        	        				   self.getApp().notify("Save successfully");
    	        	        				   self.getApp().getRouter().refresh();
    	        	        			   },
    	        	        			   error: function (model, xhr, options) {
    	        	        				   self.getApp().notify($.parseJSON(xhr.responseText).message);

    	        	        			   }
    	        	        		   });
    	        	        	   }
    	        	           }],
    	         }],
    	uiControl: [],
    	renderContentTable: function(arrayCollectionName){
    		var self = this;
    		var html_content = $("#content_table");
			html_content.html("");
			var isCheckedBC1 = "";
			if (arrayCollectionName.indexOf("bckhamchuabenh")>=0){
				isCheckedBC1 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bckhamchuabenh" '+isCheckedBC1+' type="checkbox"></input></td>'+
			        '<td>bckhamchuabenh</td>'+
			        '<td>01: Khám chữa bệnh</td>'+
			      '</tr>');
			var isCheckedBC2 = "";
			if (arrayCollectionName.indexOf("bccocaunhanluc")>=0){
				isCheckedBC2 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bccocaunhanluc" '+isCheckedBC2+' type="checkbox"></input></td>'+
			        '<td>bccocaunhanluc</td>'+
			        '<td>02: Cơ cấu nhân lực</td>'+
			      '</tr>');
			var isCheckedBC3 = "";
			if (arrayCollectionName.indexOf("bccocaunhanluctggiangday")>=0){
				isCheckedBC3 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bccocaunhanluctggiangday" '+isCheckedBC3+' type="checkbox"></input></td>'+
			        '<td>bccocaunhanluctggiangday</td>'+
			        '<td>03: Cơ cấu nhân lực tham gia giảng dạy</td>'+
			      '</tr>');
			var isCheckedBC4 = "";
			if (arrayCollectionName.indexOf("bcdaotaonhanluc")>=0){
				isCheckedBC4 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bcdaotaonhanluc" '+isCheckedBC4+' type="checkbox"></input></td>'+
			        '<td>bcdaotaonhanluc</td>'+
			        '<td>04: Đào tạo nhân lực</td>'+
			      '</tr>');
			
			var isCheckedBC5 = "";
			if (arrayCollectionName.indexOf("bcnghiencuukhoahoc")>=0){
				isCheckedBC5 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bcnghiencuukhoahoc" '+isCheckedBC5+' type="checkbox"></input></td>'+
			        '<td>bcnghiencuukhoahoc</td>'+
			        '<td>05: Nghiên cứu khoa học</td>'+
			      '</tr>');
			var isCheckedBC6 = "";
			if (arrayCollectionName.indexOf("bcquanlyydct")>=0){
				isCheckedBC6 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bcquanlyydct" '+isCheckedBC6+' type="checkbox"></input></td>'+
			        '<td>bcquanlyydct</td>'+
			        '<td>06: Quản lý y dược cổ truyền tại địa phương</td>'+
			      '</tr>');
			var isCheckedBC7 = "";
			if (arrayCollectionName.indexOf("bchtkhamchuabenhydct")>=0){
				isCheckedBC7 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bchtkhamchuabenhydct" '+isCheckedBC7+' type="checkbox"></input></td>'+
			        '<td>bchtkhamchuabenhydct</td>'+
			        '<td>07: Hệ thống khám chữa y dược cổ truyền</td>'+
			      '</tr>');
			var isCheckedBC8 = "";
			if (arrayCollectionName.indexOf("bcytecoso")>=0){
				isCheckedBC8 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bcytecoso" '+isCheckedBC8+' type="checkbox"></input></td>'+
			        '<td>bcytecoso</td>'+
			        '<td>08: Y tế cơ sở</td>'+
			      '</tr>');
			var isCheckedBC9 = "";
			if (arrayCollectionName.indexOf("bchanhngheytetunhan")>=0){
				isCheckedBC9 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bchanhngheytetunhan" '+isCheckedBC9+' type="checkbox"></input></td>'+
			        '<td>bchanhngheytetunhan</td>'+
			        '<td>09: Hành nghề y tế tư nhân</td>'+
			      '</tr>');
			var isCheckedBC10 = "";
			if (arrayCollectionName.indexOf("bcchungchihanhnghe")>=0){
				isCheckedBC10 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bcchungchihanhnghe" '+isCheckedBC10+' type="checkbox"></input></td>'+
			        '<td>bcchungchihanhnghe</td>'+
			        '<td>10: Cấp chứng chỉ hành nghề</td>'+
			      '</tr>');
			var isCheckedBC11 = "";
			if (arrayCollectionName.indexOf("bckhamchuabenhdiaphuong")>=0){
				isCheckedBC11 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bckhamchuabenhdiaphuong" '+isCheckedBC11+' type="checkbox"></input></td>'+
			        '<td>bckhamchuabenhdiaphuong</td>'+
			        '<td>11: Khám chữa bệnh tại đia phương</td>'+
			      '</tr>');
			var isCheckedBC12 = "";
			if (arrayCollectionName.indexOf("bctrinhdonhanlucytediaphuong")>=0){
				isCheckedBC12 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bctrinhdonhanlucytediaphuong" '+isCheckedBC12+' type="checkbox"></input></td>'+
			        '<td>bctrinhdonhanlucytediaphuong</td>'+
			        '<td>12: Trình độ nhân lực y tế địa phương</td>'+
			      '</tr>');
			var isCheckedBC13 = "";
			if (arrayCollectionName.indexOf("bcdaotaonhanlucdiaphuong")>=0){
				isCheckedBC13 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bcdaotaonhanlucdiaphuong" '+isCheckedBC13+' type="checkbox"></input></td>'+
			        '<td>bcdaotaonhanlucdiaphuong</td>'+
			        '<td>13: Đào tạo nhân lực tại địa phương</td>'+
			      '</tr>');
			var isCheckedBC14 = "";
			if (arrayCollectionName.indexOf("bcthanhkiemtra")>=0){
				isCheckedBC14 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bcthanhkiemtra" '+isCheckedBC14+' type="checkbox"></input></td>'+
			        '<td>bcthanhkiemtra</td>'+
			        '<td>14: Thanh kiểm tra</td>'+
			      '</tr>');
			var isCheckedBC15 = "";
			if (arrayCollectionName.indexOf("bccongtacxahoi")>=0){
				isCheckedBC15 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bccongtacxahoi" '+isCheckedBC15+' type="checkbox"></input></td>'+
			        '<td>bccongtacxahoi</td>'+
			        '<td>15: Công tác xã hội hóa</td>'+
			      '</tr>');
			var isCheckedBC16 = "";
			if (arrayCollectionName.indexOf("bcsudungduoclieu")>=0){
				isCheckedBC16 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bcsudungduoclieu" '+isCheckedBC16+' type="checkbox"></input></td>'+
			        '<td>bcsudungduoclieu</td>'+
			        '<td>16: Sử Dụng Dược Liệu</td>'+
			      '</tr>');
			var isCheckedBC17 = "";
			if (arrayCollectionName.indexOf("bcduanptduoclieu")>=0){
				isCheckedBC17 = "checked";
			}
			html_content.append('<tr>'+
			        '<td><input id="bcduanptduoclieu" '+isCheckedBC17+' type="checkbox"></input></td>'+
			        '<td>bcduanptduoclieu</td>'+
			        '<td>17: Dự án phát triển dược liệu</td>'+
			      '</tr>');
			//self.applyBindings();
    	},
    	renderCombobox: function(){
    		var self = this;
    		var tuyendonvi_id = this.getApp().getRouter().getParam("tuyendonvi_id");
    		var url = '/api/v1/tuyendonvi/' + tuyendonvi_id;
    		$.ajax({
    			url: self.getApp().serviceURL + url,
 				//data: {"q": JSON.stringify({"filters": filters,"single":true})},
 				dataType: "json",
 				contentType: "application/json",
 				success: function(data) {
 					 if(!!data && !!data.id){
 						 var $comboboxEl = self.$el.find("#tuyendonvi_combobox");
 						$comboboxEl.val(JSON.stringify({"id":data.id, "ten": data.ten}));
 						
 						$comboboxEl.ref({
 							textField: "ten",
 							foreignRemoteField: "id",
 							foreignField: "tuyendonvi_id",
 							dataSource: TuyenDonViSelectView,
 			    		});
 						
 						$comboboxEl.on('change.gonrin', function(e){
 							var path = self.collectionName + '/model?tuyendonvi_id='+e.value.id;
 							self.getApp().getRouter().navigate(path);
 						});
 						 
 					 }
 				},
 				error:function(xhr,status,error){
 					self.getApp().notify("Get tuyendonvi Error");
				},
    			
    		});
    	},
    	render:function(){
    		console.log("render cai dat bao cao");
    		var self = this;
    		var tuyendonvi_id = self.getApp().currentUser.donvi.tuyendonvi_id;
    		self.renderCombobox();
    		var url = '/api/v1/bctuyendonvi';
    		var filters = {"tuyendonvi_id": {"$eq":tuyendonvi_id}};
			$.ajax({
 				url: self.getApp().serviceURL + url,
 				data: {"q": JSON.stringify({"filters": filters,"single":true})},
 				dataType: "json",
 				contentType: "application/json",
 				success: function(data) {
 					if(!!data && !!data.id){
 						self.model.set("id", data.id);
 						var arrayCollectionName = data.collectionNames.split(',');
 	    				self.renderContentTable(arrayCollectionName);
 					}
 				},
 				error:function(xhr,status,error){
					try {
						var arrayCollectionName = "";
						self.renderContentTable(arrayCollectionName);
					} catch (e) {
					    // error
					}
				},
			});
    	}
    });

});