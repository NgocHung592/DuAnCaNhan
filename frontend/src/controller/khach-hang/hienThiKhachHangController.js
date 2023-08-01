window.hienThiKhachHangController = function ($http, $scope) {
  $scope.maFilter;
  $scope.sdtFilter;
  $scope.tenFilter;

  $scope.list_kh = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getKhachHang = function () {
    $http
      .get(khachHangAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.list_kh = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getKhachHang();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getKhachHang();
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
    $http.delete(khachHangAPI + "/delete/" + id).then(function () {
      $scope.getKhachHang();
    });
  };
  $scope.searchmaa = function () {
    $http
      .get(khachHangAPI + "/searchma?ma=" + $scope.maFilter)
      .then(function (response) {
        $scope.list_kh = response.data;
      });
  };
  $scope.searchsdt = function () {
    $http
      .get(khachHangAPI + "/searchsdt?sdt=" + $scope.sdtFilter)
      .then(function (response) {
        $scope.list_kh = response.data;
      });
  };
  $scope.searchten = function () {
    $http
      .get(khachHangAPI + "/searchten?ten=" + $scope.tenFilter)
      .then(function (response) {
        $scope.list_kh = response.data;
      });
  };
};
