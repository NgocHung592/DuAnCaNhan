window.addDanhMucController = function ($http, $scope, $rootScope) {
  $scope.formDanhMuc = {
    id: "",
    ma: "",
    ten: "",
    trangThai: 1,
  };

  $scope.add = function (event) {
    event.preventDefault();
    $http.post(danhMucAPI + "/add", $scope.formDanhMuc).then(function () {
      alert("Thêm thành công");
    });
  };
};
