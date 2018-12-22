define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [{
			"text": "Hệ thống",
			"icon": "glyphicon glyphicon-file",
			//"icon":"http://103.74.120.71/baocaoydct/images/icons/task_120.png",
			"type": "category",
			"visible": function () {
				return this.userHasRole("Admin");
			},
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
					"visible": function () {
						return this.userHasRole("Admin");
					}
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
					"text": "Cài đặt Báo Cáo*",
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
					"href":"bctuyendonvi/model?tuyendonvi_id=1",
					"$ref": "app/view/HeThong/CaiDatBaoCao/view/ModelView",
					"icon": "glyphicon glyphicon-cog",
					"visible": function () {
						return this.userHasRole("Admin");
					}
					
				},
			]
		},
		{
			"text": "Thong tu quy chuan nuoc",
			"icon": "glyphicon glyphicon-file",
			"type": "category",
			"visible": function () {
				return this.userHasRole("Admin");
			},
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
					"text": "Dân Tộc",
					"icon": "glyphicon glyphicon-file",
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
			],
		},

		{
			"text": "Danh Mục",
			"icon": "glyphicon glyphicon-menu-hamburger",
			"type": "category",
			"visible": function () {
				return this.userHasRole("Admin");
			},
			"entries": [

				{
					"text": "Dân Tộc",
					"icon": "glyphicon glyphicon-file",
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
					"icon": "glyphicon glyphicon-file",
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
					"icon": "glyphicon glyphicon-file",
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
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "quanhuyen",
					"route": "quanhuyen/collection",
					"$ref": "app/view/DanhMuc/QuanHuyen/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
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
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "xaphuong",
					"route": "xaphuong/collection",
					"$ref": "app/view/DanhMuc/XaPhuong/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
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
					"icon": "glyphicon glyphicon-file",
					"type": "view",
					"collectionName": "thonxom",
					"route": "thonxom/collection",
					"$ref": "app/view/DanhMuc/ThonXom/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
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
					"icon": "glyphicon glyphicon-file",
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
					"icon": "glyphicon glyphicon-file",
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
			]
		},

		{
			"text": "Báo Cáo - Phụ Lục IV",
			"icon": "glyphicon glyphicon-tasks",
			"type": "category",
			"visible": function () {
				return this.userHasRole("Admin");
			},
			"entries": [

				{
					"text": "Mẫu 1: Khai Thác Nước Ngầm",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "khaithacnuocngam",
					"route": "khaithacnuocngam/collection",
					"$ref": "app/view/BaoCao/KhaiThacNuocNgam/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "khaithacnuocngam",
					"route": "khaithacnuocngam/model",
					"$ref": "app/view/BaoCao/KhaiThacNuocNgam/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 2: Khai Thác Nước Sông",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "khaithacnuocsong",
					"route": "khaithacnuocsong/collection",
					"$ref": "app/view/BaoCao/KhaiThacNuocSong/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "khaithacnuocsong",
					"route": "khaithacnuocsong/model",
					"$ref": "app/view/BaoCao/KhaiThacNuocSong/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 3: Khai Thác Nước Từ Hồ Chứa",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "khaithacnuoctuhochua",
					"route": "khaithacnuoctuhochua/collection",
					"$ref": "app/view/BaoCao/KhaiThacNuocTuHoChua/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "khaithacnuoctuhochua",
					"route": "khaithacnuoctuhochua/model",
					"$ref": "app/view/BaoCao/KhaiThacNuocTuHoChua/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 4: Phiếu Nội Kiểm Tra Chất Lượng",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "phieunoikiemchatluong",
					"route": "phieunoikiemchatluong/collection",
					"$ref": "app/view/BaoCao/PhieuNoiKiemChatLuong/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "phieunoikiemchatluong",
					"route": "phieunoikiemchatluong/model",
					"$ref": "app/view/BaoCao/PhieuNoiKiemChatLuong/view/ModelView",
					"visible": false
				},

				{
					"text": "Mẫu 5: Phiếu Ngoại Kiểm Vệ Sinh Chất Lượng",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "phieungoaikiemchatluong",
					"route": "phieungoaikiemchatluong/collection",
					"$ref": "app/view/BaoCao/PhieuNgoaiKiemChatLuong/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "phieungoaikiemchatluong",
					"route": "phieungoaikiemchatluong/model",
					"$ref": "app/view/BaoCao/PhieuNgoaiKiemChatLuong/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 6: Kiểm Tra Nguồn Nước Gia Đình",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "kiemtranguonnuochogiadinh",
					"route": "kiemtranguonnuochogiadinh/collection",
					"$ref": "app/view/BaoCao/KiemTraNguonNuocHoGiaDinh/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "kiemtranguonnuochogiadinh",
					"route": "kiemtranguonnuochogiadinh/model",
					"$ref": "app/view/BaoCao/KiemTraNguonNuocHoGiaDinh/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 7: Kiểm Tra Chất Lượng Nước Thành Phẩm",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "kiemtrachatluongnuocthanhpham",
					"route": "kiemtrachatluongnuocthanhpham/collection",
					"$ref": "app/view/BaoCao/KiemTraVSChatLuongNuocThanhPham/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "kiemtrachatluongnuocthanhpham",
					"route": "kiemtrachatluongnuocthanhpham/model",
					"$ref": "app/view/BaoCao/KiemTraVSChatLuongNuocThanhPham/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 8: Kết Quả Kiểm Tra Vệ Sinh Nước Ăn Uống Sinh Hoạt",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "kqktvesinhnuocsinhhoatcapxa",
					"route": "kqktvesinhnuocsinhhoatcapxa/collection",
					"$ref": "app/view/BaoCao/KQKTVeSinhNuocSinhHoatCapXa/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "kqktvesinhnuocsinhhoatcapxa",
					"route": "kqktvesinhnuocsinhhoatcapxa/model",
					"$ref": "app/view/BaoCao/KQKTVeSinhNuocSinhHoatCapXa/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 9: Kết Quả Kiểm Tra Vệ Sinh Nước Ăn Uống Sinh Hoạt",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "kqktchatluongnuocsinhhoatcaphuyen",
					"route": "kqktchatluongnuocsinhhoatcaphuyen/collection",
					"$ref": "app/view/BaoCao/KQKTChatLuongNuocSinhHoatCapHuyen/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "kqktchatluongnuocsinhhoatcaphuyen",
					"route": "kqktchatluongnuocsinhhoatcaphuyen/model",
					"$ref": "app/view/BaoCao/KQKTChatLuongNuocSinhHoatCapHuyen/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 10: Kết Quả Ngoại Kiểm Vệ Sinh",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "kqngoaikiemnuocsinhhoat",
					"route": "kqngoaikiemnuocsinhhoat/collection",
					"$ref": "app/view/BaoCao/KQNgoaiKiemNuocSinhHoat/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "kqngoaikiemnuocsinhhoat",
					"route": "kqngoaikiemnuocsinhhoat/model",
					"$ref": "app/view/BaoCao/KQNgoaiKiemNuocSinhHoat/view/ModelView",
					"visible": false
				},

				{
					"text": "Mẫu 11: Kết Quả Nước Ăn Uống Sinh Hoạt",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "kqchatluongnuocanuong",
					"route": "kqchatluongnuocanuong/collection",
					"$ref": "app/view/BaoCao/KQChatLuongNuocAnUong/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "kqchatluongnuocanuong",
					"route": "kqchatluongnuocanuong/model",
					"$ref": "app/view/BaoCao/KQChatLuongNuocAnUong/view/ModelView",
					"visible": false
				},

				{
					"text": "Mẫu 12: Tổng Kết Quả Nội Kiểm Vệ Sinh",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "tonghopkqnuocsinhhoattren1000m",
					"route": "tonghopkqnuocsinhhoattren1000m/collection",
					"$ref": "app/view/BaoCao/TongHopKQNuocSinhHoatTren1000m/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "tonghopkqnuocsinhhoattren1000m",
					"route": "tonghopkqnuocsinhhoattren1000m/model",
					"$ref": "app/view/BaoCao/TongHopKQNuocSinhHoatTren1000m/view/ModelView",
					"visible": false
				},
			],
		},

		{
			"text": "Báo Cáo - Phụ Lục V",
			"icon": "glyphicon glyphicon-tasks",
			"type": "category",
			"visible": function () {
				return this.userHasRole("Admin");
			},
			"entries": [{
					"text": "Mẫu 1: Báo Cáo Thu Thập Dữ Liệu",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "bcthuthapdulieu",
					"route": "bcthuthapdulieu/collection",
					"$ref": "app/view/BaoCaoPhuLuc5/BCThuThapDuLieu/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "bcthuthapdulieu",
					"route": "bcthuthapdulieu/model",
					"$ref": "app/view/BaoCaoPhuLuc5/BCThuThapDuLieu/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 2: Bàn Giao Dữ Liệu Thu Thập",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "bangiaodulieudathuthap",
					"route": "bangiaodulieudathuthap/collection",
					"$ref": "app/view/BaoCaoPhuLuc5/BanGiaoDuLieuDaThuThap/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "bangiaodulieudathuthap",
					"route": "bangiaodulieudathuthap/model",
					"$ref": "app/view/BaoCaoPhuLuc5/BanGiaoDuLieuDaThuThap/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 3: Phân Loại Đánh Giá Dữ Liệu",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "phanloaivadanhgiadulieu",
					"route": "phanloaivadanhgiadulieu/collection",
					"$ref": "app/view/BaoCaoPhuLuc5/PhanLoaiVaDanhGiaDuLieu/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "phanloaivadanhgiadulieu",
					"route": "phanloaivadanhgiadulieu/model",
					"$ref": "app/view/BaoCaoPhuLuc5/PhanLoaiVaDanhGiaDuLieu/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 4: Báo Cáo Xây Cấu Trúc Dữ Liệu Đặc Tả",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "bcxaydungdulieudacta",
					"route": "bcxaydungdulieudacta/collection",
					"$ref": "app/view/BaoCaoPhuLuc5/BCXayDungDuLieuDacTa/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "bcxaydungdulieudacta",
					"route": "bcxaydungdulieudacta/model",
					"$ref": "app/view/BaoCaoPhuLuc5/BCXayDungDuLieuDacTa/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 5: Báo Cáo Kết Quả Sửa Chữa",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "bcketquasuachua",
					"route": "bcketquasuachua/collection",
					"$ref": "app/view/BaoCaoPhuLuc5/BCKetQuaSuaChua/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "bcketquasuachua",
					"route": "bcketquasuachua/model",
					"$ref": "app/view/BaoCaoPhuLuc5/BCKetQuaSuaChua/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 6: Báo Cáo Kết Quả Kiểm Tra",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "bcketquakiemtra",
					"route": "bcketquakiemtra/collection",
					"$ref": "app/view/BaoCaoPhuLuc5/BCKetQuaKiemTra/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "bcketquakiemtra",
					"route": "bcketquakiemtra/model",
					"$ref": "app/view/BaoCaoPhuLuc5/BCKetQuaKiemTra/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu 7: Biên Bản Bàn Giao Sản Phẩm",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "bienbanbangiaosanpham",
					"route": "bienbanbangiaosanpham/collection",
					"$ref": "app/view/BaoCaoPhuLuc5/BienBanBanGiaoSanPham/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "bienbanbangiaosanpham",
					"route": "bienbanbangiaosanpham/model",
					"$ref": "app/view/BaoCaoPhuLuc5/BienBanBanGiaoSanPham/view/ModelView",
					"visible": false
				},
			],
		},

		{
			"text": "Vệ Sinh Gia Đình",
			"icon": "glyphicon glyphicon-tasks",
			"type": "category",
			"visible": function () {
				return this.userHasRole("Admin");
			},
			"entries": [{
					"text": "Dùng Cho Nhà Tiêu Tự Hoại",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "nhatieutuhoai",
					"route": "nhatieutuhoai/collection",
					"$ref": "app/view/Vesinhgiadinh/NhaTieuTuHoai/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "nhatieutuhoai",
					"route": "nhatieutuhoai/model",
					"$ref": "app/view/Vesinhgiadinh/NhaTieuTuHoai/view/ModelView",
					"visible": false
				},
				{
					"text": "Dùng Cho Nhà Tiêu Thấm Dội Nước",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "nhatieuthamdoinuoc",
					"route": "nhatieuthamdoinuoc/collection",
					"$ref": "app/view/Vesinhgiadinh/NhaTieuTham/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "nhatieuthamdoinuoc",
					"route": "nhatieuthamdoinuoc/model",
					"$ref": "app/view/Vesinhgiadinh/NhaTieuTham/view/ModelView",
					"visible": false
				},
				{
					"text": "Dùng Cho Nhà Tiêu 2 Ngăn",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "dungchonhatieu2ngan",
					"route": "dungchonhatieu2ngan/collection",
					"$ref": "app/view/Vesinhgiadinh/DungChoNhaTieu2Ngan/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "dungchonhatieu2ngan",
					"route": "dungchonhatieu2ngan/model",
					"$ref": "app/view/Vesinhgiadinh/DungChoNhaTieu2Ngan/view/ModelView",
					"visible": false
				},
				{
					"text": "Dùng Cho Nhà Tiêu Chìm Có Ống Thông Hơi",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "nhatieuthonghoi",
					"route": "nhatieuthonghoi/collection",
					"$ref": "app/view/Vesinhgiadinh/NhaTieuThongHoi/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "nhatieuthonghoi",
					"route": "nhatieuthonghoi/model",
					"$ref": "app/view/Vesinhgiadinh/NhaTieuThongHoi/view/ModelView",
					"visible": false
				},
				{
					"text": "Dùng Cho Trạm Y Tế Xã",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "ncsachnhatieuhogd",
					"route": "ncsachnhatieuhogd/collection",
					"$ref": "app/view/Vesinhgiadinh/NcSachNhaTieuHoGD/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "ncsachnhatieuhogd",
					"route": "ncsachnhatieuhogd/model",
					"$ref": "app/view/Vesinhgiadinh/NcSachNhaTieuHoGD/view/ModelView",
					"visible": false
				},
				{
					"text": "Dùng Cho Trạm Y Tế Dự Phòng Huyện",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "yteduphonghuyen",
					"route": "yteduphonghuyen/collection",
					"$ref": "app/view/Vesinhgiadinh/yTEDuPhongHuyen/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "yteduphonghuyen",
					"route": "yteduphonghuyen/model",
					"$ref": "app/view/Vesinhgiadinh/yTEDuPhongHuyen/view/ModelView",
					"visible": false
				},
				{
					"text": "Dùng Cho Trạm Y Tế Dự Phòng Tỉnh",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "yteduphongtinh",
					"route": "yteduphongtinh/collection",
					"$ref": "app/view/Vesinhgiadinh/yTEDuPhongTinh/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "yteduphongtinh",
					"route": "yteduphongtinh/model",
					"$ref": "app/view/Vesinhgiadinh/yTEDuPhongTinh/view/ModelView",
					"visible": false
				},
				{
					"text": "Kiểm Tra Kết Quả Nước Dự Phòng Tỉnh",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "trungtamyteduphong",
					"route": "trungtamyteduphong/collection",
					"$ref": "app/view/Vesinhgiadinh/TrungTamYteDuPhong/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "trungtamyteduphong",
					"route": "trungtamyteduphong/model",
					"$ref": "app/view/Vesinhgiadinh/TrungTamYteDuPhong/view/ModelView",
					"visible": false
				},
				{
					"text": "Dùng cho các Viện chuyên ngành khu vực",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "vienchuyennganhkhuvuc",
					"route": "vienchuyennganhkhuvuc/collection",
					"$ref": "app/view/Vesinhgiadinh/VienChuyenNganhKhuVuc/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "vienchuyennganhkhuvuc",
					"route": "vienchuyennganhkhuvuc/model",
					"$ref": "app/view/Vesinhgiadinh/VienChuyenNganhKhuVuc/view/ModelView",
					"visible": false
				},

			],
		},

		{
			"text": "Phụ Lục - Biểu Mẫu",
			"icon": "glyphicon glyphicon-tasks",
			"type": "category",
			"visible": function () {
				return this.userHasRole("Admin");
			},
			"entries": [{
					"text": "Biểu mẫu số 1: Cấp thôn",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "capthon",
					"route": "capthon/collection",
					"$ref": "app/view/PhuLuc/CapThon/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "capthon",
					"route": "capthon/model",
					"$ref": "app/view/PhuLuc/CapThon/view/ModelView",
					"visible": false
				},
				{
					"text": "Biểu mẫu số 2: Cấp xã",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "capxa",
					"route": "capxa/collection",
					"$ref": "app/view/PhuLuc/CapXa/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "capxa",
					"route": "capxa/model",
					"$ref": "app/view/PhuLuc/CapXa/view/ModelView",
					"visible": false
				},
				{
					"text": "Biểu mẫu số 3: Cấp huyện",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "caphuyen",
					"route": "caphuyen/collection",
					"$ref": "app/view/PhuLuc/CapHuyen/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "caphuyen",
					"route": "caphuyen/model",
					"$ref": "app/view/PhuLuc/CapHuyen/view/ModelView",
					"visible": false
				},
				{
					"text": "Biểu mẫu số 4: Cấp tỉnh",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "captinh",
					"route": "captinh/collection",
					"$ref": "app/view/PhuLuc/CapTinh/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "captinh",
					"route": "captinh/model",
					"$ref": "app/view/PhuLuc/CapTinh/view/ModelView",
					"visible": false
				},
				{
					"text": "Biểu mẫu số 1: Tiến độ thực hiện chỉ số giải ngân",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "khtruyenthong",
					"route": "khtruyenthong/collection",
					"$ref": "app/view/PhuLuc/KHTruyenThong/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "khtruyenthong",
					"route": "khtruyenthong/model",
					"$ref": "app/view/PhuLuc/KHTruyenThong/view/ModelView",
					"visible": false
				},
				{
					"text": "Biểu mẫu số 2: Tiến độ thực hiện vệ sinh toàn xã của tỉnh",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "vstoanxa",
					"route": "vstoanxa/collection",
					"$ref": "app/view/PhuLuc/VSToanXa/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
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
					"text": "Biểu mẫu số 3: Tiến độ thực hiện duy trì vệ sinh toàn xã bền vững",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "duytrivs",
					"route": "duytrivs/collection",
					"$ref": "app/view/PhuLuc/DuyTriVS/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "duytrivs",
					"route": "duytrivs/model",
					"$ref": "app/view/PhuLuc/DuyTriVS/view/ModelView",
					"visible": false
				},
				{
					"text": "Biểu mẫu số 4: Giới và Dân tộc thiểu số",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "dtthieuso",
					"route": "dtthieuso/collection",
					"$ref": "app/view/PhuLuc/DTThieuSo/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
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
					"visible": function () {
						return this.userHasRole("Admin");
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
					"visible": function () {
						return this.userHasRole("Admin");
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
					"visible": function () {
						return this.userHasRole("Admin");
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
					"visible": function () {
						return this.userHasRole("Admin");
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
					"visible": function () {
						return this.userHasRole("Admin");
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
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "chotruonghoctramyte",
					"route": "chotruonghoctramyte/model",
					"$ref": "app/view/HoatDongGD/ChoTruongHocTramYTE/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu số 6.1. Các hoạt động BCC - Tỉnh",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "hoatdongbcctinh",
					"route": "hoatdongbcctinh/collection",
					"$ref": "app/view/HoatDongGD/HoatDongBCCTinh/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "hoatdongbcctinh",
					"route": "hoatdongbcctinh/model",
					"$ref": "app/view/HoatDongGD/HoatDongBCCTinh/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu số 6.2. Các hoạt động BCC - Huyện",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "hoatdongbcchuyen",
					"route": "hoatdongbcchuyen/collection",
					"$ref": "app/view/HoatDongGD/HoatDongBCCHuyen/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "hoatdongbcchuyen",
					"route": "hoatdongbcchuyen/model",
					"$ref": "app/view/HoatDongGD/HoatDongBCCHuyen/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu số 6.3. Các hoạt động BCC Xã/Thôn",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "hoatdongbccxathon",
					"route": "hoatdongbccxathon/collection",
					"$ref": "app/view/HoatDongGD/HoatDongBCCXaThon/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "hoatdongbccxathon",
					"route": "hoatdongbccxathon/model",
					"$ref": "app/view/HoatDongGD/HoatDongBCCXaThon/view/ModelView",
					"visible": false
				},
				{
					"text": "Mẫu số 6.4. Các hoạt động BCC - Trường học",
					"icon": "glyphicon glyphicon-tasks",
					"type": "view",
					"collectionName": "hoatdongbcctruonghoc",
					"route": "hoatdongbcctruonghoc/collection",
					"$ref": "app/view/HoatDongGD/HoatDongBCCTruongHoc/view/CollectionView",
					"visible": function () {
						return this.userHasRole("Admin");
					}
				},
				{
					"type": "view",
					"collectionName": "hoatdongbcctruonghoc",
					"route": "hoatdongbcctruonghoc/model",
					"$ref": "app/view/HoatDongGD/HoatDongBCCTruongHoc/view/ModelView",
					"visible": false
				},

			],
		},

	];

});