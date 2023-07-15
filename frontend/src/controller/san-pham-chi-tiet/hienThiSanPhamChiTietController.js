window.hienThiSanPhamChiTietController = function ($http, $scope) {
  $scope.listSanPhamChiTiet = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];

  $scope.getSanPhamChiTiet = function () {
    $http
      .get(sanPhamChiTietAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listSanPhamChiTiet = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getSanPhamChiTiet();
};
