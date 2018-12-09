define(function(require) {
  "use strict";
  var $ = require('jquery'),
    _ = require('underscore'),
    Gonrin = require('gonrin');

  var template = require('text!app/view/BaoCao/KiemTraNguonNuocHoGiaDinh/tpl/model.html'),
    schema = require('json!schema/KiemTraNguonNuocHoGiaDinhSchema.json');
  var xaphuongView = require('app/view/DanhMuc/XaPhuong/view/SelectView');
  var thonxomView = require('app/view/DanhMuc/ThonXom/view/SelectView');
  var tinhthanhView = require('app/view/DanhMuc/TinhThanh/view/SelectView');
  var quanhuyenView = require('app/view/DanhMuc/QuanHuyen/view/SelectView');
  
  var KTNuocHoGiaDinhDialogView = require('app/view/BaoCao/KTNuocHoGiaDinh/view/ModelDialogView');

  var nuoctuchayView = require('app/view/BaoCao/NguonNuocTuChay/view/ModelView');
  var NuocGiengDaoView = require('app/view/BaoCao/NguonNuocGiengDao/view/ModelView');
  var NuocTren25mView = require('app/view/BaoCao/NguonNuocGiengKhoanTren25m/view/ModelView');
  var NuocDuoi25mView = require('app/view/BaoCao/NguonNuocGiengKhoanDuoi25m/view/ModelView');
  var NuocThuHungView = require('app/view/BaoCao/HeThongThuHungNuocMua/view/ModelView');
  var NuocChumVaiView = require('app/view/BaoCao/LuuTruNuocBECHUMVAI/view/ModelView');

  var currentDate = new Date();

  return Gonrin.ModelView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    collectionName: "kiemtranguonnuochogiadinh",

    uiControl: {
      fields: [{
          field: "ngaybanhanhthongtu",
          textFormat: "DD/MM/YYYY",
          extraFormats: ["DDMMYYYY"],
          maxDate:currentDate,
        },
			{
	          field: "thoigiankiemtra",
	          textFormat: "DD/MM/YYYY",
	          extraFormats: ["DDMMYYYY"],
	          maxDate:currentDate,
	        },
	        {
	          field:"nguonuoctuchay",
	          uicontrol:false,
	          itemView:nuoctuchayView
	        },
	        {
	          field:"nguonnuocgiengdao",
	          uicontrol:false,
	          itemView:NuocGiengDaoView
	        },
	        {
	          field:"nguonnuocgiengkhoantren25m",
	          uicontrol:false,
	          itemView:NuocTren25mView
	        },
	        {
	          field:"nguonnuocgiengkhoanduoi25m",
	          uicontrol:false,
	          itemView:NuocDuoi25mView
	        },
	        {
	          field:"hethongthuhungnuocmua",
	          uicontrol:false,
	          itemView:NuocThuHungView
	        },
	        {
	          field:"luutrunuocbechumvai",
	          uicontrol:false,
	          itemView:NuocChumVaiView
	        },
			{
	          field: "ngaykiemtra",
	          textFormat: "DD/MM/YYYY",
	          extraFormats: ["DDMMYYYY"],
	          maxDate:currentDate
		     },

        {
          field: "xaphuong",
          uicontrol: "ref",
          textField: "ten",
          //chuyen sang thanh object
          foreignRemoteField: "id",
          foreignField: "xaphuong_id",
          dataSource: xaphuongView
        },
        {
          field: "quanhuyen",
          uicontrol: "ref",
          textField: "ten",
          //chuyen sang thanh object
          foreignRemoteField: "id",
          foreignField: "quanhuyen_id",
          dataSource: quanhuyenView
        },
        {
          field: "thonxom",
          uicontrol: "ref",
          textField: "ten",
          //chuyen sang thanh object
          foreignRemoteField: "id",
          foreignField: "thonxom_id",
          dataSource: thonxomView
        },
        {
          field: "tinhthanh",
          uicontrol: "ref",
          textField: "ten",
          //chuyen sang thanh object
          foreignRemoteField: "id",
          foreignField: "tinhthanh_id",
          dataSource: tinhthanhView
        },
		{
			field: "ktnuochogiadinh",
			uicontrol: "grid",
			refresh: true,
			primaryField: "id",
			fields:[
			          {field:"vitrilaymau", label:"Vị trí lấy mẫu"},
        	          {field:"ph", label:"pH"},
        	          {field:"doduc", label: "Độ đục (NTU)"},
        	          {field:"danhgia", label: "Đánh giá"},
        	          {
             	    	 field: "command", 
             	    	 label:"Command",
             	    	 width:"50px", 
             	    	 command: [
             	    	     {"label":"Delete",
             	    	        	"action": "delete",
             	    	        	"class": "btn-sm",
             	    	     },
//             	    	     {
//             	    	       "label":"Custom function",
//                	    	        "action": function(params, args){
//                	    	        	$("#grid").data('gonrin').deleteRow(params.el);
//                	    	        },
//                	    	        "class": "btn-primary btn-sm"
//                	    	     },   
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
    	    			 var view = new KTNuocHoGiaDinhDialogView({"viewData":{"id":null,"baocao_id":self.model.get("id")}});
                		 view.dialog();
                		 view.on('close',function(data){
                			 var ktnuochogiadinh = self.model.get('ktnuochogiadinh');
                			 ktnuochogiadinh.push(data);
                			 self.model.set("ktnuochogiadinh",ktnuochogiadinh);
                			 self.applyBindings();
                		 });
                	 }
                 }
	                 ],
        	onRowClick: function(event){
        		var self= this;
	    		if(event.rowId){
	    			 var view = new KTNuocHoGiaDinhDialogView({"viewData":{"id":event.rowId,"baocao_id":self.model.get("id")}});
            		 view.dialog();
            		 view.on('close',function(data){
            			 var str = self.model.get('ktnuochogiadinh');
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
      buttons: [{
          name: "back",
          type: "button",
          buttonClass: "btn-default btn-sm",
          label: "TRANSLATE:BACK",
          command: function() {
            var self = this;

            Backbone.history.history.back();
          }
        },
        {
          name: "save",
          type: "button",
          buttonClass: "btn-success btn-sm",
          label: "TRANSLATE:SAVE",
          command: function() {
            var self = this;

            self.model.save(null, {
              success: function(model, respose, options) {
                self.getApp().notify("Lưu thông tin thành công");
                self.getApp().getRouter().navigate(self.collectionName + "/collection");

              },
              error: function(model, xhr, options) {
                self.getApp().notify('Lưu thông tin không thành công!');

              }
            });
          }
        },
        {
          name: "delete",
          type: "button",
          buttonClass: "btn-danger btn-sm",
          label: "TRANSLATE:DELETE",
          visible: function() {
            return this.getApp().getRouter().getParam("id") !== null;
          },
          command: function() {
            var self = this;
            self.model.destroy({
              success: function(model, response) {
                self.getApp().notify('Xoá dữ liệu thành công');
                self.getApp().getRouter().navigate(self.collectionName + "/collection");
              },
              error: function(model, xhr, options) {
                self.getApp().notify('Xoá dữ liệu không thành công!');

              }
            });
          }
        },
      ],
    }],
    render: function() {
      var self = this;
     
      var view_nguonnuoctuchay = new nuoctuchayView();
      var view_NuocGiengDaoView = new NuocGiengDaoView();
      var view_NuocTren25m = new NuocTren25mView();
      var view_NuocDuoi25m = new NuocDuoi25mView();
      var view_NuocThuHungView = new NuocThuHungView();
      var view_NuocChumVaiView = new NuocChumVaiView();
      
      var id = this.getApp().getRouter().getParam("id");
      if (id) {
        this.model.set('id', id);
        this.model.fetch({
          success: function(data) {
            self.applyBindings();
          },
          error: function() {
            self.getApp().notify("Get data Eror");
          },
        });
      } else {
        self.applyBindings();
      }
      
      
      
    },
  });

});
