window.updateMaGiamGiaController = function ($http, $scope, $routeParams) {
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

    $http
        .get(magiamgiaAPI + "/detail/" + $routeParams.id)
        .then(function (response) {
            if (response.status == 200) {
                $scope.detailProduct = response.data;
            }
        });

    $scope.update = function (id) {
        $http
            .put(magiamgiaAPI + "/update/" + id, $scope.detailProduct)
            .then(function () {
                alert("Cập nhật thành công");
            });
    };
};
