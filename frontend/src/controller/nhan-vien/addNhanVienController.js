window.addNhanVienController = function ($http, $scope) {
  $scope.randoom = "NV" + Math.floor(Math.random() * 10000) + 1;
  var date = new Date();
  $scope.formNhanVien = {
    id: "",
    ma: $scope.randoom,
    hoten: "",
    email: "",
    ngaytao: date,
    trangthai: 1,
  };

  $scope.add = function () {
    $http.post(nhanVienAPI + "/add", $scope.formNhanVien).then(function () {
      alert("Thêm thành công");
    });
  };
};
