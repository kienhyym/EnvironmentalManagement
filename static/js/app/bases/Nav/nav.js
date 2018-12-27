define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [{
			"text": "Hệ thống",
			"icon": "glyphicon glyphicon-file",
			"type": "category",
			"entries": [{
					"text": "Đơn vị thành viên",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "donvi",
					"route": "donvi/collectiontree",
					"$ref": "app/view/HeThong/DonVi/view/CollectionTreeView",
					"visible": function () {
						return this.userHasRole("Admin");
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
					"visible": function () {
						return this.userHasRole("Admin");
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
					"visible": function () {
						return this.userHasRole("Admin");
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
					"visible": function () {
						return this.userHasRole("Admin");
					}
				}, {
					"type": "view",
					"collectionName": "role",
					"route": "role/model(/:id)",
					"$ref": "app/view/HeThong/Role/view/ModelView",
					"visible": false
				},

				{
					"text": "Cài đặt Báo Cáo",
					"type": "view",
					"collectionName": "bctuyendonvi",
					"route": "bctuyendonvi/collection",
					"$ref": "app/view/HeThong/CaiDatBaoCao/view/CollectionView",
					"icon": "glyphicon glyphicon-cog",
					"visible": false
				}, {
					"text": "Cài đặt Báo Cáo",
					"type": "view",
					"collectionName": "bctuyendonvi",
					"route": "bctuyendonvi/model(/:id)",
					"href": "bctuyendonvi/model?tuyendonvi_id=1",
					"$ref": "app/view/HeThong/CaiDatBaoCao/view/ModelView",
					"icon": "glyphicon glyphicon-cog",
					"visible": function () {
						return this.userHasRole("Admin");
					}

				},
			]
		},


		{
			"text": "Danh Mục",
			"icon": "glyphicon glyphicon-menu-hamburger",
			"type": "category",
			"entries": [

				{
					"text": "Dân Tộc",
					"type": "view",
					"collectionName": "dantoc",
					"route": "dantoc/collection",
					"$ref": "app/view/DanhMuc/DanToc/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
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
					"visible": function () {
						return this.userHasRole("Admin");
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
					"visible": function () {
						return this.userHasRole("Admin");
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
						return this.checkTuyendonvi(3);
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
						return this.checkTuyendonvi(4);
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
						return this.checkTuyendonvi(4);
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
					"text": "Trình độ học vấn",
					"type": "view",
					"collectionName": "trinhdohocvan",
					"route": "trinhdohocvan/collection",
					"$ref": "app/view/DanhMuc/TrinhDoHocVan/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "trinhdohocvan",
					"route": "trinhdohocvan/model",
					"$ref": "app/view/DanhMuc/TrinhDoHocVan/view/ModelView",
					"visible": false
				},
				{
					"text": "Nghề Nghiệp",
					"type": "view",
					"collectionName": "nghenghiep",
					"route": "nghenghiep/collection",
					"$ref": "app/view/DanhMuc/NgheNghiep/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "nghenghiep",
					"route": "nghenghiep/model",
					"$ref": "app/view/DanhMuc/NgheNghiep/view/ModelView",
					"visible": false
				},
				{
					"text": "Danh mục hoạt động",
					"type": "view",
					"collectionName": "danhmuchoatdong",
					"route": "danhmuchoatdong/collection",
					"$ref": "app/view/DanhMuc/DanhMucHD/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "danhmuchoatdong",
					"route": "danhmuchoatdong/model",
					"$ref": "app/view/DanhMuc/DanhMucHD/view/ModelView",
					"visible": false
				},
				{
					"text": "Thông số báo cáo chất lượng nước",
					"type": "view",
					"collectionName": "thongsobaocaochatluongnuoc",
					"route": "thongsobaocaochatluongnuoc/collection",
					"$ref": "app/view/DanhMuc/ThongSoBaoCaoChatLuongNuoc/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "thongsobaocaochatluongnuoc",
					"route": "thongsobaocaochatluongnuoc/model",
					"$ref": "app/view/DanhMuc/ThongSoBaoCaoChatLuongNuoc/view/ModelView",
					"visible": false
				},
			]
		},
		{
			"text": "Vệ sinh hộ gia đình",
			"icon": "glyphicon glyphicon-tasks",
			"type": "category",
			"entries": [{
					"text": "Cấp thôn",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "vscapthon",
					"route": "vscapthon/collection",
					"$ref": "app/view/VeSinhHoGiaDinh/CapThon/view/CollectionView",
					"tuyendonvi": 4,
					"visible": function () {
						return this.checkTuyendonvi(4);
					}
				},
				{
					"type": "view",
					"collectionName": "vscapthon",
					"route": "vscapthon/model",
					"$ref": "app/view/VeSinhHoGiaDinh/CapThon/view/ModelView",
					"visible": false
				},
				{
					"text": "Cấp xã",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "vscapxa",
					"route": "vscapxa/collection",
					"$ref": "app/view/VeSinhHoGiaDinh/CapXa/view/CollectionView",
					"tuyendonvi": 4,
					"visible": function () {
						return this.checkTuyendonvi(4);
					}
				},
				{
					"type": "view",
					"collectionName": "vscapxa",
					"route": "vscapxa/model",
					"$ref": "app/view/VeSinhHoGiaDinh/CapXa/view/ModelView",
					"visible": false
				},
				{
					"text": "Cấp huyện",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "vscaphuyen",
					"route": "vscaphuyen/collection",
					"$ref": "app/view/VeSinhHoGiaDinh/CapHuyen/view/CollectionView",
					"tuyendonvi": 3,
					"visible": function () {
						return this.checkTuyendonvi(3);
					}
				},
				{
					"type": "view",
					"collectionName": "vscaphuyen",
					"route": "vscaphuyen/model",
					"$ref": "app/view/VeSinhHoGiaDinh/CapHuyen/view/ModelView",
					"visible": false
				},
				{
					"text": "Cấp tỉnh",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "vscaptinh",
					"route": "vscaptinh/collection",
					"$ref": "app/view/VeSinhHoGiaDinh/CapTinh/view/CollectionView",
					"tuyendonvi": 2,
					"visible": function () {
						return this.checkTuyendonvi(2);
					}
				},
				{
					"type": "view",
					"collectionName": "vscaptinh",
					"route": "vscaptinh/model",
					"$ref": "app/view/VeSinhHoGiaDinh/CapTinh/view/ModelView",
					"visible": false
				},

			],
		},
		{
			"text": "Chương trình SUPRSWS",
			"icon": "glyphicon glyphicon-tasks",
			"type": "category",
			"entries": [{
					"text": "Kế hoạch BCC",
					"icon": "glyphicon glyphicon-file",
					"type": "category",
					"collectionName": "kehoachbcc",
					"route": "kehoachbcc/collection",
					"$ref": "app/view/kehoachbcc/KeHoachBCCView",
					"entries": [{
							"text": "Hoạt động cấp thôn",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "itemthon",
							"route": "itemthon/collection",
							"$ref": "app/view/PhuLuc/LapKHThon/view/CollectionView",
							"tuyendonvi": 4,
							"visible": function () {
								return this.checkTuyendonvi(4);
							}
						},
						{
							"type": "view",
							"collectionName": "itemthon",
							"route": "itemthon/model",
							"$ref": "app/view/PhuLuc/LapKHThon/view/ModelView",
							"visible": false
						},
						{
							"text": "Hoạt động cấp huyện",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "itemhuyen",
							"route": "itemhuyen/collection",
							"$ref": "app/view/PhuLuc/LapKHHuyen/view/CollectionView",
							"tuyendonvi": 3,
							"visible": function () {
								return this.checkTuyendonvi(3);
							}
						},
						{
							"type": "view",
							"collectionName": "itemhuyen",
							"route": "itemhuyen/model",
							"$ref": "app/view/PhuLuc/LapKHHuyen/view/ModelView",
							"visible": false
						},
						{
							"text": "Hoạt động cấp xã",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "itemxa",
							"route": "itemxa/collection",
							"$ref": "app/view/PhuLuc/LapKHXa/view/CollectionView",
							"tuyendonvi": 4,
							"visible": function () {
								return this.checkTuyendonvi(4);
							}
						},
						{
							"type": "view",
							"collectionName": "itemxa",
							"route": "itemxa/model",
							"$ref": "app/view/PhuLuc/LapKHXa/view/ModelView",
							"visible": false
						},
						{
							"text": "Hoạt động cấp tỉnh",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "kehoachthuchien",
							"route": "kehoachthuchien/collection",
							"$ref": "app/view/PhuLuc/LapKHTinh/view/CollectionView",
							"tuyendonvi": 2,
							"visible": function () {
								return this.checkTuyendonvi(2);
							}
						},
						{
							"type": "view",
							"collectionName": "kehoachthuchien",
							"route": "kehoachthuchien/model",
							"$ref": "app/view/PhuLuc/LapKHTinh/view/ModelView",
							"visible": false
						},
//						{
//							"text": "Mẫu số 6.1. Các hoạt động BCC - Tỉnh",
//							"icon": "glyphicon glyphicon-tasks",
//							"type": "view",
//							"collectionName": "hoatdongbcctinh",
//							"route": "hoatdongbcctinh/collection",
//							"$ref": "app/view/HoatDongGD/HoatDongBCCTinh/view/CollectionView",
//							"tuyendonvi": 2,
//							"visible": function () {
//								return this.checkTuyendonvi(2);
//							}
//						},
//						{
//							"type": "view",
//							"collectionName": "hoatdongbcctinh",
//							"route": "hoatdongbcctinh/model",
//							"$ref": "app/view/HoatDongGD/HoatDongBCCTinh/view/ModelView",
//							"visible": false
//						},
//						{
//							"text": "Mẫu số 6.2. Các hoạt động BCC - Huyện",
//							"icon": "glyphicon glyphicon-tasks",
//							"type": "view",
//							"collectionName": "hoatdongbcchuyen",
//							"route": "hoatdongbcchuyen/collection",
//							"$ref": "app/view/HoatDongGD/HoatDongBCCHuyen/view/CollectionView",
//							"tuyendonvi": 3,
//							"visible": function () {
//								return this.checkTuyendonvi(3);
//							}
//						},
//						{
//							"type": "view",
//							"collectionName": "hoatdongbcchuyen",
//							"route": "hoatdongbcchuyen/model",
//							"$ref": "app/view/HoatDongGD/HoatDongBCCHuyen/view/ModelView",
//							"visible": false
//						},
//						{
//							"text": "Mẫu số 6.3. Các hoạt động BCC Xã/Thôn",
//							"icon": "glyphicon glyphicon-tasks",
//							"type": "view",
//							"collectionName": "hoatdongbccxathon",
//							"route": "hoatdongbccxathon/collection",
//							"$ref": "app/view/HoatDongGD/HoatDongBCCXaThon/view/CollectionView",
//							"tuyendonvi": 4,
//							"visible": function () {
//								return this.checkTuyendonvi(4);
//							}
//						},
//						{
//							"type": "view",
//							"collectionName": "hoatdongbccxathon",
//							"route": "hoatdongbccxathon/model",
//							"$ref": "app/view/HoatDongGD/HoatDongBCCXaThon/view/ModelView",
//							"visible": false
//						},
//						{
//							"text": "Mẫu số 6.4. Các hoạt động BCC - Trường học",
//							"icon": "glyphicon glyphicon-tasks",
//							"type": "view",
//							"collectionName": "hoatdongbcctruonghoc",
//							"route": "hoatdongbcctruonghoc/collection",
//							"$ref": "app/view/HoatDongGD/HoatDongBCCTruongHoc/view/CollectionView",
//							"tuyendonvi": 4,
//							"visible": function () {
//								return this.checkTuyendonvi(4);
//							}
//						},
//						{
//							"type": "view",
//							"collectionName": "hoatdongbcctruonghoc",
//							"route": "hoatdongbcctruonghoc/model",
//							"$ref": "app/view/HoatDongGD/HoatDongBCCTruongHoc/view/ModelView",
//							"visible": false
//						},
					]
				},
				{
					"text": "Xã vệ sinh toàn xã",
					"icon": "glyphicon glyphicon-file",
					"type": "category",
					"collectionName": "xavesinhtoanxa",
					"route": "xavesinhtoanxa/collection",
					"$ref": "app/view/xavesinhtoanxa/XaVeSinhToanXaView",
					"entries": [{
							"text": "Biểu mẫu số 2: Tiến độ thực hiện vệ sinh toàn xã của tỉnh",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "vstoanxa",
							"route": "vstoanxa/collection",
							"$ref": "app/view/PhuLuc/VSToanXa/view/CollectionView",
							"tuyendonvi": 2,
							"visible": function () {
								return this.checkTuyendonvi(2);
							}
						},
						{
							"type": "view",
							"collectionName": "vstoanxa",
							"route": "vstoanxa/model",
							"$ref": "app/view/PhuLuc/VSToanXa/view/ModelView",
							"visible": false
						},
						{
							"text": "Duy trì vệ sinh toàn xã bền vững",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "duytrivs",
							"route": "duytrivs/collection",
							"$ref": "app/view/PhuLuc/DuyTriVS/view/CollectionView",
							"tuyendonvi": 4,
							"visible": function () {
								return this.checkTuyendonvi(4);
							}
						},
						{
							"type": "view",
							"collectionName": "duytrivs",
							"route": "duytrivs/model",
							"$ref": "app/view/PhuLuc/DuyTriVS/view/ModelView",
							"visible": false
						},
					]
				},
				{
					"text": "Trường học/Trạm y tế",
					"icon": "glyphicon glyphicon-file",
					"type": "category",
					"collectionName": "truonghoctramyte",
					"route": "truonghoctramyte/collection",
					"$ref": "app/view/truonghoctramyte/TruongHocTramYTeView",
					"entries": [{
							"text": "Biểu mẫu số 4: Giới và Dân tộc thiểu số",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "dtthieuso",
							"route": "dtthieuso/collection",
							"$ref": "app/view/PhuLuc/DTThieuSo/view/CollectionView",
							"tuyendonvi": 4,
							"visible": function () {
								return this.checkTuyendonvi(4);
							}
						},
						{
							"type": "view",
							"collectionName": "dtthieuso",
							"route": "dtthieuso/model",
							"$ref": "app/view/PhuLuc/DTThieuSo/view/ModelView",
							"visible": false
						},
						{
							"text": "Biểu mẫu số 5: Phiếu điều tra trường học/ TYT",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "dttruonghoc",
							"route": "dttruonghoc/collection",
							"$ref": "app/view/PhuLuc/DTTruongHoc/view/CollectionView",
							"tuyendonvi": 4,
							"visible": function () {
								return this.checkTuyendonvi(4);
							}
						},
						{
							"type": "view",
							"collectionName": "dttruonghoc",
							"route": "dttruonghoc/model",
							"$ref": "app/view/PhuLuc/DTTruongHoc/view/ModelView",
							"visible": false
						},
						{
							"text": "Mẫu số 1: Dùng cho nhà tiêu tự hoại",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "kiemtratinhtrangvss",
							"route": "kiemtratinhtrangvss/collection",
							"$ref": "app/view/HoatDongGD/KiemTraTinhTrangVS/view/CollectionView",
							"tuyendonvi": 4,
							"visible": function () {
								return this.checkTuyendonvi(4);
							}
						},
						{
							"type": "view",
							"collectionName": "kiemtratinhtrangvss",
							"route": "kiemtratinhtrangvss/model",
							"$ref": "app/view/HoatDongGD/KiemTraTinhTrangVS/view/ModelView",
							"visible": false
						},
						{
							"text": "Mẫu số 2: Dùng cho nhà tiêu thấm dội nước",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "nhatieuthamnuoc",
							"route": "nhatieuthamnuoc/collection",
							"$ref": "app/view/HoatDongGD/NhaTieuThamNuoc/view/CollectionView",
							"tuyendonvi": 4,
							"visible": function () {
								return this.checkTuyendonvi(4);
							}
						},
						{
							"type": "view",
							"collectionName": "nhatieuthamnuoc",
							"route": "nhatieuthamnuoc/model",
							"$ref": "app/view/HoatDongGD/NhaTieuThamNuoc/view/ModelView",
							"visible": false
						},
						{
							"text": "Mẫu số 3: Dùng cho nhà tiêu 2 ngăn",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "nhatieu2ngan",
							"route": "nhatieu2ngan/collection",
							"$ref": "app/view/HoatDongGD/NhaTieu2Ngan/view/CollectionView",
							"tuyendonvi": 4,
							"visible": function () {
								return this.checkTuyendonvi(4);
							}
						},
						{
							"type": "view",
							"collectionName": "nhatieu2ngan",
							"route": "nhatieu2ngan/model",
							"$ref": "app/view/HoatDongGD/NhaTieu2Ngan/view/ModelView",
							"visible": false
						},
						{
							"text": "Mẫu số 4: Dùng cho nhà tiêu chìm",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "nhatieuchim",
							"route": "nhatieuchim/collection",
							"$ref": "app/view/HoatDongGD/NhaTieuChim/view/CollectionView",
							"tuyendonvi": 4,
							"visible": function () {
								return this.checkTuyendonvi(4);
							}
						},
						{
							"type": "view",
							"collectionName": "nhatieuchim",
							"route": "nhatieuchim/model",
							"$ref": "app/view/HoatDongGD/NhaTieuChim/view/ModelView",
							"visible": false
						},
						{
							"text": "Mẫu số 5. Cho trường học và trạm y tế",
							"icon": "glyphicon glyphicon-tasks",
							"type": "view",
							"collectionName": "chotruonghoctramyte",
							"route": "chotruonghoctramyte/collection",
							"$ref": "app/view/HoatDongGD/ChoTruongHocTramYTE/view/CollectionView",
							"tuyendonvi": 4,
							"visible": function () {
								return this.checkTuyendonvi(4);
							}
						},
						{
							"type": "view",
							"collectionName": "chotruonghoctramyte",
							"route": "chotruonghoctramyte/model",
							"$ref": "app/view/HoatDongGD/ChoTruongHocTramYTE/view/ModelView",
							"visible": false
						}
					]
				}
			]
		},
		{
			"text": "Chất lượng nước sạch",
			"icon": "glyphicon glyphicon-tasks",
			"type": "category",
			"entries": [{
					"text": "Mẫu số 01: Kết quả ngoại kiểm chất lượng nước sạch",
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
					"text": "Mẫu số 02: Kết quả kiểm tra chất lượng nước sạch",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "baocaokiemtraclnuocsach",
					"route": "baocaokiemtraclnuocsach/collection",
					"$ref": "app/view/BaoCaoNuoc/BaoCaoKiemTraCLNuocSach/view/CollectionView",
				},
				{
					"type": "view",
					"collectionName": "baocaokiemtraclnuocsach",
					"route": "baocaokiemtraclnuocsach/model",
					"$ref": "app/view/BaoCaoNuoc/BaoCaoKiemTraCLNuocSach/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu số 03: Tổng hợp kết quả kiểm tra chất lượng nước sạch",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "kqkiemtranuocsach",
					"route": "kqkiemtranuocsach/collection",
					"$ref": "app/view/BaoCaoNuoc/KQKiemTraNuocSach/view/CollectionView",
				},
				{
					"type": "view",
					"collectionName": "kqkiemtranuocsach",
					"route": "kqkiemtranuocsach/model",
					"$ref": "app/view/BaoCaoNuoc/KQKiemTraNuocSach/view/ModelView",
					"visible": false
				},

				{
					"text": "Mẫu số 04: Tổng hợp kết quả kiểm tra chất lượng nước sạch",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "kqktchatluong",
					"route": "kqktchatluong/collection",
					"$ref": "app/view/BaoCaoNuoc/KQKTChatLuong/view/CollectionView",
				},
				{
					"type": "view",
					"collectionName": "kqktchatluong",
					"route": "kqktchatluong/model",
					"$ref": "app/view/BaoCaoNuoc/KQKTChatLuong/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu số 06: Tổng hợp kết quả nội kiểm chất lượng nước sạch",
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "thkqnoikiemnuocsach",
					"route": "thkqnoikiemnuocsach/collection",
					"$ref": "app/view/BaoCaoNuoc/THKQNoiKiemNuocSach/view/CollectionView",
				},
				{
					"type": "view",
					"collectionName": "thkqnoikiemnuocsach",
					"route": "thkqnoikiemnuocsach/model",
					"$ref": "app/view/BaoCaoNuoc/THKQNoiKiemNuocSach/view/ModelView",
					"visible": false
				},
			],
		},


	];

});