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
      ten: $scope.detailKhachHang.hoten,
      idHangKhachHang: $scope.detailKhachHang.hangKhachHang.id,
      email: $scope.detailKhachHang.email,
      ngaytao: $scope.detailKhachHang.ngaytao,
      sodienthoai: $scope.detailKhachHang.sodienthoai,
      ngaysinh: $scope.detailKhachHang.ngaysinh,
      trangthai: $scope.detailKhachHang.trangthai,
    };
    $http
      .put(khachHangAPI + "/update/" + id, $scope.updateKhachHang)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
