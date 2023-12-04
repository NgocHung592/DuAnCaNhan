window.updateCoAoController = function (
  $http,
  $scope,
  $routeParams,
  $location
) {
  $http.get(coAoAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formCoAo = response.data;
    }
  });

  $scope.update = function () {
    if ($scope.formCoAo.ten == "") {
      $scope.message = "Tên cổ áo không được để trống";
      return;
    }
    $scope.updateCoAo = {
      ten: $scope.formCoAo.ten,
      ngaySua: new Date(),
      daXoa: $scope.formCoAo.daXoa,
    };
    $http
      .put(coAoAPI + "/update/" + $routeParams.id, $scope.updateCoAo)
      .then(function () {
        $location.path("/co-ao/hien-thi");
      });
  };
};
