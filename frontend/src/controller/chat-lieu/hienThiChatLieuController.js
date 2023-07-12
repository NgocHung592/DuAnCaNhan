window.hienThiChatLieuController = function ($http, $scope, $rootScope) {
  $scope.listChatLieu = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.formChatLieu = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };
  $rootScope.getData = function () {
    $http
      .get(chatLieuAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listChatLieu = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };

  $scope.getData();

  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getData();
    }
  };

  $scope.delete = function (id) {
    $http.delete(chatLieuAPI + "/delete/" + id).then(function () {
      $scope.getData();
    });
  };
};
