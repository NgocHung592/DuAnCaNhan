window.MauSacController = function ($http, $scope) {
  $scope.listMauSac = [];
  $scope.formMauSac = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };
  //hien thi
  $http.get(mauSacAPI + "/hien-thi").then(function (response) {
    $scope.listMauSac = response.data;
  });
  //detai
  $scope.detail = function (id) {
    $http.get(mauSacAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formMauSac = response.data;
      }
    });
  };
  //delete
  $scope.delete = function (id) {
    $http.delete(mauSacAPI + "/delete/" + id).then(function (response) {
      $http.get(mauSacAPI + "/hien-thi").then(function (response) {
        $scope.listMauSac = response.data;
      });
    });
  };
  //add
  $scope.add = function () {
    $http.post(mauSacAPI + "/add", $scope.formMauSac).then(function (response) {
      $http.get(mauSacAPI + "/hien-thi").then(function (response) {
        $scope.listMauSac = response.data;
      });
    });
  };

  //update
  $scope.update = function (id) {
    $http
      .put(mauSacAPI + "/update/" + id, $scope.formMauSac)
      .then(function (response) {
        $http.get(mauSacAPI + "/hien-thi").then(function (response) {
          $scope.listMauSac = response.data;
        });
      });
  };
};
