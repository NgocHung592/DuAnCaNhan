window.updateSanPhamController = function ($http, $scope, $routeParams) {
  $scope.detailProduct = {
    id: "",
    ma: "",
    ten: "",
    moTa: "",
    trangThai: Number,
  };

  $http
    .get(sanPhamAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.detailProduct = response.data;
      }
    });

  $scope.update = function (id) {
    $http
      .put(sanPhamAPI + "/update/" + id, $scope.detailProduct)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
