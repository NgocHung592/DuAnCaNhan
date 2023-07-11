window.PhongCachController = function ($http, $scope, $location) {
  $scope.listPhongCach = [];
  $scope.formPhongCach = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };
  //hien thi
  $http.get(phongCachAPI + "/hien-thi").then(function (response) {
    $scope.listPhongCach = response.data;
  });
  //detai san pham
  $scope.detail = function (id) {
    $http.get(phongCachAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formPhongCach = response.data;
      }
    });
  };
  //delete san pham
  $scope.delete = function (id) {
    $http.delete(phongCachAPI + "/delete/" + id).then(function (response) {
      $http.get(phongCachAPI + "/hien-thi").then(function (response) {
        $scope.listPhongCach = response.data;
      });
    });
  };
  //add san pham
  $scope.add = function () {
    $http
      .post(phongCachAPI + "/add", $scope.formPhongCach)
      .then(function (response) {
        $http.get(phongCachAPI + "/hien-thi").then(function (response) {
          $scope.listPhongCach = response.data;
        });
      });
  };

  //update san pham
  $scope.update = function (id) {
    $http
      .put(phongCachAPI + "/update/" + id, $scope.formPhongCach)
      .then(function (response) {
        $http.get(phongCachAPI + "/hien-thi").then(function (response) {
          $scope.listPhongCach = response.data;
        });
      });
  };
};
