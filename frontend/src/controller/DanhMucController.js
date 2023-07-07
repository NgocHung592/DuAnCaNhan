window.DanhMucController = function ($http, $scope, $location) {
  $scope.listDanhMuc = [];
  $scope.formDanhMuc = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };
  //hien thi
  $http.get(danhMucAPI + "/hien-thi").then(function (response) {
    $scope.listDanhMuc = response.data;
  });
  //detai san pham
  $scope.detail = function (id) {
    $http.get(danhMucAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formDanhMuc = response.data;
      }
    });
  };
  //delete san pham
  $scope.delete = function (id) {
    $http.delete(danhMucAPI + "/delete/" + id).then(function (response) {
      $http.get(danhMucAPI + "/hien-thi").then(function (response) {
        $scope.listDanhMuc = response.data;
      });
    });
  };
  //add san pham
  $scope.add = function () {
    $http
      .post(danhMucAPI + "/add", $scope.formDanhMuc)
      .then(function (response) {
        $http.get(danhMucAPI + "/hien-thi").then(function (response) {
          $scope.listDanhMuc = response.data;
        });
      });
  };

  //update san pham
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
