window.addSanPhamController = function ($http, $scope) {
  $scope.detailProduct = {
    id: "",
    ma: "",
    ten: "",
    moTa: "",
    trangThai: 1,
  };
  $scope.add = function (event) {
    event.preventDefault();
    $http.post(sanPhamAPI + "/add", $scope.detailProduct).then(function () {
      alert("Them thanh cong");
    });
  };
};
