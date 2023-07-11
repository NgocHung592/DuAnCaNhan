window.HoaTietController = function ($http, $scope, $location) {
  $scope.listHoaTiet = [];
  $scope.formHoaTiet = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };
  //hien thi
  $http.get(hoaTietAPI + "/hien-thi").then(function (response) {
    $scope.listHoaTiet = response.data;
  });
  //detai san pham
  $scope.detail = function (id) {
    $http.get(hoaTietAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formHoaTiet = response.data;
      }
    });
  };
  //delete san pham
  $scope.delete = function (id) {
    $http.delete(hoaTietAPI + "/delete/" + id).then(function (response) {
      $http.get(hoaTietAPI + "/hien-thi").then(function (response) {
        $scope.listHoaTiet = response.data;
      });
    });
  };
  //add san pham
  $scope.add = function () {
    $http
      .post(hoaTietAPI + "/add", $scope.formHoaTiet)
      .then(function (response) {
        $http.get(hoaTietAPI + "/hien-thi").then(function (response) {
          $scope.listHoaTiet = response.data;
        });
      });
  };

  //update san pham
  $scope.update = function (id) {
    $http
      .put(hoaTietAPI + "/update/" + id, $scope.formHoaTiet)
      .then(function (response) {
        $http.get(hoaTietAPI + "/hien-thi").then(function (response) {
          $scope.listHoaTiet = response.data;
        });
      });
  };
};
