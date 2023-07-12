window.addMauSacController = function ($http, $scope) {
  $scope.randoom = "MS" + Math.floor(Math.random() * 10000) + 1;

  $scope.formMauSac = {
    id: "",
    ma: $scope.randoom,
    ten: "",
    trangThai: 1,
  };

  $scope.add = function () {
    $http.post(mauSacAPI + "/add", $scope.formMauSac).then(function () {
      alert("Thêm thành công");
    });
  };
};
