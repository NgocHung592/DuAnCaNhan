window.hienThiKhachHangController = function ($http, $scope) {
  $scope.list_kh = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getKhachHang = function () {
    $http
      .get(khachHangAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.list_kh = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getKhachHang();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getKhachHang();
    }
  };
  $scope.delete = function (id) {
    $http.delete(khachHangAPI + "/delete/" + id).then(function () {
      $scope.getKhachHang();
    });
  };
};
