angular.module("myApp").controller("admin", [
  "$scope",
  "$window",
  function ($scope, $window) {
    let storedUserData = localStorage.getItem("loggedInAdmin");
    $scope.storedUser = JSON.parse(storedUserData);

    if ($scope.storedUser === null) {
      $window.location.href = "/src/pages/login/dang-nhap.html";
    } else {
      $scope.role = $scope.storedUser.chucVu.ten;
    }
    $scope.logOut = function () {
      localStorage.removeItem("loggedInAdmin");
      $window.location.href = "/src/pages/login/dang-nhap.html";
    };
  },
]);
