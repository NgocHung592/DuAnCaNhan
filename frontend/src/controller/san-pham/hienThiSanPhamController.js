window.hienThiSanPhamController = function ($http, $scope, $rootScope) {
  $scope.listSanPham = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.counter = 0;
  $scope.getSanPham = function () {
    $http
      .get(sanPhamAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listSanPham = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getSanPham();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getSanPham();
    }
  };
  $scope.nextPage = function () {
    $scope.currentPage++;
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
    }
  };

  $scope.delete = function (id) {
    $http.delete(sanPhamAPI + "/delete/" + id).then(function (response) {
      $scope.getSanPham();
    });
  };
};
