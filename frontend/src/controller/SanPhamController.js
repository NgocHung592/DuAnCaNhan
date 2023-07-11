window.SanPhamController = function ($http, $scope) {
  $scope.listSanPham = [];
  $scope.page = 0;
  $scope.pages = [];
  $scope.formProduct = {
    id: "",
    ma: "",
    ten: "",
    moTa: "",
    trangThai: Number,
  };
  //get all
  $http
    .get(sanPhamAPI + "/hien-thi?pageNo=" + $scope.page)
    .then(function (response) {
      $scope.listSanPham = response.data;
      $scope.pages = new Array(response.data.totalPages);
    });
  $scope.setPage = function (page, event) {
    event.preventDefault();
    $scope.page = page;
    $http
      .get(sanPhamAPI + "/hien-thi?pageNo=" + $scope.page)
      .then(function (response) {
        $scope.listSanPham = response.data;
        $scope.pages = new Array(response.data.totalPages);
      });
  };
  //detai san pham
  $scope.detail = function (id) {
    $http.get(sanPhamAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formProduct = response.data;
      }
    });
  };
  //delete san pham
  $scope.delete = function (id) {
    $http.delete(sanPhamAPI + "/delete/" + id).then(function (response) {
      $http.get(sanPhamAPI + "/hien-thi").then(function (response) {
        $scope.listSanPham = response.data;
      });
    });
  };
  //add san pham
  $scope.add = function () {
    $http
      .post(sanPhamAPI + "/add", $scope.formProduct)
      .then(function (response) {
        $http.get(sanPhamAPI + "/hien-thi").then(function (response) {
          $scope.listSanPham = response.data;
        });
      });
  };

  //update san pham
  $scope.update = function (id) {
    $http
      .put(sanPhamAPI + "/update/" + id, $scope.formProduct)
      .then(function (response) {
        $http.get(sanPhamAPI + "/hien-thi").then(function (response) {
          $scope.listSanPham = response.data;
        });
      });
  };
};
