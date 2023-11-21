window.trangChuController = function ($scope, $http) {
  $scope.listSanPhamChiTiet = [];
  $scope.listSanPham = [];
  $scope.detailSanPham = {
    id: "",
    ten: "",
    moTa: "",
    daXoa: Boolean,
  };
  $scope.detailMauSac = {
    id: "",
    tenMauSac: "",
    daXoa: Boolean,
  };
  $scope.detailKichThuoc = {
    id: "",
    tenKichThuoc: "",
    daXoa: Boolean,
  };
  $scope.getTopSanPhamMoi = function () {
    $http.get(sanPhamChiTietAPI + "/trang-chu").then(function (response) {
      $scope.listTopSanPham = response.data;
      console.log($scope.listTopSanPham);
      // Gộp các sản phẩm có cùng tên
      const groupedSanPham = {};
      $scope.listTopSanPham.forEach((sanPham) => {
        const tenSanPham = sanPham.tenSanPham;

        if (!groupedSanPham[tenSanPham]) {
          groupedSanPham[tenSanPham] = {
            ...sanPham,
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
          if (!groupedSanPham[tenSanPham].duongDan.includes(sanPham.duongDan)) {
            groupedSanPham[tenSanPham].duongDan.push(sanPham.duongDan);
          }
        }
      });

      // Chuyển đổi object thành mảng
      $scope.listTopSanPham = Object.values(groupedSanPham);

      console.log($scope.listTopSanPham);
    });
  };
  $scope.getTopSanPhamMoi();
  $scope.detailSanPham = function (idSanPham) {
    // console.log(idSanPham);
    // $http
    //   .get(sanPhamChiTietAPI + "/detail/" + $routeParams.id)
    //   .then(function (response) {
    //     $scope.detailSanPhamChiTiet = response.data;
    //     console.log($scope.detailSanPhamChiTiet);
    //   });
  };
};
