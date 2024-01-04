var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");

  $routeProvider
    .when("/trang-chu", {
      templateUrl: "ban-hang-online/trang-chu.html",
      controller: trangChuController,
    })
    .when("/tat-ca-san-pham", {
      templateUrl: "ban-hang-online/tat-ca-san-pham.html",
      controller: trangChuController,
    })
    .when("/bang-size", {
      templateUrl: "ban-hang-online/bang-size.html",
    })
    .when("/gioi-thieu", {
      templateUrl: "ban-hang-online/gioi-thieu.html",
    })
    .when("/detail-product/:id", {
      templateUrl: "ban-hang-online/detail-product.html",
      controller: detailSanPhamController,
    })
    .when("/gio-hang", {
      templateUrl: "ban-hang-online/gio-hang.html",
      controller: GioHangController,
    })
    .when("/thanh-toan-onl",{
      templateUrl: "ban-hang-online/thanh-toan.html"
      
    })
    .when("/login", {
      templateUrl: "tai-khoan/login.html",
      // controller: loginController,
    })
    .when("/thong-tin", {
      templateUrl: "tai-khoan/thong-tin.html",
    })
    .when("/singup", {
      templateUrl: "tai-khoan/dang-ky.html",
      controller: dangkyController,
    })
    .when("/quen-mat-khau", {
      templateUrl: "tai-khoan/quen-mat-khau.html",
      controller: forgetController,
    })
    .when("/dat-lai-mat-khau", {
      templateUrl: "tai-khoan/dat-lai-mat-khau.html",
      controller: resetController,
    })

    .otherwise({
      redirectTo: "/trang-chu",
    });
});
