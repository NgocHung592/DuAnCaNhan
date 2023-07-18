window.addKhuyenMaiController = function ($http, $scope) {
    $scope.randoom = "SP" + Math.floor(Math.random() * 10000) + 1;

    $scope.add = function (event) {
        event.preventDefault();
        $http.post(khuyenmaiAPI + "/add", $scope.detailProduct).then(function () {
            alert("Thêm thành công");
        });
    };

}