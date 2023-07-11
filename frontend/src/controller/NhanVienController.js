window.NhanVienController = function ($http, $scope, $location) {
  $scope.list = [];
  $scope.listnv = [];
  $scope.form_nv = {
    ma: "",
    hoten: "",
    email: "",
    gioitinh: Boolean,
    sodienthoai: "",
    trangthai: Number,
    ngaysinh: Date,
    matkhau: "",
  };

  //load table
  $http.get(nhanvienAPI + "/hienthi").then(function (response) {
    $scope.listnv = response.data;
    console.log(listnv);
  });

  //load table
  $http.get(nhanvienAPI + "/add").then(function (response) {
    $scope.list = response.data;
    console.log(list);
  });
  $scope.add = function () {
    $http.post(nhanvienAPI + "/add", $scope.form_nv).then(function (response) {
      $http.get(nhanvienAPI + "/hienthi").then(function (response) {
        $scope.listnv = response.data;
        $scope.list = response.data;
      });
    });
  };

  $scope.delete = function (id) {
    $http.delete(nhanvienAPI + "/delete/" + id).then(function (response) {
      $http.get(nhanvienAPI + "/hienthi").then(function (response) {
        $scope.listnv = response.data;
      });
    });
  };
  //detai san pham
  $scope.detail = function (id) {
    $http.get(nhanvienAPI + "/add/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.form_nv = response.data;
      }
    });
  };
  //update san pham
  $scope.update = function (id) {
    $http
      .put(nhanvienAPI + "/update/" + id, $scope.form_nv)
      .then(function (response) {
        $http.get(nhanvienAPI + "/hienthi").then(function (response) {
          $scope.listnv = response.data;
        });
      });
  };
};
