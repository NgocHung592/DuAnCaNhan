window.DonHangController = function ($http, $scope, $routeParams) {
  $scope.listHoaDon = [];
  $scope.listLichSuHoaDon = [];
  $scope.listHoaDonChiTiet = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.visiblePages = [];
  $scope.maxVisiblePages = 3;
  $scope.detailHoaDon = {
    id: "",
    ma: "",
    tenKhachHang: "",
    ngayDatHang: "",
    loaiHoaDon: "",
    trangThai: Number,
  };
  $scope.getVisiblePages = function () {
    var totalPages = $scope.totalPages.length;

    var range = $scope.maxVisiblePages;
    var curPage = $scope.currentPage;

    var numberTruncateLeft = curPage - Math.floor(range / 2);
    var numberTruncateRight = curPage + Math.floor(range / 2);

    var visiblePages = [];

    for (var pos = 1; pos <= totalPages; pos++) {
      var active = pos - 1 === curPage ? "active" : "";

      if (totalPages >= 2 * range - 1) {
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          visiblePages.push({
            page: pos,
            active: active,
          });
        }
      } else {
        visiblePages.push({
          page: pos,
          active: active,
        });
      }
    }
    return visiblePages;
  };
  $scope.getData = function () {
    $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
      $scope.listHoaDon = response?.data.content;
      $scope.customIndex = $scope.currentPage * response.data.size;
      $scope.totalPages = new Array(response.data.totalPages);
      $scope.visiblePages = $scope.getVisiblePages();
    });
    $http
      .get(
        hoaDonChiTietAPI +
          "/detail/" +
          $routeParams.id +
          "&pageNo=?" +
          $scope.currentPage
      )
      .then(function (response) {
        $scope.listHoaDonChiTiet = response?.data.content;
        console.log($scope.listHoaDonChiTiet);
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  };
  //detai hoa don
  $scope.getData();
  $http.get(hoaDonAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.detailHoaDon = response.data;
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
