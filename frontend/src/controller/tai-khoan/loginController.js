angular
  .module("myApp")
  .controller(
    "loginController",
    function ($http, $scope, $window, $route, $rootScope) {
      $scope.user = {
        email: "",
        matKhau: "",
      };

      $scope.list = {};
      $scope.isLoggedIn = false;
      $scope.notification = ""; // Biến để chứa thông báo

      var storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        $scope.list = JSON.parse(storedUser);
        $scope.isLoggedIn = true;
        $rootScope.idKhachHang = $scope.list.id;
        $rootScope.$on("dataFromGioHang", function (event, data) {
          $scope.dataFromGioHang = data;
          console.log("số lượng giỏ hàng :", $scope.dataFromGioHang);

          // Thêm thông báo vào biến notification
          $scope.notification = "Số lượng giỏ hàng đã được cập nhật.";
        });
      }

      $scope.login = function () {
        $http
          .post(taiKhoanAPI + "/login", $scope.user)
          .then(function (response) {
            if (response.status === 200) {
              alert("Đăng nhập thành công");

              $scope.list = response.data;
              $scope.isLoggedIn = true;

              $window.location.reload();

              localStorage.setItem("loggedInUser", JSON.stringify($scope.list));
            } else {
              alert("Invalid credentials");
            }
          })
          .catch(function (error) {
            console.error(error);
            alert("Email hoặc mật khẩu không đúng");
          });
      };

      $scope.logout = function () {
        localStorage.removeItem("loggedInUser");
        $scope.isLoggedIn = false;
        $window.location.reload();
      };
    }
  );
