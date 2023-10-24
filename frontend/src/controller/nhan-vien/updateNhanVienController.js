window.updateNhanVienController = function ($http, $scope, $routeParams) {
  $http
    .get(nhanVienAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      $scope.detailNhanVien = response.data;
      console.log($scope.detailNhanVien);
    });
  $scope.update = function (id) {
    $scope.updateNhanVien = {
      ma: $scope.detailNhanVien.ma,
      ten: $scope.detailNhanVien.hoten,
      idVaiTro: $scope.detailNhanVien.vaiTro.ten,
      email: $scope.detailNhanVien.email,
      ngaytao: $scope.detailNhanVien.ngaytao,
      sodienthoai: $scope.detailNhanVien.sodienthoai,
      ngaysinh: $scope.detailNhanVien.ngaysinh,
      trangthai: $scope.detailNhanVien.trangthai,
    };
    $http
      .put(nhanVienAPI + "/update/" + id, $scope.updateNhanVien)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
