window.ChatLieuController = function ($http, $scope, $location) {
  $scope.listChatLieu = [];
  $scope.formChatLieu = {
    id: "",
    ma: "",
    ten: "",
    trangThai: Number,
  };
  //get all
  $http.get(chatLieuAPI + "/hien-thi").then(function (response) {
    $scope.listChatLieu = response.data;
  });
  //detai san pham
  $scope.detail = function (id) {
    $http.get(chatLieuAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formChatLieu = response.data;
      }
    });
  };
  //delete san pham
  $scope.delete = function (id) {
    $http.delete(chatLieuAPI + "/delete/" + id).then(function (response) {
      $http.get(chatLieuAPI + "/hien-thi").then(function (response) {
        $scope.listSanPham = response.data;
      });
    });
  };
  //add san pham
  $scope.add = function () {
    $http
      .post(chatLieuAPI + "/add", $scope.formChatLieu)
      .then(function (response) {
        $http.get(chatLieuAPI + "/hien-thi").then(function (response) {
          $scope.listChatLieu = response.data;
        });
      });
  };

  //update san pham
  $scope.update = function (id) {
    $http
      .put(sanPhamAPI + "/update/" + id, $scope.formProduct)
      .then(function (response) {
        $http.get(sanPhamAPI + "/hien-thi").then(function (response) {
          $scope.listSanPham = response.data;
        });
      });
  };
};
