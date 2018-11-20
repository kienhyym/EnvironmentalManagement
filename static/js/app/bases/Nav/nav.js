          define(function(require) {
            "use strict";
            var $ = require('jquery'),
            _ = require('underscore'),
            Gonrin = require('gonrin');
            return [{
              "text": "Hệ thống",
              "icon": "fa fa-user",
              "type": "category",
              "visible": function() {
                return this.userHasRole("Admin");
              },
              "entries": [{
                "text": "Đơn vị thành viên",
                "type": "view",
                "collectionName": "donvi",
                "route": "donvi/collectiontree",
                "$ref": "app/view/HeThong/DonVi/view/CollectionTreeView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              }, {
                "type": "view",
                "collectionName": "donvi",
                "route": "donvi/model(/:id)",
                "$ref": "app/view/HeThong/DonVi/view/ModelView",
                "visible": false
              }, {
                "text": "Tuyến đơn vị",
                "type": "view",
                "collectionName": "tuyendonvi",
                "route": "tuyendonvi/collection",
                "$ref": "app/view/DanhMuc/TuyenDonVi/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              }, {
                "type": "view",
                "collectionName": "tuyendonvi",
                "route": "tuyendonvi/model",
                "$ref": "app/view/DanhMuc/TuyenDonVi/view/ModelView",
                "visible": false
              }, {
                "text": "Quản trị người dùng",
                "type": "view",
                "collectionName": "user",
                "route": "user/collection",
                "$ref": "app/view/HeThong/User/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              }, {
                "text": "Quản trị người dùng",
                "type": "view",
                "collectionName": "user",
                "route": "user/profile",
                "$ref": "app/view/HeThong/User/view/ProfileView",
                "visible": false
              }, {
                "text": "Quản trị người dùng",
                "type": "view",
                "collectionName": "user",
                "route": "user/changepwd",
                "$ref": "app/view/HeThong/User/view/ChangePasswordView",
                "visible": false
              }, {
                "type": "view",
                "collectionName": "user",
                "route": "user/model(/:id)",
                "$ref": "app/view/HeThong/User/view/ModelView",
                "visible": false
              }, {
                "text": "Quản trị vai trò",
                "type": "view",
                "collectionName": "role",
                "route": "role/collection",
                "$ref": "app/view/HeThong/Role/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              }, {
                "type": "view",
                "collectionName": "role",
                "route": "role/model(/:id)",
                "$ref": "app/view/HeThong/Role/view/ModelView",
                "visible": false
              }, ]
            },
            {
              "text": "Danh Mục",
              "icon": "fa fa-book",
              "type": "category",
              "visible": function() {
                return this.userHasRole("Admin");
              },
              "entries": [

              {
                "text": "Dân Tộc",
                "type": "view",
                "collectionName": "dantoc",
                "route": "dantoc/collection",
                "$ref": "app/view/DanhMuc/DanToc/view/CollectionView",
                "visible": function() {
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
                "visible": function() {
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
                "visible": function() {
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
                "visible": function() {
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
                "type": "view",
                "collectionName": "xaphuong",
                "route": "xaphuong/collection",
                "$ref": "app/view/DanhMuc/XaPhuong/view/CollectionView",
                "visible": function() {
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
                "type": "view",
                "collectionName": "thonxom",
                "route": "thonxom/collection",
                "$ref": "app/view/DanhMuc/ThonXom/view/CollectionView",
                "visible": function() {
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
                "type": "view",
                "collectionName": "trinhdohocvan",
                "route": "trinhdohocvan/collection",
                "$ref": "app/view/DanhMuc/TrinhDoHocVan/view/CollectionView",
                "visible": function() {
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
                "visible": function() {
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
              "text": "Trang chủ",
              "type": "view",
              "icon": "fa fa-home",
              "collectionName": "sochamsoc",
              "route": "sochamsoc/model?id=current",
              "$ref": "app/view/SoChamSoc/ModelView",
              "visible": function() {
                return true;
              },
            },

            {
              "text": "Báo Cáo",
              "icon": "fa fa-book",
              "type": "category",
              "visible": function() {
                return this.userHasRole("Admin");
              },
              "entries": [

              {
                "text": "Khai Thác Nước Ngầm",
                "type": "view",
                "collectionName": "khaithacnuocngam",
                "route": "khaithacnuocngam/collection",
                "$ref": "app/view/BaoCao/KhaiThacNuocNgam/view/CollectionView",
                "visible": function() {
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
                "text": "Khai Thác Nước Sông",
                "type": "view",
                "collectionName": "khaithacnuocsong",
                "route": "khaithacnuocsong/collection",
                "$ref": "app/view/BaoCao/KhaiThacNuocSong/view/CollectionView",
                "visible": function() {
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
                "text": "Khai Thác Nước Từ Hồ Chứa",
                "type": "view",
                "collectionName": "khaithacnuoctuhochua",
                "route": "khaithacnuoctuhochua/collection",
                "$ref": "app/view/BaoCao/KhaiThacNuocTuHoChua/view/CollectionView",
                "visible": function() {
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
                "text": "Phiếu Nội Kiểm Tra Chất Lượng",
                "type": "view",
                "collectionName": "phieunoikiemchatluong",
                "route": "phieunoikiemchatluong/collection",
                "$ref": "app/view/BaoCao/PhieuNoiKiemChatLuong/view/CollectionView",
                "visible": function() {
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
                "text": "Kết Quả Xét Nghiệm Nước Tai Chỗ",
                "type": "view",
                "collectionName": "ketquaxetnghiemtaicho",
                "route": "ketquaxetnghiemtaicho/collection",
                "$ref": "app/view/BaoCao/KetQuaXNNuocTaiCho/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "ketquaxetnghiemtaicho",
                "route": "ketquaxetnghiemtaicho/model",
                "$ref": "app/view/BaoCao/KetQuaXNNuocTaiCho/view/ModelView",
                "visible": false
              },
              {
                "text": "Phiếu Ngoại Kiểm Tra Chất Lượng",
                "type": "view",
                "collectionName": "phieungoaikiemchatluong",
                "route": "phieungoaikiemchatluong/collection",
                "$ref": "app/view/BaoCao/PhieuNgoaiKiemChatLuong/view/CollectionView",
                "visible": function() {
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
                "text": "Kiểm Tra Nguồn Nước Gia Đình",
                "type": "view",
                "collectionName": "kiemtranguonnuochogiadinh",
                "route": "kiemtranguonnuochogiadinh/collection",
                "$ref": "app/view/BaoCao/KiemTraNguonNuocHoGiaDinh/view/CollectionView",
                "visible": function() {
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
                "text": "Nước Sinh Hoạt Trên 1000m",
                "type": "view",
                "collectionName": "tonghopkqnuocsinhhoattren1000m",
                "route": "tonghopkqnuocsinhhoattren1000m/collection",
                "$ref": "app/view/BaoCao/TongHopKQNuocSinhHoatTren1000m/view/CollectionView",
                "visible": function() {
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

              {
                "text": "Bàn Giao Sản Phẩm",
                "type": "view",
                "collectionName": "bangiaosanpham",
                "route": "bangiaosanpham/collection",
                "$ref": "app/view/BaoCao/BanGiaoSanPham/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "bangiaosanpham",
                "route": "bangiaosanpham/model",
                "$ref": "app/view/BaoCao/BanGiaoSanPham/view/ModelView",
                "visible": false
              },
              {
                "text": "Dự Án Bàn Giao",
                "type": "view",
                "collectionName": "duanbangiao",
                "route": "duanbangiao/collection",
                "$ref": "app/view/BaoCao/DuAnBanGiao/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "duanbangiao",
                "route": "duanbangiao/model",
                "$ref": "app/view/BaoCao/DuAnBanGiao/view/ModelView",
                "visible": false
              },
              {
                "text": "Báo Cáo Kết Quả Kiểm Tra",
                "type": "view",
                "collectionName": "baocaoketquakiemtra",
                "route": "baocaoketquakiemtra/collection",
                "$ref": "app/view/BaoCao/BaoCaoKetQuaKiemTra/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "baocaoketquakiemtra",
                "route": "baocaoketquakiemtra/model",
                "$ref": "app/view/BaoCao/BaoCaoKetQuaKiemTra/view/ModelView",
                "visible": false
              },
              {
                "text": "Nhân Lực Tham Gia Kiểm Tra",
                "type": "view",
                "collectionName": "nhanlucthamgiakiemtra",
                "route": "nhanlucthamgiakiemtra/collection",
                "$ref": "app/view/BaoCao/NhanLucThamGiaKiemTra/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "nhanlucthamgiakiemtra",
                "route": "nhanlucthamgiakiemtra/model",
                "$ref": "app/view/BaoCao/NhanLucThamGiaKiemTra/view/ModelView",
                "visible": false
              },
              {
                "text": "Kết Quả Kiểm Tra Dữ Liệu",
                "type": "view",
                "collectionName": "ketquakiemtradulieu",
                "route": "ketquakiemtradulieu/collection",
                "$ref": "app/view/BaoCao/KetQuaKiemTraDuLieu/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "ketquakiemtradulieu",
                "route": "ketquakiemtradulieu/model",
                "$ref": "app/view/BaoCao/KetQuaKiemTraDuLieu/view/ModelView",
                "visible": false
              },
              {
                "text": "Báo Cáo Kết Quả Sửa Chữa",
                "type": "view",
                "collectionName": "bcketquasuachua",
                "route": "bcketquasuachua/collection",
                "$ref": "app/view/BaoCao/BCKetQuaSuaChua/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "bcketquasuachua",
                "route": "bcketquasuachua/model",
                "$ref": "app/view/BaoCao/BCKetQuaSuaChua/view/ModelView",
                "visible": false
              },

              {
                "text": "Người Tham Gia Sửa Chữa",
                "type": "view",
                "collectionName": "nguoithamgiasuachua",
                "route": "nguoithamgiasuachua/collection",
                "$ref": "app/view/BaoCao/NguoiThamGiaSuaChua/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "nguoithamgiasuachua",
                "route": "nguoithamgiasuachua/model",
                "$ref": "app/view/BaoCao/NguoiThamGiaSuaChua/view/ModelView",
                "visible": false
              },

              {
                "text": "Kết Quả Sửa Chữa Siêu Dữ Liệu",
                "type": "view",
                "collectionName": "kqsuachuasieudulieu",
                "route": "kqsuachuasieudulieu/collection",
                "$ref": "app/view/BaoCao/KQSuaChuaSieuDuLieu/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "kqsuachuasieudulieu",
                "route": "kqsuachuasieudulieu/model",
                "$ref": "app/view/BaoCao/KQSuaChuaSieuDuLieu/view/ModelView",
                "visible": false
              },

              {
                "text": "Kết Quả Sửa Chữa Dữ Liệu",
                "type": "view",
                "collectionName": "kqsuachuadulieu",
                "route": "kqsuachuadulieu/collection",
                "$ref": "app/view/BaoCao/KQSuaChuaDuLieu/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "kqsuachuadulieu",
                "route": "kqsuachuadulieu/model",
                "$ref": "app/view/BaoCao/KQSuaChuaDuLieu/view/ModelView",
                "visible": false
              },

              {
                "text": "BC Kết Quả Kiểm Tra",
                "type": "view",
                "collectionName": "bcketquakiemtra",
                "route": "bcketquakiemtra/collection",
                "$ref": "app/view/BaoCao/BCKetQuaKiemTra/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "bcketquakiemtra",
                "route": "bcketquakiemtra/model",
                "$ref": "app/view/BaoCao/BCKetQuaKiemTra/view/ModelView",
                "visible": false
              },

              {
                "text": "Mẫu Dữ Liệu Đặc Tả",
                "type": "view",
                "collectionName": "maudulieudacta",
                "route": "maudulieudacta/collection",
                "$ref": "app/view/BaoCao/MauDuLieuDacTa/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "maudulieudacta",
                "route": "maudulieudacta/model",
                "$ref": "app/view/BaoCao/MauDuLieuDacTa/view/ModelView",
                "visible": false
              },

              {
                "text": "Báo Cáo Xây Dựng Dữ Liệu Đặc Tả",
                "type": "view",
                "collectionName": "bcxaydungdulieudacta",
                "route": "bcxaydungdulieudacta/collection",
                "$ref": "app/view/BaoCao/BCXayDungDuLieuDacTa/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "bcxaydungdulieudacta",
                "route": "bcxaydungdulieudacta/model",
                "$ref": "app/view/BaoCao/BCXayDungDuLieuDacTa/view/ModelView",
                "visible": false
              },

              {
                "text": "Phân Loại Dữ Liệu",
                "type": "view",
                "collectionName": "phanloaidulieu",
                "route": "phanloaidulieu/collection",
                "$ref": "app/view/BaoCao/PhanLoaiDuLieu/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "phanloaidulieu",
                "route": "phanloaidulieu/model",
                "$ref": "app/view/BaoCao/PhanLoaiDuLieu/view/ModelView",
                "visible": false
              },
              {
                "text": "Mẫu Nước Không Đạt",
                "type": "view",
                "collectionName": "maunuockhongdat",
                "route": "maunuockhongdat/collection",
                "$ref": "app/view/BaoCao/MauNuocKhongDat/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "maunuockhongdat",
                "route": "maunuockhongdat/model",
                "$ref": "app/view/BaoCao/MauNuocKhongDat/view/ModelView",
                "visible": false
              },
              {
                "text": "Kết Quả Chất Lượng Nước Ăn Uống",
                "type": "view",
                "collectionName": "kqchatluongnuocanuong",
                "route": "kqchatluongnuocanuong/collection",
                "$ref": "app/view/BaoCao/KQChatLuongNuocAnUong/view/CollectionView",
                "visible": function() {
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
                "text": "Phân Loại Và Đánh Gía Dữ Liệu",
                "type": "view",
                "collectionName": "phanloaivadanhgiadulieu",
                "route": "phanloaivadanhgiadulieu/collection",
                "$ref": "app/view/BaoCao/PhanLoaiVaDanhGiaDuLieu/view/CollectionView",
                "visible": function() {
                  return this.userHasRole("Admin");
                }
              },
              {
                "type": "view",
                "collectionName": "phanloaivadanhgiadulieu",
                "route": "phanloaivadanhgiadulieu/model",
                "$ref": "app/view/BaoCao/PhanLoaiVaDanhGiaDuLieu/view/ModelView",
                "visible": false
              },
              {
               "text": "Dữ Liệu Đã Thu Thập",
               "type": "view",
               "collectionName": "dulieudathuthap",
               "route": "dulieudathuthap/collection",
               "$ref": "app/view/BaoCao/DuLieuDaThuThap/view/CollectionView",
               "visible": function() {
                return this.userHasRole("Admin");
              }
            },
            {
              "type": "view",
              "collectionName": "dulieudathuthap",
              "route": "dulieudathuthap/model",
              "$ref": "app/view/BaoCao/DuLieuDaThuThap/view/ModelView",
              "visible": false
            },
            {
             "text": "Bàn Giao Dữ Liệu Đã Thu Thập",
             "type": "view",
             "collectionName": "bangiaodulieudathuthap",
             "route": "bangiaodulieudathuthap/collection",
             "$ref": "app/view/BaoCao/BanGiaoDuLieuDaThuThap/view/CollectionView",
             "visible": function() {
              return this.userHasRole("Admin");
            }
          },
          {
            "type": "view",
            "collectionName": "bangiaodulieudathuthap",
            "route": "bangiaodulieudathuthap/model",
            "$ref": "app/view/BaoCao/BanGiaoDuLieuDaThuThap/view/ModelView",
            "visible": false
          },

          {
            "text": "Báo Cáo Thu Thập Dữ Liệu",
            "type": "view",
            "collectionName": "bcthuthapdulieu",
            "route": "bcthuthapdulieu/collection",
            "$ref": "app/view/BaoCao/BCThuThapDuLieu/view/CollectionView",
            "visible": function() {
             return this.userHasRole("Admin");
           }
          },
          {
           "type": "view",
           "collectionName": "bcthuthapdulieu",
           "route": "bcthuthapdulieu/model",
           "$ref": "app/view/BaoCao/BCThuThapDuLieu/view/ModelView",
           "visible": false
          },

          {
            "text": "Kết Quả Ngoại Kiểm Tra Nước Vệ Sinh",
            "type": "view",
            "collectionName": "kqngoaikiemnuocsinhhoat",
            "route": "kqngoaikiemnuocsinhhoat/collection",
            "$ref": "app/view/BaoCao/KQNgoaiKiemNuocSinhHoat/view/CollectionView",
            "visible": function() {
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
           "text": "Kết Quả Kiểm Tra Cơ Sở Công Suất Dưới 1000m",
           "type": "view",
           "collectionName": "kqktcosocongsuat1000m",
           "route": "kqktcosocongsuat1000m/collection",
           "$ref": "app/view/BaoCao/KQKTCoSoCongSuatDuoi1000m/view/CollectionView",
           "visible": function() {
            return this.userHasRole("Admin");
          }
          },
          {
            "type": "view",
            "collectionName": "kqktcosocongsuat1000m",
            "route": "kqktcosocongsuat1000m/model",
            "$ref": "app/view/BaoCao/KQKTCoSoCongSuatDuoi1000m/view/ModelView",
            "visible": false
          },

          {
           "text": "Cấp Theo Hộ Gia Đình",
           "type": "view",
           "collectionName": "captheohogiadinh",
           "route": "captheohogiadinh/collection",
           "$ref": "app/view/BaoCao/CapTheoHoGiaDinh/view/CollectionView",
           "visible": function() {
            return this.userHasRole("Admin");
          }
          },
          {
            "type": "view",
            "collectionName": "captheohogiadinh",
            "route": "captheohogiadinh/model",
            "$ref": "app/view/BaoCao/CapTheoHoGiaDinh/view/ModelView",
            "visible": false
          },

          {
            "text": "Kiểm Tra Nguồn Nước Tự Chảy",
            "type": "view",
            "collectionName": "kiemtranguonnuoctuchay",
            "route": "kiemtranguonnuoctuchay/collection",
            "$ref": "app/view/BaoCao/KiemTraNguonNuocTuChay/view/CollectionView",
            "visible": function() {
             return this.userHasRole("Admin");
           }
          },
          {
           "type": "view",
           "collectionName": "kiemtranguonnuoctuchay",
           "route": "kiemtranguonnuoctuchay/model",
           "$ref": "app/view/BaoCao/KiemTraNguonNuocTuChay/view/ModelView",
           "visible": false
          },

          {
           "text": "Cấp Theo Nguồn Nước",
           "type": "view",
           "collectionName": "captheonguonnuoc",
           "route": "captheonguonnuoc/collection",
           "$ref": "app/view/BaoCao/CapTheoNguonNuoc/view/CollectionView",
           "visible": function() {
            return this.userHasRole("Admin");
          }
          },
          {
            "type": "view",
            "collectionName": "captheonguonnuoc",
            "route": "captheonguonnuoc/model",
            "$ref": "app/view/BaoCao/CapTheoNguonNuoc/view/ModelView",
            "visible": false
          },


          ],
          },

          ];

          });
