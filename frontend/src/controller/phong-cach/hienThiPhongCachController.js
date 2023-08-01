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
  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getPhongCach();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getPhongCach();
    }
  };
};
