window.addDanhMucController = function ($http, $scope) {
  $scope.randoom = "DM" + Math.floor(Math.random() * 10000) + 1;
  $scope.formDanhMuc = {
    id: "",
    ma: $scope.randoom,
    ten: "",
    daXoa: false,
  };

  $scope.add = function (event) {
    event.preventDefault();
    $http.post(danhMucAPI + "/add", $scope.formDanhMuc).then(function () {
      alert("Thêm thành công");
    });
  };
};
