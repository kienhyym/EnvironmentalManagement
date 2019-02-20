define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		{
			"text": "Hệ thống",
			"icon": "glyphicon glyphicon-file",
			"type": "category",
			"entries": [
				{
					"text": "Đơn vị thành viên",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "donvi",
					"route": "donvi/collectiontree",
					"$ref": "app/view/HeThong/DonVi/view/CollectionTreeView",
					"tuyendonvi": 1,
					"visible": function () {
						return this.checkTuyendonvi([1]);
					}
				},
				{
					"type": "view",
					"collectionName": "donvi",
					"route": "donvi/model(/:id)",
					"$ref": "app/view/HeThong/DonVi/view/ModelView",
					"visible": false
				},
				{
					"text": "Tuyến đơn vị",
					"type": "view",
					"collectionName": "tuyendonvi",
					"icon": "glyphicon glyphicon-file",
					"route": "tuyendonvi/collection",
					"$ref": "app/view/DanhMuc/TuyenDonVi/view/CollectionView",
					"tuyendonvi": 1,
					"visible": function () {
						return this.checkTuyendonvi([1]);
					}
				},
				{
					"type": "view",
					"collectionName": "tuyendonvi",
					"route": "tuyendonvi/model",
					"$ref": "app/view/DanhMuc/TuyenDonVi/view/ModelView",
					"visible": false
				},
				{
					"text": "Đăng ký đơn vị",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "user_donvi",
					"route": "user_donvi/collection",
					"$ref": "app/view/HeThong/DangKyDonVi/view/CollectionView",
				},
				{
					"type": "view",
					"collectionName": "user_donvi",
					"route": "user_donvi/model",
					"$ref": "app/view/HeThong/DangKyDonVi/view/ModelView",
					"visible": false
				},
				{
					"text": "Quản trị người dùng",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "user",
					"route": "user/collection",
					"$ref": "app/view/HeThong/User/view/CollectionView",
					"tuyendonvi": 1,
					"visible": function () {
						return this.checkTuyendonvi([1]);
					}
				},
				{
					"text": "Quản trị người dùng",
					"type": "view",
					"collectionName": "user",
					"route": "user/profile",
					"$ref": "app/view/HeThong/User/view/ProfileView",
					"visible": false
				},
				{
					"text": "Quản trị người dùng",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "user",
					"route": "user/changepwd",
					"$ref": "app/view/HeThong/User/view/ChangePasswordView",
					"visible": false
				},
				{
					"type": "view",
					"collectionName": "user",
					"route": "user/model(/:id)",
					"$ref": "app/view/HeThong/User/view/ModelView",
					"visible": false
				},
				{
					"text": "Quản trị vai trò",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "role",
					"route": "role/collection",
					"$ref": "app/view/HeThong/Role/view/CollectionView",
					"tuyendonvi": 1,
					"visible": function () {
						return this.checkTuyendonvi([1]);
					}
				}, {
					"type": "view",
					"collectionName": "role",
					"route": "role/model(/:id)",
					"$ref": "app/view/HeThong/Role/view/ModelView",
					"visible": false
				},

//				{
//					"text": "Cài đặt Báo Cáo",
//					"type": "view",
//					"collectionName": "bctuyendonvi",
//					"route": "bctuyendonvi/collection",
//					"$ref": "app/view/HeThong/CaiDatBaoCao/view/CollectionView",
//					"icon": "glyphicon glyphicon-cog",
//					"visible": false
//				}, {
//					"text": "Cài đặt Báo Cáo",
//					"type": "view",
//					"collectionName": "bctuyendonvi",
//					"route": "bctuyendonvi/model(/:id)",
//					"href": "bctuyendonvi/model?tuyendonvi_id=1",
//					"$ref": "app/view/HeThong/CaiDatBaoCao/view/ModelView",
//					"icon": "glyphicon glyphicon-cog",
//					"tuyendonvi": 1,
//					"visible": function () {
//						return this.checkTuyendonvi([1]);
//					}
//				},
				{
					"text": "Cài đặt Viện Chuyên Ngành Nước Sạch",
					"type": "view",
					"collectionName": "map_vienchuyennganhnuoc_tinh",
					"route": "map_vienchuyennganhnuoc_tinh/collection",
					"$ref": "app/view/HeThong/CaiDatBaoCaoVienChuyenNganh/view/CollectionView",
					"icon": "glyphicon glyphicon-cog",
					"visible": false
				}, {
					"text": "Cài đặt Viện Chuyên Ngành Nước Sạch",
					"type": "view",
					"collectionName": "map_vienchuyennganhnuoc_tinh",
					"route": "map_vienchuyennganhnuoc_tinh/model",
//					"href": "map_vienchuyennganhnuoc_tinh/model?donvi_id",
					"$ref": "app/view/HeThong/CaiDatBaoCaoVienChuyenNganh/view/ModelView",
					"icon": "glyphicon glyphicon-cog",
					"tuyendonvi": 1,
					"visible": function () {
						return this.checkTuyendonvi([1,10]);
					}
				}
			]
		},
		{
			"text": "Danh Mục",
			"icon": "glyphicon glyphicon-menu-hamburger",
			"type": "category",
			"visible": function () {
				return this.checkTuyendonvi([1,2,3,4]);
			},
			"entries": [
				{
					"text": "Dân Tộc",
					"type": "view",
					"collectionName": "dantoc",
					"route": "dantoc/collection",
					"$ref": "app/view/DanhMuc/DanToc/view/CollectionView",
					"tuyendonvi": 1,
					"visible": function () {
						return this.checkTuyendonvi([1]);
					}
				},
				{
					"type": "view",
					"collectionName": "dantoc",
					"route": "dantoc/model",
					"$ref": "app/view/DanhMuc/DanToc/view/ModelView",
					"visible": false
				},
				{
					"text": "Quốc Gia",
					"type": "view",
					"collectionName": "quocgia",
					"route": "quocgia/collection",
					"$ref": "app/view/DanhMuc/QuocGia/view/CollectionView",
					"tuyendonvi": 1,
					"visible": function () {
						return this.checkTuyendonvi([1]);
					}
				},
				{
					"type": "view",
					"collectionName": "quocgia",
					"route": "quocgia/model",
					"$ref": "app/view/DanhMuc/QuocGia/view/ModelView",
					"visible": false
				},
				{
					"text": "Tỉnh Thành",
					"type": "view",
					"collectionName": "tinhthanh",
					"route": "tinhthanh/collection",
					"$ref": "app/view/DanhMuc/TinhThanh/view/CollectionView",
					"tuyendonvi": 1,
					"visible": function () {
						return this.checkTuyendonvi([1]);
					}
				},
				{
					"type": "view",
					"collectionName": "tinhthanh",
					"route": "tinhthanh/model",
					"$ref": "app/view/DanhMuc/TinhThanh/view/ModelView",
					"visible": false
				},
				{
					"text": "Quận Huyện",
					"type": "view",
					"collectionName": "quanhuyen",
					"route": "quanhuyen/collection",
					"$ref": "app/view/DanhMuc/QuanHuyen/view/CollectionView",
					"tuyendonvi": 3,
					"visible": function () {
						return this.checkTuyendonvi([1,2,3]);
					}
				},
				{
					"type": "view",
					"collectionName": "quanhuyen",
					"route": "quanhuyen/model",
					"$ref": "app/view/DanhMuc/QuanHuyen/view/ModelView",
					"visible": false
				},
				{
					"text": "Xã Phường",
					"type": "view",
					"collectionName": "xaphuong",
					"route": "xaphuong/collection",
					"$ref": "app/view/DanhMuc/XaPhuong/view/CollectionView",
					"tuyendonvi": 4,
					"visible": function () {
						return this.checkTuyendonvi([1,2,3,4]);
					}
				},
				{
					"type": "view",
					"collectionName": "xaphuong",
					"route": "xaphuong/model",
					"$ref": "app/view/DanhMuc/XaPhuong/view/ModelView",
					"visible": false
				},
				{
					"text": "Thôn Xóm",
					"type": "view",
					"collectionName": "thonxom",
					"route": "thonxom/collection",
					"$ref": "app/view/DanhMuc/ThonXom/view/CollectionView",
					"tuyendonvi": 4,
					"visible": function () {
						return this.checkTuyendonvi([1,2,3,4]);
					}
				},
				{
					"type": "view",
					"collectionName": "thonxom",
					"route": "thonxom/model",
					"$ref": "app/view/DanhMuc/ThonXom/view/ModelView",
					"visible": false
				},
				{
					"text": "Hộ Gia Đình",
					"type": "view",
					"collectionName": "hogiadinh",
					"route": "hogiadinh/collection",
					"$ref": "app/view/DanhMuc/HoGiaDinh/view/CollectionView",
					"tuyendonvi": 4,
					"visible": function () {
						return this.checkTuyendonvi([1,2,3,4]);
					}
				},
				{
					"type": "view",
					"collectionName": "hogiadinh",
					"route": "hogiadinh/model",
					"$ref": "app/view/DanhMuc/HoGiaDinh/view/ModelView",
					"visible": false
				},
				{
					"text": "Đơn Vị Cấp Nước",
					"type": "view",
					"collectionName": "donvicapnuoc",
					"route": "donvicapnuoc/collection",
					"$ref": "app/view/DanhMuc/DonViCapNuoc/view/CollectionView",
					"tuyendonvi": 2,
					"visible": function () {
						return this.checkTuyendonvi([1,2,3]);
					}
				},
				{
					"type": "view",
					"collectionName": "donvicapnuoc",
					"route": "donvicapnuoc/model",
					"$ref": "app/view/DanhMuc/DonViCapNuoc/view/ModelView",
					"visible": false
				},
				{
					"text": "Ngành",
					"type": "view",
					"collectionName": "nganh",
					"route": "nganh/collection",
					"$ref": "app/view/DanhMuc/Nganh/CollectionView",
					"visible": function () {
						return this.checkTuyendonvi([1]);
					}
				},
				{
					"type": "view",
					"collectionName": "nganh",
					"route": "nganh/model",
					"$ref": "app/view/DanhMuc/Nganh/ModelView",
					"visible": false
				},
				{
					"text": "Danh mục hoạt động",
					"type": "view",
					"collectionName": "danhmuchoatdong",
					"route": "danhmuchoatdong/collection",
					"$ref": "app/view/DanhMuc/DanhMucHoatDong/view/CollectionView",
					"visible": function () {
						return this.checkTuyendonvi([1,2]);
					}
				},
				{
					"type": "view",
					"collectionName": "danhmuchoatdong",
					"route": "danhmuchoatdong/model",
					"$ref": "app/view/DanhMuc/DanhMucHoatDong/view/ModelView",
					"visible": false
				},
				{
					"text": "Thông số báo cáo chất lượng nước",
					"type": "view",
					"collectionName": "thongsobaocaochatluongnuoc",
					"route": "thongsobaocaochatluongnuoc/collection",
					"$ref": "app/view/DanhMuc/ThongSoBaoCaoChatLuongNuoc/view/CollectionView",
					"visible": function () {
						return this.checkTuyendonvi([1]);
					}
				},
				{
					"type": "view",
					"collectionName": "thongsobaocaochatluongnuoc",
					"route": "thongsobaocaochatluongnuoc/model",
					"$ref": "app/view/DanhMuc/ThongSoBaoCaoChatLuongNuoc/view/ModelView",
					"visible": false
				}
			]
		},
		{
			"text": "Vệ sinh hộ gia đình",
			"icon": "glyphicon glyphicon-tasks",
			"type": "category",
			"visible": function () {
				return this.checkTuyendonvi([1,2,3,4]);
			},
			"entries": [
				{
					"text": "Thống kê giám sát vệ sinh",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "thongkevesinh",
					"route": "thongkevesinh",
					"$ref": "app/view/VeSinh/ThongKeVeSinh/view/ModelView",
				},
				{
					"text": "Cấp thôn",
					"icon": "glyphicon glyphicon-tasks",
					"type": "category",
					"collectionName": "vscapthon",
					"visible": function () {
						return this.checkTuyendonvi([4]);
					},
					"entries": [
						{
							"text": "Qúy I",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/collection?loaikybaocao=quy1",
							"$ref": "app/view/VeSinh/CapThon/view/CollectionView",
						},
						{
							"text": "Qúy II",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/collection?loaikybaocao=quy2",
							"$ref": "app/view/VeSinh/CapThon/view/CollectionView",
						},
						{
							"text": "Qúy III",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/collection?loaikybaocao=quy3",
							"$ref": "app/view/VeSinh/CapThon/view/CollectionView",
						},
						{
							"text": "Qúy IV",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/collection?loaikybaocao=quy4",
							"$ref": "app/view/VeSinh/CapThon/view/CollectionView",
						},
						{
							"text": "6 Tháng đầu năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/collection?loaikybaocao=6thangdau",
							"$ref": "app/view/VeSinh/CapThon/view/CollectionView",
						},
						{
							"text": "6 Tháng cuối năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/collection?loaikybaocao=6thangcuoi",
							"$ref": "app/view/VeSinh/CapThon/view/CollectionView",
						},
						{
							"text": "Tổng kết năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/collection?loaikybaocao=nam",
							"$ref": "app/view/VeSinh/CapThon/view/CollectionView",
						},
						{
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/model/quy1(/:id)",
							"$ref": "app/view/VeSinh/CapThon/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/model/quy2(/:id)",
							"$ref": "app/view/VeSinh/CapThon/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/model/quy3(/:id)",
							"$ref": "app/view/VeSinh/CapThon/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/model/quy4(/:id)",
							"$ref": "app/view/VeSinh/CapThon/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/model/6thangdau(/:id)",
							"$ref": "app/view/VeSinh/CapThon/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/model/6thangcuoi(/:id)",
							"$ref": "app/view/VeSinh/CapThon/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapthon",
							"route": "vscapthon/model/nam(/:id)",
							"$ref": "app/view/VeSinh/CapThon/view/ModelView",
							"visible": false
						}
					]
				},
				{
					"text": "Cấp xã",
					"icon": "glyphicon glyphicon-tasks",
					"type": "category",
					//					"collectionName": "vscapxa",
					//					"route": "vscapxa/collection",
					//					"$ref": "app/view/VeSinh/CapXa/view/CollectionView",
					"tuyendonvi": 4,
					"visible": function () {
						return this.checkTuyendonvi([4]);
					},
					"entries": [
						{
							"text": "Qúy I",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/collection?loaikybaocao=quy1",
							"$ref": "app/view/VeSinh/CapXa/view/CollectionView",
						},
						{
							"text": "Qúy II",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/collection?loaikybaocao=quy2",
							"$ref": "app/view/VeSinh/CapXa/view/CollectionView",
						},
						{
							"text": "Qúy III",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/collection?loaikybaocao=quy3",
							"$ref": "app/view/VeSinh/CapXa/view/CollectionView",
						},
						{
							"text": "Qúy IV",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/collection?loaikybaocao=quy4",
							"$ref": "app/view/VeSinh/CapXa/view/CollectionView",
						},
						{
							"text": "6 Tháng đầu năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/collection?loaikybaocao=6thangdau",
							"$ref": "app/view/VeSinh/CapXa/view/CollectionView",
						},
						{
							"text": "6 Tháng cuối năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/collection?loaikybaocao=6thangcuoi",
							"$ref": "app/view/VeSinh/CapXa/view/CollectionView",
						},
						{
							"text": "Tổng kết năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/collection?loaikybaocao=nam",
							"$ref": "app/view/VeSinh/CapXa/view/CollectionView",
						},
						{
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/model/quy1(/:id)",
							"$ref": "app/view/VeSinh/CapXa/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/model/quy2(/:id)",
							"$ref": "app/view/VeSinh/CapXa/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/model/quy3(/:id)",
							"$ref": "app/view/VeSinh/CapXa/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/model/quy4(/:id)",
							"$ref": "app/view/VeSinh/CapXa/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/model/6thangdau(/:id)",
							"$ref": "app/view/VeSinh/CapXa/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/model/6thangcuoi(/:id)",
							"$ref": "app/view/VeSinh/CapXa/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscapxa",
							"route": "vscapxa/model/nam(/:id)",
							"$ref": "app/view/VeSinh/CapXa/view/ModelView",
							"visible": false
						}
					]
				},
				{
					"text": "Cấp huyện",
					"icon": "glyphicon glyphicon-tasks",
					"type": "category",
					"tuyendonvi": 3,
					"visible": function () {
						return this.checkTuyendonvi([3]);
					},
					"entries": [
						{
							"text": "Qúy I",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/collection?loaikybaocao=quy1",
							"$ref": "app/view/VeSinh/CapHuyen/view/CollectionView",
						},
						{
							"text": "Qúy II",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/collection?loaikybaocao=quy2",
							"$ref": "app/view/VeSinh/CapHuyen/view/CollectionView",
						},
						{
							"text": "Qúy III",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/collection?loaikybaocao=quy3",
							"$ref": "app/view/VeSinh/CapHuyen/view/CollectionView",
						},
						{
							"text": "Qúy IV",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/collection?loaikybaocao=quy4",
							"$ref": "app/view/VeSinh/CapHuyen/view/CollectionView",
						},
						{
							"text": "6 Tháng đầu năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/collection?loaikybaocao=6thangdau",
							"$ref": "app/view/VeSinh/CapHuyen/view/CollectionView",
						},
						{
							"text": "6 Tháng cuối năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/collection?loaikybaocao=6thangcuoi",
							"$ref": "app/view/VeSinh/CapHuyen/view/CollectionView",
						},
						{
							"text": "Tổng kết năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/collection?loaikybaocao=nam",
							"$ref": "app/view/VeSinh/CapHuyen/view/CollectionView",
						},
						{
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/model/quy1(/:id)",
							"$ref": "app/view/VeSinh/CapHuyen/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/model/quy2(/:id)",
							"$ref": "app/view/VeSinh/CapHuyen/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/model/quy3(/:id)",
							"$ref": "app/view/VeSinh/CapHuyen/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/model/quy4(/:id)",
							"$ref": "app/view/VeSinh/CapHuyen/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/model/6thangdau(/:id)",
							"$ref": "app/view/VeSinh/CapHuyen/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/model/6thangcuoi(/:id)",
							"$ref": "app/view/VeSinh/CapHuyen/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaphuyen",
							"route": "vscaphuyen/model/nam(/:id)",
							"$ref": "app/view/VeSinh/CapHuyen/view/ModelView",
							"visible": false
						}
					]
				},
				{
					"text": "Cấp tỉnh",
					"icon": "glyphicon glyphicon-tasks",
					"type": "category",
					"tuyendonvi": 2,
					"visible": function () {
						return this.checkTuyendonvi([2,1]);
					},
					"entries": [
						{
							"text": "Qúy I",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/collection?loaikybaocao=quy1",
							"$ref": "app/view/VeSinh/CapTinh/view/CollectionView",
						},
						{
							"text": "Qúy II",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/collection?loaikybaocao=quy2",
							"$ref": "app/view/VeSinh/CapTinh/view/CollectionView",
						},
						{
							"text": "Qúy III",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/collection?loaikybaocao=quy3",
							"$ref": "app/view/VeSinh/CapTinh/view/CollectionView",
						},
						{
							"text": "Qúy IV",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/collection?loaikybaocao=quy4",
							"$ref": "app/view/VeSinh/CapTinh/view/CollectionView",
						},
						{
							"text": "6 Tháng đầu năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/collection?loaikybaocao=6thangdau",
							"$ref": "app/view/VeSinh/CapTinh/view/CollectionView",
						},
						{
							"text": "6 Tháng cuối năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/collection?loaikybaocao=6thangcuoi",
							"$ref": "app/view/VeSinh/CapTinh/view/CollectionView",
						},
						{
							"text": "Tổng kết năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/collection?loaikybaocao=nam",
							"$ref": "app/view/VeSinh/CapTinh/view/CollectionView",
						},
						{
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/model/quy1(/:id)",
							"$ref": "app/view/VeSinh/CapTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/model/quy2(/:id)",
							"$ref": "app/view/VeSinh/CapTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/model/quy3(/:id)",
							"$ref": "app/view/VeSinh/CapTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/model/quy4(/:id)",
							"$ref": "app/view/VeSinh/CapTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/model/6thangdau(/:id)",
							"$ref": "app/view/VeSinh/CapTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/model/6thangcuoi(/:id)",
							"$ref": "app/view/VeSinh/CapTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "vscaptinh",
							"route": "vscaptinh/model/nam(/:id)",
							"$ref": "app/view/VeSinh/CapTinh/view/ModelView",
							"visible": false
						},
					]
				}
			],
		},
		{
			"text": "Chương trình SUPRSWS",
			"icon": "glyphicon glyphicon-tasks",
			"type": "category",
			"visible": function () {
				return this.checkTuyendonvi([1,2,3,4]);
			},
			"entries": [
				{
					"text": "Kế hoạch BCC",
					"icon": "glyphicon glyphicon-file",
					"type": "category",
					"collectionName": "kehoachbcc",
					"entries": [
						{
							"text": "Thống kê giới và dân tộc thiểu số",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "gioi_dantocthieuso",
							"route": "hoatdongbcc/gioi_dantocthieuso",
							"$ref": "app/view/HoatDongBCC/Gioi_Dantocthieuso/view/ModelView",
						},
						{
							"text": "Báo cáo hoạt động",
							"icon": "glyphicon glyphicon-tasks",
							"type": "category",
							"entries": [
								{
									"text": "Hoạt động cấp thôn",
									"icon": "glyphicon glyphicon-tasks",
									"type": "category",
									"collectionName": "tiendo_kehoach_bcc",
									"route": "hoatdongbcc/capthon/collection",
									"$ref": "app/view/HoatDongBCC/LapKHThon/view/CollectionView",
									"tuyendonvi": 4,
									"visible": function () {
										return this.checkTuyendonvi([4]);
									},
									"entries": [
										{
											"text": "Qúy I",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/collection?loaikybaocao=quy1",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/CollectionView",
										},
										{
											"text": "Qúy II",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/collection?loaikybaocao=quy2",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/CollectionView",
										},
										{
											"text": "Qúy III",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/collection?loaikybaocao=quy3",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/CollectionView",
										},
										{
											"text": "Qúy IV",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/collection?loaikybaocao=quy4",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/CollectionView",
										},
										{
											"text": "6 Tháng đầu năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/collection?loaikybaocao=6thangdau",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/CollectionView",
										},
										{
											"text": "6 Tháng cuối năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/collection?loaikybaocao=6thangcuoi",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/CollectionView",
										},
										//hd cap tinh bcc
										{
											"text": "Tổng kết năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/collection?loaikybaocao=nam",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/CollectionView",
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/model/quy1(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/model/quy2(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/model/quy3(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/model/quy4(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/model/6thangdau(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/model/6thangcuoi(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capthon/model/nam(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHThon/view/ModelView",
											"visible": false
										}
									]
								},
								{
									"text": "Hoạt động cấp xã",
									"icon": "glyphicon glyphicon-tasks",
									"type": "category",
									"collectionName": "tiendo_kehoach_bcc",
									"route": "itemxa/collection",
									"$ref": "app/view/PhuLuc/LapKHXa/view/CollectionView",
									"tuyendonvi": 4,
									"visible": function () {
										return this.checkTuyendonvi([4]);
									},
									"entries": [
										{
											"text": "Qúy I",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/collection?loaikybaocao=quy1",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/CollectionView",
										},
										{
											"text": "Qúy II",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/collection?loaikybaocao=quy2",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/CollectionView",
										},
										{
											"text": "Qúy III",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/collection?loaikybaocao=quy3",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/CollectionView",
										},
										{
											"text": "Qúy IV",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/collection?loaikybaocao=quy4",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/CollectionView",
										},
										{
											"text": "6 Tháng đầu năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/collection?loaikybaocao=6thangdau",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/CollectionView",
										},
										{
											"text": "6 Tháng cuối năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/collection?loaikybaocao=6thangcuoi",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/CollectionView",
										},
										{
											"text": "Tổng kết năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/collection?loaikybaocao=nam",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/CollectionView",
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/model/quy1(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/model/quy2(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/model/quy3(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/model/quy4(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/model/6thangdau(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/model/6thangcuoi(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/capxa/model/nam(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHXa/view/ModelView",
											"visible": false
										}
									]
								},
								{
									"text": "Hoạt động cấp huyện",
									"icon": "glyphicon glyphicon-tasks",
									"type": "category",
									"collectionName": "tiendo_kehoach_bcc",
									"route": "itemhuyen/collection",
									"$ref": "app/view/PhuLuc/LapKHHuyen/view/CollectionView",
									"tuyendonvi": 3,
									"visible": function () {
										return this.checkTuyendonvi([3]);
									},
									"entries": [
										{
											"text": "Qúy I",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/collection?loaikybaocao=quy1",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/CollectionView",
										},
										{
											"text": "Qúy II",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/collection?loaikybaocao=quy2",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/CollectionView",
										},
										{
											"text": "Qúy III",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/collection?loaikybaocao=quy3",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/CollectionView",
										},
										{
											"text": "Qúy IV",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/collection?loaikybaocao=quy4",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/CollectionView",
										},
										{
											"text": "6 Tháng đầu năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/collection?loaikybaocao=6thangdau",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/CollectionView",
										},
										{
											"text": "6 Tháng cuối năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/collection?loaikybaocao=6thangcuoi",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/CollectionView",
										},
										{
											"text": "Tổng kết năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/collection?loaikybaocao=nam",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/CollectionView",
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/model/quy1(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/model/quy2(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/model/quy3(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/model/quy4(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/model/6thangdau(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/model/6thangcuoi(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/caphuyen/model/nam(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHHuyen/view/ModelView",
											"visible": false
										}]
								},
								{
									"text": "Hoạt động cấp tỉnh",
									"icon": "glyphicon glyphicon-tasks",
									"type": "category",
									"collectionName": "tiendo_kehoach_bcc",
									"route": "itemtinh/collection",
									"$ref": "app/view/PhuLuc/LapKHTinh/view/CollectionView",
									"tuyendonvi": 2,
									"visible": function () {
										return this.checkTuyendonvi([1,2]);
									},
									"entries": [
										{
											"text": "Qúy I",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/collection?loaikybaocao=quy1",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/CollectionView",
										},
										{
											"text": "Qúy II",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/collection?loaikybaocao=quy2",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/CollectionView",
										},
										{
											"text": "Qúy III",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/collection?loaikybaocao=quy3",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/CollectionView",
										},
										{
											"text": "Qúy IV",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/collection?loaikybaocao=quy4",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/CollectionView",
										},
										{
											"text": "6 Tháng đầu năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/collection?loaikybaocao=6thangdau",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/CollectionView",
										},
										{
											"text": "6 Tháng cuối năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/collection?loaikybaocao=6thangcuoi",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/CollectionView",
										},
										{
											"text": "Tổng kết năm",
											"icon": "glyphicon glyphicon-tasks",
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/collection?loaikybaocao=nam",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/CollectionView",
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/model/quy1(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/model/quy2(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/model/quy3(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/model/quy4(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/model/6thangdau(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/model/6thangcuoi(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/ModelView",
											"visible": false
										},
										{
											"type": "view",
											"collectionName": "tiendo_kehoach_bcc",
											"route": "hoatdongbcc/captinh/model/nam(/:id)",
											"$ref": "app/view/HoatDongBCC/LapKHTinh/view/ModelView",
											"visible": false
										}
									]
								}
							]
						},
						{
							"text": "Thống kê hoạt động",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "tiendo_kehoach_bcc",
							"route": "hoatdongbcc/baocao",
							"$ref": "app/view/HoatDongBCC/BaoCao/ModelView"
						}
					]
				},
				{
					"text": "Xã vệ sinh toàn xã",
					"icon": "glyphicon glyphicon-file",
					"type": "category",
					//					"collectionName": "xavesinhtoanxa",
					//					"route": "xavesinhtoanxa/collection",
					//					"$ref": "app/view/xavesinhtoanxa/XaVeSinhToanXaView",
					"entries": [
						{
							"text": "Tiến độ thực hiện vệ sinh toàn xã",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "tiendovstx",
							"route": "tiendovstx",
							"$ref": "app/view/VeSinh/TienDoVSTX/view/ModelView",
						},
						{
							"text": "Tiến độ duy trì vệ sinh toàn xã bền vững",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "tiendovstx_benvung",
							"route": "tiendovstx_benvung/collection",
							"$ref": "app/view/VeSinh/TienDoVSTX_BENVUNG/view/ModelView",
						},
						{
							"text": "Duyệt Xã Vệ Sinh Toàn Xã",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "duyet_vesinh_toanxa",
							"route": "duyet_vesinh_toanxa/collection",
							"$ref": "app/view/VeSinh/DuyetVeSinhToanXa/view/CollectionView",
							"tuyendonvi": 2,
							"visible": function () {
								return this.checkTuyendonvi([2,1]);
							}
						},
						{
							"type": "view",
							"collectionName": "duyet_vesinh_toanxa",
							"route": "duyet_vesinh_toanxa/model",
							"$ref": "app/view/VeSinh/DuyetVeSinhToanXa/view/ModelView",
							"visible": false
						},
					]
				},
				{
					"text": "Phiếu điều tra trường học/trạm y tế",
					"icon": "glyphicon glyphicon-tasks",
					"type": "category",
					//					"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
					//					"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/collection",
					//					"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/CollectionView",
					"tuyendonvi": 4,
					"visible": function () {
						return this.checkTuyendonvi([4]);
					},
					"entries": [
						{
							"text": "Qúy I",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/collection?loaikybaocao=quy1",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/CollectionView",
						},
						{
							"text": "Qúy II",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/collection?loaikybaocao=quy2",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/CollectionView",
						},
						{
							"text": "Qúy III",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/collection?loaikybaocao=quy3",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/CollectionView",
						},
						{
							"text": "Qúy IV",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/collection?loaikybaocao=quy4",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/CollectionView",
						},
						{
							"text": "6 Tháng đầu năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/collection?loaikybaocao=6thangdau",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/CollectionView",
						},
						{
							"text": "6 Tháng cuối năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/collection?loaikybaocao=6thangcuoi",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/CollectionView",
						},
						{
							"text": "Tổng kết năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/collection?loaikybaocao=nam",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/CollectionView",
						},
						{
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/model/quy1(/:id)",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/model/quy2(/:id)",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/model/quy3(/:id)",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/model/quy4(/:id)",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/model/6thangdau(/:id)",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/model/6thangcuoi(/:id)",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc",
							"route": "phieu_dieutra_truonghoc_tramyte_vesinh_capnuoc/model/nam(/:id)",
							"$ref": "app/view/VeSinh/Phieu_DieuTra_Truonghoc_TramYTe_Vesinh_CapNuoc/view/ModelView",
							"visible": false
						}
					]
				},
			]
		},
		{
			"text": "Chất lượng nước sạch",
			"icon": "glyphicon glyphicon-tasks",
			"type": "category",
			"tuyendonvi": 4,
			"visible": function () {
				return this.checkTuyendonvi([1,2,3,10]);
			},
			"entries": [
				{
					"text": "Phiếu kết quả nội kiểm chất lượng nước sạch",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "ketqua_noikiem_chatluong_nuocsach",
					"route": "ketqua_noikiem_chatluong_nuocsach/collection",
					"$ref": "app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/view/CollectionView",
					"tuyendonvi": 3,
					"visible": function () {
						return this.checkTuyendonvi([1,2,3]);
					},
				},
				{
					"type": "view",
					"collectionName": "ketqua_noikiem_chatluong_nuocsach",
					"route": "ketqua_noikiem_chatluong_nuocsach/model",
					"$ref": "app/view/BaoCaoNuoc/KetQuaNoiKiemChatLuongNuocSach/view/ModelView",
					"visible": false
				},
				{
					"text": "Phiếu kết quả ngoại kiểm chất lượng nước sạch",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "ketqua_ngoaikiem_chatluong_nuocsach",
					"route": "ketqua_ngoaikiem_chatluong_nuocsach/collection",
					"$ref": "app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/CollectionView",
				},
				{
					"type": "view",
					"collectionName": "ketqua_ngoaikiem_chatluong_nuocsach",
					"route": "ketqua_ngoaikiem_chatluong_nuocsach/model",
					"$ref": "app/view/BaoCaoNuoc/KetQuaNgoaiKiemChatLuongNuocSach/view/ModelView",
					"visible": false
				},
				{
					"text": "Tổng hợp kết quả kiểm tra chất lượng nước sạch",
					"icon": "glyphicon glyphicon-file",
					"type": "category",
//					"collectionName": "tonghop_ketqua_chatluong_nuocsach",
//					"route": "tonghop_ketqua_chatluong_nuocsach/collection",
//					"$ref": "app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/view/CollectionView",
					"entries": [
						{
							"text": "Qúy I",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "tonghop_ketqua_chatluong_nuocsach",
							"route": "tonghop_ketqua_chatluong_nuocsach/collection?loaikybaocao=quy1",
							"$ref": "app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/view/CollectionView",
						},
						{
							"text": "Qúy II",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "tonghop_ketqua_chatluong_nuocsach",
							"route": "tonghop_ketqua_chatluong_nuocsach/collection?loaikybaocao=quy2",
							"$ref": "app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/view/CollectionView",
						},
						{
							"text": "Qúy III",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "tonghop_ketqua_chatluong_nuocsach",
							"route": "tonghop_ketqua_chatluong_nuocsach/collection?loaikybaocao=quy3",
							"$ref": "app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/view/CollectionView",
						},
						{
							"text": "Qúy IV",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "tonghop_ketqua_chatluong_nuocsach",
							"route": "tonghop_ketqua_chatluong_nuocsach/collection?loaikybaocao=quy4",
							"$ref": "app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/view/CollectionView",
						},
						{
							"type": "view",
							"collectionName": "tonghop_ketqua_chatluong_nuocsach",
							"route": "tonghop_ketqua_chatluong_nuocsach/model/quy1(/:id)",
							"$ref": "app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "tonghop_ketqua_chatluong_nuocsach",
							"route": "tonghop_ketqua_chatluong_nuocsach/model/quy2(/:id)",
							"$ref": "app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "tonghop_ketqua_chatluong_nuocsach",
							"route": "tonghop_ketqua_chatluong_nuocsach/model/quy3(/:id)",
							"$ref": "app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "tonghop_ketqua_chatluong_nuocsach",
							"route": "tonghop_ketqua_chatluong_nuocsach/model/quy4(/:id)",
							"$ref": "app/view/BaoCaoNuoc/TongHopKQChatLuongNuocSach/view/ModelView",
							"visible": false
						},
					]
				},
				{
					"text": "Báo cáo Nước sạch dành cho Trung tâm y tế Huyện",
					"icon": "glyphicon glyphicon-file",
					"type": "category",
//					"collectionName": "baocao_nuocsach_huyentinh",
//					"route": "baocao_nuocsach_huyen/collection",
//					"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/CollectionView",
					"tuyendonvi": 3,
					"visible": function () {
						return this.checkTuyendonvi([1,3]);
					},
					"entries": [
						{
							"text": "Qúy I",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/collection?loaikybaocao=quy1",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/CollectionView",
						},
						{
							"text": "Qúy II",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/collection?loaikybaocao=quy2",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/CollectionView",
						},
						{
							"text": "Qúy III",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/collection?loaikybaocao=quy3",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/CollectionView",
						},
						{
							"text": "Qúy IV",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/collection?loaikybaocao=quy4",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/CollectionView",
						},
						{
							"text": "Báo cáo 6 tháng đầu năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/collection?loaikybaocao=6thangdau",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/CollectionView",
						},
						{
							"text": "Báo cáo năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/collection?loaikybaocao=nam",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/CollectionView",
						},
						{
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/model/quy1(/:id)",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/model/quy2(/:id)",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/model/quy3(/:id)",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/model/quy4(/:id)",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/model/6thangdau(/:id)",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_huyen/model/nam(/:id)",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/ModelView",
							"visible": false
						},
					]
				},
				{
					"text": "Báo cáo Nước sạch dành cho Trung tâm y tế Tỉnh",
					"icon": "glyphicon glyphicon-file",
					"type": "category",
//					"collectionName": "baocao_nuocsach_huyentinh",
//					"route": "baocao_nuocsach_tinh/collection",
//					"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/CollectionView",
					"tuyendonvi": 2,
					"visible": function () {
						return this.checkTuyendonvi([2,1]);
					},
					"entries": [
						{
							"text": "Báo cáo 6 tháng đầu năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "baocao_nuocsach_tinh",
							"route": "baocao_nuocsach_tinh/collection?loaikybaocao=6thangdau",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/CollectionView",
						},
						{
							"text": "Báo cáo năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "baocao_nuocsach_tinh",
							"route": "baocao_nuocsach_tinh/collection?loaikybaocao=nam",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/CollectionView",
						},
						{
							"type": "view",
							"collectionName": "baocao_nuocsach_tinh",
							"route": "baocao_nuocsach_tinh/model/6thangdau(/:id)",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "baocao_nuocsach_huyentinh",
							"route": "baocao_nuocsach_tinh/model/nam(/:id)",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoNuocSachHuyenTinh/view/ModelView",
							"visible": false
						},
					]
				},
				{
					"text": "Báo cáo Nước sạch dành cho Viện Chuyên Ngành",
					"icon": "glyphicon glyphicon-file",
					"type": "category",
//					"collectionName": "baocao_vienchuyennganh_nuoc",
//					"route": "baocao_vienchuyennganh_nuoc/collection",
//					"$ref": "app/view/BaoCaoNuoc/BaoCaoVienChuyenNganhNuoc/view/CollectionView",
					"tuyendonvi": 1,
					"visible": function () {
						return this.checkTuyendonvi([1,10]);
					},
					"entries": [
						{
							"text": "Báo cáo 6 tháng đầu năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "baocao_vienchuyennganh_nuoc",
							"route": "baocao_vienchuyennganh_nuoc/collection?loaikybaocao=6thangdau",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoVienChuyenNganhNuoc/view/CollectionView",
						},
						{
							"text": "Báo cáo năm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "baocao_vienchuyennganh_nuoc",
							"route": "baocao_vienchuyennganh_nuoc/collection?loaikybaocao=nam",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoVienChuyenNganhNuoc/view/CollectionView",
						},
						{
							"type": "view",
							"collectionName": "baocao_vienchuyennganh_nuoc",
							"route": "baocao_vienchuyennganh_nuoc/model/6thangdau(/:id)",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoVienChuyenNganhNuoc/view/ModelView",
							"visible": false
						},
						{
							"type": "view",
							"collectionName": "baocao_vienchuyennganh_nuoc",
							"route": "baocao_vienchuyennganh_nuoc/model/nam(/:id)",
							"$ref": "app/view/BaoCaoNuoc/BaoCaoVienChuyenNganhNuoc/view/ModelView",
							"visible": false
						},
					]
				},
				{
					"text": "Tìm kiếm báo cáo Nước sạch",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "timkiembaocao",
					"route": "timkiembaocaonuoc",
					"$ref": "app/view/BaoCaoNuoc/TimKiemBaoCaoNuoc/view/ModelView",
					"visible": function () {
						return this.checkTuyendonvi([1,2,3,10]);
					},
				},
				{
					"text": "Tìm kiếm đơn vị chưa gửi báo cáo",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "timkiem_donvi_chua_gui_baocao",
					"route": "timkiem_donvi_chua_gui_baocao",
					"$ref": "app/view/BaoCaoNuoc/TimKiemDonViChuaGuiBaoCaoNuoc/view/ModelView",
					"visible": function () {
						return this.checkTuyendonvi([1,2,3,10]);
					},
				} 
			],
		},
	];
});