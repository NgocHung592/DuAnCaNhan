window.addHoaTietController = function ($http, $scope) {
  $scope.randoom = "HT" + Math.floor(Math.random() * 10000) + 1;

  $scope.formHoaTiet = {
    id: "",
    ma: $scope.randoom,
    ten: "",
    trangThai: 1,
  };

  $scope.add = function () {
    $http.post(hoaTietAPI + "/add", $scope.formHoaTiet).then(function () {
      alert("Thêm thành công");
    });
  };
};
