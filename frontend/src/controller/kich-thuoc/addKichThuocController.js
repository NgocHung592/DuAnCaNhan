window.addKichThuocController = function ($http, $scope) {
  $scope.randoom = "KT" + Math.floor(Math.random() * 10000) + 1;

  $scope.formKichThuoc = {
    id: "",
    ma: $scope.randoom,
    ten: "",
    daXoa: false,
  };

  $scope.add = function () {
    $http.post(kichThuocAPI + "/add", $scope.formKichThuoc).then(function () {
      alert("Thêm thành công");
    });
  };
};
