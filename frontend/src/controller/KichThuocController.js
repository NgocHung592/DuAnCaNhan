window.KichThuocController = function ($http, $scope, $location) {
  $scope.listKichThuoc = [];
  $scope.formKichThuoc = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };
  //hien thi
  $http.get(kichThuocAPI + "/hien-thi").then(function (response) {
    $scope.listKichThuoc = response.data;
  });
  //detai san pham
  $scope.detail = function (id) {
    $http.get(kichThuocAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formKichThuoc = response.data;
      }
    });
  };
  //delete san pham
  $scope.delete = function (id) {
    $http.delete(kichThuocAPI + "/delete/" + id).then(function (response) {
      $http.get(kichThuocAPI + "/hien-thi").then(function (response) {
        $scope.listKichThuoc = response.data;
      });
    });
  };
  //add san pham
  $scope.add = function () {
    $http
      .post(kichThuocAPI + "/add", $scope.formKichThuoc)
      .then(function (response) {
        $http.get(kichThuocAPI + "/hien-thi").then(function (response) {
          $scope.listKichThuoc = response.data;
        });
      });
  };

  //update san pham
  $scope.update = function (id) {
    $http
      .put(kichThuocAPI + "/update/" + id, $scope.formKichThuoc)
      .then(function (response) {
        $http.get(kichThuocAPI + "/hien-thi").then(function (response) {
          $scope.listKichThuoc = response.data;
        });
      });
  };
};
