window.detailSanPhamController = function ($scope, $http, $routeParams) {
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.listSanPhamChiTiet = [];
  $scope.listNewSanPhamChiTiet = [];
  $scope.showSPCT = false;

  $scope.getSanPhamChiTiet = function () {
    $http
      .get(
        sanPhamChiTietAPI +
          "/hien-thi/" +
          $routeParams.id +
          "?pageNo=" +
          $scope.currentPage
      )
      .then(function (response) {
        $scope.listSanPhamChiTiet = response?.data.content;
        console.log($scope.listSanPhamChiTiet);
        const groupedSanPham = {};
        $scope.listSanPhamChiTiet.forEach((sanPham) => {
          const tenSanPham = sanPham.tenSanPham;

          if (!groupedSanPham[tenSanPham]) {
            groupedSanPham[tenSanPham] = {
              ...sanPham,
              tenMauSac: [sanPham.tenMauSac],
              tenKichThuoc: [sanPham.tenKichThuoc],
              duongDan: [sanPham.duongDan],
              giaMin: sanPham.donGia,
              giaMax: sanPham.donGia,
            };
          } else {
            groupedSanPham[tenSanPham].giaMin = Math.min(
              groupedSanPham[tenSanPham].giaMin,
              sanPham.donGia
            );
            groupedSanPham[tenSanPham].giaMax = Math.max(
              groupedSanPham[tenSanPham].giaMax,
              sanPham.donGia
            );
            if (
              !groupedSanPham[tenSanPham].tenMauSac.includes(sanPham.tenMauSac)
            ) {
              groupedSanPham[tenSanPham].tenMauSac.push(sanPham.tenMauSac);
            }
            if (
              !groupedSanPham[tenSanPham].tenKichThuoc.includes(
                sanPham.tenKichThuoc
              )
            ) {
              groupedSanPham[tenSanPham].tenKichThuoc.push(
                sanPham.tenKichThuoc
              );
            }
            if (
              !groupedSanPham[tenSanPham].duongDan.includes(sanPham.duongDan)
            ) {
              groupedSanPham[tenSanPham].duongDan.push(sanPham.duongDan);
            }
          }
        });

        // Chuyển đổi object thành mảng
        $scope.listNewSanPhamChiTiet = Object.values(groupedSanPham);

        console.log($scope.listNewSanPhamChiTiet);
      });
  };
  $scope.getSanPhamChiTiet();
  $scope.selectdMauSac = function (mauSac) {
    $scope.searchMauSac = mauSac;
    $scope.listSanPhamChiTiet.filter((sanPham) => {
      if (
        sanPham.tenKichThuoc == $scope.searchKichThuoc &&
        sanPham.tenMauSac == $scope.searchMauSac
      ) {
        $scope.sanPhamCT = sanPham;
        console.log(sanPham);
        $scope.showSPCT = true;
      }
    });
  };
  $scope.selectdKichThuoc = function (kichThuoc) {
    $scope.searchKichThuoc = kichThuoc;
    $scope.listSanPhamChiTiet.filter((sanPham) => {
      if (
        sanPham.tenKichThuoc == $scope.searchKichThuoc &&
        sanPham.tenMauSac == $scope.searchMauSac
      ) {
        $scope.sanPhamCT = sanPham;
        console.log(sanPham);
        $scope.showSPCT = true;
      }
    });
  };
};
