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
      idVaiTro: $scope.detailNhanVien.chucVu.ten,
      email: $scope.detailNhanVien.email,
      gioitinh: $scope.detailNhanVien.gioitinh,
      ngaytao: $scope.detailNhanVien.ngaytao,
      sodienthoai: $scope.detailNhanVien.sodienthoai,
      ngaysinh: $scope.detailNhanVien.ngaysinh,
      trangthai: $scope.detailNhanVien.trangthai,
      tinhThanhPho: $scope.detailNhanVien.tinhthanhpho,
      quanHuyen: $scope.detailNhanVien.quanhuyen,
      mota: $scope.detailNhanVien.mota,
      phuongXa: $scope.detailNhanVien.phuongxa,
    };
    $http
      .put(nhanVienAPI + "/update/" + id, $scope.updateNhanVien)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
