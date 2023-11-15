window.updateNhanVienController = function ($http, $scope, $routeParams) {
  $http
    .get(nhanVienAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      $scope.detailNhanVien = response.data;
      console.log($scope.detailNhanVien);
    });

  $scope.update = function (id) {
    var date = new Date();
    const hinhanh = document.getElementById("product-image");
    console.log(hinhanh);
    for (const image of hinhanh.files) {
      $scope.detailNhanVien.anhdaidien = image.name;
    }
    $scope.updateNhanVien = {
      ma: $scope.detailNhanVien.ma,
      hoten: $scope.detailNhanVien.hoten,
      chucVu: $scope.detailNhanVien.chucVu.ten,
      email: $scope.detailNhanVien.email,
      gioitinh: $scope.detailNhanVien.gioitinh,
      ngaytao: $scope.detailNhanVien.ngaytao,
      sodienthoai: $scope.detailNhanVien.sodienthoai,
      ngaysinh: $scope.detailNhanVien.ngaysinh,
      trangthai: $scope.detailNhanVien.trangthai,
      anhdaidien: $scope.detailNhanVien.anhdaidien,
      ngaysua: ($scope.detailNhanVien.ngaysua = date),
      tinhthanhpho: $scope.detailNhanVien.tinhthanhpho,
      quanhuyen: $scope.detailNhanVien.quanhuyen,
      mota: $scope.detailNhanVien.mota,
      phuongxa: $scope.detailNhanVien.phuongxa,
    };
    $http
      .put(nhanVienAPI + "/update/" + id, $scope.updateNhanVien)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
