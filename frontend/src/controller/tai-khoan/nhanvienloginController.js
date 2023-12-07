angular
  .module("myApp")
  .controller("nhanVienController", function ($http, $scope, $window) {
    $scope.user = {
      email: "",
      matkhau: "",
    };
    $scope.list = {};
    $scope.isLoggedInAdmin = false;

    var storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      $scope.list = JSON.parse(storedUser);
      $scope.isLoggedInAdmin = true;
    } else {
      $scope.isLoggedInAdmin = false;
    }

    $scope.login = function () {
      $http
        .post(nhanVienAPI + "/login", $scope.user)
        .then(function (response) {
          // Kiểm tra mã trạng thái HTTP
          if (response.status === 200) {
            // Đăng nhập thành công, response.data sẽ chứa thông tin người dùng
            alert("Đăng nhập thành công");

            $scope.list = response.data;
            console.log($scope.list);
            $scope.isLoggedInAdmin = true;

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
      $scope.isLoggedInAdmin = false;
      $window.location.reload();
    };
  });
