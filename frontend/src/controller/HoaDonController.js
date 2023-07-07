window.HoaDonController = function ($http, $scope, $location) {
  $scope.listHoaDon = [];
  $scope.formHoaDon = {
    id: "",
    ma: "",
    ngayTao: "",
    ngayDatHang: "",
    ngayThanhToan: "",
    ngayShip: "",
    ngayMongMuonNhan: "",
    ngayCoTheNhan: "",
    ngayNhanDuocHang: "",
    tenKhachHang: "",
    diaChiKhachHang: "",
    soDienThoaiKhachHang: "",
    phiShip: "",
    phuPhi: "",
    phiHoanTra: "",
    trangThai: Number,
    tongTien: "",
    ngaySua: "",
    nguoiTao: "",
    nguoiSua: "",
    daXoa: "",
  };
  //get all
  $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
    $scope.listHoaDon = response.data;
    console.log($scope.listHoaDon);
  });
  //detai hoa don
  $scope.detail = function (id) {
    $http.get(hoaDonAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formHoaDon = response.data;
      }
    });
  };
  //delete hoa don
  $scope.delete = function (id) {
    $http.delete(hoaDonAPI + "/delete/" + id).then(function (response) {
      $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
        $scope.listHoaDon = response.data;
      });
    });
  };
  //add hoa don
  $scope.add = function () {
    $http.post(hoaDonAPI + "/add", $scope.formHoaDon).then(function (response) {
      $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
        $scope.listHoaDon = response.data;
      });
    });
  };

  //update hoa don
  $scope.update = function (id) {
    $http
      .put(hoaDonAPI + "/update/" + id, $scope.formHoaDon)
      .then(function (response) {
        $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
          $scope.listHoaDon = response.data;
        });
      });
  };
};
