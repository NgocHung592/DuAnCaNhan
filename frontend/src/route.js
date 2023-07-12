var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");

  $routeProvider
    .when("/san-pham/hien-thi", {
      templateUrl: "san-pham/hien-thi-san-pham.html",
      controller: hienThiSanPhamController,
    })
    .when("/san-pham/add", {
      templateUrl: "san-pham/add-san-pham.html",
      controller: addSanPhamController,
    })
    .when("/san-pham/view-update/:id", {
      templateUrl: "san-pham/update-san-pham.html",
      controller: updateSanPhamController,
    })
    .when("/danh-muc/hien-thi", {
      templateUrl: "danh-muc/hien-thi-danh-muc.html",
      controller: hienThiDanhMucController,
    })
    .when("/danh-muc/add", {
      templateUrl: "danh-muc/add-danh-muc.html",
      controller: addDanhMucController,
    })
    .when("/danh-muc/update/:id", {
      templateUrl: "danh-muc/update-danh-muc.html",
      controller: updateDanhMucController,
    })
    // .when("/mau-sac/hien-thi", {
    //   templateUrl: "hien-thi-mau-sac.html",
    //   controller: MauSacController,
    // })
    // .when("/khachhang/hienthi", {
    //   templateUrl: "hien-thi-khach-hang.html",
    //   controller: KhachHangController,
    // })
    // .when("/kich-thuoc/hien-thi", {
    //   templateUrl: "hien-thi-kich-thuoc.html",
    //   controller: KichThuocController,
    // })
    .when("/nhanvien/hienthi", {
      templateUrl: "hien-thi-nhan-vien.html",
      controller: NhanVienController,
    })
    .when("/chat-lieu/hien-thi", {
      templateUrl: "chat-lieu/hien-thi-chat-lieu.html",
      controller: hienThiChatLieuController,
    })
    .when("/chat-lieu/add", {
      templateUrl: "chat-lieu/add-chat-lieu.html",
      controller: addChatLieuController,
    })
    .when("/chat-lieu/update/:id", {
      templateUrl: "chat-lieu/update-chat-lieu.html",
      controller: updateChatLieuController,
    })
    .when("/hoa-tiet/hien-thi", {
      templateUrl: "hoa-tiet/hien-thi-hoa-tiet.html",
      controller: hienThiHoaTietController,
    })
    .when("/hoa-tiet/add", {
      templateUrl: "hoa-tiet/add-hoa-tiet.html",
      controller: addHoaTietController,
    })
    .when("/hoa-tiet/update/:id", {
      templateUrl: "hoa-tiet/update-hoa-tiet.html",
      controller: updateHoaTietController,
    })
    // .when("/phong-cach/hien-thi", {
    //   templateUrl: "hien-thi-phong-cach.html",
    //   controller: PhongCachController,
    // })
    // .when("/kieu-dang/hien-thi", {
    //   templateUrl: "hien-thi-kieu-dang.html",
    //   controller: KieuDangController,
    // })
    .when("/hoa-don/hien-thi", {
      templateUrl: "hien-thi-hoa-don.html",
      controller: HoaDonController,
    })
    .when("/san-pham-chi-tiet/hien-thi", {
      templateUrl: "san-pham-chi-tiet/hien-thi-san-pham-chi-tiet.html",
    })
    .when("/khuyen-mai/hienthi", {
      templateUrl: "hien-thi-khuyen-mai.html",
      controller: KhuyenMaiController,
    })
    .otherwise({
      redirectTo: "/admin",
    });
});
