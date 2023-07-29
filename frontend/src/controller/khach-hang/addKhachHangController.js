window.addKhachHangController = function ($http, $scope, $rootScope) {
  $scope.randoom = "KH" + Math.floor(Math.random() * 10000) + 1;
  var date = new Date();
  $scope.list_Hang = [];
  $scope.form_kh = {
    ma: $scope.randoom,
    ten: "",
    email: "",
    ngaytao: date,
    idHangKhachHang: "9309e014-df10-40d8-a01b-65091091e05f",
    trangThai: 1,
  };

  $rootScope.list_Hang = function () {
    $http.get(hangKhachHangAPI + "/trang-thai").then(function (response) {
      $scope.list_Hang = response.data;
    });
  };
  $rootScope.list_Hang();
  $scope.add = function () {
    $http.post(khachHangAPI + "/add", $scope.form_kh).then(function () {
      console.log($scope.form_kh);
      alert("Thêm thành công");
    });
  };
};
