window.DonHangController = function ($http, $scope, $routeParams) {
  $scope.listHoaDon = [];
  $scope.listLichSuHoaDon = [];
  $scope.formHoaDon = {
    id: "",
    ma: "",
    tenKhachHang: "",
    ngayDatHang: "",
    loaiHoaDon: "",
    trangThai: Number,
  };
  $scope.getData = function () {
    $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
      $scope.listHoaDon = response?.data.content;
      $scope.customIndex = $scope.currentPage * response.data.size;
      $scope.totalPages = new Array(response.data.totalPages);
      $scope.visiblePages = $scope.getVisiblePages();
    });
  };
  //detai hoa don

  $http.get(hoaDonAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formHoaDon = response.data;
      console.log("response.data", response.data);
      $scope.changeState = function () {
        // Đổi trạng thái hóa đơn theo một logic nào đó
        switch ($scope.formHoaDon.trangThai) {
          case 0:
            $scope.formHoaDon.trangThai = 1;
            break;
          case 1:
            $scope.formHoaDon.trangThai = 2;
            break;
          case 2:
            $scope.formHoaDon.trangThai = 3;
            break;
        }
      };
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
