window.DanhMucController = function ($http, $scope, $rootScope) {
  $scope.listDanhMuc = [];
  $scope.formDanhMuc = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };

  $http.get(danhMucAPI + "/hien-thi").then(function (response) {
    $scope.listDanhMuc = response.data;
  });

  $scope.detail = function (id) {
    $http.get(danhMucAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formDanhMuc = response.data;
      }
    });
  };

  $scope.delete = function (id) {
    $http.delete(danhMucAPI + "/delete/" + id).then(function (response) {
      $http.get(danhMucAPI + "/hien-thi").then(function (response) {
        $scope.listDanhMuc = response.data;
      });
    });
  };

  $scope.add = function () {
    $http
      .post(danhMucAPI + "/add", $scope.formDanhMuc)
      .then(function (response) {
        $http.get(danhMucAPI + "/hien-thi").then(function (response) {
          $scope.listDanhMuc = response.data;
        });
      });
  };

  $scope.update = function (id) {
    $http
      .put(danhMucAPI + "/update/" + id, $scope.formDanhMuc)
      .then(function (response) {
        $http.get(danhMucAPI + "/hien-thi").then(function (response) {
          $scope.listDanhMuc = response.data;
        });
      });
  };
};
