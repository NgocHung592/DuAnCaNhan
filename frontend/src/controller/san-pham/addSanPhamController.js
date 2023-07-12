window.addSanPhamController = function ($http, $scope) {
  $scope.randoom = "SP" + Math.floor(Math.random() * 10000) + 1;
  $scope.detailProduct = {
    id: "",
    ma: $scope.randoom,
    ten: "",
    moTa: "",
    trangThai: 1,
  };
  $scope.add = function (event) {
    event.preventDefault();
    $http.post(sanPhamAPI + "/add", $scope.detailProduct).then(function () {
      alert("Thêm thành công");
    });
  };
};
