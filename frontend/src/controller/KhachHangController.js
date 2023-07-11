window.khachhangController = function ($http, $scope, $location) {
  $scope.listkh = [];
  $scope.form_kh = {
    ma: "",
    hoten: "",
    email: "",
    ngaytao: "",
    nguoitao: "",
    trangthai: Number,
    ten: "",
  };

  //load table
  $http.get(khachhangAPI + "/hienthi").then(function (response) {
    $scope.listkh = response.data;
    console.log(listkh);
  });

  $http.get(khachhangAPI + "/add").then(function (response) {
    $scope.listkh = response.data;
    console.log(listkh);
  });
  $scope.add = function () {
    $http.post(khachhangAPI + "/add", $scope.form_kh).then(function (response) {
      $http.get(khachhangAPI + "/hienthi").then(function (response) {
        $scope.listkh = response.data;
      });
    });
  };

  $scope.delete = function (id) {
    $http.delete(khachhangAPI + "/delete/" + id).then(function (response) {
      $http.get(khachhangAPI + "/hienthi").then(function (response) {
        $scope.listkh = response.data;
      });
    });
  };

  $scope.detail = function (id) {
    $http.get(khachhangAPI + "/add/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.form_kh = response.data;
      }
    });
  };

  $scope.update = function (id) {
    $http
      .put(khachhangAPI + "/update/" + id, $scope.form_kh)
      .then(function (response) {
        $http.get(khachhangAPI + "/hienthi").then(function (response) {
          $scope.listkh = response.data;
        });
      });
  };
};
