window.updateNhanVienController = function ($http, $scope, $routeParams) {
  $scope.list_vt = [];

  $http
    .get(nhanVienAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      $scope.detailNhanVien = response.data;
      console.log($scope.detailNhanVien);
    });

  $scope.list_vt = function () {
    $http.get(nhanVienAPI + "/trang-thai").then(function (response) {
      $scope.list_vt = response.data;
    });
  };
  $scope.list_vt();
  $scope.update = function (id) {
    $scope.updateNhanVien = {
      ma: $scope.detailNhanVien.ma,
      ten: $scope.detailNhanVien.hoten,
      idVaiTro: $scope.detailNhanVien.vaiTro.ten,
      email: $scope.detailNhanVien.email,
      ngaytao: $scope.detailNhanVien.ngaytao,
      sodienthoai: $scope.detailNhanVien.sodienthoai,
      cmt: $scope.detailNhanVien.cmt,
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
