window.MaGiamGiaController = function ($http, $scope, $location) {
    $scope.listMaGiamGia = [];
    $scope.currentPage = 0;
    $scope.totalPages = [];



    $http.get(magiamgiaAPI + "/hien-thi").then(function (response) {
            $scope.listMaGiamGia = response?.data;
            console.log($scope.listMaGiamGia);
        });
}
