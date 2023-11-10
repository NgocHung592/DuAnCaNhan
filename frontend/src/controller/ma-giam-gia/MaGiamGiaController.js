window.MaGiamGiaController = function ($http, $scope, $location) {
    $scope.listMaGiamGia = [];
    $scope.currentPage = 0;
    $scope.totalPages = [];
    $scope.searchDat = {"search":"", "type":"", "select":""};


    $http.get(magiamgiaAPI + "/hien-thi").then(function (response) {
        $scope.listMaGiamGia = response?.data;
        console.log($scope.listMaGiamGia);
    });

    $scope.searching = function (event) {
        event.preventDefault();
        $scope.searchDat = {"search":"", "type":"", "select":""};
        $scope.searchDat.search=document.getElementById("searchtxt").value;
        $scope.searchDat.select = document.getElementById("searchsel").value;
        let arr = document.getElementsByName("searchtype");
        for (let i = 0; i < arr.length; i++) {
            if(arr.item(i).checked) {
                $scope.searchDat.type = arr.item(i).value;
                break;
            }
        }
    }
}
