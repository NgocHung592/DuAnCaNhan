window.addNhanVienController = function ($http, $scope) {
  $scope.randoom = "NV" + Math.floor(Math.random() * 10000) + 1;

  $scope.formNhanVien = {
    id: "",
    ma: $scope.randoom,
    hoten: "",
    email: "",
    ngaytao: Date,
    trangthai: 1,
  };

  $scope.add = function () {
    $http.post(nhanVienAPI + "/add", $scope.formNhanVien).then(function () {
      alert("Thêm thành công");
    });
  };
};
