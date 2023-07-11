window.KhuyenMaiController = function ($http, $scope, $location) {
    $scope.listkm = [];

    $http.get(khuyenmaiAPI + "/hienthi").then(function (response) {
        $scope.listkh = response.data;
        console.log(listkm);
    });
}
