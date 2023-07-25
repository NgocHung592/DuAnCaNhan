window.updateDanhMucController = function ($http, $scope, $routeParams) {
  $scope.formDanhMuc = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
  };

  $http
    .get(danhMucAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formDanhMuc = response.data;
        console.log($scope.formDanhMuc);
      }
    });

  $scope.update = function (id) {
    $http
      .put(danhMucAPI + "/update/" + id, $scope.formDanhMuc)
      .then(function () {
        alert("Cập nhật thành công");
      });
  };
};
