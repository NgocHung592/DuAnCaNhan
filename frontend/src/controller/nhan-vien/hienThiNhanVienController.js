window.hienThiNhanVienController = function ($http, $scope) {
  $scope.list_nv = [];
  $scope.maFilter = "";
  $scope.sdtFilter = "";
  $scope.tenFilter = "";
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getNhanVien = function () {
    $http
      .get(nhanVienAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.list_nv = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };

  $scope.getNhanVien();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getNhanVien();
    }
  };
  $scope.nextPage = function (index) {
    $scope.currentPage = index++;
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
    }
  };
  $scope.delete = function (id) {
    $http.delete(nhanVienAPI + "/delete/" + id).then(function () {
      $scope.getNhanVien();
    });
  };
  $scope.searchmaa = function () {
    $http
      .get(nhanVienAPI + "/searchma?ma=" + $scope.maFilter)
      .then(function (response) {
        $scope.list_nv = response.data;
      });
  };
  $scope.searchsdt = function () {
    $http
      .get(nhanVienAPI + "/searchsdt?sdt=" + $scope.sdtFilter)
      .then(function (response) {
        $scope.list_nv = response.data;
      });
  };
  $scope.searchten = function () {
    $http
      .get(nhanVienAPI + "/searchten?ten=" + $scope.tenFilter)
      .then(function (response) {
        $scope.list_nv = response.data;
      });
  };
};
