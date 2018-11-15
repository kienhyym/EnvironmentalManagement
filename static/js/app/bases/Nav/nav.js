define(function (require) {
	"use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    return [
            {
        		"text":"Hệ thống",
        		"icon":"fa fa-user",
        		"type":"category",
        		"visible": function(){
			    	return this.userHasRole("Admin");
			    },
        		"entries":[
        			{
        			    "text":"Đơn vị thành viên",
        			    "type":"view",
        			    "collectionName":"donvi",
        			    "route":"donvi/collectiontree",
        			    "$ref": "app/view/HeThong/DonVi/view/CollectionTreeView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"donvi",
        			    "route":"donvi/model(/:id)",
        			    "$ref": "app/view/HeThong/DonVi/view/ModelView",
        			    "visible":  false
        			},
        			{
        			    "text":"Tuyến đơn vị",
        			    "type":"view",
        			    "collectionName":"tuyendonvi",
        			    "route":"tuyendonvi/collection",
        			    "$ref": "app/view/DanhMuc/TuyenDonVi/view/CollectionView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"tuyendonvi",
        			    "route":"tuyendonvi/model",
        			    "$ref": "app/view/DanhMuc/TuyenDonVi/view/ModelView",
        			    "visible":  false
        			},
        			{
        			    "text":"Quản trị người dùng",
        			    "type":"view",
        			    "collectionName":"user",
        			    "route":"user/collection",
        			    "$ref": "app/view/HeThong/User/CollectionView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
					},
					{
						"text":"Quản trị người dùng",
						"type":"view",
						"collectionName":"user",
						"route":"user/profile",
						"$ref": "app/view/HeThong/User/ProfileView",
						"visible":false
				   	},
        			{
                         "text":"Quản trị người dùng",
                         "type":"view",
                         "collectionName":"user",
                         "route":"user/changepwd",
                         "$ref": "app/view/HeThong/User/ChangePasswordView",
                         "visible":false
                    },
        			{
        			    "type":"view",
        			    "collectionName":"user",
        			    "route":"user/model(/:id)",
        			    "$ref": "app/view/HeThong/User/ModelView",
        			    "visible": false
        			},
        			{
        			    "text":"Quản trị vai trò",
        			    "type":"view",
        			    "collectionName":"role",
        			    "route":"role/collection",
        			    "$ref": "app/view/HeThong/Role/CollectionView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"role",
        			    "route":"role/model(/:id)",
        			    "$ref": "app/view/HeThong/Role/ModelView",
        			    "visible": false
        			},
        		]
            },
            {
        		"text":"Danh Mục",
        		"icon":"fa fa-book",
        		"type":"category",
        		"visible": function(){
			    	return this.userHasRole("Admin");
			    },
        		"entries":[
        			
        			{
        			    "text":"Dân Tộc",
        			    "type":"view",
        			    "collectionName":"dantoc",
        			    "route":"dantoc/collection",
        			    "$ref": "app/view/DanhMuc/DanToc/view/CollectionView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"dantoc",
        			    "route":"dantoc/model",
        			    "$ref": "app/view/DanhMuc/DanToc/view/ModelView",
        			    "visible":  false
        			},
        			{
        			    "text":"Quốc Gia",
        			    "type":"view",
        			    "collectionName":"quocgia",
        			    "route":"quocgia/collection",
        			    "$ref": "app/view/DanhMuc/QuocGia/view/CollectionView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"quocgia",
        			    "route":"quocgia/model",
        			    "$ref": "app/view/DanhMuc/QuocGia/view/ModelView",
        			    "visible":  false
        			},
        			{
        			    "text":"Tỉnh Thành",
        			    "type":"view",
        			    "collectionName":"tinhthanh",
        			    "route":"tinhthanh/collection",
        			    "$ref": "app/view/DanhMuc/TinhThanh/view/CollectionView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"tinhthanh",
        			    "route":"tinhthanh/model",
        			    "$ref": "app/view/DanhMuc/TinhThanh/view/ModelView",
        			    "visible":  false
        			},
        			{
        			    "text":"Quận Huyện",
        			    "type":"view",
        			    "collectionName":"quanhuyen",
        			    "route":"quanhuyen/collection",
        			    "$ref": "app/view/DanhMuc/QuanHuyen/view/CollectionView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"quanhuyen",
        			    "route":"quanhuyen/model",
        			    "$ref": "app/view/DanhMuc/QuanHuyen/view/ModelView",
        			    "visible":  false
        			},
        			{
        			    "text":"Xã Phường",
        			    "type":"view",
        			    "collectionName":"xaphuong",
        			    "route":"xaphuong/collection",
        			    "$ref": "app/view/DanhMuc/XaPhuong/view/CollectionView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"xaphuong",
        			    "route":"xaphuong/model",
        			    "$ref": "app/view/DanhMuc/XaPhuong/view/ModelView",
        			    "visible":  false
        			},
        			{
        			    "text":"Thôn Xóm",
        			    "type":"view",
        			    "collectionName":"thonxom",
        			    "route":"thonxom/collection",
        			    "$ref": "app/view/DanhMuc/ThonXom/view/CollectionView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"thonxom",
        			    "route":"thonxom/model",
        			    "$ref": "app/view/DanhMuc/ThonXom/view/ModelView",
        			    "visible":  false
        			},
        			{
        			    "text":"Trình độ học vấn",
        			    "type":"view",
        			    "collectionName":"trinhdohocvan",
        			    "route":"trinhdohocvan/collection",
        			    "$ref": "app/view/DanhMuc/TrinhDoHocVan/view/CollectionView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"trinhdohocvan",
        			    "route":"trinhdohocvan/model",
        			    "$ref": "app/view/DanhMuc/TrinhDoHocVan/view/ModelView",
        			    "visible":  false
        			},
        			{
        			    "text":"Nghề Nghiệp",
        			    "type":"view",
        			    "collectionName":"nghenghiep",
        			    "route":"nghenghiep/collection",
        			    "$ref": "app/view/DanhMuc/NgheNghiep/view/CollectionView",
        			    "visible": function(){
        			    	return this.userHasRole("Admin");
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"nghenghiep",
        			    "route":"nghenghiep/model",
        			    "$ref": "app/view/DanhMuc/NgheNghiep/view/ModelView",
        			    "visible":  false
        			},
        		]
            },
            {
			    "text":"Trang chủ",
			    "type":"view",
			    "icon":"fa fa-home",
			    "collectionName":"sochamsoc",
			    "route":"sochamsoc/model?id=current",
			    "$ref": "app/view/SoChamSoc/ModelView",
			    "visible": function(){
			    	return true;
			    },
			},
			{
			    "text":"Báo Cáo Thống Kê HMIS",
			    "type":"view",
			    "icon":"fa fa-tasks",
			    "collectionName":"monitor",
			    "route":"admin/monitor/hmis",
			    "$ref": "app/bases//monitor/MonitorHMISView",
			    "visible": function(){
			    	return this.userHasRole("Admin");
			    }
			},

			


        ];

});


