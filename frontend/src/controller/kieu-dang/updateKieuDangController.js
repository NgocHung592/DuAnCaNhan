window.updateKieuDangController = function ($http, $scope, $routeParams) {
  $scope.listDanhMucTheoTrangThai = [];

  $http
    .get(kieuDangAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      $scope.detailKieuDang = response.data;
      console.log($scope.detailKieuDang);
    });

  $scope.listDanhMucTheoTrangThai = function () {
    $http.get(danhMucAPI + "/trang-thai").then(function (response) {
      $scope.listDanhMucTheoTrangThai = response.data;
    });
  };
  $scope.listDanhMucTheoTrangThai();
  $scope.update = function (id) {
    $scope.updateKieuDang = {
      ma: $scope.detailKieuDang.ma,
      ten: $scope.detailKieuDang.ten,
      idDanhMuc: $scope.detailKieuDang.danhMuc.id,
      trangThai: $scope.detailKieuDang.trangThai,
    };
    $http
      .put(kieuDangAPI + "/update/" + id, $scope.updateKieuDang)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
