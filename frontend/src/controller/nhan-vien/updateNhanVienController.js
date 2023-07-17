window.updateNhanVienController = function ($http, $scope, $routeParams) {
  $scope.formNhanVien = {
    id: "",
    ma: $scope.randoom,
    hoten: "",
    email: "",
    ngaytao: Date,
    trangthai: 1,
  };

  $http
    .get(nhanVienAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formNhanVien = response.data;
      }
    });

  $scope.update = function (id) {
    $http
      .put(nhanVienAPI + "/update/" + id, $scope.formNhanVien)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
