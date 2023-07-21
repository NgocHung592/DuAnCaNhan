window.updateKhachHangController = function ($http, $scope, $routeParams) {
  $scope.list_Hang = [];

  $http
    .get(khachHangAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      $scope.detailKhachHang = response.data;
      console.log($scope.detailKhachHang);
    });

  $scope.list_Hang = function () {
    $http.get(hangKhachHangAPI + "/trang-thai").then(function (response) {
      $scope.list_Hang = response.data;
    });
  };
  $scope.list_Hang();
  $scope.update = function (id) {
    $scope.updateKhachHang = {
      ma: $scope.detailKhachHang.ma,
      ten: $scope.detailKhachHang.ten,
      email: $scope.detailKhachHang.email,
      trangThai: $scope.detailKhachHang.trangThai,
    };
    $http
      .put(khachHangAPI + "/update/" + id, $scope.updateKhachHang)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
