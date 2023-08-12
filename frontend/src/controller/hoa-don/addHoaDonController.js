window.addHoaDonController = function ($http, $scope) {
  $scope.randomHoaDon = "HD" + Math.floor(Math.random() * 10000) + 1;

  $scope.formHoaDon = {
    ma: $scope.randomHoaDon,
  };
  $scope.listHoaDon = [];

  $scope.getList = function () {
    $http.get(hoaDonAPI + "/get-list").then(function (response) {
      $scope.listHoaDon = response.data;
      console.log($scope.listHoaDon);
    });
  };
  $scope.getList();
  $scope.addHoaDon = function (event) {
    event.preventDefault();

    $http.post(hoaDonAPI + "/add", $scope.formHoaDon).then(function () {
      $scope.getList();
    });
  };
};
