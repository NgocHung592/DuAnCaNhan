window.SanPhamController = function ($http, $scope) {
  $scope.listSanPham = [];

  //load table
  $http.get(sanPhamAPI + "/hien-thi").then(function (response) {
    $scope.listSanPham = response.data;
    console.log(listSanPham);
  });
};
