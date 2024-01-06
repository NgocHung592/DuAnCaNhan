window.DonHangController = function ($http, $scope, $routeParams) {
  $scope.listHoaDon = [];
  $scope.listLichSuHoaDon = [];
  $scope.detailHoaDon = {
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
      $scope.detailHoaDon = response.data;
      console.log($scope.detailHoaDon);
    }
  });

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
