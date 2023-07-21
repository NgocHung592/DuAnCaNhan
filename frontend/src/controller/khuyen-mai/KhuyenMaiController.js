window.KhuyenMaiController = function ($http, $scope, $location) {
    $scope.listKhuyenMai = [];
    $scope.currentPage = 0;
    $scope.totalPages = [];

        $http.get(khuyenmaiAPI + "/hien-thi").then(function (response) {
            $scope.listKhuyenMai = response.data;
            console.log(listKhuyenMai);
        });
}
