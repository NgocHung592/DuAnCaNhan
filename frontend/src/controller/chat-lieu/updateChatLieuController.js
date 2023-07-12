window.updateChatLieuController = function ($http, $scope, $routeParams) {
  $scope.formChatLieu = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };

  $http
    .get(chatLieuAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formChatLieu = response.data;
      }
    });

  $scope.update = function (id) {
    $http
      .put(chatLieuAPI + "/update/" + id, $scope.formChatLieu)
      .then(function (response) {
        $scope.getData();
      });
  };
};
