window.addHoaTietController = function ($http, $scope) {
  $scope.formHoaTiet = {
    id: "",
    ma: "",
    ten: "",
    trangThai: 1,
  };

  $scope.add = function () {
    $http.post(hoaTietAPI + "/add", $scope.formHoaTiet).then(function () {
      alert("Thêm thành công");
    });
  };
};
