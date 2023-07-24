window.addNhanVienController = function ($http, $scope, $rootScope) {
  $scope.randoom = "NV" + Math.floor(Math.random() * 10000) + 1;
  var date = new Date();
  $scope.list_nv = [];
  $scope.form_nv = {
    ma: $scope.randoom,
    ten: "",
    email: "",
    ngaysinh: "",
    sodienthoai: "",
    cmt: "",
    matkhau: "123",
    ngaytao: date,
    idVaiTro: "b9cdb679-65cf-40f1-bb4a-b2753a6d3a00",
    trangThai: 1,
  };

  $rootScope.list_nv = function () {
    $http.get(vaiTroAPI + "/trang-thai").then(function (response) {
      $scope.list_nv = response.data;
    });
  };
  $rootScope.list_nv();
  $scope.add = function () {
    $http.post(nhanVienAPI + "/add", $scope.form_nv).then(function () {
      console.log($scope.form_nv);
      alert("Thêm thành công");
    });
  };
};
