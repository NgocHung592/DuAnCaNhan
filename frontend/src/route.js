var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");

  $routeProvider
    .when("/san-pham/hien-thi", {
      templateUrl: "pages/hien-thi-san-pham.html",
      controller: SanPhamController,
    })
    .when("/admin", {
      templateUrl: "pages/admin.html",
    })
    .otherwise({
      redirectTo: "/admin",
    });
});
