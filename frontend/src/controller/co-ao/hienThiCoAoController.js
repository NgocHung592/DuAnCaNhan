window.hienThiCoAoController = function ($http, $scope, $rootScope) {
  $scope.listCoAo = [];

  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.count = 0;
  $scope.getCoAo = function () {
    $http
      .get(coAoAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listCoAo = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };

  $scope.getCoAo();

  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getCoAo();
    }
  };

  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getCoAo();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getCoAo();
    }
  };
};
