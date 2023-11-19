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
    })
    .when("/bang-size", {
      templateUrl: "ban-hang-online/bang-size.html",
    })
    .when("/gioi-thieu", {
      templateUrl: "ban-hang-online/gioi-thieu.html",
    })
    .when("/product", {
      templateUrl: "ban-hang-online/detail-product.html",
      // controller: detailSPController,
    })
    .when("/gio-hang", {
      templateUrl: "ban-hang-online/gio-hang.html",
    })
    .otherwise({
      redirectTo: "/trang-chu",
    });
});
