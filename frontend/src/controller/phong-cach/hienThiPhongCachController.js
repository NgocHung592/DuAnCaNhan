window.hienThiPhongCachController = function ($http, $scope) {
  $scope.listPhongCach = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];

  $scope.getPhongCach = function () {
    $http
      .get(phongCachAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listPhongCach = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getPhongCach();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getPhongCach();
    }
  };
  $scope.delete = function (id) {
    $http.delete(phongCachAPI + "/delete/" + id).then(function (response) {
      $scope.getPhongCach();
    });
  };
};
