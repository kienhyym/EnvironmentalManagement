          define(function (require) {
            "use strict";
            var $ = require('jquery'),
              _ = require('underscore'),
              Gonrin = require('gonrin');
            return [{
                "text": "Hệ thống",
                "icon": "fa fa-user",
                "type": "category",
                "visible": function () {
                  return this.userHasRole("Admin");
                },
                "entries": [{
                  "text": "Đơn vị thành viên",
                  "type": "view",
                  "collectionName": "donvi",
                  "route": "donvi/collectiontree",
                  "$ref": "app/view/HeThong/DonVi/view/CollectionTreeView",
                  "visible": function () {
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
                  "visible": function () {
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
                  "visible": function () {
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
                  "visible": function () {
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
                "visible": function () {
                  return this.userHasRole("Admin");
                },
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
                ]
              },


              {
                "text": "Báo Cáo - Phụ Lục IV",
                "icon": "fa fa-book",
                "type": "category",
                "visible": function () {
                  return this.userHasRole("Admin");
                },
                "entries": [

                  {
                    "text": "Mẫu 1: Khai Thác Nước Ngầm",
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
                    "text": "Mẫu 04: Phiếu Nội Kiểm Tra Chất Lượng",
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

            ];

          });