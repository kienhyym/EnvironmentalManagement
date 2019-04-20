define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/DanhMuc/CaiDatThongSoNuocDiaPhuong/tpl/model.html'),
		schema = require('json!schema/CaiDatThongSoNuocDiaPhuongSchema.json');

	var DanhSachThongSo_MacDinh = require('json!app/enum/danhsach_thongso_macdinh.json');
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "caidat_thongsonuoc_diaphuong",
		danhsachthongso:[],
		tools: [
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
						command: function () {
							var self = this;
							Backbone.history.history.back();
						}
					},
					{
						name: "save",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "Lưu Cài Đặt",
						command: function () {
							var self = this;
							var danhsachthongso = self.danhsachthongso;
							var danhsach_new = [];
							for(var i=0;i<danhsachthongso.length; i++){
								var item = danhsachthongso[i];
								if(self.$el.find("input#nuocmat_"+item.id).prop('checked')){
									item.nuocmat = 1;
								}
								if(self.$el.find("input#nuocngam_"+item.id).prop('checked')){
									item.nuocngam = 1;
								}
								danhsach_new.push(item);
								
							}
							var params = {
								"danhsachthongso":danhsach_new
							}
							$.ajax({
				    				url: (self.getApp().serviceURL || "")+'/api/v1/caidatthongso/update',
				    				method: 'POST',
				    				data: JSON.stringify(params),
				    				dataType: "json",
				    			  	contentType: "application/json",
				    			  	success: function(data) {
				    			  		self.getApp().notify("Lưu thông tin thành công");
				    			  	},
				    			  	error: function (xhr, status, error) {
										try{
											if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED"){
												self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
												self.getApp().getRouter().navigate("login");
											} else {
												self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
											}
										}
										catch (err) {
			  				    	    	self.getApp().notify("Có lỗi xảy ra, vui lòng thử lại sau");
										}
		  				    	    }
				    			});
						}
					}],
			}],
		uiControl: [],
		renderThongSo: function (danhsachthongso) {
			var self = this;
			var html_content = $("#content_table");
			html_content.html("");
			for (var i = 0; i < danhsachthongso.length; i++) {
				var item_thongso = danhsachthongso[i];
				var check_nuocmat = "";
				 if (item_thongso.nuocmat !== 0 && item_thongso.nuocmat !== "0") {
					 check_nuocmat = "checked";
				 }
				 var check_nuocngam = "";
				 if (item_thongso.nuocngam !== 0 && item_thongso.nuocngam !== "0") {
					 check_nuocngam = "checked";
				 }
				html_content.append('<tr>' +
					'<td>' + item_thongso.id + '</td>' +
					'<td>' + item_thongso.tenthongso + '</td>' +
					'<td class="nuocmat text-center"><input id="nuocmat_' + item_thongso.id + '" ' + check_nuocmat + ' type="checkbox"></input></td>' +
					'<td class="nuocngam text-center"><input id="nuocngam_' + item_thongso.id + '" ' + check_nuocngam + ' type="checkbox"></input></td>' +
//					'<td class="nuocmat_nuocngam" style="text-align: center;"><input id="' + item_thongso.stt + '" ' + isChecked + ' type="checkbox"></input></td>' +
					'</tr>');
			}
		},
		render: function () {
			var self = this;
			var currentUser = self.getApp().currentUser;
			
			if (currentUser == null || currentUser.donvi.tuyendonvi_id !== 2){
				self.getApp().notify("Chức năng cài đặt thông số chỉ giành cho cấp tỉnh");
				return;
			}
			$.ajax({
				url: self.getApp().serviceURL + '/api/v1/caidat_thongsonuoc_diaphuong',
				method: "GET",
				data: {"q": JSON.stringify({"filters":{ "tinhthanh_id": { "$eq": currentUser.donvi.tinhthanh_id } },"order_by":[{"field": "tentinhthanh", "direction": "asc"}],"limit":1})},
                contentType: "application/json",
				success: function (data) {
					console.log("data caidat_thongsonuoc_diaphuong====", data);
					self.renderThongSo(data.objects[0].danhsachthongso);
					self.danhsachthongso = data.objects[0].danhsachthongso;
				},
				 error: function (xhr, status, error) {
				 	try {
				 		if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED") {
				 			self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
				 			self.getApp().getRouter().navigate("login");
				 		} else {
				 			self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
				 		}
				 	} catch (e) {
				 		self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
				 	}
				 },
			});
		},
	});

});