define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/TimKiemBaoCaoVeSinh/tpl/model.html'),
		schema = {};


	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
  
	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "timkiembaocaovesinh",
		uiControl: {
			fields: [
			],
		},

		tools: [{
			name: "defaultgr",
			type: "group",
			groupClass: "toolbar-group",
			buttons: [{
					name: "back",
					type: "button",
					buttonClass: "btn-default btn-sm",
					label: "TRANSLATE:BACK",
					command: function () {
						var self = this;
						Backbone.history.history.back();
					}
				},
			],
		}],

		render: function () {
			var self = this;
			$('#kydanhgia').combobox({
            	textField: "text",
                valueField: "value",
                dataSource: [
                    { text: "Qúy I", value: "quy1" },
                    { text: "Qúy II", value: "quy2" },
                    { text: "Qúy III", value: "quy3" },
                    { text: "Qúy IV", value: "quy4" },
                    { text: "6 tháng đầu năm", value: "6thangdau" },
                    { text: "Báo cáo năm", value: "nam" }
                ],
			});
			var currentUser = self.getApp().currentUser;
			if(!!currentUser && !!currentUser.donvi){
				var xaphuong = self.$el.find("#xaphuong");
				xaphuong.find("input").ref({
					textField: "ten",
					valueField: "id",
					dataSource: XaPhuongSelectView,
				});
// 				var donvi = currentUser.donvi;
// 				if(donvi.tuyendonvi_id === 3){
// 					quanhuyen.hide();
// 					tinhthanh.hide();
// //					self.$el.find("#search").attr({"style":"margin-top: 23px;"});
// 				}else if(donvi.tuyendonvi_id ===2){
// 					tinhthanh.hide();
// 				}
				
				self.$el.find("#search").unbind("click").bind("click", function(){
					var nambaocao = self.$el.find("#namdanhgia").val();
					var kybaocao = $("#kydanhgia").data('gonrin').getValue();
					var xaphuong_id = self.$el.find("#xaphuong input").data('gonrin').getValue();

					// if(currentUser.donvi.tuyendonvi_id === 3){
					// 	tinhthanh_id = "";
					// 	quanhuyen_id = "";
					// }else if(currentUser.donvi.tuyendonvi_id === 2){
					// 	tinhthanh_id = "";
					// }
					
					if(toInt(nambaocao)<1900 || toInt(nambaocao)>3000){
						self.getApp().notify({message: "Năm không hợp lệ, vui lòng kiểm tra lại"}, {type: "danger"});
						return;
					}
					var itemKybaocao = self.getApp().mapKyBaoCao[kybaocao];
					if(itemKybaocao === null || itemKybaocao === undefined){
						self.getApp().notify({message:"Chọn kỳ báo cáo cần xem"}, {type: "danger"});
						return;
					}
					if(xaphuong_id === null || xaphuong_id === undefined){
						self.getApp().notify({message:"Mời bạn chọn xã/phường cần xem"}, {type: "danger"});
						return;
					}
					
					var url = self.getApp().serviceURL + "/api/v1/timkiembaocao_vesinh?nambaocao="
						+ nambaocao+"&loaikybaocao="
						+ itemKybaocao.loaikybaocao+"&kybaocao="
						+ itemKybaocao.kybaocao+"&xaphuong_id="+xaphuong_id;
					$.ajax({
						url: url,
						// data: { nambaocao: response.nambaocao},
						method: "GET",
						dataType: "json",
						contentType: "application/json",
						success: function (response) {
							console.log(response);
							var data = [];
							data.push(response);
							self.$el.find("#content_baocao").grid({
								dataSource: data,
								context: self,
								primaryField: "id",
								selectionMode: "single",
								refresh: true,
								fields: [
									{ field: "nambaocao", label: "Năm báo cáo", width: "150px" },
									{ field: "tenxa", label: "Xã", width: "150px" },
									{ field: "tong_sothon", label: "Tổng số thôn", width: "150px" },
									{ field: "tong_soho", label: "Tổng số hộ", width: "150px" },
									{ field: "tong_sohongheo", label: "Tổng số hộ nghèo", width: "150px" },
									{ field: "tong_sohodtts", label: "Số hộ là DTTS", width: "150px" },
									{ field: "tong_danso", label: "Tổng dân số", width: "150px" }
								],
								// onRowClick: self.onRowClick
								onRowClick: function (event) {
									var self = this;
									if (event.rowId) {
										var quy = event.rowData.kybaocao;
										var path = 'vscapxa/model/' +'quy'+quy+ '?id=' + event.rowId;
										this.getApp().getRouter().navigate(path);
									}
								}
							});
						},
						error: function (xhr, status, error) {
							// self.$el.find("#content_baocao").html("");
							try {
								if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED"){
									self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
									self.getApp().getRouter().navigate("login");
								} else {
								  self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
								}
							}
							catch (err) {
							  self.getApp().notify({ message: "Không tìm thấy báo cáo trên hệ thống, vui lòng thử lại!"}, { type: "danger", delay: 1000 });
							}
	 	 			    
	 	 			    },
					});
				});
			}else{
				self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại");
				self.getApp().getRouter().navigate("login");
			}
		},

	});

});