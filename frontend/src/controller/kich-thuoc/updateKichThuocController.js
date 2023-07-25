window.updateKichThuocController = function ($http, $scope, $routeParams) {
  $scope.formKichThuoc = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Boolean,
  };

  $http
    .get(kichThuocAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formKichThuoc = response.data;
      }
    });

  $scope.update = function (id) {
    $http
      .put(kichThuocAPI + "/update/" + id, $scope.formKichThuoc)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
