window.hienThiTayAoController = function ($http, $scope, $rootScope) {
  $scope.listTayAo = [];

  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.count = 0;
  $scope.getTayAo = function () {
    $http
      .get(tayAoAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listTayAo = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };

  $scope.getTayAo();

  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getTayAo();
    }
  };

  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getTayAo();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getTayAo();
    }
  };
};
