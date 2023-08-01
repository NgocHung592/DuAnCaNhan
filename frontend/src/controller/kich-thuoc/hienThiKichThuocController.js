window.hienThiKichThuocController = function ($http, $scope) {
  $scope.listKichThuoc = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getKichThuoc = function () {
    $http
      .get(kichThuocAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listKichThuoc = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };

  $scope.getKichThuoc();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getKichThuoc();
    }
  };
  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getKichThuoc();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getKichThuoc();
    }
  };
};
