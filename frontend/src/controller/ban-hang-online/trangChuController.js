window.trangChuController = function (
    $scope,
    $http,
    $routeParams
) {
    $scope.listSanPhamChiTiet = [];
    $scope.detailSanPham = {
        id: "",
        ten: "",
        moTa: "",
        daXoa: Boolean,
    };
    $scope.getSanPhamChiTiet = function () {
        $http
            .get(
                sanPhamChiTietAPI +
                "/hien-thi"
            )
            .then(function (response) {
                $scope.listSanPhamChiTiet = response.data;
                console.log($scope.listSanPhamChiTiet);
                $scope.totalPages = new Array(response.data.totalPages);
            });
    };
    $scope.getSanPhamChiTiet();
};
