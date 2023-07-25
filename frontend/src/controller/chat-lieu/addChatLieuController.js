window.addChatLieuController = function ($http, $scope) {
  $scope.randoom = "CL" + Math.floor(Math.random() * 10000) + 1;

  $scope.formChatLieu = {
    id: "",
    ma: $scope.randoom,
    ten: "",
    daXoa: false,
  };

  $scope.add = function (event) {
    event.preventDefault();
    $http.post(chatLieuAPI + "/add", $scope.formChatLieu).then(function () {
      alert("Thêm thành công");
    });
  };
};
