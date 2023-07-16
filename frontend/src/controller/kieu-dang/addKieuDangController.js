window.addKieuDangController = function ($http, $scope, $rootScope) {
  $scope.randoom = "KD" + Math.floor(Math.random() * 10000) + 1;
  $scope.listDanhMucTheoTrangThai = [];
  $scope.formKieuDang = {
    ma: $scope.randoom,
    ten: "",
    idDanhMuc: "",
    trangThai: 1,
  };

  $rootScope.listDanhMucTheoTrangThai = function () {
    $http.get(danhMucAPI + "/trang-thai").then(function (response) {
      $scope.listDanhMucTheoTrangThai = response.data;
    });
  };
  $rootScope.listDanhMucTheoTrangThai();
  $scope.add = function () {
    $http.post(kieuDangAPI + "/add", $scope.formKieuDang).then(function () {
      console.log($scope.formKieuDang);
      alert("Thêm thành công");
    });
  };
};
