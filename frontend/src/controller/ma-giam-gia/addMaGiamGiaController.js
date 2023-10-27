window.addMaGiamGiaController = function ($http, $scope) {
    $scope.randoom = "KM" + Math.floor(Math.random() * 10000) + 1;

    $scope.detailProduct = {
        id: "",
        ma: "",
        tenKM: "",
        hinhThucGiam: "",
        trangThai: "",
        soLuong:"",
        giaTriDonToiThieu: "",
        giaTriGiamToiDa: "",
        ngayBatDau: "",
        ngayKetThuc: "",




    };

    $scope.add = function (event) {
        event.preventDefault();
        $http.post(magiamgiaAPI + "/add", $scope.detailProduct).then(function () {
            alert("Thêm thành công");
        });
    };

}