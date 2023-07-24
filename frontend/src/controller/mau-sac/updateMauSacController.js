window.updateMauSacController = function ($http, $scope, $routeParams) {
  $scope.formMauSac = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Boolean,
  };

  $http.get(mauSacAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.formMauSac = response.data;
    }
  });

  $scope.update = function (id) {
    $http.put(mauSacAPI + "/update/" + id, $scope.formMauSac).then(function () {
      alert("Cập nhật thành công");
    });
  };
};
