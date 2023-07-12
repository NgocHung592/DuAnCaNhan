window.hienThiMauSacController = function ($http, $scope) {
  $scope.listMauSac = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];

  $scope.getMauSac = function () {
    $http
      .get(mauSacAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listMauSac = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };

  $scope.getMauSac();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getMauSac();
    }
  };

  $scope.delete = function (id) {
    $http.delete(mauSacAPI + "/delete/" + id).then(function () {
      $scope.getMauSac();
    });
  };
};
