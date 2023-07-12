window.updateHoaTietController = function ($http, $scope, $routeParams) {
  $scope.listHoaTiet = [];
  $scope.formHoaTiet = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };

  $http
    .get(hoaTietAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formHoaTiet = response.data;
      }
    });

  $scope.update = function (id) {
    $http
      .put(hoaTietAPI + "/update/" + id, $scope.formHoaTiet)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
