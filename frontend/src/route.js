var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");

  $routeProvider
    .when("/san-pham/hien-thi", {
      templateUrl: "hien-thi-san-pham.html",
      controller: SanPhamController,
    })
    .when("/danh-muc/hien-thi", {
      templateUrl: "hien-thi-danh-muc.html",
      controller: DanhMucController,
    })
    .when("/mau-sac/hien-thi", {
      templateUrl: "hien-thi-mau-sac.html",
      controller: MauSacController,
    })
    .when("/khachhang/hienthi", {
      templateUrl: "hien-thi-khach-hang.html",
      controller: KhachHangController,
    })
    .when("/kich-thuoc/hien-thi", {
      templateUrl: "hien-thi-kich-thuoc.html",
      controller: KichThuocController,
    })
    .when("/nhanvien/hienthi", {
      templateUrl: "hien-thi-nhan-vien.html",
      controller: NhanVienController,
    })
    .when("/chat-lieu/hien-thi", {
      templateUrl: "hien-thi-chat-lieu.html",
      controller: ChatLieuController,
    })
    .when("/hoa-tiet/hien-thi", {
      templateUrl: "hien-thi-hoa-tiet.html",
      controller: HoaTietController,
    })
    .when("/phong-cach/hien-thi", {
      templateUrl: "hien-thi-phong-cach.html",
      controller: PhongCachController,
    })
    .when("/kieu-dang/hien-thi", {
      templateUrl: "hien-thi-kieu-dang.html",
      controller: KieuDangController,
    })
    .when("/hoa-don/hien-thi", {
      templateUrl: "hien-thi-hoa-don.html",
      controller: HoaDonController,
    })
    .when("/san-pham-chi-tiet/hien-thi", {
      templateUrl: "hien-thi-san-pham-chi-tiet.html",
      controller: HoaDonController,
    })
      .when("/khuyen-mai/hienthi", {
        templateUrl: "hien-thi-khuyen-mai.html",
        controller: KhuyenMaiController,
      })
    .otherwise({
      redirectTo: "/admin",
    });
});
