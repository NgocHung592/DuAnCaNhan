window.addHoaDonController = function ($http, $scope, $routeParams) {
  $scope.listHoaDon = [];
  $scope.sizeAndQuantitys = [];
  $scope.listKichThuoc = [];
  $scope.filterKichThuoc = "";
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getList = function () {
    $http.get(hoaDonAPI + "/get-list").then(function (response) {
      $scope.listHoaDon = response.data;
      console.log($scope.listHoaDon);
    });
  };
  $scope.getList();

  $scope.addHoaDon = function (event) {
    event.preventDefault();
    $scope.randomHoaDon = "HD" + Math.floor(Math.random() * 10000) + 1;

    $scope.formHoaDon = {
      ma: $scope.randomHoaDon,
    };
    $http.post(hoaDonAPI + "/add", $scope.formHoaDon).then(function () {
      console.log($scope.formHoaDon);
      $scope.getList();
    });
  };

  $scope.getSanPhamChiTiet = function () {
    $http
      .get(sanPhamChiTietAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listSanPhamChiTiet = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getSanPhamChiTiet();

  $scope.detailSanPhamChiTiet = function (index) {
    $http
      .get(sanPhamChiTietAPI + "/detail-san-pham/" + index)
      .then(function (response) {
        $scope.productDetail = response.data;
        console.log($scope.productDetail);
      });
    $http
      .get(sanPhamChiTietAPI + "/detail-kich-thuoc/" + index)
      .then(function (response) {
        $scope.sizeAndQuantitys = response.data;
        console.log($scope.sizeAndQuantitys);
      });
  };
  $scope.detailSanPhamChiTiet();

  $scope.selectedSize = function (selectedSize) {
    $scope.filterKichThuoc = selectedSize;
    console.log($scope.filterKichThuoc);
  };

  $scope.changePage = function (index) {
    $scope.currentPage = index;
    $scope.getSanPhamChiTiet();
  };
  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getSanPhamChiTiet();
    }
  };
  $scope.previousPage = function () {
    if ($scope.currentPage >= 0) {
      $scope.currentPage--;
      $scope.getSanPhamChiTiet();
    }
  };
  $scope.xoaHoaDon = function (event, index) {
    event.preventDefault();
    $http.delete(hoaDonAPI + "/delete/" + index).then(function () {
      $scope.getList();
    });
  };
};
