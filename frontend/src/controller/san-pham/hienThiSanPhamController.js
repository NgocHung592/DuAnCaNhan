window.hienThiSanPhamController = function ($http, $scope) {
  $scope.listSanPham = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getData = function () {
    $http
      .get(sanPhamAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listSanPham = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getData();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getData();
    }
  };

  $scope.delete = function (id) {
    $http.delete(sanPhamAPI + "/delete/" + id).then(function (response) {
      $scope.getData();
    });
  };
};
