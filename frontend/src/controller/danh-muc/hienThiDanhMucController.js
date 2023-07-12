window.hienThiDanhMucController = function ($http, $scope, $rootScope) {
  $scope.listDanhMuc = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $rootScope.getDanhMuc = function () {
    $http
      .get(danhMucAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listDanhMuc = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getDanhMuc();

  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getDanhMuc();
    }
  };
  $scope.delete = function (id) {
    $http.delete(danhMucAPI + "/delete/" + id).then(function (response) {
      $scope.getDanhMuc();
    });
  };
};
