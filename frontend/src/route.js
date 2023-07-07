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
      controller: SanPhamController,
    })
    .when("/mau-sac/hien-thi", {
      templateUrl: "hien-thi-mau-sac.html",
      controller: SanPhamController,
    })
    .when("/kich-thuoc/hien-thi", {
      templateUrl: "hien-thi-kich-thuoc.html",
      controller: SanPhamController,
    })
    .when("/chat-lieu/hien-thi", {
      templateUrl: "hien-thi-chat-lieu.html",
      controller: SanPhamController,
    })
    .when("/hoa-tiet/hien-thi", {
      templateUrl: "hien-thi-hoa-tiet.html",
      controller: SanPhamController,
    })
    .when("/phong-cach/hien-thi", {
      templateUrl: "hien-thi-phong-cach.html",
      controller: SanPhamController,
    })
    .when("/kieu-dang/hien-thi", {
      templateUrl: "hien-thi-kieu-dang.html",
      controller: SanPhamController,
    })
    // .when("/hoa-don/hien-thi", {
    //   templateUrl: "hien-thi-hoa-don.html",
    //   controller: HoaDonController,
    // })
    // .when("/admin", {
    //   templateUrl: "admin.html",
    // })
    .otherwise({
      redirectTo: "/admin",
    });
  // $routeProvider
  //   .when("/hoa-don/hien-thi", {
  //     templateUrl: "hoa-don-hien-thi.html",
  //     controller: HoaDonController,
  //   })
  //   .otherwise({
  //     redirectTo: "/admin",
  //   });
});
