window.updatePhongCachController = function ($http, $scope, $routeParams) {
  $scope.formPhongCach = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };

  $http
    .get(phongCachAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formPhongCach = response.data;
      }
    });

  $scope.update = function (id) {
    $http
      .put(phongCachAPI + "/update/" + id, $scope.formPhongCach)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
