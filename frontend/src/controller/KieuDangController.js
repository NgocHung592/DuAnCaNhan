window.KieuDangController = function ($http, $scope, $rootScope) {
  $scope.listKieuDang = [];
  $scope.formKieuDang = {
    id: "",
    ma: "",
    ten: "",
    idDanhMuc: "",
    trangThai: Number,
  };
  $http.get(kieuDangAPI + "/hien-thi").then(function (response) {
    $scope.listKieuDang = response.data;
  });
  $http.get(danhMucAPI + "/hien-thi").then(function (response) {
    $scope.listDanhMuc = response.data;
  });
  $scope.detail = function (id) {
    $http.get(kieuDangAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formKieuDang = response.data;
      }
    });
  };
  //delete san pham
  $scope.delete = function (id) {
    $http.delete(kieuDangAPI + "/delete/" + id).then(function () {
      $http.get(kieuDangAPI + "/hien-thi").then(function (response) {
        $scope.listKieuDang = response.data;
      });
    });
  };
  //add san pham
  $scope.add = function () {
    $http.post(kieuDangAPI + "/add", $scope.formKieuDang).then(function () {
      console.log($scope.formKieuDang);
      $http.get(kieuDangAPI + "/hien-thi").then(function (response) {
        $scope.listKieuDang = response.data;
      });
    });
  };

  //update san pham
  $scope.update = function (id) {
    $http
      .put(kieuDangAPI + "/update/" + id, $scope.formKieuDang)
      .then(function () {
        $http.get(kieuDangAPI + "/hien-thi").then(function (response) {
          $scope.listKieuDang = response.data;
        });
      });
  };
};
