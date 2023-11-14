window.MaGiamGiaChiTietController = function ($http, $scope, $routeParams) {
    $scope.listMaGiamGiaCT = [];
    $scope.currentPage = 0;
    $scope.totalPages = [];
    $scope.searchDat = {"search":"", "type":"", "select":""};
    $scope.detailProduct = {
        id: "",
        dongia:"",
        dongiasaugiam:"",
        idma: "",
        hoaDon: "",


    };

    $http
        .get(magiamgiaAPI + "/ma-giam-gia-chi-tiet/detail/" + $routeParams.id)
        .then(function (response) {
            if (response.status == 200) {
                $scope.detailProduct = response.data;
                if($scope.detailProduct.toString() === "") {
                    $scope.detailProduct = {}
                }
                $http
                    .get(magiamgiaAPI + "/detail/" + $routeParams.id).then(function (response2) {
                    if (response2.status == 200) {
                        $scope.detailProduct.ma = response2.data.ma;
                        $scope.detailProduct.tenKM = response2.data.tenKM;
                    }
                });
                $http
                    .get(hoaDonAPI + "/detail/" + $scope.detailProduct.hoaDon).then(function (response2) {
                    if (response2.status == 200) {
                        $scope.detailProduct.maHoaDon = response2.data.ma;
                        $scope.detailProduct.trangThai = response2.data.trangThai;
                    }
                });
                //alert($scope.detailProduct.ngayKetThuc.split("+"));

            }
        });


}
