define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/TienDoVSTX/tpl/model.html'),
		schema = {};


	var tongischema = require('json!app/view/TienDoVSTX/view/TongiSchema.json');
	var tongitemplate = require('text!app/view/TienDoVSTX/tpl/tongcongi.html');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');

	function toInt(x) {
		return parseInt(x) ? parseInt(x) : 0;
	}

	var TongViewI = Gonrin.ModelView.extend({
		template: tongitemplate,
		modelSchema: tongischema,
		bindings: 'tongi-bind',
		urlPrefix: "/api/v1/",
		collectionName: "tong",
		uiControl: [],
		render: function () {
			this.applyBindings();
		}
	});
	var currentDate = new Date();
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tiendovstx",
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
                    { text: "6 tháng cuối năm", value: "6thangcuoi" },
                    { text: "Tổng kết năm", value: "nam" }
                ],
			});
			var currentUser = self.getApp().currentUser;
			if(!!currentUser && !!currentUser.donvi){
				if(currentUser.donvi.tuyendonvi_id === 1){//tuyen TW
					var tinhthanh = self.$el.find("#tinhthanh");
					tinhthanh.show()
					tinhthanh.find("input").ref({
						textField: "ten",
						valueField: "id",
						dataSource: TinhThanhSelectView,
					});
					self.$el.find("#search").attr({"style":"margin-top: 23px;"});
				}
//				var filters = {
//						filters: {
//							"$and": [
//								{ "loaikybaocao": { "$eq": self.model.get("loaikybaocao") } },
//								{ "nambaocao": { "$eq": nambaocao_truoc } },
//								{ "kybaocao": { "$eq": kybaocao_truoc } },
//								{ "thonxom_id": { "$eq": self.model.get("thonxom_id") } }
//							]
//						}
//					}
				
				self.$el.find("#search").unbind("click").bind("click", function(){
					var nambaocao = self.$el.find("#namdanhgia").val();
					var kybaocao = $("#kydanhgia").data('gonrin').getValue();
					var tinhthanh_id = self.$el.find("#tinhthanh input").data('gonrin').getValue();
					
					if(toInt(nambaocao)<2000 && toInt(nambaocao)>3000){
						self.getApp().notify("Năm không hợp lệ, vui lòng kiểm tra lại");
						return;
					}
					var itemKybaocao = self.getApp().mapKyBaoCao[kybaocao];
					if(itemKybaocao === null || itemKybaocao === undefined){
						self.getApp().notify("Chọn kỳ báo cáo cần xem");
						return;
					}
					
					var url = self.getApp().serviceURL + "/api/v1/tiendovstx?nambaocao="
						+ nambaocao+"&loaikybaocao="
						+ itemKybaocao.loaikybaocao+"&kybaocao="
						+ itemKybaocao.kybaocao+"&tinhthanh_id="+tinhthanh_id;
					$.ajax({
						url: url,
						method: "GET",
//						data: "q=" + JSON.stringify(filters),
						contentType: "application/json",
						success: function (data) {
							if (data){
								var tong_hocsinh =0;
								var tong_soho = 0;
								var tong_danso = 0;
								self.$el.find("#danhsachdonvi").html("");
								$.each(data, function(idx,obj){
									tong_hocsinh += obj.tongso_hocsinh;
									tong_soho += obj.tong_soho;
									tong_danso += obj.tong_danso;
									var tr = $('<tr id="danhsachdonvi">').attr({
										"id": obj.id
									});
									tr.append("<td>" + obj.tentinhthanh + "</td>");
									tr.append("<td>" + obj.tenquanhuyen + "</td>");
									tr.append('<td>' + obj.tenxaphuong + "</td>");
									tr.append('<td>' + obj.tyle_nhatieu_caithien + "</td>");
									tr.append("<td>" + obj.tyle_diemruatay + "</td>");
									tr.append("<td>" + obj.tyle_truong_hvs + "</td>");
									tr.append("<td>" + obj.tongso_hocsinh + "</td>");
									tr.append("<td>" + obj.tyle_tramyte_hvs + "</td>");
									tr.append("<td>" + toInt(obj.tong_soho) + "</td>");
									tr.append("<td>" + obj.tong_danso + "</td>");
									tr.append("<td>" + obj.tyle_chuholanu + "</td>");
									tr.append("<td>" + obj.tyle_hodtts + "</td>");
									self.$el.find("#danhsachdonvi").append(tr);
								});
								var tr_tong = $('<tr id="tong">');
								tr_tong.append('<td colspan="2">Tổng</td>');
								tr_tong.append("<td>" + data.length + "</td>");
								tr_tong.append("<td></td>");
								tr_tong.append("<td></td>");
								tr_tong.append("<td></td>");
								tr_tong.append("<td>" + tong_hocsinh + "</td>");
								tr_tong.append("<td></td>");
								tr_tong.append("<td>" + tong_soho + "</td>");
								tr_tong.append("<td>" + tong_danso + "</td>");
								tr_tong.append("<td></td>");
								tr_tong.append("<td></td>");
								self.$el.find("#danhsachdonvi").append(tr_tong);
							}
							console.log(data);
						},
						error: function (xhr, status, error) {
	 	 			       try {
	 	 			    	    var msgJson = $.parseJSON(xhr.responseText); 
	 	 			    	    if(msgJson){
	 	 			    	    	self.getApp().notify(msgJson.error_message);
	 	 			    	    }
	 	 			    	} catch(err) {
	 	 			    		self.getApp().notify("Lỗi truy cập dữ liệu, vui lòng thử lại sau");
	 	 			    		
	 	 			    	
	 	 			    	}
	 	 			    
	 	 			    }
					});
					
					
				});
				
				
			}else{
				self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại");
				self.getApp().getRouter().navigate("login");
			}
		},
		renderTinhTongI: function (danhsachbaocao) {
			var self = this;
			if (!self.tongViewi) {
				self.tongViewi = new TongViewI({
					el: self.$el.find("#tongcongi")
				});
				self.tongViewi.render();
			}

			var data = Gonrin.getDefaultModel(tongischema);
			for (var j = 0; j < danhsachbaocao.length; j++) {
				var chitiet = danhsachbaocao[j];
				_.each(tongischema, function (props, key) {
					data[key] = toInt(data[key]) + toInt(danhsachbaocao[j][key]);

				});
			}
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
		},

	});

});