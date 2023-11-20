window.detailController = function (
    $scope,
    $http,
    $routeParams
) {
    $scope.currentPage = 0;
    $scope.totalPages = [];
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
                "/hien-thi/" +
                $routeParams.id +
                "?pageNo=" +
                $scope.currentPage
            )
            .then(function (response) {
                $scope.listSanPhamChiTiet = response.data;
                console.log($scope.listSanPhamChiTiet);
                $scope.totalPages = new Array(response.data.totalPages);
            });
        $http
            .get(sanPhamAPI + "/detail/" + $routeParams.id)
            .then(function (response) {
                $scope.detailSanPham = response.data;
            });
    };
    $scope.getSanPhamChiTiet();


    $scope.detailSanPhamChiTietF = function (e, id) {
        e.preventDefault();
        $http.get(sanPhamChiTietAPI + "/detail/" + id).then(function (response) {
            $scope.detailSanPhamChiTiet = response.data;
        });
    };


    //get thuoc tinh san pham
    $scope.getChatLieuTrangThai = function () {
        $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
            $scope.listChatLieuTrangThai = response.data;
        });
    };
    $scope.getChatLieuTrangThai();

    $scope.getKichThuocTrangThai = function () {
        $http.get(kichThuocAPI + "/trang-thai").then(function (response) {
            $scope.listKichThuocTrangThai = response.data;
        });
    };
    $scope.getKichThuocTrangThai();

    $scope.getMauSacTrangThai = function () {
        $http.get(mauSacAPI + "/trang-thai").then(function (response) {
            $scope.listMauSacTrangThai = response.data;
        });
    };
    $scope.getMauSacTrangThai();

    $scope.getHoaTietTrangThai = function () {
        $http.get(hoaTietAPI + "/trang-thai").then(function (response) {
            $scope.listHoaTietTrangThai = response.data;
        });
    };
    $scope.getHoaTietTrangThai();

    $scope.getPhongCachTrangThai = function () {
        $http.get(phongCachAPI + "/trang-thai").then(function (response) {
            $scope.listPhongCachTrangThai = response.data;
        });
    };
    $scope.getPhongCachTrangThai();

    $scope.getKichThuocTrangThai = function () {
        $http.get(kichThuocAPI + "/trang-thai").then(function (response) {
            $scope.listKichThuocTrangThai = response.data;
        });
    };
    $scope.getKichThuocTrangThai();

    $scope.getMauSacTrangThai = function () {
        $http.get(mauSacAPI + "/trang-thai").then(function (response) {
            $scope.listMauSacTrangThai = response.data;
        });
    };
    $scope.getMauSacTrangThai();

    $scope.getCoAoTrangThai = function () {
        $http.get(coAoAPI + "/trang-thai").then(function (response) {
            $scope.listCoAoTrangThai = response.data;
        });
    };
    $scope.getCoAoTrangThai();

    $scope.getTayAoTrangThai = function () {
        $http.get(tayAoAPI + "/trang-thai").then(function (response) {
            $scope.listTayAoTrangThai = response.data;
        });
    };
    $scope.getTayAoTrangThai();
};
