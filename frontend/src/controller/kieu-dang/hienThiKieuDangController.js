window.hienThiKieuDangController = function ($http, $scope) {
  $scope.listKieuDang = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getKieuDang = function () {
    $http
      .get(kieuDangAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listKieuDang = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getKieuDang();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getKieuDang();
    }
  };
  $scope.delete = function (id) {
    $http.delete(kieuDangAPI + "/delete/" + id).then(function () {
      $scope.getKieuDang();
    });
  };
};
