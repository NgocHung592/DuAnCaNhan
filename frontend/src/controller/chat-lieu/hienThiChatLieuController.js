window.hienThiChatLieuController = function ($http, $scope, $rootScope) {
  $scope.listChatLieu = [];
  $scope.listChatLieuTrangThai = [];

  $scope.currentPage = 0;
  $scope.totalPages = [];

  $scope.getData = function () {
    $http
      .get(chatLieuAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listChatLieu = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };

  $scope.getData();
  $rootScope.getChatLieuTrangThai = function () {
    $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
      $scope.listChatLieuTrangThai = response.data;
    });
  };
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getData();
    }
  };

  $scope.nextPage = function (index) {
    $scope.currentPage = index++;
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
    }
  };
};
