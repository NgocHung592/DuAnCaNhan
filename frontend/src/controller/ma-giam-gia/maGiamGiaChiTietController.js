window.MaGiamGiaChiTietController = function ($http, $scope, $location) {
    $scope.listMaGiamGiaCT = [];
    $scope.currentPage = 0;
    $scope.totalPages = [];
    $scope.searchDat = {"search":"", "type":"", "select":""};
    $scope.detailProduct = {
        id: "",
        dongia:"",
        dongiasaugiam:"",
        idma: "",
        idhoadon: "",


    };

    $http
        .get(magiamgiaAPI + "/ma-giam-gia-chi-tiet/detail/" + $routeParams.id)
        .then(function (response) {
            if (response.status == 200) {
                $scope.detailProduct = response.data;

                //alert($scope.detailProduct.ngayKetThuc.split("+"));

            }
        });


}
