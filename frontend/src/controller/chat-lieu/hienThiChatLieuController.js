window.hienThiChatLieuController = function ($http, $scope, $rootScope) {
  $scope.listChatLieu = [];
  $scope.listChatLieuTrangThai = [];

  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.count = 0;
  $scope.getChatLieu = function () {
    $http
      .get(chatLieuAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listChatLieu = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };

  $scope.getChatLieu();
  $rootScope.getChatLieuTrangThai = function () {
    $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
      $scope.listChatLieuTrangThai = response.data;
    });
  };
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getChatLieu();
    }
  };

  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getChatLieu();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getChatLieu();
    }
  };
};
