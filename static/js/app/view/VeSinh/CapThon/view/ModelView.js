define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/VeSinh/CapThon/tpl/model.html'),
		schema = require('json!schema/VSCapThonSchema.json');


	var NhaTieuThonHVSItemView = require('app/view/VeSinh/CapThon/NhaTieuThonHVS/view/ModelItemView');
	var HoGiaDinhItemDialog = require('app/view/VeSinh/CapThon/NhaTieuThonHVS/view/ModelItemDialog');
	var tongischema = require('json!app/view/VeSinh/CapThon/view/TongiSchema.json');
	var tongitemplate = require('text!app/view/VeSinh/CapThon/tpl/tongcongi.html');
	var XaPhuongSelectView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
	var ThonXomSelectView = require('app/view/DanhMuc/ThonXom/view/SelectView');
	var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
	var HoGiaDinhSelectView = require('app/view/DanhMuc/HoGiaDinh/view/SelectView');



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
		current_thonxom:"",
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "vscapthon",
		uiControl: {
			fields: [
				{
					field: "xaphuong",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "xaphuong_id",
					dataSource: XaPhuongSelectView
				},
				{
					field: "thonxom",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "thonxom_id",
					dataSource: ThonXomSelectView
				},
				{
					field: "tinhthanh",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tinhthanh_id",
					dataSource: TinhThanhSelectView
				},
				{
					field: "quanhuyen",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "quanhuyen_id",
					dataSource: QuanHuyenSelectView
				},
				{
    				field: "thuocsuprsws",
    				uicontrol: "combobox",
    				textField: "text",
    				valueField: "value",
    				dataSource: [
    					{ "value": 1, "text": "Có" },
    					{ "value": 0, "text": "Không" },
					],
					value:1
				},
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
				{
					name: "save",
					type: "button",
					buttonClass: "btn-success btn-sm",
					label: "TRANSLATE:SAVE",
					command: function () {
						var self = this;
						if (!self.validate()){
							return;
						}
							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().notify("Lưu thông tin thành công!");
									var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
									self.getApp().getRouter().navigate(self.collectionName 
											+ "/collection?loaikybaocao="+routeloaibaocao);
	
								},
								error: function (xhr, status, error) {
									try {
										if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
											self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
											self.getApp().getRouter().navigate("login");
										} else {
										  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
										}
									}
									catch (err) {
									  self.getApp().notify({ message: "Báo cáo đã tồn tại, vui lòng kiểm tra lại!"}, { type: "danger", delay: 1000 });
									}
								}
							});	
					}
				},
				{
					name: "copy",
					type: "button",
					buttonClass: "btn-primary btn-sm",
					label: "Sao chép từ báo cáo kỳ trước",
					visible: function () {
						return this.getApp().getRouter().getParam("id") == null;
					},
					command: function () {
						var self = this;
						var thonxom_id = self.model.get("thonxom_id");
						var nambaocao = self.model.get("nambaocao");
						if(nambaocao === undefined || nambaocao === null || nambaocao.length ===0){
							self.getApp().notify("Chọn năm báo cáo trước khi sử dụng sao chép từ kỳ trước");
							return;
						}
						if(thonxom_id === undefined || thonxom_id === null || thonxom_id.length ===0){
							self.getApp().notify("Chọn Thôn xóm trước khi sử dụng sao chép từ kỳ trước");
							return;
						}
						var kybaocao = self.model.get("kybaocao");
						var kybaocao_truoc = kybaocao;
						var nambaocao_truoc = self.model.get("nambaocao");
						var loaikybaocao = self.model.get("loaikybaocao");
						if (kybaocao>1){
							kybaocao_truoc = kybaocao - 1;
							nambaocao_truoc = nambaocao;
						}else{
							nambaocao_truoc = nambaocao -1;
							if (loaikybaocao === 1){//thang
								kybaocao_truoc = 12;
							}else if (loaikybaocao === 2){//quy
								kybaocao_truoc = 4;
							}else if (loaikybaocao === 3){//6thang
								kybaocao_truoc = 2;
							}else if (loaikybaocao === 4){//1nam
								kybaocao_truoc = 1;
							}
						}
						var filters = {
								filters: {
									"$and": [
										{ "loaikybaocao": { "$eq": self.model.get("loaikybaocao") } },
										{ "nambaocao": { "$eq": nambaocao_truoc } },
										{ "kybaocao": { "$eq": kybaocao_truoc } },
										{ "thonxom_id": { "$eq": self.model.get("thonxom_id") } }
									]
								}
							}
						var url = self.getApp().serviceURL + "/api/v1/" + self.collectionName;
						$.ajax({
							url: url,
							method: "GET",
							data: "q=" + JSON.stringify(filters),
							contentType: "application/json",
							success: function (data) {
								if (!!data && !!data.objects && (data.objects.length > 0)){
									var id = data.objects[0].id;
									self.model.set(data.objects[0]);
									self.model.set("id",null);
									self.model.set("nambaocao",nambaocao);
									self.model.set("kybaocao",kybaocao);
									self.model.set("loaikybaocao",loaikybaocao);
									var nhatieuthonhvs = self.model.get("nhatieuthonhvs");
									self.$el.find("#nhatieuthonhvs").html("");
									for(var i=0; i< nhatieuthonhvs.length; i++){
										nhatieuthonhvs[i]['stt'] = i+1;
										self.renderItemView(nhatieuthonhvs[i], null);
										
									}
									
									self.applyBindings();
									self.renderTinhTongI();
									
									
									
									
								}else{
									self.getApp().notify("Không tìm thấy báo cáo!");
								}
							},
							error: function (xhr, status, error) {
								try {
									if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
										self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
										self.getApp().getRouter().navigate("login");
									} else {
									  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
									}
								}
								catch (err) {
								  self.getApp().notify({ message: "Lỗi không tìm thấy báo cáo kỳ trước!"}, { type: "danger", delay: 1000 });
								}
							}
						});	
					}
				},				// self.getFieldElement("hogiadinh").data("gonrin").setFilters({"thonxom_id": { "$eq": self.model.get("thonxom_id")}});

				{
					name: "delete",
					type: "button",
					buttonClass: "btn-danger btn-sm",
					label: "TRANSLATE:DELETE",
					visible: function () {
						return this.getApp().getRouter().getParam("id") !== null;
					},
					command: function () {
						var self = this;
						self.model.destroy({
							success: function (model, response) {
								self.getApp().notify('Xoá dữ liệu thành công');
								var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
								self.getApp().getRouter().navigate(self.collectionName 
										+ "/collection?loaikybaocao="+routeloaibaocao);

							},
							error: function (xhr, status, error) {
								try {
									if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
										self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
										self.getApp().getRouter().navigate("login");
									} else {
									  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
									}
								}
								catch (err) {
								  self.getApp().notify({ message: "Xóa dữ liệu không thành công"}, { type: "danger", delay: 1000 });
								}
							}
						});
					}
				},
			],
		}],
		render: function () {
			var self = this;
			self.model.on("change:tong_nam", function() {
				var tong_nu = self.model.get("tong_nu");
				var tong_nam = self.model.get("tong_nam");
				if (Number.isInteger(tong_nam) === true){
					var tong_dantrongthon = toInt(tong_nam) + toInt(tong_nu);
					self.model.set("tong_danso" , tong_dantrongthon)
				} else {
					self.getApp().notify({message:"Tổng số nam không hợp lệ, xin vui lòng nhập lại!"}, {type: "danger"});
					return;
				}
			});
			self.model.on("change:tong_nu", function() {
				var tong_nu = self.model.get("tong_nu");
				var tong_nam = self.model.get("tong_nam");
				if (Number.isInteger(tong_nu) === true){
					var tong_dantrongthon = toInt(tong_nam) + toInt(tong_nu);
					self.model.set("tong_danso" , tong_dantrongthon)
				} else {
					self.getApp().notify({message:"Tổng số nữ không hợp lệ, xin vui lòng nhập lại!"}, {type: "danger"});
					return;
				}
			});
			var id = this.getApp().getRouter().getParam("id");
			var routeloaibaocao = self.getApp().get_currentRoute_loaibaocao();
			if (routeloaibaocao!==null){
				var itemkybaocao = self.getApp().mapKyBaoCao[routeloaibaocao];
				if (itemkybaocao === null || itemkybaocao ==="undefined"){
					self.getApp().notify("Đường dẫn không hợp lệ, vui lòng thử lại sau");
					return;
				}else{
					self.model.set("loaikybaocao",itemkybaocao.loaikybaocao);
					self.model.set("kybaocao",itemkybaocao.kybaocao);
					self.$el.find("#kydanhgia").val(itemkybaocao.text);
				}
			}
			
			var currentUser = self.getApp().currentUser;
			if(!!currentUser && !!currentUser.donvi){
				if (!!currentUser.donvi.tinhthanh_id && currentUser.donvi.tuyendonvi_id >= 2){
					self.model.set("tinhthanh_id",currentUser.donvi.tinhthanh_id);
					self.getApp().data("tinhthanh_id",currentUser.donvi.tinhthanh_id);
					self.model.set("tinhthanh",currentUser.donvi.tinhthanh);
					self.$el.find("#tinhthanh").prop('disabled', true);
				}
				if (!!currentUser.donvi.quanhuyen_id && currentUser.donvi.tuyendonvi_id >= 3){
					self.model.set("quanhuyen_id",currentUser.donvi.quanhuyen_id);
					self.getApp().data("quanhuyen_id",currentUser.donvi.quanhuyen_id);
					self.model.set("quanhuyen",currentUser.donvi.quanhuyen);
					self.$el.find("#quanhuyen").prop('disabled', true);
				}
				if (!!currentUser.donvi.xaphuong_id && currentUser.donvi.tuyendonvi_id === 4){
					self.getApp().data("xaphuong_id",currentUser.donvi.xaphuong_id);
					self.model.set("xaphuong_id",currentUser.donvi.xaphuong_id);
					self.model.set("xaphuong",currentUser.donvi.xaphuong);
					self.$el.find("#xaphuong").prop('disabled', true);
				}
			}
			self.$el.find("#addItem").unbind("click").bind("click", function () {
				if(self.model.get("thonxom") === null || !self.model.get("thonxom")){
					self.getApp().notify({message:"Chọn thông tin thôn/xóm trước khi thêm hộ gia đình!"}, {type: "danger"});
					return;
				}
				self.$el.find("#nhatieuthonhvs").show();
				var view_hogiadinh = new HoGiaDinhItemDialog({"viewData":{"thonxom_id": self.model.get("thonxom").id, "chuongtrinhsup":self.model.get("thuocsuprsws")}});
				view_hogiadinh.dialog({size: "large"});
				view_hogiadinh.on("close", function(data){
					var view = new NhaTieuThonHVSItemView({"viewData":{"chuongtrinhsup":self.model.get("thuocsuprsws")}});
					view.model.set("id",gonrin.uuid());
					var danhsachho = self.model.get("nhatieuthonhvs");
					for(var i=0; i< danhsachho.length; i++){
						var item_hogiadinh = danhsachho[i];
						if(item_hogiadinh.maho === data.maho){
							self.getApp().notify({message: "Hộ gia đình đã tồn tại trong báo cáo!"}, {type: "danger"});
							return;
						}
					}
					view.model.set("tenchuho", data.tenchuho);
					view.model.set("maho", data.maho);
					view.model.set("gioitinh", data.gioitinh);
					view.model.set("dantoc_id", data.dantoc_id);
					view.model.set("dantoc", data.dantoc);
					view.model.set("tendantoc",data.tendantoc);
					view.model.set("hongheo",data.hongheo);
					view.model.set("tuhoai",data.tuhoai);
					view.model.set("thamdoi",data.thamdoi);
					view.model.set("haingan",data.haingan);
					view.model.set("chimco_oth",data.chimco_oth);
					view.model.set("khongconhatieu",data.khongconhatieu);
					view.model.set("loaikhac",data.loaikhac);
					view.model.set("hopvesinh",data.hopvesinh);
					view.model.set("khonghopvesinh",data.khonghopvesinh);
					view.model.set("caithien",data.caithien);
					view.model.set("diemruataycoxaphong",data.diemruataycoxaphong);
					view.applyBindings();
					self.model.get("nhatieuthonhvs").push(view.model.toJSON());
					self.getApp().notify("Thêm hộ gia đình thành công");
					self.renderItemView(view.model.toJSON(), null);
					self.search_dshogiadinh();
					self.$el.find("#tongcongi").show();
					self.renderTinhTongI();
					self.check_chuongtrinhSUP();
				});
			});
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						var nhatieuthonhvs = self.model.get("nhatieuthonhvs");
						self.$el.find("#nhatieuthonhvs").html("");
						for(var i=0; i< nhatieuthonhvs.length; i++){
							nhatieuthonhvs[i]['stt'] = i+1;
							self.renderItemView(nhatieuthonhvs[i], null);
							
						}
						self.model.on("change:thonxom", function(){
							self.$el.find("#nhatieuthonhvs").html("");
							self.model.set("nhatieuthonhvs",[]);
							self.$el.find("#tongcongi").hide();
						});
						self.applyBindings();
						self.search_dshogiadinh();
						self.renderTinhTongI();
						if (self.model.get("nhatieuthonhvs").length === 0) {
							self.$el.find("#nhatieuthonhvs").hide();
						}

						if (self.getApp().currentUser !== null 
									&& self.getApp().currentUser.donvi_id !== self.model.get("donvi_id")){
								self.$el.find(".toolbar .btn-group [btn-name='save']").hide();
								self.$el.find(".toolbar .btn-group [btn-name='delete']").hide();
						}
					},
					error: function (xhr, status, error) {
						try {
							if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
								self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
								self.getApp().getRouter().navigate("login");
							} else {
							  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
							}
						}
						catch (err) {
						  self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
						}
					},
					complete:function(){
						self.check_chuongtrinhSUP();
						self.model.on("change:thuocsuprsws", function(){
							self.check_chuongtrinhSUP();
						});
					}
				});
			} else {
				self.applyBindings();
				self.model.set("nhatieuthonhvs", []);
				
				self.check_chuongtrinhSUP();
				self.model.on("change:thuocsuprsws", function(){
					self.check_chuongtrinhSUP();
				});

				// self.$el.find(".remove_columns").hide();

				self.model.on("change:thonxom", function(event, name){
					if(self.model.previous("thonxom") === null || self.model.previous("thonxom").id !== self.model.get("thonxom").id){
						self.$el.find("#nhatieuthonhvs").html("");
						self.model.set("nhatieuthonhvs",[]);
						self.$el.find("#tongcongi").hide();
					}		
				});
			}
		},
		check_chuongtrinhSUP:function(){
			var self = this;
			var check_thuoc_sup = self.model.get("thuocsuprsws");
			if (check_thuoc_sup === 0 || check_thuoc_sup === "0"){
				self.$el.find(".chuongtrinhsup").hide();
				self.$el.find("#header_table_notsup").show();
				self.$el.find("#header_table_sup").hide();
				
			} else{
				self.$el.find(".chuongtrinhsup").show();
				self.$el.find("#header_table_notsup").hide();
				self.$el.find("#header_table_sup").show();
			}
		},
		renderItemView: function(data, element_id){
			var self  =this;
			var view = new NhaTieuThonHVSItemView({"viewData":{"chuongtrinhsup":self.model.get("thuocsuprsws")}});
			if (element_id == null || element_id == "" || element_id == undefined){
				element_id = gonrin.uuid();
				view.$el.attr("id",element_id );
			} else {
				view.setElement($('#'+ element_id));
			}
			view.model.set(data);
			
			if(self.$el.find("#"+element_id).length ===0){
				self.$el.find("#nhatieuthonhvs").append(view.$el);
			}else{
				// self.$el.find("#"+element_id).html("");
				// self.$el.find('#'+ element_id).html(view.$el.html());
			}
			view.render();
			
			view.$el.unbind('click').bind('click', function () {
				var view_hogiadinh = new HoGiaDinhItemDialog({"viewData": {"obj_hogiadinh": data, "thonxom_id": self.model.get("thonxom").id, "chuongtrinhsup":self.model.get("thuocsuprsws")}});
				view_hogiadinh.dialog({size: "large"});
				view_hogiadinh.on("close", function (data_hogiadinh) {
					var data_nhatieuthonhvs = self.model.get("nhatieuthonhvs");
					for( var i = 0; i < data_nhatieuthonhvs.length; i++){
						if (data_nhatieuthonhvs[i].maho === data_hogiadinh.maho){
							if(data_hogiadinh.maho === view_hogiadinh.viewData.obj_hogiadinh.maho){
								data_nhatieuthonhvs[i] = data_hogiadinh;
								break;
							}else{
								self.getApp().notify({message: "Hộ gia đình đã tồn tại trong báo cáo!"}, {type: "danger"});
								return;
							}	
						}
					}
					self.model.set("nhatieuthonhvs",data_nhatieuthonhvs);
					self.applyBinding("nhatieuthonhvs");
					view.model.set(data_hogiadinh);
					view.applyBindings();
					data = data_hogiadinh;
					self.getApp().notify("Thêm hộ gia đình thành công");
				});
			});
			
			view.$el.find("#itemRemove").unbind('click').bind('click',{obj:data}, function(e){
            	var fields = self.model.get("nhatieuthonhvs");
            	var data = e.data.obj;
                for( var i = 0; i < fields.length; i++){
                	   if ( fields[i].id === data.id) {
                		   fields.splice(i, 1); 
                	   }
                }
                self.model.set("nhatieuthonhvs", fields);
				self.model.trigger("change");
				if (self.model.get("nhatieuthonhvs").length === 0){
					self.$el.find("#nhatieuthonhvs").hide();
				}
                self.renderTinhTongI();
                view.destroy();
                view.remove();
            });
            view.on("change", function (event) {
                var fields = self.model.get("nhatieuthonhvs");
                fields.forEach(function (item, idx) {
                	if (fields[idx].id === event.oldData.id){
                		fields[idx] = event.data;
                	}
                });
                self.model.set("nhatieuthonhvs", fields);
                self.model.trigger("change");
                self.renderTinhTongI();
            });
		},
		renderTinhTongI: function () {
			var self = this;
			if (!self.tongViewi) {
				self.tongViewi = new TongViewI({
					el: self.$el.find("#tongcongi")
				});
				self.tongViewi.render();
			}
			var data = Gonrin.getDefaultModel(tongischema);	
			for (var j = 0; j < self.model.get('nhatieuthonhvs').length; j++) {
				var chitiet = self.model.get('nhatieuthonhvs')[j];
				var check_loaikhac = 0;
				if (toInt(chitiet['loaikhac'])>0){
					check_loaikhac = 1;
				}
				var check_dantoc = 0;
				if(chitiet["dantoc"]===null || chitiet["dantoc"].ma==="1"){
					check_dantoc = 0;
				}else{
					check_dantoc = 1;
				}
				
				_.each(tongischema, function (props, key) {
					if(key === "tuhoai_hvs" && (chitiet["tuhoai"] === 1 || chitiet["tuhoai"] === "1")
							&& (chitiet["hopvesinh"] === 1 || chitiet["hopvesinh"] === "1")){
						data[key] = toInt(data[key]) + toInt(1);
					}else if(key === "thamdoi_hvs" && (chitiet["thamdoi"] === 1 || chitiet["thamdoi"] === "1")
							&& (chitiet["hopvesinh"] === 1 || chitiet["hopvesinh"] === "1")){
						data[key] = toInt(data[key]) + toInt(1);
					}else if(key === "haingan_hvs" && (chitiet["haingan"] === 1 || chitiet["haingan"] === "1")
							&& (chitiet["hopvesinh"] === 1 || chitiet["hopvesinh"] === "1")){
						data[key] = toInt(data[key]) + toInt(1);
					}else if(key === "chimco_oth_hvs" && (chitiet["chimco_oth"] === 1 || chitiet["chimco_oth"] === "1")
							&& (chitiet["hopvesinh"] === 1 || chitiet["hopvesinh"] === "1")){
						data[key] = toInt(data[key]) + toInt(1);
					}else if(key === "caithien_hongheo" && (chitiet["caithien"] === 1 || chitiet["caithien"] === "1")
							&& (chitiet["hongheo"] === 1 || chitiet["hongheo"] === "1")){
						data[key] = toInt(data[key]) + toInt(1);
					}else if(key === "caithien_hongheo_hvs" && (chitiet["caithien"] === 1 || chitiet["caithien"] === "1")
							&& (chitiet["hongheo"] === 1 || chitiet["hongheo"] === "1")
							&& (chitiet["hopvesinh"] === 1 || chitiet["hopvesinh"] === "1")){
						data[key] = toInt(data[key]) + toInt(1);
					}else if(key === "caithien_hvs" && (chitiet["caithien"] === 1 || chitiet["caithien"] === "1")
							&& (chitiet["hopvesinh"] === 1 || chitiet["hopvesinh"] === "1")){
						data[key] = toInt(data[key]) + toInt(1);
					}else if(key === "dtts"){
						data[key] = toInt(data[key]) + toInt(check_dantoc);
					}else if(key === "loaikhac"){
						data[key] = toInt(data[key]) + toInt(check_loaikhac);
					}else{
						data[key] = toInt(data[key]) + toInt(chitiet[key]);
					}
					
					
					
				});
			}
			self.tongViewi.model.set(data);
			self.tongViewi.applyBindings();
			self.changeTong();

		},
		changeTong: function() {
			var self = this;
			var sohongheo = self.tongViewi.model.get("hongheo");
			self.model.set("tong_sohongheo", sohongheo);
			
			var tong_nu = self.model.get("tong_nu");
			var tong_nam = self.model.get("tong_nam");
			var tong_dantrongthon = toInt(tong_nam) + toInt(tong_nu);
			self.model.set("tong_danso" , tong_dantrongthon)

			var tong_dtts = self.tongViewi.model.get("dtts");
			self.model.set("tong_sohodtts", tong_dtts);
			
			var soNu = self.tongViewi.model.get("gioitinh");
			self.model.set("tong_chuholanu", soNu);

			self.model.set("tong_soho", self.model.get("nhatieuthonhvs").length);	

			self.model.set("tong_tuhoai", self.tongViewi.model.get("tuhoai"));
			self.model.set("tong_tuhoai_hvs", self.tongViewi.model.get("tuhoai_hvs"));
			
			self.model.set("tong_thamdoi", self.tongViewi.model.get("thamdoi"));
			self.model.set("tong_thamdoi_hvs", self.tongViewi.model.get("thamdoi_hvs"));
			
			self.model.set("tong_2ngan", self.tongViewi.model.get("haingan"));
			self.model.set("tong_2ngan_hvs", self.tongViewi.model.get("haingan_hvs"));
			
			self.model.set("tong_loaikhac", self.tongViewi.model.get("loaikhac"));
			
			self.model.set("tong_ongthonghoi", self.tongViewi.model.get("chimco_oth"));
			self.model.set("tong_ongthonghoi_hvs", self.tongViewi.model.get("chimco_oth_hvs"));
			
			self.model.set("tong_khongnhatieu", self.tongViewi.model.get("khongconhatieu"));
			
			self.model.set("tong_hopvs", self.tongViewi.model.get("hopvesinh"));
			
			self.model.set("tong_khonghopvs", self.tongViewi.model.get("khonghopvesinh"));
			
			self.model.set("tong_caithien", self.tongViewi.model.get("caithien"));
			self.model.set("tong_caithien_hvs", self.tongViewi.model.get("caithien_hvs"));
			self.model.set("tong_caithien_hongheo", self.tongViewi.model.get("caithien_hongheo"));
			self.model.set("tong_caithien_hongheo_hvs", self.tongViewi.model.get("caithien_hongheo_hvs"));

			self.model.set("tong_diemruatay", self.tongViewi.model.get("diemruataycoxaphong"));

		},
		validate: function() {
			const self = this;
			var nambaocao = self.model.get("nambaocao");
			var tinhthanh = self.model.get("tinhthanh");
			var quanhuyen = self.model.get("quanhuyen");
			var xaphuong = self.model.get("xaphuong");
			var thuocsuprsws = self.model.get("thuocsuprsws");
			var thonxom = self.model.get("thonxom");
			var tong_nu = self.model.get("tong_nu");
			var tong_nam = self.model.get("tong_nam");
			var tong_danso = self.model.get("tong_danso");
			if(nambaocao === null || nambaocao === ""){
				self.getApp().notify({message: "Năm đánh giá không được để trống!"},{type: "danger"});
				return;
			} 
			if(toInt(nambaocao)<1900 || toInt(nambaocao)>3000){
				self.getApp().notify({message: "Năm không hợp lệ, vui lòng kiểm tra lại!"},{type: "danger"});
				return;
			} 
			if(tinhthanh === null || tinhthanh === undefined){
				self.getApp().notify({message: "Chưa chọn thông tin Tỉnh/Thành!"},{type: "danger"});
				return;
			}
			if(quanhuyen === null || quanhuyen === undefined){
				self.getApp().notify({message: "Chưa chọn thông tin Quận/Huyện!"},{type: "danger"});
				return;
			}
			if(xaphuong === null || xaphuong === undefined){
				self.getApp().notify({message: "Chưa chọn thông tin Xã/Phường!"},{type: "danger"});
				return;
			}
			if (thuocsuprsws === null || thuocsuprsws === ""){
				self.getApp().notify({message: "Có thuộc chương trình SupRSWS hay không?"},{type: "danger"});
				return;
			}
			if(thonxom === null || thonxom === undefined){
				self.getApp().notify({message: "Chưa chọn thông tin Thôn/Xóm!"},{type: "danger"});
				return;
			}
			if(tong_nu === null || tong_nu === ""){
				self.getApp().notify({message: "Chưa nhập tổng số nữ trong thôn!"},{type: "danger"});
				return;
			}
			if(Number.isInteger(tong_nu) === false){
				self.getApp().notify({message: "Tổng số nữ không hợp lệ, vui lòng kiểm tra lại!"},{type: "danger"});
				return;
			}
			if(toInt(tong_nu) < 0){
				self.getApp().notify({message: "Tổng số nữ trong thôn không hợp lệ!"},{type: "danger"});
				return;
			}
			if(tong_nam === null || tong_nam === ""){
				self.getApp().notify({message: "Chưa nhập tổng số nam trong thôn!"},{type: "danger"});
				return;
			}
			if(Number.isInteger(tong_nam) === false){
				self.getApp().notify({message: "Tổng số nam không hợp lệ, vui lòng kiểm tra lại!"},{type: "danger"});
				return;
			}
			if(toInt(tong_nam) < 0){
				self.getApp().notify({message: "Tổng số nam trong thôn không hợp lệ!"},{type: "danger"});
				return;
			}
			if(toInt(tong_danso) <= 0){
				self.getApp().notify({message: "Số nam hoặc số nữ không hợp lệ, vui lòng kiểm tra lại!"},{type: "danger"});
				return;
			}
			return true;
		},
		search_dshogiadinh: function(){
			var self = this;
			var search_data = self.$el.find("#search_data");
			search_data.unbind("keyup").bind("keyup", function () {
				var search_data = self.$el.find("#search_data").val();
				var arr = self.model.get("nhatieuthonhvs");
				var filterObj = gonrin.query(arr, {tenchuho: {$like: search_data}});
				if (filterObj.length == 0){
					self.$el.find("#nhatieuthonhvs").hide();
				} else{
					self.$el.find("#nhatieuthonhvs").show();
					self.$el.find("#nhatieuthonhvs").html("");
					for(var i=0; i< filterObj.length; i++){
						self.renderItemView(filterObj[i], null);
						self.check_chuongtrinhSUP();
					}
				}
			});
		},
	});

});