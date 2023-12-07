angular
  .module("myApp")
  .controller("loginController", function ($http, $scope, $window) {
    $scope.user = {
      email: "",
      matKhau: "",
    };
    $scope.list = {};
    $scope.isLoggedIn = false;

    var storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      $scope.list = JSON.parse(storedUser);
      $scope.isLoggedIn = true;
    }

    $scope.login = function () {
      $http
        .post(taiKhoanAPI + "/login", $scope.user)
        .then(function (response) {
          // Kiểm tra mã trạng thái HTTP
          if (response.status === 200) {
            // Đăng nhập thành công, response.data sẽ chứa thông tin người dùng
            alert("Đăng nhập thành công");

            $scope.list = response.data;
            console.log($scope.list);
            $scope.isLoggedIn = true;

            localStorage.setItem("loggedInUser", JSON.stringify($scope.list));
          } else {
            // Đăng nhập không thành công
            alert("Invalid credentials");
          }
        })
        .catch(function (error) {
          // Xử lý lỗi
          console.error(error);
          alert("Email hoặc mật khẩu không đúng");
        });
    };
    $scope.logout = function () {
      localStorage.removeItem("loggedInUser");
      $scope.isLoggedIn = false;
      $window.location.reload();
    };
  });
