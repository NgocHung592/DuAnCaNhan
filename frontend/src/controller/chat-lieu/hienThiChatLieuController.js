window.hienThiChatLieuController = function ($http, $scope) {
  $scope.listChatLieu = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];

  $scope.getChatLieu = function () {
    $http
      .get(chatLieuAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listChatLieu = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };

  $scope.getChatLieu();

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
