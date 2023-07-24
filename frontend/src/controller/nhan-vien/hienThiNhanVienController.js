window.hienThiNhanVienController = function ($http, $scope) {
  $scope.list_nv = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getNhanVien = function () {
    $http
      .get(nhanVienAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.list_nv = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getNhanVien();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getNhanVien();
    }
  };
  $scope.delete = function (id) {
    $http.delete(nhanVienAPI + "/delete/" + id).then(function () {
      $scope.getNhanVien();
    });
  };
};
