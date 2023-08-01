window.hienThiHoaTietController = function ($http, $scope, $location) {
  $scope.listHoaTiet = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getHoaTiet = function () {
    $http
      .get(hoaTietAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listHoaTiet = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getHoaTiet();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getHoaTiet();
    }
  };
  $scope.delete = function (id) {
    $http.delete(hoaTietAPI + "/delete/" + id).then(function () {
      $scope.getHoaTiet();
    });
  };
  $scope.nextPage = function (index) {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getHoaTiet();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getHoaTiet();
    }
  };
};
