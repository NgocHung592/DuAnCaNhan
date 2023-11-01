window.hienThiSanPhamController = function ($http, $scope) {
  $scope.currentPage = 0;
  $scope.listSanPham = [];
  $scope.totalPages = [];
  $scope.selectOption = "";
  $scope.getSanPham = function () {
    $http
      .get(sanPhamAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listSanPham = response.data;
        console.log($scope.listSanPham);
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getSanPham();
  $scope.loc = function () {
    console.log($scope.selectOption);
    $http
      .get(
        sanPhamAPI +
          "/loc?pageNo=" +
          $scope.currentPage +
          "&loc=" +
          $scope.selectOption
      )
      .then(function (response) {
        $scope.listSanPham = response.data;
        console.log($scope.listSanPham);
      });
  };
  $scope.$watch("searchKeyword", function (newVal, oldVal) {
    if (newVal !== oldVal) {
      $http
        .get(
          sanPhamAPI +
            "/search?pageNo=" +
            $scope.currentPage +
            "&keyword=" +
            $scope.searchKeyword
        )
        .then(function (response) {
          $scope.listSanPham = response.data;
          console.log($scope.listSanPham);
        });
    }
  });
  $scope.changePage = function (index) {
    $scope.currentPage = index;
    $scope.getSanPham();
  };
  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getSanPham();
    }
  };
  $scope.previousPage = function () {
    if ($scope.currentPage >= 0) {
      $scope.currentPage--;
      $scope.getSanPham();
    }
  };
  //   $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
  //     $scope.listChatLieuTrangThai = response.data;
  //   });
  //   $http.get(danhMucAPI + "/trang-thai").then(function (response) {
  //     $scope.listDanhMucTrangThai = response.data;
  //   });
  //   $http.get(sanPhamAPI + "/trang-thai").then(function (response) {
  //     $scope.listSanPhamTrangThai = response.data;
  //   });
  //   $http.get(kieuDangAPI + "/trang-thai").then(function (response) {
  //     $scope.listKieuDangTrangThai = response.data;
  //   });
  //   $http.get(hoaTietAPI + "/trang-thai").then(function (response) {
  //     $scope.listHoaTietTrangThai = response.data;
  //   });
  //   $http.get(phongCachAPI + "/trang-thai").then(function (response) {
  //     $scope.listPhongCachTrangThai = response.data;
  //   });
  //   $http.get(mauSacAPI + "/trang-thai").then(function (response) {
  //     $scope.listMauSacTrangThai = response.data;
  //   });
  //   $http.get(kichThuocAPI + "/trang-thai").then(function (response) {
  //     $scope.listKichThuocTrangThai = response.data;
  //   });
};
