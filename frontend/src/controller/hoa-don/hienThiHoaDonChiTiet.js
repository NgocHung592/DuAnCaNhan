window.hienThiHoaDonChiTiet = function (
  $http,
  $scope,
  $routeParams,
  $rootScope
) {
  $scope.listHoaDon = [];
  $scope.listLichSuHoaDon = [];
  // $scope.formHoaDon = {
  //   id: "",
  //   ma: "",
  //   tenKhachHang: "",
  //   ngayDatHang: "",
  //   loaiHoaDon: "",
  //   trangThai: Number,
  // };
  $scope.getData = function () {
    $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
      $scope.listHoaDon = response.data;
    });
  };
  //detai hoa don

  $http.get(hoaDonAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formHoaDon = response.data;
      $rootScope.idhoaD = $routeParams.id;
      console.log("response.data", $rootScope.idhoaD);
    }
  });
  // $scope.getLichSuDonHang = function (id) {
  //   var lichSuHoaDon = listLichSuHoaDon.find(function (c) {
  //     return c.id === id;
  //   });
  //   console.log("lichSuHoaDon.loaiHoaDon", lichSuHoaDon.loaiHoaDon);
  //   return lichSuHoaDon ? lichSuHoaDon.loaiHoaDon : "Unknown";
  // };
  //update hoa don
  $scope.update = function (id) {
    $http
      .put(hoaDonAPI + "/update/" + id, $scope.formHoaDon)
      .then(function (response) {
        $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
          $scope.listHoaDon = response.data;
          alert(response.data);
        });
      });
  };
};
