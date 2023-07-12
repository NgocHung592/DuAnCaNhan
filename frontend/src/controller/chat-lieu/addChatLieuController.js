window.addChatLieuController = function ($http, $scope) {
  $scope.formChatLieu = {
    id: "",
    ma: "",
    ten: "",
    trangThai: 1,
  };

  $scope.add = function (event) {
    event.preventDefault();
    $http.post(chatLieuAPI + "/add", $scope.formChatLieu).then(function () {
      $scope.getData();
    });
  };
};
