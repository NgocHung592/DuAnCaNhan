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
      templateUrl: "hien-thi-danh-muc.html",
      controller: DanhMucController,
    })

    .when("/mau-sac/hien-thi", {
      templateUrl: "hien-thi-mau-sac.html",
      controller: MauSacController,
    })
    .when("/kich-thuoc/hien-thi", {
      templateUrl: "hien-thi-kich-thuoc.html",
      controller: KichThuocController,
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
    })
    .otherwise({
      redirectTo: "/admin",
    });
});
