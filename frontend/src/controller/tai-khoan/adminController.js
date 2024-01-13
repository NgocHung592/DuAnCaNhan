angular.module("myApp").controller("admin", [
  "$scope",
  "$window",
  function ($scope, $window) {
    let storedUserData = localStorage.getItem("loggedInUser");
    $scope.storedUser = JSON.parse(storedUserData);
    $scope.role = $scope.storedUser.chucVu.ten;
    $scope.logOut = function () {
      localStorage.removeItem("loggedInUser");
      $window.location.href = "/src/pages/login/dang-nhap.html";
    };
  },
]);
