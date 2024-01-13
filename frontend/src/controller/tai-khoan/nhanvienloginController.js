// nhanvienloginController.js
angular.module("loginApp", []).controller("nhanVienController", [
  "$scope",
  "$http",
  "$window",
  function ($scope, $http, $window) {
    $scope.email = null;
    $scope.matKhau = null;

    $scope.nhanVienLogin = {};

    $scope.login = function () {
      $http
        .get(
          nhanVienAPI +
            "/login?email=" +
            $scope.email +
            "&matKhau=" +
            $scope.matKhau
        )
        .then(function (response) {
          if (response.status === 200) {
            $scope.nhanVienLogin = response?.data;

            localStorage.setItem(
              "loggedInUser",
              JSON.stringify($scope.nhanVienLogin)
            );
            $window.location.href = "/src/pages/admin.html#/admin";
          } else {
            alert("Invalid credentials");
          }
        })
        .catch(function (error) {
          console.error(error);
          alert("Email, số điện thoại hoặc mật khẩu không đúng");
        });
    };
  },
]);
