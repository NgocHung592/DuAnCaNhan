window.addKhuyenMaiController = function ($http, $scope) {
    $scope.randoom = "KM" + Math.floor(Math.random() * 10000) + 1;

    $scope.detailProduct = {
        id: "",
        ma: "",
        tenKM: "",
        hinhThucGiam: "",
        giaTriGiam: "",
        giaTriToiThieu: "",
        giaTriToiDa: "",
        ngayBatDau: "",
        ngayKetThuc: "",
        trangThai: "",


    };

    $scope.add = function (event) {
        event.preventDefault();
        $http.post(khuyenmaiAPI + "/add", $scope.detailProduct).then(function () {
            alert("Thêm thành công");
        });
    };

}