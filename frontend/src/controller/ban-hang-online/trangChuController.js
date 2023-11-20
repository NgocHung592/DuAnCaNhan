window.trangChuController = function (
    $scope,
    $http,
    $routeParams
) {
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
    $scope.getSanPham = function () {
        $http
            .get(
                sanPhamAPI +
                "/hien-thi"
            )


            .then(function (response) {
                $scope.listSanPham = response.data;
                console.log(response.data)

            });
        $http
            .get(
                sanPhamChiTietAPI +
                "/hien-thi"
            )


            .then(function (response) {
                $scope.listSanPhamChiTiet = response.data;
                console.log(response.data)

            });
    };

    $scope.getSanPham();


};
