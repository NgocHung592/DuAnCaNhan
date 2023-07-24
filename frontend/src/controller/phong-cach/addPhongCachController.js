window.addPhongCachController = function ($http, $scope) {
  $scope.randoom = "PC" + Math.floor(Math.random() * 10000) + 1;

  $scope.formPhongCach = {
    id: "",
    ma: $scope.randoom,
    ten: "",
    daXoa: false,
  };

  $scope.add = function () {
    $http.post(phongCachAPI + "/add", $scope.formPhongCach).then(function () {
      alert("Thêm thành công");
    });
  };
};
