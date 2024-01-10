window.thongtinController = function ($http, $scope, $rootScope, $location) {
  $http
    .get(khachHangAPI + "/detail/" + $rootScope.idKhachHang)
    .then(function (response) {
      $scope.detailKhachHang = response?.data;
      $scope.detailKhachHang.ngaySinh = new Date(response.data.ngaySinh);
      console.log($scope.detailKhachHang);
    });
  $scope.updateKhachHang = function (event) {
    event.preventDefault();
    let check = true;
    const hinhanh = document.getElementById("product-image");
    for (const image of hinhanh.files) {
      $scope.detailKhachHang.anhDaiDien = image.name;
      console.log(image.name);
    }
    $scope.khachHangUpdate = {
      hoTen: $scope.detailKhachHang.hoTen,
      email: $scope.detailKhachHang.email,
      gioiTinh: $scope.detailKhachHang.gioiTinh,
      ngaySinh: $scope.detailKhachHang.ngaySinh,
      anhDaiDien: $scope.detailKhachHang.anhDaiDien,
      soDienThoai: $scope.detailKhachHang.soDienThoai,
      ngaySua: new Date(),
      daXoa: $scope.detailKhachHang.daXoa,
    };
    if (check) {
      $http
        .put(
          khachHangAPI + "/update/" + $rootScope.idKhachHang,
          $scope.khachHangUpdate
        )
        .then(function () {
          alert("Cập nhật thành công");
        });
    }
  };
};
