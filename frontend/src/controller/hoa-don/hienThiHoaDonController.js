window.hienThiHoaDonController = function ($http, $scope) {
  $scope.listHoaDon = [];

  $scope.getList = function () {
    $http.get(hoaDonAPI + "/get=list").then(function (response) {
      $scope.listHoaDon = response.data;
    });
  };
  $scope.getList();
};
