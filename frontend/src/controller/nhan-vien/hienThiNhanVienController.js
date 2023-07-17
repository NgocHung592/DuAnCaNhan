window.hienThiNhanVienController = function ($http, $scope) {
  $scope.listNhanVien = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];

  $scope.getNhanVien = function () {
    $http
      .get(nhanVienAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listNhanVien = response.data;
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
    $http.delete(NhanVienAPI + "/delete/" + id).then(function () {
      $scope.getNhanVien();
    });
  };
};
