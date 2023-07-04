var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider.when("/san-pham/hien-thi", {
    templateUrl: "page/hien-thi-san-pham.html",
    controller: SanPhamController,
  });
});
